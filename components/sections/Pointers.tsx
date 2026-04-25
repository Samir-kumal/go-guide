import { CodeBlock, Warning } from '@/components/ui'

export function Pointers() {
  return (
    <section>
      <h2 id="pointers" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        2. Pointers
      </h2>
      <p>Go uses pointers explicitly:</p>
      <CodeBlock>{`// Return a pointer AND an error
func getLogFile() (*os.File, error) {  // * means pointer return
    f, err := os.Open("logs.txt")
    if err != nil {
        return nil, err
    }
    return f, nil  // returns the pointer
}

// Using a pointer
func closeFile(f *os.File) {
    f.Close()
}`}</CodeBlock>

      <p><strong>JavaScript:</strong> No explicit pointers — all objects are passed by reference implicitly.</p>

      <Warning>
        <strong>Key Difference:</strong> In Go, you choose when to use pointers. In JavaScript, all objects are always references.
      </Warning>
      <hr className="border-none border-t border-[#ddd] my-10" />
    </section>
  )
}
