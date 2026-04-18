import { CodeBlock, Note } from '@/components/ui'

export function InterfacesConcept() {
  return (
    <div>
      <h3 id="interfaces-defining-behavior" className="text-[#5f6368] text-xl font-semibold mt-6">
        3. Interfaces - Defining Behavior
      </h3>

      <CodeBlock>{`type Reader interface {
    Read(p []byte) (n int, err error)
}

type ReaderWriter interface {
    Read(p []byte) (n int, err error)
    Write(p []byte) (n int, err error)
}`}</CodeBlock>

      <h4 className="font-semibold mt-4">Implementing an Interface</h4>
      <p>In Go, you DON&apos;T explicitly declare &quot;I implement this interface&quot;. You just implement the methods!</p>
      <CodeBlock>{`type File struct { name string }

// Implement Read method — now File implements Reader!
func (f File) Read(p []byte) (n int, err error) {
    return len(p), nil
}`}</CodeBlock>

      <h4 className="font-semibold mt-4">Empty Interface</h4>
      <CodeBlock>{`var anything interface{}
anything = 42
anything = "hello"
anything = []int{1, 2, 3}`}</CodeBlock>

      <Note>
        <strong>Key:</strong> No &quot;implements&quot; keyword! If your type has the right methods, it implements the interface.
      </Note>
    </div>
  )
}
