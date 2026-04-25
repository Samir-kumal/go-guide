import { ComparisonTable } from '@/components/ui'

export function QuickComparison() {
  return (
    <section>
      <div className="mb-6">
        <h2 id="quick-comparison" className="text-slate-900 dark:text-white text-3xl font-bold mb-2">
          Quick Comparison Table
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Essential Go concepts and their JavaScript equivalents
        </p>
      </div>
      
      <ComparisonTable>
        <thead>
          <tr>
            <th>Go Concept</th>
            <th>JavaScript Equivalent</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="font-mono text-blue-600 dark:text-blue-400">package main</td>
            <td className="text-amber-600 dark:text-yellow-500">Entry point</td>
            <td className="text-slate-500 dark:text-slate-400">Every executable starts here</td>
          </tr>
          <tr>
            <td className="font-mono text-blue-600 dark:text-blue-400">func name() returnType</td>
            <td className="text-amber-600 dark:text-yellow-500">function name() {"{}"}</td>
            <td className="text-slate-500 dark:text-slate-400">Explicit return types</td>
          </tr>
          <tr>
            <td className="font-mono text-blue-600 dark:text-blue-400">:=</td>
            <td className="text-amber-600 dark:text-yellow-500">const / let</td>
            <td className="text-slate-500 dark:text-slate-400">Short variable declaration</td>
          </tr>
          <tr>
            <td className="font-mono text-blue-600 dark:text-blue-400">*Type</td>
            <td className="text-amber-600 dark:text-yellow-500">Reference</td>
            <td className="text-slate-500 dark:text-slate-400">Go uses explicit pointers</td>
          </tr>
          <tr>
            <td className="font-mono text-blue-600 dark:text-blue-400">error</td>
            <td className="text-amber-600 dark:text-yellow-500">try/catch</td>
            <td className="text-slate-500 dark:text-slate-400">Go returns errors as values</td>
          </tr>
          <tr>
            <td className="font-mono text-blue-600 dark:text-blue-400">defer</td>
            <td className="text-amber-600 dark:text-yellow-500">finally</td>
            <td className="text-slate-500 dark:text-slate-400">Runs cleanup on scope exit</td>
          </tr>
          <tr>
            <td className="font-mono text-blue-600 dark:text-blue-400">chan</td>
            <td className="text-amber-600 dark:text-yellow-500">Async/await</td>
            <td className="text-slate-500 dark:text-slate-400">Concurrency primitive</td>
          </tr>
          <tr>
            <td className="font-mono text-blue-600 dark:text-blue-400">struct</td>
            <td className="text-amber-600 dark:text-yellow-500">Object / Class</td>
            <td className="text-slate-500 dark:text-slate-400">Data structure</td>
          </tr>
          <tr>
            <td className="font-mono text-blue-600 dark:text-blue-400">interface</td>
            <td className="text-amber-600 dark:text-yellow-500">Protocol / Duck typing</td>
            <td className="text-slate-500 dark:text-slate-400">Defines contracts</td>
          </tr>
        </tbody>
      </ComparisonTable>
    </section>
  )
}
