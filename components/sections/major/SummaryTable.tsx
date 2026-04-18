import { ComparisonTable, Tip } from '@/components/ui'

export function SummaryTable() {
  return (
    <div>
      <h3 id="summary-table" className="text-[#5f6368] text-xl font-semibold mt-6">
        Summary Table
      </h3>
      <ComparisonTable>
        <thead>
          <tr><th>Concept</th><th>JS Equivalent</th><th>Key Point</th></tr>
        </thead>
        <tbody>
          {[
            ['goroutine', 'async function', 'go f() - starts immediately'],
            ['channel', 'MessageChannel', 'Communicate via channels'],
            ['interface', 'TypeScript interface', 'Implicit implementation'],
            ['error', 'Error class', 'Return errors as values'],
            ['defer', 'finally', 'Runs on exit'],
            ['panic', 'throw', 'Stops program'],
            ['recover', 'catch', 'Handle panic in defer'],
            ['WaitGroup', 'Promise.all', 'Wait for multiple tasks'],
            ['Mutex', 'lock', 'Protect shared data'],
            ['context', 'AbortController', 'Cancellation and timeouts'],
          ].map(([concept, js, key]) => (
            <tr key={concept}>
              <td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">{concept}</code></td>
              <td>{js}</td>
              <td>{key}</td>
            </tr>
          ))}
        </tbody>
      </ComparisonTable>

      <Tip>
        <strong>Final Tip:</strong> Go is about simplicity — clear syntax, explicit error handling, and built-in concurrency.
      </Tip>
    </div>
  )
}
