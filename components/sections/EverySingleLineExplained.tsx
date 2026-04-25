import { CodeBlock, Note } from '@/components/ui'

export function EverySingleLineExplained() {
  return (
    <section>
      <h2 id="every-single-line-explained" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        Every Single Line Explained
      </h2>
      
      <p className="text-[#5f6368] my-3">
        This section breaks down the Go grammar specification line by line.
      </p>

      <h3 className="text-[#5f6368] text-xl font-semibold mt-6">Syntax</h3>
      <CodeBlock>{"Syntax = { Production } ."}</CodeBlock>
      
      <p><strong>What it says:</strong> The entire syntax/grammar is made of zero or more Productions.</p>
      <p>Think of it like a book:</p>
      <CodeBlock>{"Book = { Page } ."}</CodeBlock>
      <p>A book is made of many pages. Could even be zero pages (empty book).</p>

      <hr className="border-none border-t border-[#ddd] my-6" />

      <h3 className="text-[#5f6368] text-xl font-semibold">Production</h3>
      <CodeBlock>{"Production = production_name \"=\" [ Expression ] \".\" ."}</CodeBlock>
      
      <p><strong>What it says:</strong> A Production (a single rule) is:</p>
      <ul className="list-disc pl-6 my-2">
        <li>A name</li>
        <li>Then an equals sign <code>=</code></li>
        <li>Then maybe an Expression (optional because of <code>[ ]</code>)</li>
        <li>Then a dot <code>.</code></li>
      </ul>
      
      <p><strong>Real example:</strong></p>
      <CodeBlock>{"Breakfast = Eggs Bacon ."}</CodeBlock>
      <p>Another example with no expression (empty rule):</p>
      <CodeBlock>{"Nothing = ."}</CodeBlock>
      <Note>This is valid too because Expression is optional!</Note>

      <hr className="border-none border-t border-[#ddd] my-6" />

      <h3 className="text-[#5f6368] text-xl font-semibold">Expression</h3>
      <CodeBlock>{"Expression = Term { \"|\" Term } ."}</CodeBlock>
      
      <p><strong>What it says:</strong> An Expression is one Term, then zero or more (| followed by another Term)</p>
      <p><strong>Simple example</strong> (just one Term):</p>
      <CodeBlock>{"Eggs Bacon"}</CodeBlock>
      <p><strong>Example with choices:</strong></p>
      <CodeBlock>{"Eggs Bacon | Pancakes | Cereal Milk"}</CodeBlock>
      <p>It&apos;s like a menu: pick ONE option from the choices.</p>

      <hr className="border-none border-t border-[#ddd] my-6" />

      <h3 className="text-[#5f6368] text-xl font-semibold">Term</h3>
      <CodeBlock>{"Term = Factor { Factor } ."}</CodeBlock>
      
      <p><strong>What it says:</strong> A Term is one Factor, then zero or more additional Factors</p>
      <CodeBlock>{"Eggs Bacon Toast"}</CodeBlock>
      <p>It&apos;s like a sequence: do this, THEN this, THEN this.</p>
      
      <Note>
        <strong>Key difference:</strong>
        <br />Expression = choices (OR)
        <br />Term = sequence (AND)
      </Note>

      <hr className="border-none border-t border-[#ddd] my-6" />

      <h3 className="text-[#5f6368] text-xl font-semibold">Factor</h3>
      <CodeBlock>{"Factor = production_name | token [ \"…\" token ] | Group | Option | Repetition ."}</CodeBlock>
      
      <p><strong>What it says:</strong> A Factor is ONE of these five things:</p>
      
      <h4 className="font-semibold mt-3">Option 1: production_name</h4>
      <p>A reference to another rule.</p>
      
      <h4 className="font-semibold mt-3">Option 2: token [ "…" token ]</h4>
      <p>An actual literal value, or a range of values.</p>
      <CodeBlock>{"\"if\"              // just one token\n\"a\" … \"z\"        // a range from a to z"}</CodeBlock>
      
      <h4 className="font-semibold mt-3">Option 3: Group</h4>
      <p>Something in parentheses.</p>
      <CodeBlock>{"( Eggs | Pancakes )"}</CodeBlock>
      
      <h4 className="font-semibold mt-3">Option 4: Option</h4>
      <p>Something in square brackets (optional).</p>
      <CodeBlock>{"[ Cheese ]"}</CodeBlock>
      
      <h4 className="font-semibold mt-3">Option 5: Repetition</h4>
      <p>Something in curly braces (repeat).</p>
      <CodeBlock>{"{ Topping }"}</CodeBlock>

      <hr className="border-none border-t border-[#ddd] my-6" />

      <h3 className="text-[#5f6368] text-xl font-semibold">Group</h3>
      <CodeBlock>{"Group = \"(\" Expression \")\" ."}</CodeBlock>
      <p><strong>What it says:</strong> A Group is an Expression wrapped in <code>( )</code></p>
      <p>Why do we need this? Without grouping:</p>
      <CodeBlock>{"A B | C"}</CodeBlock>
      <p>Does this mean <code>(A B) | C</code> or <code>A (B | C)</code>? Confusing!</p>
      <p>With grouping:</p>
      <CodeBlock>{"A ( B | C )"}</CodeBlock>
      <p>Now it&apos;s clear: A, then either B or C.</p>

      <hr className="border-none border-t border-[#ddd] my-6" />

      <h3 className="text-[#5f6368] text-xl font-semibold">Option</h3>
      <CodeBlock>{"Option = \"[\" Expression \"]\" ."}</CodeBlock>
      <p><strong>What it says:</strong> An Option is an Expression wrapped in <code>[ ]</code>. It means &quot;this part is optional&quot;</p>
      <CodeBlock>{"Burger = Bun Meat [Cheese] Bun ."}</CodeBlock>
      <p>Both are valid:</p>
      <ul className="list-disc pl-6">
        <li>Bun Meat Cheese Bun ✅</li>
        <li>Bun Meat Bun ✅</li>
      </ul>

      <hr className="border-none border-t border-[#ddd] my-6" />

      <h3 className="text-[#5f6368] text-xl font-semibold">Repetition</h3>
      <CodeBlock>{"Repetition = \"{\" Expression \"}\" ."}</CodeBlock>
      <p><strong>What it says:</strong> A Repetition is an Expression wrapped in <code>{ }</code>. It means &quot;zero or more times&quot;</p>
      <CodeBlock>{"Train = Engine { Wagon } ."}</CodeBlock>
      <p>Valid trains:</p>
      <ul className="list-disc pl-6">
        <li>Engine ✅ (zero wagons)</li>
        <li>Engine Wagon ✅ (one wagon)</li>
        <li>Engine Wagon Wagon ✅ (two wagons)</li>
        <li>... and so on forever!</li>
      </ul>

      <hr className="border-none border-t border-[#ddd] my-6" />

      <h3 className="text-[#5f6368] text-xl font-semibold">Operator Precedence</h3>
      <p>From weakest to strongest:</p>
      <table className="w-full my-3 border-collapse">
        <thead>
          <tr className="bg-[#f5f5f5]">
            <th className="border p-2 text-left">Operator</th>
            <th className="border p-2 text-left">Precedence</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border p-2"><code>|</code></td><td className="border p-2">weakest → OR choices happen LAST</td></tr>
          <tr><td className="border p-2"><code>()</code></td><td className="border p-2">↓</td></tr>
          <tr><td className="border p-2"><code>[]</code></td><td className="border p-2">↓</td></tr>
          <tr><td className="border p-2"><code>{ }</code></td><td className="border p-2">strongest → repetition happens FIRST</td></tr>
        </tbody>
      </table>
      
      <p>Example: <code>A | B C</code></p>
      <p>Because <code>|</code> is the weakest, this means <code>A | (B C)</code></p>
      <p>Either A alone OR B followed by C. NOT <code>(A | B) C</code></p>

      <hr className="border-none border-t border-[#ddd] my-6" />

      <h3 className="text-[#5f6368] text-xl font-semibold">Case Sensitivity</h3>
      <ul className="list-disc pl-6 my-2">
        <li><strong>lowercase</strong> = real actual characters you type (terminal tokens)</li>
        <li><strong>CamelCase</strong> = rule names that have their own definition</li>
        <li><strong>Tokens in quotes</strong> = literal text</li>
      </ul>
      <CodeBlock>{"production_name  // lowercase = terminal\nExpression       // CamelCase = non-terminal\n\"if\"              // quoted = literal"}</CodeBlock>

      <hr className="border-none border-t border-[#ddd] my-6" />

      <h3 className="text-[#5f6368] text-xl font-semibold">Full Summary</h3>
      <ul className="list-disc pl-6 my-2">
        <li>Syntax is made of many rules (Productions)</li>
        <li>Each rule (Production) has a name and a definition</li>
        <li>A definition (Expression) gives you choices (<code>|</code>)</li>
        <li>Each choice (Term) is a sequence of pieces</li>
        <li>Each piece (Factor) is either:
          <ul className="list-disc pl-6 mt-2">
            <li>a reference to another rule</li>
            <li>an actual token/word</li>
            <li>something grouped in <code>( )</code></li>
            <li>something optional in <code>[ ]</code></li>
            <li>something repeated in <code>{ }</code></li>
          </ul>
        </li>
      </ul>
      <p className="mt-4">That&apos;s everything! 🎉</p>
    </section>
  )
}