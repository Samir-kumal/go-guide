import { CodeBlock, Note, Tip, ComparisonTable } from '@/components/ui'

export function Basics() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="basics" className="text-[#777BB4] mt-10 text-2xl font-semibold">
          PHP Basics
        </h2>
        <p>PHP (Hypertext Preprocessor) is a widely-used, open source, server-side scripting language designed for web development.</p>
        
        <h3 className="text-[#5f6368] mt-6 font-semibold">Variable Declaration</h3>
        <p>In PHP, all variables start with a <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">$</code> sign.</p>
        <CodeBlock>{`<?php
$name = "John";     // String
$age = 30;          // Integer
$is_admin = true;   // Boolean
$price = 19.99;     // Float`}</CodeBlock>
        
        <Note>
          <strong>JS Tip:</strong> Unlike JavaScript&apos;s <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">const</code> or <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">let</code>, PHP variables are always prefixed with <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">$</code>.
        </Note>
      </section>

      <section>
        <h3 id="data-types" className="text-[#5f6368] mt-8 font-semibold">Data Types</h3>
        <ComparisonTable>
          <thead>
            <tr>
              <th>Type</th>
              <th>PHP Example</th>
              <th>JS Equivalent</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>String</td><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">"Hello"</code></td><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">'Hello'</code></td></tr>
            <tr><td>Integer</td><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">42</code></td><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">42</code> (Number)</td></tr>
            <tr><td>Float</td><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">3.14</code></td><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">3.14</code> (Number)</td></tr>
            <tr><td>Boolean</td><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">true</code></td><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">true</code></td></tr>
            <tr><td>Array</td><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">[1, 2, 3]</code></td><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">[1, 2, 3]</code></td></tr>
            <tr><td>Object</td><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">new User()</code></td><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">{"{}"}</code></td></tr>
            <tr><td>NULL</td><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">null</code></td><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">null</code></td></tr>
          </tbody>
        </ComparisonTable>
      </section>

      <section>
        <h3 id="control-structures" className="text-[#5f6368] mt-8 font-semibold">Control Structures</h3>
        <p>PHP&apos;s control structures are very similar to JavaScript.</p>
        <CodeBlock>{`<?php
if ($age > 18) {
    echo "Adult";
} else {
    echo "Minor";
}

switch ($status) {
    case 'active':
        // ...
        break;
    default:
        // ...
}`}</CodeBlock>
      </section>

      <section>
        <h3 id="loops" className="text-[#5f6368] mt-8 font-semibold">Loops & Iteration</h3>
        <p>PHP provides a powerful <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">foreach</code> loop for iterating over arrays.</p>
        <CodeBlock>{`<?php
// Indexed array
$colors = ['red', 'green', 'blue'];
foreach ($colors as $color) {
    echo "Color: $color\\n";
}

// Associative array (like JS objects)
$user = [
    'name' => 'John',
    'email' => 'john@email.com'
];
foreach ($user as $key => $value) {
    echo "$key: $value\\n";
}`}</CodeBlock>
        
        <Tip>
          <strong>JS Tip:</strong> PHP&apos;s <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">foreach ($arr as $k =&gt; $v)</code> is similar to JavaScript&apos;s <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Object.entries(obj).forEach(([k, v]) =&gt; ...)</code>.
        </Tip>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}
