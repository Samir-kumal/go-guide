'use client';

import { CodeBlock, Note, Tip, ComparisonTable, Warning } from '@/components/ui';

export function MethodSetsTutorial() {
  return (
    <section>
      <h2 id="method-sets-tutorial" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        Part 9: Method Sets
      </h2>
      <p className="mt-4">
        A <strong>method set</strong> is the collection of methods that can be called on a type.
        It determines which interfaces a type satisfies and which methods can be invoked.
      </p>

      <h3 className="text-[#5f6368] mt-8 text-xl font-medium">
        T vs *T Method Sets
      </h3>
      <p className="mt-4">
        In Go, the method set rules differ for value types and pointer types:
      </p>

      <CodeBlock>{"┌─────────────────────────────────────────────────────────┐\n│  Type T (value receiver)                                   │\n├─────────────────────────────────────────────────────────┤\n│  Method Set: { All methods with value receivers }         │\n│                                                              │\n│  type T struct { name string }                             │\n│                                                              │\n│  func (t T) Describe() string { return t.name }            │\n│                                                              │\n│  // T's method set = { Describe }                          │\n└─────────────────────────────────────────────────────────┘\n\n┌─────────────────────────────────────────────────────────┐\n│  Type *T (pointer receiver)                                │\n├─────────────────────────────────────────────────────────┤\n│  Method Set: { All methods with value OR pointer          │\n│                receivers }                                 │\n│                                                              │\n│  type T struct { name string }                             │\n│                                                              │\n│  func (t T) Describe() string { return t.name }           │\n│  func (t *T) SetName(name string) { t.name = name }        │\n│                                                              │\n│  // *T's method set = { Describe, SetName }               │\n│  // Note: *T inherits methods from T                      │\n└─────────────────────────────────────────────────────────┘"}</CodeBlock>

      <Note>
        <strong>Key Rule:</strong> A pointer type *T automatically includes all methods
        defined on T (value receiver methods). A value type T only includes methods
        defined directly on T.
      </Note>

      <h3 className="text-[#5f6368] mt-8 text-xl font-medium">
        Why This Matters for Interfaces
      </h3>
      <p className="mt-4">
        When a type satisfies an interface, Go checks the method set:
      </p>

      <CodeBlock>{`package main

import "fmt"

type Describer interface {
    Describe() string
}

// DescriberDemo only has value receiver methods
type DescriberDemo struct {
    name string
}

// (d DescriberDemo) is a VALUE RECEIVER
func (d DescriberDemo) Describe() string {
    return d.name
}

func main() {
    var d Describer = DescriberDemo{name: "hello"}  // ✓ satisfies interface
    fmt.Println(d.Describe())

    var p *DescriberDemo = &DescriberDemo{name: "world"}
    d = p                                // ✓ *DescriberDemo also satisfies
    fmt.Println(d.Describe())
}`}</CodeBlock>

      <CodeBlock>{`package main

import "fmt"

type Mutator interface {
    SetValue(int)
}

type ValueContainer struct {
    value int
}

// SetName is VALUE RECEIVER only
func (v ValueContainer) SetName(name string) {}

// SetValue is POINTER RECEIVER
func (v *ValueContainer) SetValue(val int) {
    v.value = val
}

func main() {
    var m Mutator = ValueContainer{}    // ✗ ERROR: ValueContainer doesn't have SetValue
                                         //         only *ValueContainer has SetValue

    var p *ValueContainer = &ValueContainer{}
    m = p                                // ✓ *ValueContainer satisfies Mutator
    m.SetValue(42)
}`}</CodeBlock>

      <h3 className="text-[#5f6368] mt-8 text-xl font-medium">
        Common Mistake: Storing T When Interface Needs *T
      </h3>
      <p className="mt-4">
        A frequent bug occurs when storing a value type in a place that expects a pointer type:
      </p>

      <CodeBlock>{`package main

import "fmt"

type Adder interface {
    Add(int) int
}

type Counter struct {
    count int
}

// Add is defined on *Counter (pointer receiver)
func (c *Counter) Add(n int) int {
    c.count += n
    return c.count
}

func main() {
    // WRONG: Counter value stored directly
    var a Adder = Counter{}  // ✗ Compile error!
                             // Counter doesn't satisfy Adder
                             // Only *Counter does

    // CORRECT: Use pointer
    var a Adder = &Counter{} // ✓ *Counter satisfies Adder
    fmt.Println(a.Add(5))    // 5
    fmt.Println(a.Add(3))    // 8
}`}</CodeBlock>

      <Warning>
        <strong>Remember:</strong> When a method has a pointer receiver, you must use
        a pointer to that type to call the method. This applies to interface satisfaction too.
      </Warning>

      <h3 className="text-[#5f6368] mt-8 text-xl font-medium">
        Comparison: Go vs PHP
      </h3>

      <ComparisonTable>
        <thead>
          <tr>
            <th>PHP</th>
            <th>Go</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><CodeBlock>{`<interface Describer {
    public function describe(): string;
}

class T implements Describer {
    private string $name;

    public function describe(): string {
        return $this->name;
    }
}

$obj = new T();
$describer = $obj;  // Any object instance satisfies interface
                      // No "method set" concept
                      // Just needs required methods`}</CodeBlock></td>
            <td><CodeBlock>{`interface Describer {
    Describe() string
}

type T struct {
    name string
}

// Value receiver - method belongs to T and *T
func (t T) Describe() string {
    return t.name
}

// Pointer receiver - method belongs ONLY to *T
func (t *T) SetName(name string) {
    t.name = name
}

// T{} satisfies Describer
// *T{} satisfies Describer (it has Describe from T)
// Only *T{} can call SetName`}</CodeBlock></td>
          </tr>
        </tbody>
      </ComparisonTable>

      <Tip>
        <strong>PHP:</strong> Any object instance with required methods satisfies an interface —
        no concept of receiver types.
        <br /><br />
        <strong>Go:</strong> Method receivers create distinct method sets for T and *T,
        affecting interface satisfaction and method availability.
      </Tip>

      <h3 className="text-[#5f6368] mt-8 text-xl font-medium">
        Summary
      </h3>
      <ul className="list-disc pl-6 space-y-2 mt-4">
        <li>Value type <code>T</code> method set includes only value receiver methods</li>
        <li>Pointer type <code>*T</code> method set includes both value and pointer receiver methods</li>
        <li>Interface satisfaction depends on which method set includes the required methods</li>
        <li>Use <code>*T</code> when calling methods with pointer receivers</li>
        <li>This is Go&apos;s way of encouraging safe mutation through explicit pointer usage</li>
      </ul>
    </section>
  );
}