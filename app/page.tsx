import Link from 'next/link'
import { languages } from '@/lib/languages'

export default function HomePage() {
  const langEntries = Object.entries(languages)
  
  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Responsive container: tighter padding on mobile */}
      <div className="max-w-6xl mx-auto py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 relative">
        {/* Background Decorations — kept as decorative only */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none dark:hidden"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none dark:hidden"></div>

        <header className="mb-12 sm:mb-16 lg:mb-20 text-center relative">
          {/* Logo icon: smaller on phones */}
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-[var(--primary)] rounded-[1.5rem] mb-6 sm:mb-8 shadow-2xl shadow-indigo-500/40 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
            <span className="text-3xl sm:text-4xl font-black text-white">G</span>
          </div>
          {/* Fluid heading: 3xl → 5xl → 6xl */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--accent-cyan)] dark:from-white dark:to-white">
            GoCode
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-[var(--text-secondary)] dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium px-2">
            Step-by-step interactive documentation for modern developers.
            Built for clarity, speed, and high-performance learning.
          </p>
        </header>

        <section className="relative">
          {/* Tracks header: stack label below title on very small screens */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8 sm:mb-12 border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">Learning Tracks</h2>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--primary)] bg-[var(--primary-light)] px-4 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-500/20">
              New Content Available
            </div>
          </div>

          {/* Card grid already responsive: 1 col → 2 col → 3 col */}
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {langEntries.map(([id, lang], index) => {
              const accentGradients = [
                'from-indigo-500 to-blue-600',
                'from-emerald-500 to-teal-600',
                'from-pink-500 to-rose-600',
              ]
              const bgColors = [
                'bg-white dark:bg-slate-800/50',
                'bg-white dark:bg-slate-800/50',
                'bg-white dark:bg-slate-800/50',
              ]
              
              return (
                // Card: tighter padding on mobile (p-5 → p-8 at sm)
                <Link
                  key={id}
                  href={`/${id}`}
                  className={`group relative block p-5 sm:p-8 rounded-[2rem] ${bgColors[index % bgColors.length]} border border-slate-200/60 dark:border-slate-800 hover:border-[var(--primary)] transition-all duration-300 shadow-xl shadow-slate-200/40 dark:shadow-none no-underline`}
                >
                  <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform border border-slate-50 dark:border-slate-700">
                    <span className="text-2xl sm:text-4xl">{lang.icon}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4 text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                    {lang.name}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6 sm:mb-8 pr-4">
                    {lang.description}
                  </p>

                  <div className="flex items-center gap-3">
                    <div className={`h-11 px-6 sm:px-8 rounded-full bg-gradient-to-r ${accentGradients[index % accentGradients.length]} text-white flex items-center justify-center font-bold text-xs uppercase tracking-widest shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all`}>
                      Explore
                    </div>
                    <div className="w-11 h-11 rounded-full border border-slate-100 dark:border-slate-700 flex items-center justify-center group-hover:bg-[var(--bg-page)] dark:group-hover:bg-slate-700 transition-colors">
                      <svg className="w-4 h-4 text-[var(--text-muted)] transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        <footer className="mt-16 sm:mt-24 lg:mt-32 pt-8 sm:pt-12 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-[var(--text-muted)] text-sm font-medium">
            &copy; {new Date().getFullYear()} GoCode Interactive Learning. Build with Next.js & Tailwind.
          </p>
        </footer>
      </div>
    </div>
  )
}
