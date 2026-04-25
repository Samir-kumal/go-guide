import { CodeBlock, Note } from '@/components/ui'

export function FloatingPointLiterals() {
  return (
    <section>
      <h2 id="floating-point-literals" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        Floating-Point Literals
      </h2>
      
      <h3 className="text-[#5f6368] text-xl font-semibold mt-6">What is a floating-point number?</h3>
      <p>A number with a decimal point or exponent. Like 3.14 or 1.5e10.</p>

      <h4 className="font-semibold mt-4">Decimal Floating-Point</h4>
      <CodeBlock>{"72.40\n// integer part (72), decimal point (.), fractional part (40)"}</CodeBlock>
      
      <h4 className="font-semibold mt-4">With exponent:</h4>
      <CodeBlock>{"6.67428e-11\n// means 6.67428 × 10⁻¹¹ = 0.0000000000667428"}</CodeBlock>

      <h4 className="font-semibold mt-4">What can you leave out?</h4>
      <CodeBlock>{"0.        // no fractional part → 0.0\n.25       // no integer part → 0.25\n1E6       // no decimal point → 1000000.0\n1.e+0     // no fractional part, has exponent → 1.0"}</CodeBlock>

      <h4 className="font-semibold mt-4">Hexadecimal Floating-Point</h4>
      <CodeBlock>{"0x1.Fp+0\n// 0x prefix, mantissa, p exponent (×2^)\n// 0x1.Fp+0 = (1 + 15/16) × 2⁰ = 1.9375"}</CodeBlock>
      <Note>Key difference: Uses p instead of e, exponent means ×2^ not ×10^</Note>

      <hr className="border-none border-t border-[#ddd] my-6" />

      <h3 className="text-[#5f6368] text-xl font-semibold">Valid Examples</h3>
      <CodeBlock>{"0.           // = 0.0\n72.40        // = 72.40\n2.71828      // = 2.71828\n1.e+0        // = 1.0\n6.67428e-11  // = 6.67428 × 10⁻¹¹\n1E6          // = 1 × 10⁶ = 1000000.0\n.25          // = 0.25\n0x1p-2       // = 1 × 2⁻² = 0.25"}</CodeBlock>

      <h3 className="text-[#5f6368] text-xl font-semibold">Invalid Examples</h3>
      <CodeBlock>{"0x.p1        // mantissa has NO digits\n1p-2         // p exponent needs 0x prefix\n0x1.5e-2     // hex float needs p, not e\ne_1           // _ must be BETWEEN digits"}</CodeBlock>
    </section>
  )
}

export function ImaginaryLiterals() {
  return (
    <section>
      <h2 id="imaginary-literals" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        Imaginary Literals
      </h2>
      
      <p>Numbers with an i at the end. Used for complex numbers (math).</p>
      <CodeBlock>{"5i       // = 5 × imaginary unit\n2.5i     // = 2.5 × imaginary unit\n1E6i     // = 1000000 × imaginary unit"}</CodeBlock>
      
      <h4 className="font-semibold mt-4">Grammar</h4>
      <CodeBlock>{"imaginary_lit = (decimal_digits | int_lit | float_lit) \"i\""}</CodeBlock>
      <p>Take any number, stick i at the end.</p>

      <Note>Backward Compatibility: 0123i = 123i NOT 83i!</Note>
    </section>
  )
}

export function RuneLiterals() {
  return (
    <section>
      <h2 id="rune-literals" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        Rune Literals
      </h2>
      
      <p>A single character. It&apos;s actually an integer (the Unicode code point number).</p>
      <CodeBlock>{"'a'    // = 97 (Unicode code point for 'a')\n'本'   // = 26412 (Unicode code point for '本')"}</CodeBlock>

      <h4 className="font-semibold mt-4">Escape Sequences</h4>
      <table className="w-full my-3 border-collapse">
        <thead>
          <tr className="bg-[#f5f5f5]">
            <th className="border p-2 text-left">Escape</th>
            <th className="border p-2 text-left">Value</th>
            <th className="border p-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border p-2"><code>\t</code></td><td className="border p-2">U+0009</td><td className="border p-2">Tab</td></tr>
          <tr><td className="border p-2"><code>\n</code></td><td className="border p-2">U+000A</td><td className="border p-2">Newline</td></tr>
          <tr><td className="border p-2"><code>\\</code></td><td className="border p-2">U+005C</td><td className="border p-2">Backslash</td></tr>
          <tr><td className="border p-2"><code>\'</code></td><td className="border p-2">U+0027</td><td className="border p-2">Single quote</td></tr>
        </tbody>
      </table>

      <h4 className="font-semibold mt-4">Numeric escapes</h4>
      <CodeBlock>{"\\000        // 3 octal digits (0-255)\n\\x00        // 2 hex digits (0-255)\n\\u0000       // 4 hex digits (Unicode)\n\\U00000000  // 8 hex digits (Unicode)"}</CodeBlock>

      <h3 className="text-[#5f6368] text-xl font-semibold">Invalid Examples</h3>
      <CodeBlock>{"'aa'          // TOO MANY characters\n'\\k'          // k is NOT a valid escape\n'\\xa'         // need EXACTLY 2 hex digits"}</CodeBlock>
    </section>
  )
}

export function StringLiterals() {
  return (
    <section>
      <h2 id="string-literals" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        String Literals
      </h2>
      
      <h3 className="text-[#5f6368] text-xl font-semibold">Two Types of Strings</h3>
      
      <h4 className="font-semibold mt-4">1. Raw String Literals (backticks)</h4>
      <CodeBlock>{"`hello world`\n`this has a \\n in it`    // \\n is literal, NOT a newline\n`this\\nspans\\nmultiple lines`  // newlines included as-is"}</CodeBlock>
      <p>No escape sequences. Can span multiple lines.</p>

      <h4 className="font-semibold mt-4">2. Interpreted String Literals (double quotes)</h4>
      <CodeBlock>{"\"hello world\"\n\"this has a \\n in it\"    // \\n IS a newline"}</CodeBlock>
      <p>Escape sequences work. Cannot span multiple lines.</p>

      <hr className="border-none border-t border-[#ddd] my-6" />

      <h4 className="font-semibold mt-4">Bytes vs Characters</h4>
      <CodeBlock>{"\\377        // one BYTE with value 255\n\\xFF        // one BYTE with value 255\n\\u00FF      // TWO BYTES: 0xc3 0xbf (UTF-8 encoding)"}</CodeBlock>
      <Note>\x and octal escapes produce raw bytes. \u and \U produce UTF-8 encoded characters.</Note>
    </section>
  )
}

export function Constants() {
  return (
    <section>
      <h2 id="constants" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        Constants
      </h2>
      
      <p>A value that never changes. It&apos;s fixed at compile time.</p>

      <h4 className="font-semibold mt-4">Key Properties</h4>
      <ul className="list-disc pl-6 my-2">
        <li>Arbitrary precision - can be infinitely big in theory</li>
        <li>No special IEEE 754 values (no negative zero, infinity, NaN)</li>
      </ul>

      <h4 className="font-semibold mt-4">Typed vs Untyped</h4>
      <CodeBlock>{"const x = 42        // untyped integer - flexible\nconst y int32 = 42  // typed - MUST be int32"}</CodeBlock>

      <h4 className="font-semibold mt-4">Default Types</h4>
      <table className="w-full my-3 border-collapse">
        <thead>
          <tr className="bg-[#f5f5f5]">
            <th className="border p-2 text-left">Constant Kind</th>
            <th className="border p-2 text-left">Default Type</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border p-2">Boolean</td><td className="border p-2">bool</td></tr>
          <tr><td className="border p-2">Rune</td><td className="border p-2">rune (int32)</td></tr>
          <tr><td className="border p-2">Integer</td><td className="border p-2">int</td></tr>
          <tr><td className="border p-2">Floating-point</td><td className="border p-2">float64</td></tr>
          <tr><td className="border p-2">String</td><td className="border p-2">string</td></tr>
        </tbody>
      </table>
    </section>
  )
}

export function Variables() {
  return (
    <section>
      <h2 id="variables" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        Variables
      </h2>
      
      <p>A storage location that holds a value. Unlike constants, variables can change.</p>

      <h4 className="font-semibold mt-4">Ways to Create Variables</h4>
      <CodeBlock>{"var x int\nfunc add(a int, b int) int { ... }\np := new(int)"}</CodeBlock>

      <h4 className="font-semibold mt-4">Static Type vs Dynamic Type</h4>
      <CodeBlock>{"var x interface{}\nx = 42              // dynamic type = int\nx = \"hello\"         // dynamic type = string"}</CodeBlock>
      <ul className="list-disc pl-6 my-2">
        <li><strong>Static type:</strong> declared type (never changes)</li>
        <li><strong>Dynamic type:</strong> actual stored type (can change)</li>
      </ul>

      <h4 className="font-semibold mt-4">Zero Values</h4>
      <table className="w-full my-3 border-collapse">
        <thead>
          <tr className="bg-[#f5f5f5]">
            <th className="border p-2 text-left">Type</th>
            <th className="border p-2 text-left">Zero Value</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border p-2">int</td><td className="border p-2">0</td></tr>
          <tr><td className="border p-2">float64</td><td className="border p-2">0.0</td></tr>
          <tr><td className="border p-2">bool</td><td className="border p-2">false</td></tr>
          <tr><td className="border p-2">string</td><td className="border p-2">&quot;&quot;</td></tr>
          <tr><td className="border p-2">pointer</td><td className="border p-2">nil</td></tr>
        </tbody>
      </table>
    </section>
  )
}

export function Types() {
  return (
    <section>
      <h2 id="types" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        Types Overview
      </h2>
      
      <p>A type defines what values are allowed and what operations you can do.</p>

      <h4 className="font-semibold mt-4">Type Literals</h4>
      <table className="w-full my-3 border-collapse">
        <thead>
          <tr className="bg-[#f5f5f5]">
            <th className="border p-2 text-left">Type</th>
            <th className="border p-2 text-left">Example</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border p-2">Array</td><td className="border p-2">[5]int</td></tr>
          <tr><td className="border p-2">Struct</td><td className="border p-2">{"struct{ x int }"}</td></tr>
          <tr><td className="border p-2">Pointer</td><td className="border p-2">{("*int")}</td></tr>
          <tr><td className="border p-2">Function</td><td className="border p-2">{"func(int) string"}</td></tr>
          <tr><td className="border p-2">Interface</td><td className="border p-2">{"interface{ Read() }"}</td></tr>
          <tr><td className="border p-2">Slice</td><td className="border p-2">{"[]int"}</td></tr>
          <tr><td className="border p-2">Map</td><td className="border p-2">{"map[string]int"}</td></tr>
          <tr><td className="border p-2">Channel</td><td className="border p-2">{"chan int"}</td></tr>
        </tbody>
      </table>
    </section>
  )
}

export function BooleanTypes() {
  return (
    <section>
      <h2 id="boolean-types" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        Boolean Types
      </h2>
      
      <CodeBlock>{"var a bool = true\nvar b bool = false"}</CodeBlock>
      <p>Only two values: true and false.</p>
    </section>
  )
}

export function NumericTypes() {
  return (
    <section>
      <h2 id="numeric-types" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        Numeric Types
      </h2>
      
      <h3 className="text-[#5f6368] text-xl font-semibold">Integer Types</h3>
      <table className="w-full my-3 border-collapse">
        <thead>
          <tr className="bg-[#f5f5f5]">
            <th className="border p-2 text-left">Type</th>
            <th className="border p-2 text-left">Range</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border p-2">uint8/int8</td><td className="border p-2">0-255 / -128-127</td></tr>
          <tr><td className="border p-2">uint16/int16</td><td className="border p-2">0-65535 / -32768-32767</td></tr>
          <tr><td className="border p-2">uint32/int32</td><td className="border p-2">0-4.3B / -2.1B-2.1B</td></tr>
          <tr><td className="border p-2">uint64/int64</td><td className="border p-2">0-18.4E / -9.2E-9.2E</td></tr>
        </tbody>
      </table>

      <h3 className="text-[#5f6368] text-xl font-semibold">Floating-Point</h3>
      <CodeBlock>{"float32  // ~7 decimal digits\nfloat64  // ~15 decimal digits"}</CodeBlock>

      <h3 className="text-[#5f6368] text-xl font-semibold">Aliases</h3>
      <CodeBlock>{"byte = uint8\nrune = int32"}</CodeBlock>

      <Note>No automatic conversion! var a int32 = 5; var b int64 = 10; c := int64(a) + b</Note>
    </section>
  )
}

export function StringTypes() {
  return (
    <section>
      <h2 id="string-types" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        String Types
      </h2>
      
      <p>A sequence of bytes. Immutable.</p>
      <CodeBlock>{"s := \"hello\"\nlen(s)        // = 5\ns[0]          // = 'h'"}</CodeBlock>
      <p>Cannot modify after creation.</p>
    </section>
  )
}

export function ArrayTypes() {
  return (
    <section>
      <h2 id="array-types" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        Array Types
      </h2>
      
      <p>A fixed-size list of elements.</p>
      <CodeBlock>{"[32]byte        // 32 bytes\n[3][5]int       // 2D array\n[1000]*float64 // 1000 pointers"}</CodeBlock>
      <Note>Length is part of the type: [5]int and [10]int are different!</Note>
    </section>
  )
}
