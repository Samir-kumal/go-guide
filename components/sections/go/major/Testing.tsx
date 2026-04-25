import { CodeBlock, Note, ComparisonTable } from '@/components/ui'

export function Testing() {
  return (
    <div>
      <h3 id="testing-in-go" className="text-[#5f6368] text-xl font-semibold mt-6">
        10. Testing - Built-in Rigor
      </h3>
      <p>
        In JavaScript, testing usually requires a library like Jest or Vitest. In Go, testing is built into the standard library via the <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">testing</code> package.
      </p>

      <h4 className="font-bold mt-6 mb-2">Philosophy: Logic vs. DSL</h4>
      <p>
        Go avoids the "domain-specific language" (DSL) approach of <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">expect(a).toBe(b)</code>. Instead, you write standard Go code to check values.
      </p>

      <ComparisonTable>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Go (standard library)</th>
            <th>Jest / Vitest</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Assertions</strong></td>
            <td>Manual <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">if</code> checks</td>
            <td>Rich <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">expect()</code> library</td>
          </tr>
          <tr>
            <td><strong>Mocks</strong></td>
            <td>Interface-based (manual)</td>
            <td>Built-in <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">vi.fn()</code> / <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">jest.mock()</code></td>
          </tr>
          <tr>
            <td><strong>Benchmarking</strong></td>
            <td>Built-in (<code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">testing.B</code>)</td>
            <td>Requires external tools</td>
          </tr>
          <tr>
            <td><strong>Fuzzing</strong></td>
            <td>Built-in (<code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">testing.F</code>)</td>
            <td>Requires external tools</td>
          </tr>
        </tbody>
      </ComparisonTable>

      <h4 className="font-semibold mt-6">Table-Driven Tests</h4>
      <p>
        Go idiomatic style favors "table-driven tests," where you define a slice of anonymous structs as test cases and loop over them.
      </p>

      <CodeBlock>{`// Go: Table-driven test
func TestAdd(t *testing.T) {
    tests := []struct {
        name     string
        a, b, want int
    }{
        {"positive", 1, 2, 3},
        {"negative", -1, -2, -3},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            if got := Add(tt.a, tt.b); got != tt.want {
                t.Errorf("Add() = %v, want %v", got, tt.want)
            }
        })
    }
}

// JS: Similar approach with test.each
test.each([
  [1, 2, 3],
  [-1, -2, -3],
])('Add(%i, %i) should be %i', (a, b, expected) => {
  expect(Add(a, b)).toBe(expected);
});`}</CodeBlock>

      <Note>
        <strong>Subtests:</strong> The <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">t.Run</code> call creates subtests, which allow you to run specific cases from the command line using <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">go test -run TestAdd/positive</code>.
      </Note>

      <h4 className="font-bold mt-8 mb-2">Benchmarking & Fuzzing</h4>
      <p>
        Go includes high-performance tools that are often separate in other ecosystems.
      </p>
      <ul className="list-disc pl-5 my-2">
        <li><strong>Benchmarks:</strong> Functions starting with <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Benchmark</code> measure performance and allocations.</li>
        <li><strong>Fuzzing:</strong> Since Go 1.18, you can provide a "seed" and let Go generate random inputs to find edge-case crashes.</li>
      </ul>

      <CodeBlock>{`// Benchmarking example
func BenchmarkAdd(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Add(1, 2)
    }
}`}</CodeBlock>
    </div>
  )
}
