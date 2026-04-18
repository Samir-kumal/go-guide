import { CodeBlock } from '@/components/ui'

export function StructsAndTags() {
  return (
    <div>
      <h3 id="structs-and-tags" className="text-[#5f6368] text-xl font-semibold mt-6">
        8. Structs and Tags
      </h3>

      <CodeBlock>{`type Person struct {
    Name  string \`json:"name"\`
    Age   int    \`json:"age,omitempty"\`
    Email string \`json:"email,omitempty"\`
}`}</CodeBlock>

      <h4 className="font-semibold mt-4">Methods on Structs</h4>
      <CodeBlock>{`func (p Person) Greet() string {
    return "Hello, " + p.Name + "!"
}

fmt.Println(p.Greet())  // "Hello, John!"`}</CodeBlock>

      <h4 className="font-semibold mt-4">Pointer Receiver</h4>
      <CodeBlock>{`func (p *Person) SetName(name string) {
    p.Name = name  // Modifies the original
}

p.SetName("Jane")`}</CodeBlock>
    </div>
  )
}
