import { QuickComparison } from '@/components/sections/go/QuickComparison'
import { CodeBreakdown } from '@/components/sections/go/CodeBreakdown'
import { EverySingleLineExplained } from '@/components/sections/go/EverySingleLineExplained'
import { SourceCodeRepresentation } from '@/components/sections/go/SourceCodeRepresentation'
import { FloatingPointLiterals, ImaginaryLiterals, RuneLiterals, StringLiterals, Constants, Variables, Types, BooleanTypes, NumericTypes, StringTypes, ArrayTypes } from '@/components/sections/go/GoLiteralsTypes'
import { GetLogFile } from '@/components/sections/go/GetLogFile'
import { GetLogFileDetailed } from '@/components/sections/go/GetLogFileDetailed'
import { IfInitialization } from '@/components/sections/go/IfInitialization'
import { WhyNoError } from '@/components/sections/go/WhyNoError'
import { Pointers } from '@/components/sections/go/Pointers'
import { ErrorHandling } from '@/components/sections/go/ErrorHandling'
import { Defer } from '@/components/sections/go/Defer'
import { Structs } from '@/components/sections/go/Structs'
import { Interfaces } from '@/components/sections/go/Interfaces'
import { ConcurrencyDemo } from '@/components/sections/go/ConcurrencyDemo'
import { SqlBasics } from '@/components/sections/go/SqlBasics'
import { Sqlc } from '@/components/sections/go/Sqlc'
import { Transactions } from '@/components/sections/go/Transactions'
import { LearningPath } from '@/components/sections/go/LearningPath'
import { Resources } from '@/components/sections/go/Resources'
import { EnvironmentValidation } from '@/components/sections/go/EnvironmentValidation'
import { HttpHandlerParams } from '@/components/sections/go/HttpHandlerParams'
import { MajorConcepts } from '@/components/sections/go/MajorConcepts'
import Link from 'next/link'

export default function GoGuidePage() {
  return (
    <div className="space-y-12 transition-colors duration-300">
      {/* Hero Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Link href="#quick-comparison" className="bg-[var(--bg-sidebar)] dark:bg-[#1e293b] p-6 rounded-2xl border-l-4 border-[var(--accent-cyan)] dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-indigo-500/10 transition-all no-underline group">
          <div className="w-12 h-12 bg-cyan-50 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="text-2xl">📊</span>
          </div>
          <h3 className="text-[var(--text-primary)] dark:text-white font-bold mb-1">Quick Comparison</h3>
          <p className="text-[var(--text-secondary)] dark:text-slate-400 text-xs font-medium">Essential Go vs JS</p>
        </Link>
        <Link href="#code-breakdown" className="bg-[var(--bg-sidebar)] dark:bg-[#1e293b] p-6 rounded-2xl border-l-4 border-[var(--secondary)] dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-indigo-500/10 transition-all no-underline group">
          <div className="w-12 h-12 bg-emerald-50 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="text-2xl">🔍</span>
          </div>
          <h3 className="text-[var(--text-primary)] dark:text-white font-bold mb-1">Code Breakdown</h3>
          <p className="text-[var(--text-secondary)] dark:text-slate-400 text-xs font-medium">Step-by-step analysis</p>
        </Link>
        <Link href="#every-single-line-explained" className="bg-[var(--bg-sidebar)] dark:bg-[#1e293b] p-6 rounded-2xl border-l-4 border-[var(--primary)] dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-indigo-500/10 transition-all no-underline group">
          <div className="w-12 h-12 bg-indigo-50 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="text-2xl">🌊</span>
          </div>
          <h3 className="text-[var(--text-primary)] dark:text-white font-bold mb-1">Deep Dive</h3>
          <p className="text-[var(--text-secondary)] dark:text-slate-400 text-xs font-medium">In-depth exploration</p>
        </Link>
        <Link href="#literals-types" className="bg-[var(--bg-sidebar)] dark:bg-[#1e293b] p-6 rounded-2xl border-l-4 border-[var(--accent-orange)] dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-indigo-500/10 transition-all no-underline group">
          <div className="w-12 h-12 bg-amber-50 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="text-2xl">📝</span>
          </div>
          <h3 className="text-[var(--text-primary)] dark:text-white font-bold mb-1">Types & Literals</h3>
          <p className="text-[var(--text-secondary)] dark:text-slate-400 text-xs font-medium">Mastering data types</p>
        </Link>
      </section>

      {/* Interactive Learning Banner */}
      <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent-cyan)] rounded-3xl p-8 flex items-center gap-6 shadow-2xl shadow-indigo-500/20 dark:shadow-none transition-all">
        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/30 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-white text-xl font-black mb-1 tracking-tight">Interactive Learning</h3>
          <p className="text-white/80 dark:text-slate-200 text-sm mb-5 max-w-lg font-medium">
            Master Go faster by running examples directly in your browser. 
            Test your knowledge with live code snippets.
          </p>
          <a href="https://go.dev/play" target="_blank" className="inline-flex items-center gap-2 px-7 py-3 bg-white text-[var(--primary)] rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all no-underline hover:scale-105 active:scale-95">
            Launch Playground
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </a>
        </div>
      </section>

      <div className="space-y-24 pb-20">
        <QuickComparison />
        <CodeBreakdown />
        <EverySingleLineExplained />
        <SourceCodeRepresentation />
        <FloatingPointLiterals />
        <ImaginaryLiterals />
        <RuneLiterals />
        <StringLiterals />
        <Constants />
        <Variables />
        <Types />
        <BooleanTypes />
        <NumericTypes />
        <StringTypes />
        <ArrayTypes />
        <GetLogFile />
        <GetLogFileDetailed />
        <IfInitialization />
        <WhyNoError />
        <Pointers />
        <ErrorHandling />
        <Defer />
        <Structs />
        <Interfaces />
        <ConcurrencyDemo />
        <SqlBasics />
        <Sqlc />
        <Transactions />
        <LearningPath />
        <Resources />
        <EnvironmentValidation />
        <HttpHandlerParams />
        <MajorConcepts />
      </div>

      <p className="text-center text-[var(--text-muted)] mt-20 pb-10">
        <em>Happy coding! All examples verified with Go 1.22+.</em>
      </p>
    </div>
  )
}
