import { CodeBlock, Note, ComparisonTable } from '@/components/ui'

export function Generics() {
  return (
    <div>
      <h3 id="generics-type-parameters" className="text-[#5f6368] text-xl font-semibold mt-6">
        12. Generics - Reusable Type Logic
      </h3>
      <p>
        If you have used TypeScript, you are familiar with generics (e.g., <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Array&lt;T&gt;</code>). Go introduced generics in version 1.18, focusing on <strong>type parameters</strong>.
      </p>

      <h4 className="font-bold mt-6 mb-2">Go Generics vs. TypeScript</h4>
      <p>
        Go generics are compiled to efficient machine code (monomorphization), whereas TypeScript generics are "erased" during compilation and don&apos;t exist in the resulting JavaScript.
      </p>

      <ComparisonTable>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Go Generics</th>
            <th>TypeScript Generics</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Constraints</strong></td>
            <td>Interfaces (Type Sets)</td>
            <td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">extends</code> keyword</td>
          </tr>
          <tr>
            <td><strong>Runtime</strong></td>
            <td>Types exist at runtime</td>
            <td>Type Erasure (no runtime existence)</td>
          </tr>
          <tr>
            <td><strong>Operators</strong></td>
            <td>Support <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">+</code>, <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">&lt;</code> via <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">constraints</code></td>
            <td>Limited operator support in generic types</td>
          </tr>
        </tbody>
      </ComparisonTable>

      <h4 className="font-semibold mt-6">Basic Syntax</h4>
      <p>
        Go uses square brackets <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">[]</code> for type parameters, while TypeScript uses angle brackets <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">&lt;&gt;</code>.
      </p>

      <CodeBlock>{`// Go: Generic function
func MapKeys[K comparable, V any](m map[K]V) []K {
    keys := make([]K, 0, len(m))
    for k := range m {
        keys = append(keys, k)
    }
    return keys
}

// TS: Generic function
function getKeys<K extends string | number, V>(m: Record<K, V>): K[] {
    return Object.keys(m) as K[];
}`}</CodeBlock>

      <Note>
        <strong>Constraint: comparable</strong> is a built-in constraint in Go for any type that can be compared using <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">==</code> or <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">!=</code>. It is required for map keys.
      </Note>

      <h4 className="font-semibold mt-6">Type Sets (The ~ Operator)</h4>
      <p>
        Go allows you to define constraints as "type sets." The <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">~</code> operator includes types whose <strong>underlying type</strong> matches the constraint.
      </p>

      <CodeBlock>{`type Number interface {
    ~int | ~float64
}

func Sum[T Number](a, b T) T {
    return a + b
}`}</CodeBlock>
    </div>
  )
}
