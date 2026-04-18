import { CodeBlock, Tip, ComparisonTable } from '@/components/ui'

export function HttpHandlerParams() {
  return (
    <section>
      <h2 id="deep-dive-http-handler-parameters" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        Deep Dive: HTTP Handler Parameters
      </h2>
      <p>Two standard parameters every HTTP handler receives:</p>

      <h3 className="text-[#5f6368]">w http.ResponseWriter (Interface)</h3>
      <p><strong>Purpose:</strong> Send response back to the client</p>
      <CodeBlock>{`w.WriteHeader(http.StatusOK)
w.Header().Set("Content-Type", "application/json")
w.Write([]byte("hello"))`}</CodeBlock>

      <h3 className="text-[#5f6368]">r *http.Request (Pointer)</h3>
      <p><strong>Purpose:</strong> Read incoming request</p>
      <CodeBlock>{`method := r.Method
path := r.URL.Path
query := r.URL.Query()`}</CodeBlock>

      <h3 className="text-[#5f6368]">Why Pointer for Request, Interface for Response?</h3>
      <ComparisonTable>
        <thead><tr><th>Parameter</th><th>Type</th><th>Reason</th></tr></thead>
        <tbody>
          <tr><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">*http.Request</code></td><td>Pointer</td><td>Large struct — copying is expensive. Shared across middleware.</td></tr>
          <tr><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">http.ResponseWriter</code></td><td>Interface</td><td>Allows different implementations. Easy to mock for testing.</td></tr>
        </tbody>
      </ComparisonTable>

      <Tip>
        <strong>In short:</strong> Pointers for data you own, interfaces for behavior you need.
      </Tip>
      <hr className="border-none border-t border-[#ddd] my-10" />
    </section>
  )
}
