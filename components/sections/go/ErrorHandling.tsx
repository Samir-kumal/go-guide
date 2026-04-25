import { CodeBlock, Note } from '@/components/ui'

export function ErrorHandling() {
  return (
    <section>
      <h2 id="error-handling" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        3. Error Handling
      </h2>
      <p>Go doesn&apos;t have try/catch. Instead, functions return errors:</p>
      <CodeBlock>{`// This function returns (string, error)
func doSomething() (string, error) {
    if failed {
        return "", fmt.Errorf("something failed")
    }
    return "success", nil
}

// Caller must check error
result, err := doSomething()
if err != nil {
    // handle error
}`}</CodeBlock>

      <p><strong>JavaScript equivalent:</strong></p>
      <CodeBlock>{`async function doSomething() {
    if (failed) {
        throw new Error("something failed");
    }
    return "success";
}

try {
    const result = await doSomething();
} catch (err) {
    // handle error
}`}</CodeBlock>

      <Note>
        <strong>Key Insight:</strong> Go&apos;s approach forces you to handle errors at every call, reducing unhandled errors. More verbose but more explicit.
      </Note>
      <hr className="border-none border-t border-[#ddd] my-10" />
    </section>
  )
}
