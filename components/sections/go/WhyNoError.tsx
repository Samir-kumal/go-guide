import { CodeBlock, ComparisonTable } from '@/components/ui'

export function WhyNoError() {
  return (
    <section>
      <h2 id="why-no-error" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        Why filepath.Join Has No Error
      </h2>
      <CodeBlock>{`logFile := filepath.Join(logDir, time.Now().Format("2006-01-02")+".log")
// No error variable! Why?`}</CodeBlock>

      <p><strong>The answer:</strong> <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">filepath.Join</code> just manipulates strings — nothing can fail!</p>

      <CodeBlock>{`func Join(elem ...string) string    // returns ONLY a string, no error`}</CodeBlock>
      <CodeBlock>{`func OpenFile(name string, flag int, perm FileMode) (*os.File, error)  // returns file AND error`}</CodeBlock>

      <p>It doesn&apos;t touch the filesystem, check if the file exists, create anything, or open anything. Pure string operation = nothing to fail.</p>

      <ComparisonTable>
        <thead>
          <tr>
            <th>Does the function interact with the outside world?</th>
            <th>Example</th>
            <th>Returns Error?</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>YES (filesystem, network, database)</td><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">os.MkdirAll</code>, <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">os.OpenFile</code></td><td>Yes → handle it</td></tr>
          <tr><td>NO (just math, strings, formatting)</td><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">filepath.Join</code>, <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">fmt.Sprintf</code></td><td>No → just use value</td></tr>
        </tbody>
      </ComparisonTable>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </section>
  )
}
