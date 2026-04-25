import { CodeBlock, Tip, ComparisonTable } from '@/components/ui'

export function IfInitialization() {
  return (
    <section>
      <h2 id="if-initialization" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        The if With Initialization Pattern
      </h2>
      <CodeBlock>{`if err := os.MkdirAll(logDir, 0755); err != nil {
    slog.Error("Failed to create log directory", "error", err)
    return nil
}`}</CodeBlock>

      <p>Special Go pattern: an if statement with two parts separated by a semicolon:</p>

      <ComparisonTable>
        <thead><tr><th>Part</th><th>What it does</th></tr></thead>
        <tbody>
          <tr><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">err := os.MkdirAll(...)</code></td><td>Initialization — runs the function, stores result in <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">err</code></td></tr>
          <tr><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">err != nil</code></td><td>Condition — checks if an error occurred</td></tr>
        </tbody>
      </ComparisonTable>

      <p><strong>Equivalent long form:</strong></p>
      <CodeBlock>{`err := os.MkdirAll(logDir, 0755)
if err != nil {
    slog.Error("Failed to create log directory", "error", err)
    return nil
}`}</CodeBlock>

      <p>The short form is preferred because <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">err</code> only exists inside the if block (limited scope).</p>

      <Tip>
        <strong>This pattern is everywhere in Go!</strong>
        <CodeBlock>{`// Opening a file
if f, err := os.Open("data.txt"); err != nil {
    log.Fatal(err)
}

// Parsing a number
if num, err := strconv.Atoi("123"); err != nil {
    log.Fatal(err)
}

// HTTP request
if resp, err := http.Get("https://example.com"); err != nil {
    log.Fatal(err)
}`}</CodeBlock>
      </Tip>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </section>
  )
}
