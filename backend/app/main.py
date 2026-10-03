import os
import smtplib
import logging
from datetime import datetime
from email.message import EmailMessage
from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy.orm import Session
from . import models
from .database import Base, engine, get_db

load_dotenv()

logger = logging.getLogger("uvicorn.error")

Base.metadata.create_all(bind=engine)  # creates tables on startup

app = FastAPI(title="Portfolio API")

# Allow all origins or configured origins to avoid CORS issues in local dev
allowed_origins_env = os.getenv("ALLOWED_ORIGINS")
origins = (
    [origin.strip() for origin in allowed_origins_env.split(",") if origin.strip()]
    if allowed_origins_env
    else ["*"]
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if "*" in origins else origins,
    allow_origin_regex=r"https?://.*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactIn(BaseModel):
    name: str = Field(
        min_length=2,
        max_length=100,
        pattern=r"^[a-zA-Z\s]+$",
        description="Only alphabets and spaces are allowed"
    )
    email: EmailStr
    body: str = Field(min_length=5, max_length=3000)

def send_notification_email(name: str, sender_email: str, message_body: str):
    """
    Delivers the contact message to Somasundaram's email address.
    Configured via SMTP (e.g. Gmail App Password).
    """
    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = os.getenv("SMTP_USER", "")
    smtp_password = os.getenv("SMTP_PASSWORD", "")
    to_email = os.getenv("CONTACT_TO_EMAIL", "somasundaram822@gmail.com")

    if not smtp_user or not smtp_password:
        logger.info(
            "SMTP_USER or SMTP_PASSWORD not set. Message recorded in database. "
            "To enable live inbox delivery, configure SMTP credentials in backend/.env."
        )
        return False

    try:
        msg = EmailMessage()
        msg["Subject"] = f"New Message from {name}"
        msg["From"] = smtp_user
        msg["To"] = to_email
        msg["Reply-To"] = sender_email

        timestamp_str = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
        email_content = (
            f"You received a new message:\n\n"
            f"----------------------------------------\n"
            f"Name: {name}\n"
            f"Email: {sender_email}\n"
            f"Timestamp: {timestamp_str}\n"
            f"----------------------------------------\n\n"
            f"Message Body:\n{message_body}\n\n"
            f"----------------------------------------\n"
            f"Reply directly to this email to contact {name} at {sender_email}."
        )
        msg.set_content(email_content)

        with smtplib.SMTP(smtp_host, smtp_port, timeout=12) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)

        logger.info(f"Email successfully delivered to {to_email} from {sender_email}")
        return True
    except Exception as e:
        logger.error(f"Error sending email notification via SMTP: {e}")
        return False

@app.get("/api/health")
def health():
    return {"status": "ok"}

@app.post("/api/contact", status_code=201)
def contact(data: ContactIn, db: Session = Depends(get_db)):
    # 1. Save to persistent database
    msg = models.Message(name=data.name, email=data.email, body=data.body)
    db.add(msg)
    db.commit()

    # 2. Send email synchronously so we can report the real result
    email_sent = send_notification_email(data.name, data.email, data.body)

    return {
        "ok": True,
        "email_sent": email_sent,
        "message": (
            "Message received and delivered to somasundaram822@gmail.com"
            if email_sent
            else "Message saved. Email delivery will be retried — SMTP may be misconfigured."
        ),
    }

