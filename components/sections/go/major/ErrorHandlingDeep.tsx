import { CodeBlock, Tip, DeepDive } from '@/components/ui'

export function ErrorHandlingDeep() {
  return (
    <div>
      <h3 id="error-handling-1" className="text-[#5f6368] text-xl font-semibold mt-6">
        4. Error Handling
      </h3>

      <CodeBlock>{`result, err := doSomething()
if err != nil {
    fmt.Println("Error:", err)
    return err
}`}</CodeBlock>

      <h4 className="font-semibold mt-4">Wrapping Errors with Context</h4>
      <CodeBlock>{`err = fmt.Errorf("failed to load %s: %w", filename, originalError)
// Output: "failed to load config.json: original error"`}</CodeBlock>

      <h4 className="font-semibold mt-4">Checking Error Types</h4>
      <CodeBlock>{`// errors.Is - check specific error
if errors.Is(err, os.ErrNotExist) {
    // File doesn't exist
}

// errors.As - check error type
var pathErr *os.PathError
if errors.As(err, &pathErr) {
    fmt.Println("Failed at:", pathErr.Path)
}`}</CodeBlock>

      <Tip>
        <strong>In short:</strong> Errors are just values. You can create, wrap, and check them like any other value.
      </Tip>

      <DeepDive title="Error Strategies & Robustness">
        <h4 className="font-bold mb-2">Error Classification</h4>
        <p>At the Staff level, you must choose the right error strategy for the API boundary:</p>
        <ul className="list-disc pl-5 my-2">
          <li><strong>Sentinel Errors:</strong> Pre-defined values like <code className="bg-[#f5f5f5] px-1 px-0.5 rounded font-mono text-sm">sql.ErrNoRows</code>. Best for simple checks but inflexible for adding state.</li>
          <li><strong>Error Types:</strong> Custom structs that implement the <code className="bg-[#f5f5f5] px-1 px-0.5 rounded font-mono text-sm">Error()</code> interface. Perfect for carrying metadata (e.g., HTTP status codes, retry-after headers).</li>
          <li><strong>Opaque Errors:</strong> Only asserting that an error occurred, or checking behavior via interfaces (e.g., <code className="bg-[#f5f5f5] px-1 px-0.5 rounded font-mono text-sm">IsTemporary() bool</code>). This is the highest level of decoupling.</li>
        </ul>

        <h4 className="font-bold mt-4 mb-2">The Panic/Recover Fallacy</h4>
        <p>
          Coming from Java/Python, you might be tempted to use <code className="bg-[#f5f5f5] px-1 px-0.5 rounded font-mono text-sm">panic</code> as a replacement for exceptions. 
          <strong>Don&apos;t.</strong> In Go, <code className="bg-[#f5f5f5] px-1 px-0.5 rounded font-mono text-sm">panic</code> is for unrecoverable state (e.g., out of bounds, nil pointer) or "must-succeed" initialization. 
          Staff-level engineers treat <code className="bg-[#f5f5f5] px-1 px-0.5 rounded font-mono text-sm">panic</code> as a signal of a bug, not a control flow mechanism.
        </p>

        <h4 className="font-bold mt-4 mb-2">Designing with API Errors</h4>
        <CodeBlock>{`type APIError struct {
    Code    int
    Message string
    Detail  string
}

func (e *APIError) Error() string {
    return fmt.Sprintf("[%d] %s: %s", e.Code, e.Message, e.Detail)
}`}</CodeBlock>
      </DeepDive>
    </div>
  )
}
