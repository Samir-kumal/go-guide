import { CodeBlock, Note } from '@/components/ui'

export function SourceCodeRepresentation() {
  return (
    <section>
      <h2 id="source-code-representation" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        Source Code Representation
      </h2>

      <h3 className="text-[#5f6368] text-xl font-semibold mt-6">Part 1: Source Code is Unicode Text</h3>
      
      <p><strong>Source code is Unicode text encoded in UTF-8.</strong></p>
      <p>Your Go code is saved as UTF-8 text. This means you can use characters from any language — English, Chinese, Arabic, etc.</p>

      <hr className="border-none border-t border-[#ddd] my-4" />

      <p><strong>The text is not canonicalized</strong>, so a single accented code point is distinct from the same character constructed from combining an accent and a letter; those are treated as two code points.</p>
      <p>In Unicode, you can write <code>é</code> in two ways:</p>
      <table className="w-full my-3 border-collapse">
        <thead>
          <tr className="bg-[#f5f5f5]">
            <th className="border p-2 text-left">Way</th>
            <th className="border p-2 text-left">Code Points</th>
            <th className="border p-2 text-left">Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">Single</td>
            <td className="border p-2">ONE code point (U+00E9)</td>
            <td className="border p-2"><code>é</code></td>
          </tr>
          <tr>
            <td className="border p-2">Combined</td>
            <td className="border p-2">TWO code points (U+0065 + U+0301)</td>
            <td className="border p-2"><code>e</code> + <code>´</code></td>
          </tr>
        </tbody>
      </table>
      <Note>They look the same on screen but Go treats them as DIFFERENT.</Note>

      <hr className="border-none border-t border-[#ddd] my-4" />

      <p><strong>Each code point is distinct</strong>; for instance, uppercase and lowercase letters are different characters.</p>
      <CodeBlock>{"A ≠ a\nHello ≠ hello"}</CodeBlock>
      <p>Capital and small letters are NOT the same in Go.</p>

      <hr className="border-none border-t border-[#ddd] my-4" />

      <p><strong>Implementation restriction:</strong> For compatibility with other tools, a compiler may disallow the NUL character (U+0000) in the source text.</p>
      <Note>The NUL character (invisible empty character) might not be allowed in your code.</Note>

      <hr className="border-none border-t border-[#ddd] my-4" />

      <p><strong>Implementation restriction:</strong> For compatibility with other tools, a compiler may ignore a UTF-8-encoded byte order mark (U+FEFF) if it is the first Unicode code point in the source text. A byte order mark may be disallowed anywhere else in the source.</p>
      <p>A <strong>BOM</strong> (Byte Order Mark) is an invisible character some text editors put at the very beginning of a file. Go will ignore it if it&apos;s at the start, but won&apos;t allow it anywhere else.</p>

      <hr className="border-none border-t border-[#ddd] my-6" />

      <h3 className="text-[#5f6368] text-xl font-semibold">Part 2: Characters</h3>
      
      <CodeBlock>{"newline        = /* the Unicode code point U+000A */ .\nunicode_char   = /* an arbitrary Unicode code point except newline */ .\nunicode_letter = /* a Unicode code point categorized as \"Letter\" */ .\nunicode_digit  = /* a Unicode code point categorized as \"Number, decimal digit\" */ ."}</CodeBlock>

      <table className="w-full my-3 border-collapse">
        <thead>
          <tr className="bg-[#f5f5f5]">
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">What it is</th>
            <th className="border p-2 text-left">Example</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border p-2">newline</td><td className="border p-2">The enter/return key</td><td className="border p-2">↵</td></tr>
          <tr><td className="border p-2">unicode_char</td><td className="border p-2">ANY character except newline</td><td className="border p-2">a, Z, 你, @, 5</td></tr>
          <tr><td className="border p-2">unicode_letter</td><td className="border p-2">Any character that is a letter</td><td className="border p-2">a, Z, 你, α</td></tr>
          <tr><td className="border p-2">unicode_digit</td><td className="border p-2">Any character that is a digit</td><td className="border p-2">0, 1, 9, ٣ (Arabic 3)</td></tr>
        </tbody>
      </table>

      <h4 className="font-semibold mt-4">Unicode Categories Go Recognizes</h4>
      <p>Go treats all characters in any of the Letter categories Lu, Ll, Lt, Lm, or Lo as Unicode letters:</p>
      <table className="w-full my-3 border-collapse">
        <thead>
          <tr className="bg-[#f5f5f5]">
            <th className="border p-2 text-left">Category</th>
            <th className="border p-2 text-left">Meaning</th>
            <th className="border p-2 text-left">Example</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border p-2">Lu</td><td className="border p-2">Uppercase letter</td><td className="border p-2">A, B, Z</td></tr>
          <tr><td className="border p-2">Ll</td><td className="border p-2">Lowercase letter</td><td className="border p-2">a, b, z</td></tr>
          <tr><td className="border p-2">Lt</td><td className="border p-2">Titlecase letter</td><td className="border p-2">ǅ, ǈ</td></tr>
          <tr><td className="border p-2">Lm</td><td className="border p-2">Modifier letter</td><td className="border p-2">ʰ, ˠ</td></tr>
          <tr><td className="border p-2">Lo</td><td className="border p-2">Other letter</td><td className="border p-2">你, α, ア</td></tr>
          <tr><td className="border p-2">Nd</td><td className="border p-2">Decimal digit</td><td className="border p-2">0-9, ٣</td></tr>
        </tbody>
      </table>

      <hr className="border-none border-t border-[#ddd] my-6" />

      <h3 className="text-[#5f6368] text-xl font-semibold">Part 3: Letters and Digits</h3>

      <p><strong>The underscore character <code>_</code> (U+005F) is considered a lowercase letter.</strong></p>
      <p>The <code>_</code> is treated like a letter in Go! That&apos;s why you can use it in variable names.</p>

      <CodeBlock>letter = unicode_letter | "_" .</CodeBlock>
      <p>A letter is any unicode letter OR underscore.</p>

      <h4 className="font-semibold mt-4">Digit Types</h4>
      <CodeBlock>{"decimal_digit = \"0\" … \"9\" .\nbinary_digit  = \"0\" | \"1\" .\noctal_digit   = \"0\" … \"7\" .\nhex_digit     = \"0\" … \"9\" | \"A\" … \"F\" | \"a\" … \"f\" ."}</CodeBlock>

      <table className="w-full my-3 border-collapse">
        <thead>
          <tr className="bg-[#f5f5f5]">
            <th className="border p-2 text-left">Type</th>
            <th className="border p-2 text-left">Allowed characters</th>
            <th className="border p-2 text-left">Used for</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border p-2">decimal_digit</td><td className="border p-2">0 1 2 3 4 5 6 7 8 9</td><td className="border p-2">Normal numbers</td></tr>
          <tr><td className="border p-2">binary_digit</td><td className="border p-2">0 1</td><td className="border p-2">Binary (base 2)</td></tr>
          <tr><td className="border p-2">octal_digit</td><td className="border p-2">0 1 2 3 4 5 6 7</td><td className="border p-2">Octal (base 8)</td></tr>
          <tr><td className="border p-2">hex_digit</td><td className="border p-2">0-9, A-F, a-f</td><td className="border p-2">Hexadecimal (base 16)</td></tr>
        </tbody>
      </table>

      <hr className="border-none border-t border-[#ddd] my-6" />

      <h3 className="text-[#5f6368] text-xl font-semibold">Part 4: Comments</h3>

      <p>Go has two forms of comments:</p>
      <CodeBlock>{"// This is a line comment. It goes until the end of the line.\n\n/* This is a general comment.\n   It can span multiple lines. */"}</CodeBlock>

      <h4 className="font-semibold mt-4">Comment Rules:</h4>
      <ul className="list-disc pl-6 my-2">
        <li>❌ You CANNOT start a comment inside a string: <code>"hello // this is NOT a comment"</code></li>
        <li>❌ You CANNOT nest comments: <code>/* outer /* inner */ */</code></li>
        <li>A <code>/* comment */</code> with <strong>no newlines</strong> acts like a <strong>SPACE</strong></li>
        <li>Any <strong>other</strong> comment acts like a <strong>NEWLINE</strong></li>
      </ul>

      <hr className="border-none border-t border-[#ddd] my-6" />

      <h3 className="text-[#5f6368] text-xl font-semibold">Part 5: Tokens</h3>

      <p><strong>Tokens form the vocabulary of the Go language.</strong></p>
      <p>Tokens are the smallest meaningful pieces of your code. Like words in English.</p>

      <CodeBlock>{"if x > 5 {\n// Tokens: \"if\" (keyword), \"x\" (identifier), \">\" (operator), \"5\" (literal), \"{\" (punctuation)"}</CodeBlock>

      <h4 className="font-semibold mt-4">Four Types of Tokens:</h4>
      <table className="w-full my-3 border-collapse">
        <thead>
          <tr className="bg-[#f5f5f5]">
            <th className="border p-2 text-left">Type</th>
            <th className="border p-2 text-left">What it is</th>
            <th className="border p-2 text-left">Examples</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border p-2">Identifiers</td><td className="border p-2">Names you create</td><td className="border p-2">x, myFunc, Person</td></tr>
          <tr><td className="border p-2">Keywords</td><td className="border p-2">Reserved words</td><td className="border p-2">if, for, func</td></tr>
          <tr><td className="border p-2">Operators & Punctuation</td><td className="border p-2">Symbols</td><td className="border p-2">{"+, -, {, }"}</td></tr>
          <tr><td className="border p-2">Literals</td><td className="border p-2">Fixed values</td><td className="border p-2">42, "hello", 3.14</td></tr>
        </tbody>
      </table>

      <hr className="border-none border-t border-[#ddd] my-4" />

      <p><strong>White space is ignored except as it separates tokens</strong></p>
      <CodeBlock>{"// These are the SAME to Go:\nx + y\nx   +   y\nx+y       // BUT this could be confusing for humans"}</CodeBlock>

      <hr className="border-none border-t border-[#ddd] my-4" />

      <p><strong>the next token is the longest sequence of characters that form a valid token</strong></p>
      <p>This is called the &quot;longest match&quot; rule.</p>
      <CodeBlock>{"// When Go sees: abc\n// It reads \"abc\" as ONE identifier\n// NOT \"a\" + \"b\" + \"c\" as three identifiers"}</CodeBlock>

      <hr className="border-none border-t border-[#ddd] my-6" />

      <h3 className="text-[#5f6368] text-xl font-semibold">Part 6: Semicolons</h3>

      <p><strong>Go programs may omit most of these semicolons</strong></p>
      <p>In many languages you write:</p>
      <CodeBlock>{"x = 5;\ny = 10;"}</CodeBlock>
      <p>In Go, you <strong>don&apos;t need the semicolons!</strong> Go adds them automatically.</p>

      <h4 className="font-semibold mt-4">Rule 1: Auto-insert after certain tokens at end of line</h4>
      <CodeBlock>{"x = 5        // Go sees: x = 5;     (identifier at end → add ;)\ny++          // Go sees: y++;        (++ at end → add ;)\nreturn 42    // Go sees: return 42;  (return at end → add ;)\n}            // Go sees: };          (} at end → add ;)"}</CodeBlock>
      <p><strong>Tokens that trigger auto-semicolon:</strong></p>
      <ul className="list-disc pl-6">
        <li>identifiers (x, myVar, etc.)</li>
        <li>literals (42, "hello", 3.14)</li>
        <li>keywords: break, continue, fallthrough, return</li>
        <li>operators/punct: ++, --, ), ], {"}"}</li>
      </ul>

      <h4 className="font-semibold mt-4">Rule 2: Semicolon can be omitted before ) or {"}"}</h4>
      <CodeBlock>{"func main() { fmt.Println(\"hello\") }\n//                                  ^ no semicolon needed before }"}</CodeBlock>

      <h4 className="font-semibold mt-4">Why this matters:</h4>
      <CodeBlock>{"// This is why you CANNOT write:\nif x > 5\n{              // ← WRONG! Go inserted ; after \"5\", breaking the code\n\n// You MUST write:\nif x > 5 {    // ← Correct! { is on the same line"}</CodeBlock>

      <hr className="border-none border-t border-[#ddd] my-6" />

      <h3 className="text-[#5f6368] text-xl font-semibold">Part 7: Identifiers</h3>

      <CodeBlock>{"identifier = letter { letter | unicode_digit } ."}</CodeBlock>

      <h4 className="font-semibold mt-4">Rules:</h4>
      <ul className="list-disc pl-6">
        <li>Must start with a letter (or <code>_</code>)</li>
        <li>Then can have letters or digits</li>
      </ul>

      <p><strong>VALID identifiers:</strong></p>
      <CodeBlock>{"a\n_x9\nThisVariableIsExported\nαβ                        // Greek letters are fine!"}</CodeBlock>

      <p><strong>INVALID:</strong></p>
      <CodeBlock>{"9lives      // ← starts with a digit"}</CodeBlock>

      <hr className="border-none border-t border-[#ddd] my-6" />

      <h3 className="text-[#5f6368] text-xl font-semibold">Part 8: Keywords</h3>

      <CodeBlock>{"break        default      func         interface    select\ncase         defer        go           map          struct\nchan         else         goto         package      switch\nconst        fallthrough  if           range        type\ncontinue     for          import       return       var"}</CodeBlock>

      <p>These are <strong>25 reserved words</strong>. You CANNOT use them as variable names.</p>
      <CodeBlock>{"var if = 5      // ← WRONG! \"if\" is a keyword\nvar myIf = 5    // ← OK!"}</CodeBlock>

      <hr className="border-none border-t border-[#ddd] my-6" />

      <h3 className="text-[#5f6368] text-xl font-semibold">Part 9: Operators and Punctuation</h3>

      <CodeBlock>{"+    &     +=    &=     &&    ==    !=    (    )\n-    |     -=    |=     ||    <     <=    [    ]\n*    ^     *=    ^=     <-    >     >=    {    }\n/    <<    /=    <<=    ++    =     :=    ,    ;\n%    >>    %=    >>=    --    !     ...   .    :\n     &^          &^=          ~"}</CodeBlock>

      <h4 className="font-semibold mt-4">Common Operators:</h4>
      <table className="w-full my-3 border-collapse">
        <thead>
          <tr className="bg-[#f5f5f5]">
            <th className="border p-2 text-left">Operator</th>
            <th className="border p-2 text-left">Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border p-2"><code>+</code></td><td className="border p-2">add</td></tr>
          <tr><td className="border p-2"><code>-</code></td><td className="border p-2">subtract</td></tr>
          <tr><td className="border p-2"><code>*</code></td><td className="border p-2">multiply</td></tr>
          <tr><td className="border p-2"><code>/</code></td><td className="border p-2">divide</td></tr>
          <tr><td className="border p-2"><code>%</code></td><td className="border p-2">remainder</td></tr>
          <tr><td className="border p-2"><code>==</code></td><td className="border p-2">equals?</td></tr>
          <tr><td className="border p-2"><code>!=</code></td><td className="border p-2">not equals?</td></tr>
          <tr><td className="border p-2"><code>&&</code></td><td className="border p-2">AND</td></tr>
          <tr><td className="border p-2"><code>||</code></td><td className="border p-2">OR</td></tr>
          <tr><td className="border p-2"><code>:=</code></td><td className="border p-2">short variable declaration</td></tr>
          <tr><td className="border p-2"><code>{"<-"}</code></td><td className="border p-2">send/receive on channel</td></tr>
          <tr><td className="border p-2"><code>++</code></td><td className="border p-2">increment by 1</td></tr>
          <tr><td className="border p-2"><code>--</code></td><td className="border p-2">decrement by 1</td></tr>
        </tbody>
      </table>

      <hr className="border-none border-t border-[#ddd] my-6" />

      <h3 className="text-[#5f6368] text-xl font-semibold">Part 10: Integer Literals</h3>

      <p><strong>An integer literal is a sequence of digits representing an integer constant.</strong></p>

      <h4 className="font-semibold mt-4">Different bases:</h4>
      <table className="w-full my-3 border-collapse">
        <thead>
          <tr className="bg-[#f5f5f5]">
            <th className="border p-2 text-left">Prefix</th>
            <th className="border p-2 text-left">Base</th>
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Example</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border p-2">none</td><td className="border p-2">10</td><td className="border p-2">Decimal</td><td className="border p-2">42</td></tr>
          <tr><td className="border p-2">0b or 0B</td><td className="border p-2">2</td><td className="border p-2">Binary</td><td className="border p-2">0b101010</td></tr>
          <tr><td className="border p-2">0, 0o, or 0O</td><td className="border p-2">8</td><td className="border p-2">Octal</td><td className="border p-2">0o52</td></tr>
          <tr><td className="border p-2">0x or 0X</td><td className="border p-2">16</td><td className="border p-2">Hexadecimal</td><td className="border p-2">0x2A</td></tr>
        </tbody>
      </table>

      <h4 className="font-semibold mt-4">Underscores for readability:</h4>
      <CodeBlock>{"// These are ALL the same number:\n1000000\n1_000_000      // easier to read!"}</CodeBlock>

      <h4 className="font-semibold mt-4">Valid examples:</h4>
      <CodeBlock>{"42              // decimal\n4_2             // decimal with underscore = 42\n0600            // octal (old style)\n0o600           // octal (new style)\n0xBadFace       // hexadecimal\n0xBad_Face      // hexadecimal with underscore\n170_141183_460469_231731_687303_715884_105727  // big number, readable"}</CodeBlock>

      <h4 className="font-semibold mt-4">Invalid examples:</h4>
      <CodeBlock>{"_42            // ← this is an IDENTIFIER (starts with _), not a number\n42_            // ← underscore must be BETWEEN digits, not at the end\n4__2           // ← only ONE underscore at a time\n0_xBadFace     // ← underscore must separate DIGITS, not prefix letters"}</CodeBlock>

      <h4 className="font-semibold mt-4">Grammar Rules:</h4>
      <CodeBlock>{"int_lit        = decimal_lit | binary_lit | octal_lit | hex_lit .\ndecimal_lit    = \"0\" | ( \"1\" … \"9\" ) [ [ \"_\" ] decimal_digits ] .\ndecimal_digits = decimal_digit { [ \"_\" ] decimal_digit } ."}</CodeBlock>

      <hr className="border-none border-t border-[#ddd] my-6" />

      <h3 className="text-[#5f6368] text-xl font-semibold">The Big Picture 🎯</h3>
      
      <CodeBlock>{"Source Code\n    ↓\nCharacters (UTF-8 Unicode)\n    ↓\nLetters & Digits (basic building blocks)\n    ↓\nTokens (identifiers, keywords, operators, literals)\n    ↓\nGo Program!"}</CodeBlock>
    </section>
  )
}