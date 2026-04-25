"use client"

import { CodeBlock, Note, Tip, ComparisonTable, Warning } from '@/components/ui'

export function PointersTutorial() {
  return (
    <section>
      <h2 id="pointers-tutorial" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        Part 3: Pointer Types
      </h2>
      <p className="mt-4">
        In this tutorial, you'll learn what pointers are, how to use them in Go, and how they compare to PHP/Laravel. 
        Let's start with the fundamental question: what actually IS a pointer?
      </p>

      
      <h3 className="text-[#5f6368] mt-8 text-xl font-medium">
        📚 What is a Pointer?
      </h3>
      
      <p className="mt-4">
        A <strong>pointer</strong> is a variable that stores a <em>memory address</em> instead of a actual value. Think of it like this:
      </p>

      <div className="my-6 p-4 bg-[#f8f9fa] rounded-lg border border-[#e8eaed]">
        <h4 className="font-semibold text-[#1a73e8] mb-3">🏠 The House Address Analogy</h4>
        <div className="space-y-4 font-mono text-sm">
          <div className="flex items-start gap-3">
            <span className="text-[#1a73e8] font-bold">✦</span>
            <div>
              <strong>Regular variable</strong> = The actual house 🏠
              <br />
              <span className="text-[#5f6368]">x := 42 means x IS the value 42</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[#1a73e8] font-bold">✦</span>
            <div>
              <strong>Pointer</strong> = The address written on a piece of paper 📍
              <br />
              <span className="text-[#5f6368]">p := &x means p CONTAINS where 42 lives in memory</span>
            </div>
          </div>
        </div>
      </div>

      <h4 className="font-semibold mt-6 mb-3">🎨 Memory Diagram</h4>
      <div className="my-4 font-mono text-sm bg-[#1a1a2e] text-[#eee] p-4 rounded-lg overflow-x-auto">
        <div className="whitespace-pre">{`┌─────────────────────────────────────────────────────────────────┐
│                        MEMORY                                  │
├─────────────────────────────────────────────────────────────────┤
│  Address    │  Name    │  Value   │  Description              │
├───────────┼─────────┼─────────┼─────────────────────────┤
│  0x1000  │    x    │   42    │ Regular int variable      │
│  0x1004  │    p    │  0x1000 │ Pointer (stores x's   │
│           │         │         │ address!)              │
└─────────────────────────────────────────────────────────────────┘

   x = 42           (stores VALUE)
   p = &x           (stores ADDRESS of x → 0x1000)
   *p = 100         (follows address → changes x to 100)`}</div>
      </div>

      <h4 className="font-semibold mt-6 mb-3">⚡ The Two Essential Operators</h4>
      <ComparisonTable>
        <thead>
          <tr>
            <th>Operator</th>
            <th>Name</th>
            <th>What it does</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><CodeBlock>{"&"}</CodeBlock></td>
            <td>Address-of</td>
            <td>Get memory address of a variable</td>
            <td><CodeBlock>{"p := &x"}</CodeBlock></td>
          </tr>
          <tr>
            <td><CodeBlock>{"*"}</CodeBlock></td>
            <td>Dereference</td>
            <td>Follow address to get/set the value</td>
            <td><CodeBlock>{"fmt.Println(*p)"}</CodeBlock></td>
          </tr>
        </tbody>
      </ComparisonTable>

      <h4 className="font-semibold mt-8 mb-3">💡 AHA MOMENT: Why Do Pointers Exist?</h4>
      <div className="my-4 p-4 bg-[#e8f5e9] rounded-lg border border-[#4caf50]">
        <ul className="space-y-2">
          <li>✦ <strong>Efficiency:</strong> Don't copy large data — just pass the address</li>
          <li>✦ <strong>Mutability:</strong> Modify data outside the function</li>
          <li>✦ <strong>Shared state:</strong> Multiple parts of code can access the same data</li>
        </ul>
      </div>

      <p className="mt-4">
        In PHP, objects are automatically references. In Go, you have <em>explicit control</em> — you decide 
        when to use pointers.
      </p>

      <Note>
        <h4 className="font-bold">From the Go Specification</h4>
        <p className="mt-2">
          A pointer is a direct reference to the stored data. For type T, pointer type is *T. 
          The zero value of a pointer is nil.
        </p>
      </Note>

      
      <h3 className="text-[#5f6368] mt-12 text-xl font-medium">
        🧪 Pointer Operations
      </h3>
      
      <p className="mt-4">Let's see each operation in action:</p>

      <h4 className="font-semibold mt-6 mb-3">Step 1: Creating a Pointer with {"&"}</h4>
      <CodeBlock>{`func main() {
    x := 42
    
    // & gives us the ADDRESS of x
    p := &x
    
    fmt.Println("x =", x)   // x = 42
    fmt.Println("p =", p)   // p = 0xc00001a110 (memory address)
}`}</CodeBlock>

      <h4 className="font-semibold mt-6 mb-3">Step 2: Reading Through a Pointer with {"*"}</h4>
      <CodeBlock>{`func main() {
    x := 42
    p := &x
    
    // *p follows the address and reads the value
    fmt.Println("*p =", *p)   // *p = 42
}`}</CodeBlock>

      <h4 className="font-semibold mt-6 mb-3">Step 3: Writing Through a Pointer with {"*"}</h4>
      <CodeBlock>{`func main() {
    x := 42
    p := &x
    
    fmt.Println("Before: x =", x)   // Before: x = 42
    
    // *p writes to the memory location
    *p = 100
    
    fmt.Println("After:  x =", x)   // After: x = 100  (x was modified!)
    fmt.Println("*p =", *p)          // *p = 100
}`}</CodeBlock>

      <h4 className="font-semibold mt-6 mb-3">🔮 PREDICT: What Happens Here?</h4>
      <div className="my-4 p-4 bg-[#fff3e0] rounded-lg border border-[#ff9800]">
        <CodeBlock>{`func main() {
    a := 5
    b := &a
    *b = 10
    c := &a
    fmt.Println(a, *b, *c)
}`}</CodeBlock>
        <p className="mt-3 font-semibold text-[#e65100]">Answer: All three print 10! ✦</p>
        <p className="mt-1 text-sm text-[#5f6368]">
          b and c both point to the same address — modifying through either affects a.
        </p>
      </div>

      <h4 className="font-semibold mt-6 mb-3">Step 4: Nil Pointer</h4>
      <CodeBlock>{`func main() {
    var p *int  // nil (zero value)
    
    fmt.Println(p)  // <nil>
    
    // This would PANIC!
    // fmt.Println(*p)  // panic: invalid memory address
}`}</CodeBlock>

      <Warning>
        <p><strong>Never dereference a nil pointer!</strong></p>
        <p className="mt-2">When you declare a pointer with <CodeBlock>{"var p *int"}</CodeBlock> without 
        initialization, p is nil. Accessing *p causes a panic.</p>
      </Warning>

      <h4 className="font-semibold mt-6 mb-3">Step 5: Pointer to Pointer</h4>
      <CodeBlock>{`func main() {
    x := 42
    p := &x      // *int
    pp := &p     // **int (pointer to pointer)
    
    fmt.Println(x)    // 42
    fmt.Println(*p)   // 42
    fmt.Println(**pp)  // 42
}`}</CodeBlock>

      <div className="my-6 font-mono text-sm bg-[#1a1a2e] text-[#eee] p-4 rounded-lg overflow-x-auto">
        <div className="whitespace-pre">{`┌────────────────────────────────────────────────────────┐
     Pointer to Pointer Memory Layout                │
├────────────────────────────────────────┤
  x    = 42   (at 0x1000)                │
  p    = 0x1000  (points to x)           │
  pp   = 0x1004  (points to p)           │
                                            │
  **pp = follows pp → p → x → 42          │
└────────────────────────────────────────┘`}</div>
      </div>

      <h4 className="font-semibold mt-6 mb-3">❓ QUIZ</h4>
      <div className="my-4 p-4 bg-[#e3f2fd] rounded-lg border border-[#2196f3]">
        <p className="font-semibold">What does this print?</p>
        <CodeBlock>{`func main() {
    x := 1
    y := 2
    p := &x
    p = &y
    *p = 3
    fmt.Println(x, y)
}`}</CodeBlock>
        <p className="mt-3 font-semibold text-[#1565c0]">Answer: x=1, y=3 ✦</p>
        <p className="mt-1 text-sm text-[#5f6368]">
          p was reassigned to point to y, then y was modified through the pointer. x is unchanged.
        </p>
      </div>

      
      <h3 className="text-[#5f6368] mt-12 text-xl font-medium">
        🔄 Pointers and Functions
      </h3>
      
      <p className="mt-4">
        This is where pointers become incredibly useful. By default, Go passes arguments <em>by value</em> — 
        a copy is made. But with pointers, you can modify the original!
      </p>

      <h4 className="font-semibold mt-6 mb-3">📊 Pass by Value vs Pass by Pointer</h4>
      <ComparisonTable>
        <thead>
          <tr>
            <th>Aspect</th>
            <th>Pass by Value</th>
            <th>Pass by Pointer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Syntax</td>
            <td><CodeBlock>{"func foo(x int)"}</CodeBlock></td>
            <td><CodeBlock>{"func foo(x *int)"}</CodeBlock></td>
          </tr>
          <tr>
            <td>What gets copied</td>
            <td>The value (e.g., 42)</td>
            <td>The address (e.g., 0x1000)</td>
          </tr>
          <tr>
            <td>Can modify original?</td>
            <td>✗ No</td>
            <td>✓ Yes</td>
          </tr>
          <tr>
            <td>Performance for large data</td>
            <td>Slow (full copy)</td>
            <td>Fast (just address)</td>
          </tr>
        </tbody>
      </ComparisonTable>

      <h4 className="font-semibold mt-6 mb-3">Before/After Diagram</h4>
      <div className="my-6 font-mono text-sm bg-[#1a1a2e] text-[#eee] p-4 rounded-lg overflow-x-auto">
        <div className="whitespace-pre">{`╔═══════════════════════════════════════════════════════════╗
║  PASS BY VALUE (copy made)                          ║
╠════════════════════════���═���════════════════════════╣
║  BEFORE:                                      ║
║    main: x = 42                               ║
║    foo: xCopy = ???  ← COPY made                 ║
║                                            ║
║  AFTER foo() modifies xCopy:                     ║
║    main: x = 42  ← UNCHANGED! 😞               ║
║    foo: xCopy = 100                          ║
╚═══════════════════════════════════════════════════════╝

╔═══════════════════════════════════════════════════════════╗
║  PASS BY POINTER (address shared)                 ║
╠═══════════════════════════════════════════════════╣
║  BEFORE:                                      ║
║    main: x = 42   at 0x1000                    ║
║    foo: p → 0x1000  ← points to SAME memory    ║
║                                            ║
║  AFTER foo() modifies *p:                      ║
║    main: x = 100  ← CHANGED! 🎉              ║
║    foo: *p = 100                              ║
╚═══════════════════════════════════════════════╝`}</div>
      </div>

      <h4 className="font-semibold mt-6 mb-3">Practical Example</h4>
      <CodeBlock>{`// Pass by VALUE - original unchanged
func incrementByValue(x int) {
    x = x + 1
    // Only the COPY is modified
}

func main() {
    count := 10
    incrementByValue(count)
    fmt.Println(count)  // Still 10! 😞
}

// ─────────────────────────────────────────────

// Pass by POINTER - original modified!
func incrementByPointer(x *int) {
    *x = *x + 1
    // Actually modifies the original
}

func main() {
    count := 10
    incrementByPointer(&count)
    fmt.Println(count)  // Now 11! 🎉
}`}</CodeBlock>

      <h4 className="font-semibold mt-6 mb-3">⚡ CHALLENGE: Swap Two Values</h4>
      <div className="my-4 p-4 bg-[#f3e5f5] rounded-lg border border-[#9c27b0]">
        <p className="font-semibold">Write a swap function that exchanges two values!</p>
        <CodeBlock>{`// Hint: Use pointers to swap these
func swap(a *int, b *int) {
    // Your code here
}

func main() {
    x := 10
    y := 20
    swap(&x, &y)
    fmt.Println(x, y)  // Should print: 20 10
}`}</CodeBlock>
        <details className="mt-3">
          <summary className="cursor-pointer text-[#7b1fa2] font-semibold">Show Answer</summary>
          <CodeBlock>{`func swap(a *int, b *int) {
    temp := *a
    *a = *b
    *b = temp
}`}</CodeBlock>
        </details>
      </div>

      <h4 className="font-semibold mt-6 mb-3">Returning Pointers (Escape Analysis)</h4>
      <CodeBlock>{`// Safe to return a pointer - Go handles the memory!
func newInt() *int {
    x := 42
    return &x  // x escapes to the heap
}

func main() {
    p := newInt()
    fmt.Println(*p)  // 42 - still valid!
}`}</CodeBlock>

      <Tip>
        <p><strong>Go's Escape Analysis:</strong></p>
        <p className="mt-2">When you return a pointer to a local variable, Go automatically 
        "escaps" it to the heap so it remains valid after the function returns. 
        This is safe — you don't need to manually manage memory!</p>
      </Tip>

      <h4 className="font-semibold mt-6 mb-3">PHP/Laravel Comparison</h4>
      <ComparisonTable>
        <thead>
          <tr>
            <th>Concept</th>
            <th>Go</th>
            <th>PHP/Laravel</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Pointer syntax</td>
            <td>Explicit: <CodeBlock>{"*int"}</CodeBlock></td>
            <td>Objects are auto-references</td>
          </tr>
          <tr>
            <td>Getting address</td>
            <td><CodeBlock>{"&x"}</CodeBlock></td>
            <td>n/a (automatic)</td>
          </tr>
          <tr>
            <td>Method receiver</td>
            <td><CodeBlock>{"func (p *Person) Eat()"}</CodeBlock></td>
            <td><CodeBlock>{"public function eat()"}</CodeBlock></td>
          </tr>
          <tr>
            <td>$this access</td>
            <td>Explicit dereference</td>
            <td>Auto-$this</td>
          </tr>
        </tbody>
      </ComparisonTable>

      <h4 className="font-semibold mt-6 mb-3">Laravel: $this is Like a Pointer!</h4>
      <CodeBlock>{`// Go
type User struct {
    Name string
}

func (u *User) Rename(newName string) {
    u.Name = newName  // modifies the original!
}

// PHP/Laravel
class User {
    public function rename(string $newName) {
        $this->name = $newName;  // same idea!
    }
}`}</CodeBlock>

      <Note>
        <h4 className="font-bold">Key Insight</h4>
        <p className="mt-2">
          In Laravel, when you do <CodeBlock>{"$user->name = 'Alice'"}</CodeBlock>, you're modifying 
          through an implicit reference — similar to Go's <CodeBlock>{"(*p).Name = 'Alice'"}</CodeBlock>. 
          Go just makes it explicit!
        </p>
      </Note>

      
      <h3 className="text-[#5f6368] mt-12 text-xl font-medium">
        🏗️ Pointers and Structs
      </h3>
      
      <p className="mt-4">
        Go has a magical feature: automatic dereferencing with structs. You can use p.field instead of (*p).field!
      </p>

      <h4 className="font-semibold mt-6 mb-3">Automatic Dereferencing</h4>
      <CodeBlock>{`type Person struct {
    Name string
    Age  int
}

func main() {
    p := &Person{Name: "Alice", Age: 30}
    
    // These are IDENTICAL:
    fmt.Println((*p).Name)  // Explicit - Alice
    fmt.Println(p.Name)      // Automatic - Alice
    
    // Both work the same way!
    (*p).Age = 31
    p.Age = 32           // Much prettier!
}`}</CodeBlock>

      <h4 className="font-semibold mt-6 mb-3">Two Ways to Create Struct Pointers</h4>
      <ComparisonTable>
        <thead>
          <tr>
            <th>Method</th>
            <th>Syntax</th>
            <th>When to use</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>&amp;Type{}</td>
            <td><CodeBlock>{"p := &Person{Name: \"Bob\"}"}</CodeBlock></td>
            <td>When you need a pointer</td>
          </tr>
          <tr>
            <td>new(Type)</td>
            <td><CodeBlock>{"p := new(Person)"}</CodeBlock></td>
            <td>When you need zero values</td>
          </tr>
        </tbody>
      </ComparisonTable>

      <CodeBlock>{`// Method 1: &Type{} - initialize with values
p1 := &Person{
    Name: "Alice",
    Age:  30,
}

// Method 2: new(Type) - zero values
p2 := new(Person)  // Name="", Age=0
p2.Name = "Bob"
p2.Age = 25`}</CodeBlock>

      <h4 className="font-semibold mt-6 mb-3">Pointer Receivers</h4>
      <CodeBlock>{`// Value receiver - gets a COPY
func (p Person) String() string {
    return fmt.Sprintf("%s is %d years old", p.Name, p.Age)
}

// Pointer receiver - can modify!
func (p *Person) Birthday() {
    p.Age++  // modifies the original
}

func main() {
    alice := &Person{Name: "Alice", Age: 30}
    alice.Birthday()  // alice.Age is now 31!
    fmt.Println(alice)  // Alice is 31 years old
}`}</CodeBlock>

      <Tip>
        <p><strong>When to use pointer receivers:</strong></p>
        <ul className="mt-2 space-y-1">
          <li>✓ When the method needs to modify the struct</li>
          <li>✓ When the struct is large (avoid copying)</li>
          <li>✓ For consistency with other pointer-receiver methods</li>
        </ul>
      </Tip>

      
      <h3 className="text-[#5f6368] mt-12 text-xl font-medium">
        ⚠️ Pointer Gotchas
      </h3>
      
      <h4 className="font-semibold mt-6 mb-3">1. Nil Pointer Dereference</h4>
      <CodeBlock>{`func main() {
    var p *int  // p is nil
    
    fmt.Println(p)  // OK: <nil>
    
    // THIS PANICS!
    fmt.Println(*p)  // panic: invalid memory address or nil pointer dereference
}`}</CodeBlock>

      <Warning>
        <p><strong>Always check for nil before dereferencing!</strong></p>
        <CodeBlock>{`func safeIncrement(p *int) {
    if p != nil {
        *p++
    }
    // Or:
    if p == nil {
        return
    }
    *p++
}`}</CodeBlock>
      </Warning>

      <h4 className="font-semibold mt-6 mb-3">2. Dangling Pointers</h4>
      <p className="mt-2">Go prevents these automatically!</p>
      <CodeBlock>{`func createInt() *int {
    x := 42
    return &x  // Go keeps x alive! No dangling.
}

func main() {
    p := createInt()
    fmt.Println(*p)  // 42 - still valid
}`}</CodeBlock>

      <p className="mt-4 text-[#5f6368]">
        In languages like C, returning &x would create a dangling pointer (x is freed!). 
        Go's escape analysis automatically moves x to the heap.
      </p>

      <h4 className="font-semibold mt-6 mb-3">3. Pointer Equality</h4>
      <CodeBlock>{`func main() {
    x := 42
    p1 := &x
    p2 := &x
    
    fmt.Println(p1 == p2)  // true - same address!
    
    y := 42
    p3 := &y
    
    fmt.Println(p1 == p3)  // false - different addresses
    // Even if values are equal, addresses differ!
}`}</CodeBlock>

      <Note>
        <h4 className="font-bold">Pointer Equality Rules</h4>
        <ul className="mt-2 space-y-1">
          <li>Two pointers are equal if they point to the same address</li>
          <li>Both nil pointers are equal</li>
          <li>Pointers to different variables are never equal, even with same values</li>
        </ul>
      </Note>

      
      <h3 className="text-[#5f6368] mt-12 text-xl font-medium">
        ⛔ When NOT to Use Pointers
      </h3>
      
      <h4 className="font-semibold mt-6 mb-3">1. Small Structs (Copying is Faster!)</h4>
      <CodeBlock>{`// This is FINE - no pointer needed
type Point struct {
    X float64
    Y float64
}

func distance(a, b Point) float64 {
    dx := a.X - b.X
    dy := a.Y - b.Y
    return math.Sqrt(dx*dx + dy*dy)
}

// 16 bytes - cheap to copy!
// Using pointers would add indirection overhead
`}</CodeBlock>

      <h4 className="font-semibold mt-6 mb-3">2. Immutability Preference</h4>
      <CodeBlock>{`// Creating a NEW value (immutable style)
func addOne(x int) int {
    return x + 1  // returns new value
}

func main() {
    original := 10
    result := addOne(original)
    // original still 10, result is 11
    // original was NEVER modified!
}`}</CodeBlock>

      <Tip>
        <p><strong>When to prefer values over pointers:</strong></p>
        <ul className="mt-2 space-y-1">
          <li>✓ Small structs (fewer than ~32 bytes)</li>
          <li>✓ When you want immutability</li>
          <li>✓ Concurrent access without synchronization</li>
          <li>✓ When data doesn't need modification</li>
        </ul>
      </Tip>

      <h4 className="font-semibold mt-6 mb-3">📊 CHEAT SHEET</h4>
      <div className="my-6 overflow-x-auto border border-[#e8eaed] rounded-lg">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-[#1a73e8] text-white">
              <th className="p-3 text-left">Symbol</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Usage</th>
            </tr>
          </thead>
          <tbody className="bg-[#f8f9fa]">
            <tr className="border-b border-[#e8eaed]">
              <td className="p-3 font-mono text-sm">{"&x"}</td>
              <td className="p-3">Address-of</td>
              <td className="p-3">Get pointer to x</td>
            </tr>
            <tr className="border-b border-[#e8eaed]">
              <td className="p-3 font-mono text-sm">*p</td>
              <td className="p-3">Dereference</td>
              <td className="p-3">Get value at p</td>
            </tr>
            <tr className="border-b border-[#e8eaed]">
              <td className="p-3 font-mono text-sm">*Type</td>
              <td className="p-3">Pointer type</td>
              <td className="p-3">Type of pointer to Type</td>
            </tr>
            <tr className="border-b border-[#e8eaed]">
              <td className="p-3 font-mono text-sm">nil</td>
              <td className="p-3">Nil pointer</td>
              <td className="p-3">Zero value of pointers</td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-sm">new(T)</td>
              <td className="p-3">Allocation</td>
              <td className="p-3">Allocate zero value of T</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 className="font-semibold mt-6 mb-3">🗺️ ROADMAP: What's Next?</h4>
      <div className="my-6 p-4 bg-[#e8f5e9] rounded-lg border border-[#4caf50]">
        <p className="font-semibold mb-2">You've learned pointers! Next steps:</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Interfaces</strong> - Combine with pointers for polymorphism</li>
          <li><strong>Methods</strong> - Use pointer receivers (*Player).Score()</li>
          <li><strong>Concurrency</strong> - Share pointers with goroutines carefully</li>
          <li><strong>nil Slices/Maps</strong> - nil is valid, not just for pointers!</li>
        </ol>
      </div>

      <h3 className="text-[#5f6368] mt-12 text-xl font-medium">
        📝 Summary
      </h3>
      
      <div className="my-6 p-4 bg-[#f8f9fa] rounded-lg border border-[#e8eaed]">
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Pointers</strong> store memory addresses, not values</li>
          <li><strong>{"&"}</strong> gets the address (creates a pointer)</li>
          <li><strong>{"*"}</strong> follows the address (dereferences)</li>
          <li><strong>Pointers in functions</strong> allow modification and avoid copying large data</li>
          <li><strong>p.field</strong> works via automatic dereferencing</li>
          <li><strong>nil</strong> is the zero value — always check before dereferencing!</li>
          <li><strong>Go's escape analysis</strong> prevents dangling pointers</li>
          <li><strong>Small structs</strong> are cheaper to copy than to pointer-indirect</li>
        </ul>
      </div>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </section>
  )
}