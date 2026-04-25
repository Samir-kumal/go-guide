import { CodeBlock } from '@/components/ui'

export function Structs() {
  return (
    <section>
      <h2 id="structs" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        5. Structs
      </h2>
      <p>Go&apos;s way of defining data structures:</p>
      <CodeBlock>{`type Config struct {
    MaxConns int    // Field name = MaxConns, Type = int
    MinConns int
    Host     string
}

// Creating instance
config := Config{
    MaxConns: 10,
    MinConns: 2,
    Host: "localhost",
}`}</CodeBlock>

      <p><strong>JavaScript equivalent:</strong></p>
      <CodeBlock>{`const config = {
    maxConns: 10,
    minConns: 2,
    host: "localhost"
};`}</CodeBlock>
      <hr className="border-none border-t border-[#ddd] my-10" />
    </section>
  )
}
