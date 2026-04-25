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

export default function GoGuidePage() {
  return (
    <>
      <h1 className="text-[#00ADD8] border-b-4 border-[#00ADD8] pb-2.5 text-3xl font-bold">
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
