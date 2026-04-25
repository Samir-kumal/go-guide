import { ComparisonTable } from '@/components/ui'

export function QuickComparison() {
  return (
    <section>
      <h2 id="quick-comparison" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        Quick Comparison Table
      </h2>
      <ComparisonTable>
        <thead>
          <tr>
            <th>Go Concept</th>
            <th>JavaScript Equivalent</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">package main</code></td><td>Entry point</td><td>Every executable starts here</td></tr>
          <tr><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">func name() returnType</code></td><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">{'function name() {}'}</code></td><td>Explicit return types</td></tr>
          <tr><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">:=</code></td><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">const</code> / <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">let</code></td><td>Short variable declaration</td></tr>
          <tr><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">*Type</code></td><td>Reference</td><td>Go uses explicit pointers</td></tr>
          <tr><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">error</code></td><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">try/catch</code></td><td>Go returns errors as values</td></tr>
          <tr><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">defer</code></td><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">finally</code></td><td>Runs cleanup on scope exit</td></tr>
          <tr><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">chan</code></td><td>Async/await</td><td>Concurrency primitive</td></tr>
          <tr><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">struct</code></td><td>Object / Class</td><td>Data structure</td></tr>
          <tr><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">interface</code></td><td>Protocol / Duck typing</td><td>Defines contracts</td></tr>
        </tbody>
      </ComparisonTable>
      <hr className="border-none border-t border-[#ddd] my-10" />
    </section>
  )
}
