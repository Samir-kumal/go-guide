import { CodeBlock, Tip } from '@/components/ui'

export function Interfaces() {
  return (
    <section>
      <h2 id="interfaces" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        6. Interfaces
      </h2>
      <CodeBlock>{`// Define interface
type Handler interface {
    ServeHTTP(http.ResponseWriter, *http.Request)
}

// Implement implicitly
type MyHandler struct{}

func (h *MyHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    // implementation
}`}</CodeBlock>

      <p><strong>JavaScript equivalent:</strong></p>
      <CodeBlock>{`class MyHandler {
    serveHTTP(w, r) {
        // implementation
    }
}`}</CodeBlock>

      <Tip>
        <strong>Tip:</strong> Go interfaces are satisfied implicitly. If your type has the right methods, it satisfies the interface — no explicit declaration needed.
      </Tip>
      <hr className="border-none border-t border-[#ddd] my-10" />
    </section>
  )
}
