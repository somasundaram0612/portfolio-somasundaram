import { profile } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-void/80 py-10 text-sm text-slate-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-mono text-xs font-semibold text-slate-300">
            <span className="text-amber-400">S</span>omasundaram C
          </span>
          <span className="hidden sm:inline text-slate-700">|</span>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} All rights reserved. Built with React & FastAPI.
          </p>
        </div>

        {/* Social / Contact Links */}
        <div className="flex items-center gap-3">
          {/* GitHub Profile */}
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-400/50 flex items-center justify-center text-slate-400 hover:text-violet-300 transition-all shadow-sm"
            title="Open GitHub Profile"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>

          {/* LinkedIn Profile */}
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/50 flex items-center justify-center text-slate-400 hover:text-blue-300 transition-all shadow-sm"
            title="Open LinkedIn Profile"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v7.6H9.2v-7.6H6.46M7.83 6.25c-.89 0-1.61.72-1.61 1.61a1.61 1.61 0 0 0 1.61 1.61c.89 0 1.61-.72 1.61-1.61 0-.89-.72-1.61-1.61-1.61z" />
            </svg>
          </a>

          {/* Direct Email */}
          <a
            href={`mailto:${profile.email}?subject=Message%20for%20Somasundaram%20C`}
            aria-label="Direct Email"
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 flex items-center justify-center text-slate-400 hover:text-cyan-300 transition-all shadow-sm"
            title="Send Email to Somasundaram"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>

          {/* Location Map */}
          <a
            href="https://www.google.com/maps/place/Chennai,+Tamil+Nadu,+India/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Location Map"
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/50 flex items-center justify-center text-slate-400 hover:text-emerald-300 transition-all shadow-sm"
            title="View Chennai on Google Maps"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
