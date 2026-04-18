import { CodeBlock, Tip } from '@/components/ui'

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
    </div>
  )
}
