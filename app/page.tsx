import { QuickComparison } from '@/components/sections/QuickComparison'
import { CodeBreakdown } from '@/components/sections/CodeBreakdown'
import { GetLogFile } from '@/components/sections/GetLogFile'
import { GetLogFileDetailed } from '@/components/sections/GetLogFileDetailed'
import { IfInitialization } from '@/components/sections/IfInitialization'
import { WhyNoError } from '@/components/sections/WhyNoError'

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
      <GetLogFile />
      <GetLogFileDetailed />
      <IfInitialization />
      <WhyNoError />
    </>
  )
}
