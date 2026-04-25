'use client'

import { CodeBlock, Note, DeepDive } from '@/components/ui'

export function InterfacesTutorial() {
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

      <h4 className="font-semibold mt-4">The "any" Type (Empty Interface)</h4>
      <p>Since Go 1.18, <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">any</code> is an alias for the empty interface <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">interface{}</code>.</p>
      <CodeBlock>{`var anything any
anything = 42
anything = "hello"
anything = []int{1, 2, 3}`}</CodeBlock>

      <Note>
        <strong>Key:</strong> No &quot;implements&quot; keyword! If your type has the right methods, it implements the interface.
      </Note>

      <DeepDive title="Memory Layout & Postel's Law">
        <h4 className="font-bold mb-2">Internal Structure: eface vs iface</h4>
        <p>Under the hood, Go has two types of interfaces:</p>
        <ul className="list-disc pl-5 my-2">
          <li><strong>eface (any):</strong> Represented internally as <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">any</code>. It stores a pointer to the type information and a pointer to the data.</li>
          <li><strong>iface (Interface with Methods):</strong> Stores an <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">itab</code> (interface table) which maps the interface methods to the concrete type&apos;s implementations.</li>
        </ul>

        <h4 className="font-bold mt-4 mb-2">"Accept Interfaces, Return Structs"</h4>
        <p>
          This is Go&apos;s version of <strong>Postel&apos;s Law</strong> (be conservative in what you send, liberal in what you accept). 
          By accepting an interface, your function is decoupled from the concrete implementation. 
          By returning a struct, you provide the caller with maximum information and flexibility without forcing them into a specific contract too early.
        </p>

        <h4 className="font-bold mt-4 mb-2">The Cost of Boxing</h4>
        <p>
          Converting a concrete type to an interface causes <strong>boxing</strong>, which usually leads to a heap allocation. 
          In high-performance hot paths, "Interface Pollution" (using interfaces where a simple struct would suffice) can be a significant source of GC pressure.
        </p>
      </DeepDive>
    </div>
  )
}