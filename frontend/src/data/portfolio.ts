// ✏️ All site content lives here.
export const profile = {
  name: "Somasundaram C",
  role: "Python Full Stack Developer",
  tagline: "Python backends and React frontends, built to ship.",
  photo: "/profile.jpg",
  resume: "/SOMASUNDARAM C.pdf",
  about: [
    "I'm a Python full stack developer with 3+ years of experience building web apps with Django, FastAPI and React. I started with Django REST APIs and MySQL, and now work mostly on FastAPI backends with PostgreSQL and React/TypeScript frontends.",
    "I've worked on food delivery, e-commerce, learning management and travel platforms, including WhatsApp Cloud API messaging workflows. I focus on clean APIs, working authentication and role-based access, and apps that deploy cleanly with Docker and GitHub Actions.",
  ],
  stats: [{ label: "Years of experience", value: "3+" }, { label: "Projects below", value: "6" }],
  email: "somasundaram822@gmail.com",
  location: "Chennai, India",
  links: { github: "https://github.com/somasundaram0612", linkedin: "https://www.linkedin.com/in/soma-sundaram-376254203" },
};

export const orbit = [
  { label: "Python", color: "#facc15" }, { label: "FastAPI", color: "#10b981" },
  { label: "Django", color: "#22c55e" }, { label: "React", color: "#22d3ee" },
  { label: "TypeScript", color: "#3b82f6" }, { label: "PostgreSQL", color: "#a78bfa" },
  { label: "Docker", color: "#38bdf8" }, { label: "Tailwind", color: "#f472b6" },
];

export const skills = [
  { title: "Backend", color: "#10b981", items: ["Python", "FastAPI", "Django", "Django REST Framework"] },
  { title: "Frontend", color: "#22d3ee", items: ["React", "TypeScript/TSX", "Tailwind CSS", "JavaScript", "HTML5/CSS3", "Bootstrap"] },
  { title: "Databases", color: "#a78bfa", items: ["PostgreSQL", "MySQL", "SQLite", "Supabase", "Alembic"] },
  { title: "APIs & Security", color: "#f472b6", items: ["REST APIs", "JWT Auth", "Role-based access", "WhatsApp Cloud API"] },
  { title: "DevOps & Tools", color: "#f59e0b", items: ["Docker", "GitHub Actions", "Git/GitHub", "Agile"] },
];

export const experience = [
  { role: "Python Full Stack Developer", company: "IraStrive Technologies, Chennai", period: "Apr 2026 – Present", color: "#22d3ee",
    points: ["Build FastAPI backends with PostgreSQL and Alembic migrations.",
      "Develop React, TypeScript and Tailwind interfaces.",
      "Integrate WhatsApp Cloud API messaging workflows.",
      "Containerize apps with Docker and run CI/CD with GitHub Actions."] },
  { role: "Junior Python Developer → Full Stack Developer", company: "Inmakes Infotech, Kochi", period: "Oct 2023 – Mar 2026", color: "#a78bfa",
    points: ["Built Django and DRF applications and REST APIs for food delivery, LMS, agriculture and e-commerce projects.",
      "Worked across PostgreSQL, MySQL and SQLite using the Django ORM.",
      "Built React frontends and integrated email, SMS and maps/location services.",
      "Added authentication, role-based access, testing and bug fixes."] },
  { role: "Web Developer", company: "V4Inspire, Coimbatore", period: "Mar 2023 – Oct 2023", color: "#f472b6",
    points: ["Built and customized responsive web applications with HTML, CSS, JavaScript and Bootstrap.",
      "Managed site content through CMS dashboards and shipped rapid feature updates.",
      "Collaborated closely with cross-functional teams and the PHP backend team."] },
  { role: "Python/Django Developer", company: "Intellecto Global Services, Chennai", period: "Nov 2022 – Mar 2023", color: "#f59e0b",
    points: ["Built CRUD modules and REST APIs with Django models, views, URL routing and ORM.",
      "Tested APIs, debugged issues and supported existing backend code."] },
];

// Company projects: add github/live links only if the code is public and allowed to be shared.
export const projects = [
  { title: "IraConnect.ai", desc: "FastAPI and React/TSX platform with PostgreSQL migrations, Docker builds and CI/CD.",
    tags: ["FastAPI", "React", "PostgreSQL", "Docker"], color: "#22d3ee", image: "", github: "", live: "" },
  { title: "AshanaTravels", desc: "Travel platform with backend APIs, React UI and WhatsApp Cloud API messaging workflows.",
    tags: ["FastAPI", "React", "WhatsApp API"], color: "#f472b6", image: "", github: "", live: "" },
  { title: "SPARC", desc: "Frontend for an e-commerce and banking-style platform.",
    tags: ["React", "TypeScript", "Tailwind"], color: "#a78bfa", image: "", github: "", live: "" },
  { title: "Food Delivery App", desc: "Customers, vendors and delivery partners, with order tracking, delivery assignment and location services.",
    tags: ["Django", "MySQL", "REST"], color: "#f59e0b", image: "", github: "", live: "" },
  { title: "E-Commerce Web App", desc: "Authentication, product management, cart and order tracking.",
    tags: ["Django", "MySQL", "Bootstrap"], color: "#10b981", image: "", github: "", live: "" },
  { title: "Learning Management System", desc: "Course management, video lessons and assessments with a React frontend and DRF API.",
    tags: ["React", "Django", "MySQL"], color: "#38bdf8", image: "", github: "", live: "" },
];

export const education = [
  { degree: "B.E. Mechanical Engineering", school: "Karpagam Academy of Higher Education, Coimbatore", year: "2020" },
  { degree: "Diploma, Mechanical Engineering", school: "Sri Krishna Polytechnic College, Coimbatore", year: "2016" },
];

export const certifications = [
  { title: "Advanced Python with Django", issuer: "FITA Academy", date: "Oct 2022", link: "/certificates/fita-python-django.pdf" },
  { title: "Python MySQL", issuer: "Great Learning", date: "Nov 2025", link: "https://www.mygreatlearning.com/certificate/GGWMKHPK" },
  { title: "Python Fundamentals for Beginners", issuer: "Great Learning", date: "Nov 2025", link: "https://www.mygreatlearning.com/certificate/VRBEKTYF" },
];

export const sections = ["about", "skills", "experience", "projects", "contact"];
