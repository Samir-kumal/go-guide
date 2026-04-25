"use client"

import { CodeBlock, Note } from '@/components/ui'

export function TypePropertiesTutorial() {
  return (
    <section>
      <h2 id="type-properties" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        8. Properties of Types and Values
      </h2>

      <h3 className="text-[#5f6368] text-xl font-semibold mt-6">Value Types vs Reference Types</h3>
      <p>Go types behave differently when assigned or passed to functions:</p>

      <h4 className="font-semibold mt-4">Value Types (Copy on Assign)</h4>
      <p>When you assign a value type, it copies the ENTIRE data:</p>
      <CodeBlock>{"var a int = 42\nvar b = a    // b gets a COPY of 42\nb = 100          // changing b does NOT affect a\n// a = 42, b = 100"}</CodeBlock>

      <p className="font-semibold mt-3">Memory View:</p>
      <CodeBlock>{"Stack:\n  a: [42]\n  b: [100]    ← SEPARATE memory location"}</CodeBlock>

      <h4 className="font-semibold mt-4">Reference Types (Share the Reference)</h4>
      <p>When you assign a reference type, it copies the POINTER, not the data:</p>
      <CodeBlock>{"slice := []int{1, 2, 3}\nother := slice      // both point to SAME array\nother = append(other, 4)\n// slice = [1,2,3], other = [1,2,3,4] → SAME backing array!"}</CodeBlock>

      <p className="font-semibold mt-3">Memory View:</p>
      <CodeBlock>{"Stack:                    Heap:\n  slice: [ptr] ─────────→ [1|2|3]\n  other: [ptr] ─────────↗"}</CodeBlock>

      <hr className="border-none border-t border-[#ddd] my-6" />

      <h3 className="text-[#5f6368] text-xl font-semibold">Underlying Types</h3>
      <p>Every type has an underlying type (the "base" type it resolves to):</p>
      <CodeBlock>{"type MyInt int        // underlying = int\ntype IntAlias = int   // underlying = int (alias!)\n\ntype Point struct{\n    X, Y int\n}                  // underlying = struct{X, Y int}"}</CodeBlock>

      <h4 className="font-semibold mt-4">Why It Matters</h4>
      <CodeBlock>{"type Score int\n\nvar x int = 42\nvar s Score = x    // ERROR: cannot use int as Score\n\n// But with constants (untyped):\nvar s2 Score = 42   // OK - untyped constant converts"}</CodeBlock>

      <hr className="border-none border-t border-[#ddd] my-6" />

      <h3 className="text-[#5f6368] text-xl font-semibold">Type Identity</h3>
      <p>Two types are IDENTICAL if they have the same underlying type definition:</p>
      <CodeBlock>{"type A []int\ntype B []int\n// A and B are NOT identical - declared separately!"}</CodeBlock>

      <p>Use type alias to create IDENTICAL types:</p>
      <CodeBlock>{"type A = []int  // now A IS []int\ntype B = []int\n// A and B are identical!"}</CodeBlock>

      <h4 className="font-semibold mt-4">Named vs Unnamed</h4>
      <ul className="list-disc pl-6 my-2">
        <li><strong>Named:</strong> declared with type name (type MyInt int)</li>
        <li><strong>Unnamed:</strong> literal type ([]int, struct{}, map[string]int)</li>
      </ul>

      <hr className="border-none border-t border-[#ddd] my-6" />

      <h3 className="text-[#5f6368] text-xl font-semibold">Assignability Rules</h3>
      <p>A value of type T can be assigned to variable of type U when:</p>
      <table className="w-full my-3 border-collapse">
        <thead>
          <tr className="bg-[#f5f5f5]">
            <th className="border p-2 text-left">Rule</th>
            <th className="border p-2 text-left">Example</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border p-2">U is interface, T implements U</td><td className="border p-2">{"var r io.Reader = &bytes.Buffer{}"}</td></tr>
          <tr><td className="border p-2">U and T have identical underlying types</td><td className="border p-2">{"type A = string; var x A = \"hi\""}</td></tr>
          <tr><td className="border p-2">T is untyped constant, U can represent it</td><td className="border p-2">{"var i int = 42"}</td></tr>
          <tr><td className="border p-2">T is bidirectional channel, U is receive-only or send-only</td><td className="border p-2">{"var c chan int; var r <-chan int = c"}</td></tr>
        </tbody>
      </table>

      <CodeBlock>{"// Interface example\ntype Writer interface {\n    Write([]byte) (int, error)\n}\n\ntype MyWriter struct{}\nfunc (m *MyWriter) Write(data []byte) (int, error) { return len(data), nil }\n\nvar w Writer = &MyWriter{}  // OK - MyWriter implements Writer"}</CodeBlock>

      <hr className="border-none border-t border-[#ddd] my-6" />

      <h3 className="text-[#5f6368] text-xl font-semibold">Representability (Constants)</h3>
      <p>A constant can be assigned to a type if the type can represent that value:</p>
      <CodeBlock>{"type Age int8       // max = 127\n\nconst x = 200      // untyped - OK!\nvar a Age = x      // ERROR: 200 cannot be represented by int8"}</CodeBlock>

      <h4 className="font-semibold mt-4">Representability Table:</h4>
      <table className="w-full my-3 border-collapse">
        <thead>
          <tr className="bg-[#f5f5f5]">
            <th className="border p-2 text-left">Type</th>
            <th className="border p-2 text-left">Can Represent</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border p-2">int8</td><td className="border p-2">-128 to 127</td></tr>
          <tr><td className="border p-2">int16</td><td className="border p-2">-32768 to 32767</td></tr>
          <tr><td className="border p-2">uint8</td><td className="border p-2">0 to 255</td></tr>
          <tr><td className="border p-2">float32</td><td className="border p-2">any float with int part ≤ 16777216</td></tr>
          <tr><td className="border p-2">complex64</td><td className="border p-2">real/imag within float32 range</td></tr>
        </tbody>
      </table>

      <hr className="border-none border-t border-[#ddd] my-6" />

      <h3 className="text-[#5f6368] text-xl font-semibold">Self-Contained vs Reference Types</h3>
      <table className="w-full my-3 border-collapse">
        <thead>
          <tr className="bg-[#f5f5f5]">
            <th className="border p-2 text-left">Category</th>
            <th className="border p-2 text-left">Types</th>
            <th className="border p-2 text-left">Behavior</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border p-2"><strong>Value (Self-Contained)</strong></td><td className="border p-2">int, float, bool, string, array, struct</td><td className="border p-2">Copy entire value</td></tr>
          <tr><td className="border p-2"><strong>Reference</strong></td><td className="border p-2">slice, map, channel, pointer, interface</td><td className="border p-2">Copy reference only</td></tr>
        </tbody>
      </table>

      <CodeBlock>{"// Array (value): copies all elements\narr1 := [3]int{1, 2, 3}\narr2 := arr1       // arr2 gets FULL COPY"}</CodeBlock>

      <CodeBlock>{"// Slice (reference): shares backing array\nslice1 := []int{1, 2, 3}\nslice2 := slice1     // both share SAME backing array"}</CodeBlock>

      <hr className="border-none border-t border-[#ddd] my-6" />

      <h3 className="text-[#5f6368] text-xl font-semibold">PHP Comparison</h3>
      <p>Go and PHP handle types differently:</p>

      <h4 className="font-semibold mt-4">PHP Primitives → Go Value Types</h4>
      <CodeBlock>{"// PHP\n$a = 42;\n$b = $a;     // $b gets COPY\n\n// Go (equivalent)\na := 42\nb := a          // b gets COPY"}</CodeBlock>

      <h4 className="font-semibold mt-4">PHP Objects → Go Reference Types</h4>
      <CodeBlock>{"// PHP\nclass User { public $name; }\n$u1 = new User();\n$u2 = $u1;        // $u2 is REFERENCE to same object\n\n// Go (similar to pointer)\nu1 := &User{Name: \"Alice\"}\nu2 := u1           // u2 points to SAME User"}</CodeBlock>

      <h4 className="font-semibold mt-4">Key Difference</h4>
      <ul className="list-disc pl-6 my-2">
        <li>PHP: objects are ALWAYS references, primitives are copied</li>
        <li>Go: depends on type - slices/maps/channels are references, arrays/structs are values</li>
        <li>Go: use & for explicit pointer (like PHP objects)</li>
      </ul>

      <hr className="border-none border-t border-[#ddd] my-6" />

      <h3 className="text-[#5f6368] text-xl font-semibold">Cheat Sheet</h3>
      <CodeBlock>{"// Value vs Reference\nvar x int = 42         // value type\nvar s []int = []int{1}   // reference type\n\n// Underlying type\ntype MyInt int           // underlying = int\ntype Alias = int         // identical to int!\n\n// Assignability\nvar w io.Writer = &myStruct{}  // myStruct implements Writer\n\n// Representability\nconst BIG = 300\nvar i int8 = BIG        // ERROR if 300 > 127\n\n// Memory behavior\narr := [3]int{1,2,3}\narr2 := arr          // COPY\n\nslice := []int{1,2,3}\nslice2 := slice       // SAME backing array"}</CodeBlock>

      <Note>Summary: Value types copy all data. Reference types share backing data. Use pointers (&) for explicit reference with value types.</Note>
    </section>
  )
}