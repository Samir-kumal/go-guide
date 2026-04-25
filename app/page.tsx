import { QuickComparison } from '@/components/sections/QuickComparison'
import { CodeBreakdown } from '@/components/sections/CodeBreakdown'
import { EverySingleLineExplained } from '@/components/sections/EverySingleLineExplained'
import { SourceCodeRepresentation } from '@/components/sections/SourceCodeRepresentation'
import { FloatingPointLiterals, ImaginaryLiterals, RuneLiterals, StringLiterals, Constants, Variables, Types, BooleanTypes, NumericTypes, StringTypes, ArrayTypes } from '@/components/sections/GoLiteralsTypes'
import { GetLogFile } from '@/components/sections/GetLogFile'
import { GetLogFileDetailed } from '@/components/sections/GetLogFileDetailed'
import { IfInitialization } from '@/components/sections/IfInitialization'
import { WhyNoError } from '@/components/sections/WhyNoError'
import { Pointers } from '@/components/sections/Pointers'
import { ErrorHandling } from '@/components/sections/ErrorHandling'
import { Defer } from '@/components/sections/Defer'
import { Structs } from '@/components/sections/Structs'
import { Interfaces } from '@/components/sections/Interfaces'
import { ConcurrencyDemo } from '@/components/sections/ConcurrencyDemo'
import { SqlBasics } from '@/components/sections/SqlBasics'
import { Sqlc } from '@/components/sections/Sqlc'
import { Transactions } from '@/components/sections/Transactions'
import { LearningPath } from '@/components/sections/LearningPath'
import { Resources } from '@/components/sections/Resources'
import { EnvironmentValidation } from '@/components/sections/EnvironmentValidation'
import { HttpHandlerParams } from '@/components/sections/HttpHandlerParams'
import { MajorConcepts } from '@/components/sections/MajorConcepts'

export default function HomePage() {
  return (
    <>
      <h1 className="text-[#1a73e8] border-b-4 border-[#1a73e8] pb-2.5 text-3xl font-bold">
        Go Code Explained for JavaScript Developers
      </h1>
      <p className="italic">
        A comprehensive guide to understanding Go web server code, comparing Go concepts to JavaScript equivalents.
      </p>
      <blockquote className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-5">
        <strong>🎯 Interactive Learning</strong>: Visit{' '}
        <a href="https://go.dev/play" target="_blank" className="text-[#1a73e8]">
          Go Playground
        </a>{' '}
        to try code snippets live!
      </blockquote>
      <hr className="border-none border-t border-[#ddd] my-10" />
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
      <p className="text-center text-[#666] mt-10">
        <em>Document created for learning purposes. Happy coding!</em>
      </p>
    </>
  )
}
