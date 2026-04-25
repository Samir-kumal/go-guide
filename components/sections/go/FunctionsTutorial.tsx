"use client"

import { CodeBlock, Note, Tip, ComparisonTable, Warning } from '@/components/ui'

export function FunctionsTutorial() {
  return (
    <section>
      <h2 id="functions-tutorial" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        Part 4: Function Types
      </h2>
      <p className="mt-4">
        In this tutorial, you'll learn about Go functions — from basics to advanced patterns like closures and higher-order functions.
        We'll compare everything with PHP/Laravel so you can see the differences and similarities.
      </p>

      
      <h3 className="text-[#5f6368] mt-8 text-xl font-medium">
        📚 Function Basics
      </h3>
      
      <p className="mt-4">
        Functions are the building blocks of Go programs. Let's start with the anatomy of a function.
      </p>

      <h4 className="font-semibold mt-6 mb-3">🎨 Function Anatomy</h4>
      <div className="my-6 font-mono text-sm bg-[#1a1a2e] text-[#eee] p-4 rounded-lg overflow-x-auto">
        <div className="whitespace-pre">{`┌────────────────────────────────────────────────────────────┐
     FUNCTION SYNTAX                                    │
├────────────────────────────────────────────────────┤
  func    name    (parameters)  (returnType)  { body } │
  ───    ────    ────────────  ────────────  ──────── │
  keyword  │      │           │            │
           │      │           │            └─ Code block
           │      │           └─ What the function returns
           │      └─ Input parameters (can be empty)
           └─ Function name (identifier)
 └────────────────────────────────────────────────────────────┘`}</div>
      </div>

      <CodeBlock>{`// Simple function - no parameters, no return
func greet() {
    fmt.Println("Hello, World!")
}

// Function with one parameter
func greetPerson(name string) {
    fmt.Println("Hello,", name)
}

// Function with parameter AND return value
func add(a int, b int) int {
    return a + b
}

// Call them!
func main() {
    greet()
    greetPerson("Alice")
    result := add(1, 2)
    fmt.Println(result)  // 3
}`}</CodeBlock>

      <h4 className="font-semibold mt-6 mb-3">💡 AHA MOMENT: Multiple Return Values!</h4>
      <div className="my-4 p-4 bg-[#e8f5e9] rounded-lg border border-[#4caf50]">
        <p className="font-semibold">Go's Superpower: Multiple Return Values!</p>
        <p className="mt-2">
          Go functions can return multiple values — this is incredibly useful for error handling!
        </p>
      </div>

      <CodeBlock>{`// Return TWO values at once!
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("cannot divide by zero")
    }
    return a / b, nil
}

func main() {
    result, err := divide(10, 2)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println(result)  // 5
    
    // Handle the error case
    result, err = divide(10, 0)
    if err != nil {
        fmt.Println("Error:", err)  // Error: cannot divide by zero
    }
}`}</CodeBlock>

      <h4 className="font-semibold mt-6 mb-3">🎨 Multiple Return Values Diagram</h4>
      <div className="my-6 font-mono text-sm bg-[#1a1a2e] text-[#eee] p-4 rounded-lg overflow-x-auto">
        <div className="whitespace-pre">{`┌─────────────────────────────────────────────────────────────┐
    MULTIPLE RETURN VALUES                                │
├─────────────────────────────────────────────────────┤
                                                     │
func divide(a, b) (float64, error) {                  │
    │          │         │    │                         │
    │          │         │    └── Returns: error (or nil)  │
    │          │         └────── Returns: float64      │
    │          └────────────── Input: b             │
    └──────────────────────────────── Input: a         │
                                                     │
  result, err := divide(10, 2)                        │
         │     │                                    │
         │     └─ error (nil = success!)                │
         └────── result = 5                          │
└─────────────────────────────────────────────────────────────┘`}</div>
      </div>

      <h4 className="font-semibold mt-6 mb-3">Named Return Values</h4>
      <CodeBlock>{`// You can NAME your return values!
// This makes the code self-documenting
func split(sum int) (x, y int) {
    x = sum * 4 / 9
    y = sum - x
    return  // Naked return!
}

func main() {
    fmt.Println(split(17))  // 7 10
}`}</CodeBlock>

      <Tip>
        <p><strong>When to use named returns:</strong></p>
        <ul className="mt-2 space-y-1">
          <li>✓ For documentation (makes return values clear)</li>
          <li>✓ For simple functions with multiple returns</li>
          <li>✗ Avoid in complex functions (can be confusing)</li>
        </ul>
      </Tip>

      <h4 className="font-semibold mt-6 mb-3">🔮 PREDICT: What Happens?</h4>
      <div className="my-4 p-4 bg-[#fff3e0] rounded-lg border border-[#ff9800]">
        <CodeBlock>{`func foo() (x int, y int) {
    return  // What does this return?
}

func main() {
    fmt.Println(foo())
}`}</CodeBlock>
        <p className="mt-3 font-semibold text-[#e65100]">Answer: 0 0 ✦</p>
        <p className="mt-1 text-sm text-[#5f6368]">
          Named returns default to zero values if not explicitly set!
        </p>
      </div>

      <h4 className="font-semibold mt-6 mb-3">❓ QUIZ</h4>
      <div className="my-4 p-4 bg-[#e3f2fd] rounded-lg border border-[#2196f3]">
        <p className="font-semibold">What's the output?</p>
        <CodeBlock>{`func swap(a, b int) (int, int) {
    return b, a
}

func main() {
    x, y := swap(1, 2)
    fmt.Println(x, y)
}`}</CodeBlock>
        <p className="mt-3 font-semibold text-[#1565c0]">Answer: 2 1 ✦</p>
        <p className="mt-1 text-sm text-[#5f6368]">
          Multiple return values let you "return" multiple things at once!
        </p>
      </div>

      
      <h3 className="text-[#5f6368] mt-12 text-xl font-medium">
        🔄 Function Signatures
      </h3>
      
      <p className="mt-4">
        A function's <strong>signature</strong> defines what it accepts and returns. 
        Parameter names in the signature don't matter for type identity!
      </p>

      <h4 className="font-semibold mt-6 mb-3">Parameter Names Don't Matter!</h4>
      <CodeBlock>{`// These have the SAME signature!
func add(a int, b int) int {
    return a + b
}

func plus(x int, y int) int {
    return x + y
}

// Same type: func(int, int) int
// Names (a,b) vs (x,y) don't matter for matching
`}</CodeBlock>

      <Note>
        <h4 className="font-bold">Key Insight</h4>
        <p className="mt-2">
          In Go, only the <strong>types</strong> matter, not the parameter names.
          <CodeBlock>{"func(int, int) int"}</CodeBlock> is the same type whether you name parameters or not!
        </p>
      </Note>

      <h4 className="font-semibold mt-6 mb-3">Variadic Functions</h4>
      <p className="mt-2">
        Use <CodeBlock>{"...int"}</CodeBlock> to accept zero or more values of a type.
      </p>

      <CodeBlock>{`// Variadic: accepts ANY number of ints
func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}

func main() {
    fmt.Println(sum())        // 0
    fmt.Println(sum(1))       // 1
    fmt.Println(sum(1, 2))    // 3
    fmt.Println(sum(1, 2, 3)) // 6
}`}</CodeBlock>

      <div className="my-6 font-mono text-sm bg-[#1a1a2e] text-[#eee] p-4 rounded-lg overflow-x-auto">
        <div className="whitespace-pre">{`┌─────────────────────────────────────────────────────────────┐
    VARIADIC PARAMETER (...)                           │
├─────────────────────────────────────────────────────┤
                                                     │
func sum(nums ...int) int {                          │
    │       │                                      │
    │       └─ "nums is a SLICE of int"             │
    └─ The ... means "zero or more"                │
}                                                 │
                                                     │
  Inside the function, nums is []int!                │
  You can iterate over it like a normal slice         │
└─────────────────────────────────────────────────────────────┘`}</div>
      </div>

      <h4 className="font-semibold mt-6 mb-3">Laravel Route Callbacks (Equivalent)</h4>
      <ComparisonTable>
        <thead>
          <tr>
            <th>Aspect</th>
            <th>Go</th>
            <th>PHP/Laravel</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Route handler</td>
            <td><CodeBlock>{"func(w http.ResponseWriter, r *http.Request)"}</CodeBlock></td>
            <td><CodeBlock>{"function(Request $request)"}</CodeBlock></td>
          </tr>
          <tr>
            <td>Variadic</td>
            <td><CodeBlock>{"func(nums ...int)"}</CodeBlock></td>
            <td><CodeBlock>{"function(...$args) {}"}</CodeBlock></td>
          </tr>
          <tr>
            <td>Multiple returns</td>
            <td><CodeBlock>{"func() (int, error)"}</CodeBlock></td>
            <td>throw/try or array</td>
          </tr>
        </tbody>
      </ComparisonTable>

      <CodeBlock>{`// Laravel equivalent of route with multiple returns!
// In Laravel you'd do:
Route::get('/user/{id}', function ($id) {
    $user = User::find($id);
    if (!$user) {
        return response()->json(['error' => 'Not found'], 404);
    }
    return $user;  // Single return
});`}</CodeBlock>

      <h4 className="font-semibold mt-6 mb-3">⚡ CHALLENGE: Variadic Average</h4>
      <div className="my-4 p-4 bg-[#f3e5f5] rounded-lg border border-[#9c27b0]">
        <p className="font-semibold">Write a function that calculates the average!</p>
        <CodeBlock>{`func average(nums ...float64) float64 {
    // Your code here
}

func main() {
    fmt.Println(average(1, 2, 3))  // 2
}`}</CodeBlock>
        <details className="mt-3">
          <summary className="cursor-pointer text-[#7b1fa2] font-semibold">Show Answer</summary>
          <CodeBlock>{`func average(nums ...float64) float64 {
    if len(nums) == 0 {
        return 0
    }
    sum := 0.0
    for _, n := range nums {
        sum += n
    }
    return sum / float64(len(nums))
}`}</CodeBlock>
        </details>
      </div>

      
      <h3 className="text-[#5f6368] mt-12 text-xl font-medium">
        🎯 Functions as Values (First-Class Functions)
      </h3>
      
      <p className="mt-4">
        In Go, functions are <strong>first-class</strong> — you can store them in variables,
        pass them as arguments, and return them from functions!
      </p>

      <h4 className="font-semibold mt-6 mb-3">Storing Functions in Variables</h4>
      <CodeBlock>{`// Store a function in a variable!
var add func(int, int) int = func(a, b int) int {
    return a + b
}

// Or use type inference
multiply := func(a, b int) int {
    return a * b
}

func main() {
    fmt.Println(add(1, 2))      // 3
    fmt.Println(multiply(3, 4))   // 12
}`}</CodeBlock>

      <h4 className="font-semibold mt-6 mb-3">Function Type Declarations</h4>
      <CodeBlock>{`// Define a Function Type!
type Operator func(int, int) int

// Now use it!
func apply(a int, b int, op Operator) int {
    return op(a, b)
}

func main() {
    add := func(a, b int) int { return a + b }
    multiply := func(a, b int) int { return a * b }
    
    fmt.Println(apply(2, 3, add))      // 5
    fmt.Println(apply(2, 3, multiply)) // 6
}`}</CodeBlock>

      <div className="my-6 font-mono text-sm bg-[#1a1a2e] text-[#eee] p-4 rounded-lg overflow-x-auto">
        <div className="whitespace-pre">{`┌─────────────────────────────────────────────────────────────┐
    FUNCTION TYPE ANATOMY                             │
├─────────────────────────────────────────────────────┤
                                                     │
  type Operator func(int, int) int                   │
  │       │        └── Return type                   │
  │       └─ Parameter types (in order!)           │
  └─ The name of your type                          │
                                                     │
  Now you can use Operator anywhere:               │
  - As a parameter type                            │
  - As a return type                               │
  - To declare variables                           │
└─────────────────────────────────────────────────────────────┘`}</div>
      </div>

      <h4 className="font-semibold mt-6 mb-3">Passing Functions as Arguments</h4>
      <CodeBlock>{`// HOF: Takes a function as an argument!
func transform(numbers []int, fn func(int) int) []int {
    result := make([]int, len(numbers))
    for i, n := range numbers {
        result[i] = fn(n)
    }
    return result
}

func main() {
    nums := []int{1, 2, 3, 4}
    
    // Pass different functions!
    doubled := transform(nums, func(x int) int {
        return x * 2
    })
    fmt.Println(doubled)  // [2 4 6 8]
    
    squared := transform(nums, func(x int) int {
        return x * x
    })
    fmt.Println(squared)  // [1 4 9 16]
}`}</CodeBlock>

      <h4 className="font-semibold mt-6 mb-3">Returning Functions from Functions</h4>
      <CodeBlock>{`// Return a function!
func multiplier(factor int) func(int) int {
    // This is a CLOSURE! (more on this later)
    return func(x int) int {
        return x * factor
    }
}

func main() {
    double := multiplier(2)
    triple := multiplier(3)
    
    fmt.Println(double(5))   // 10
    fmt.Println(triple(5))   // 15
    
    fmt.Println(multiplier(10)(3))  // 30
}`}</CodeBlock>

      <h4 className="font-semibold mt-6 mb-3">Laravel: Closures in Routes</h4>
      <CodeBlock>{`// Go: Function passed as argument
numbers := []int{1, 2, 3, 4}
doubled := transform(numbers, func(x int) int {
    return x * 2
})

// Laravel equivalent: Closure in route or Collection
$numbers = [1, 2, 3, 4];
$doubled = array_map(function($x) {
    return $x * 2;
}, $numbers);

// Laravel Collection way
$doubled = collect([1, 2, 3, 4])
    ->map(function($x) { return $x * 2; })
    ->all();  // [2, 4, 6, 8]`}</CodeBlock>

      <Tip>
        <p><strong>Go vs PHP Closures:</strong></p>
        <ul className="mt-2 space-y-1">
          <li>Go: Inline function literal: <CodeBlock>{"func(x int) int { return x * 2 }"}</CodeBlock></li>
          <li>PHP: <CodeBlock>{"function($x) { return $x * 2; }"}</CodeBlock> - same idea!</li>
          <li>Both can capture outer variables</li>
        </ul>
      </Tip>

      
      <h3 className="text-[#5f6368] mt-12 text-xl font-medium">
        🔒 Closures
      </h3>
      
      <p className="mt-4">
        A <strong>closure</strong> is a function that captures variables from its outer scope.
        This is incredibly powerful — and has a common gotcha!
      </p>

      <h4 className="font-semibold mt-6 mb-3">Capturing Variables</h4>
      <CodeBlock>{`// Closure captures the outer variable!
func main() {
    x := 10
    
    // This closure "captures" x
    increment := func() int {
        x++
        return x
    }
    
    fmt.Println(increment())  // 11
    fmt.Println(increment())  // 12
    fmt.Println(x)         // 12 (x was modified!)
}`}</CodeBlock>

      <div className="my-6 font-mono text-sm bg-[#1a1a2e] text-[#eee] p-4 rounded-lg overflow-x-auto">
        <div className="whitespace-pre">{`┌─────────────────────────────────────────────────────────────┐
    CLOSURE CAPTURE                                      │
├─────────────────────────────────────────────────────────────┤
                                                      │
  x := 10   ──►  ┌─────────────────┐                     │
                      │  x = 10        │ ◄── shared!      │
  increment ──────►  │  increment()   │                │
     () --------►   │    x++        │                │
                      │  return x     │                │
                      └─────────────────┘                │
                                                      │
  The closure REFS the original x, not a copy!             │
└─────────────────────────────────────────────────────────────┘`}</div>
      </div>

      <h4 className="font-semibold mt-6 mb-3">⚠️ The Loop Variable Gotcha!</h4>
      <div className="my-4 p-4 bg-[#ffebee] rounded-lg border border-[#f44336]">
        <p className="font-semibold text-[#c62828]">COMMON MISTAKE!</p>
        <p className="mt-2">
          When you create closures in a loop, they all capture the <em>same</em> variable!
        </p>
      </div>

      <CodeBlock>{`// ❌ WRONG! All closures capture the SAME i!
func main() {
    var funcs []func()
    
    for i := 0; i < 3; i++ {
        funcs = append(funcs, func() {
            fmt.Println(i)  // Captures i by reference!
        })
    }
    
    for _, f := range funcs {
        f()  // What does this print?
    }
}`}</CodeBlock>

      <Warning>
        <p><strong>The problem:</strong></p>
        <p className="mt-2">
          All three functions print <CodeBlock>{"3"}</CodeBlock> — they all share the same i!
          By the time you call them, i is 3 (the loop ended).
        </p>
      </Warning>

      <h4 className="font-semibold mt-6 mb-3">✅ The Fix: Capture the Current Value</h4>
      <CodeBlock>{`// ✅ CORRECT! Capture the CURRENT value!
func main() {
    var funcs []func()
    
    for i := 0; i < 3; i++ {
        i := i  // Create a NEW variable each iteration!
        funcs = append(funcs, func() {
            fmt.Println(i)
        })
    }
    
    for _, f := range funcs {
        f()  // Prints: 0, 1, 2
    }
}`}</CodeBlock>

      <p className="mt-4 text-[#5f6368]">
        The trick: <CodeBlock>{"i := i"}</CodeBlock> creates a new variable in each iteration
        that shadows the loop variable. Each closure captures its own unique i!
      </p>

      <h4 className="font-semibold mt-6 mb-3">Laravel: The use() Keyword</h4>
      <ComparisonTable>
        <thead>
          <tr>
            <th>Aspect</th>
            <th>Go</th>
            <th>PHP/Laravel</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Capture outer var</td>
            <td>Auto-capture</td>
            <td>Explicit: use($var)</td>
          </tr>
          <tr>
            <td>By reference</td>
            <td><CodeBlock>{"i := i"}</CodeBlock></td>
            <td><CodeBlock>{"use(&$var)"}</CodeBlock></td>
          </tr>
          <tr>
            <td>By value</td>
            <td>Auto (copies)</td>
            <td><CodeBlock>{"use($var)"}</CodeBlock></td>
          </tr>
        </tbody>
      </ComparisonTable>

      <CodeBlock>{`// Go: Auto-capture (but create new var for loop fix)
for i := 0; i < 3; i++ {
    i := i  // New var, captures correctly
    funcs = append(funcs, func() { fmt.Println(i) })
}

// PHP/Laravel: Explicit use()
$funcs = [];
for ($i = 0; $i < 3; $i++) {
    $funcs[] = function() use($i) {  // By value
        echo $i;
    };
}

// By reference in Laravel:
$funcs[] = function() use(&$i) {  // By reference
    echo $i;
};`}</CodeBlock>

      <h4 className="font-semibold mt-6 mb-3">❓ QUIZ</h4>
      <div className="my-4 p-4 bg-[#e3f2fd] rounded-lg border border-[#2196f3]">
        <p className="font-semibold">What does this print?</p>
        <CodeBlock>{`func main() {
    f := createFunc()
    g := createFunc()
    fmt.Println(f())
    fmt.Println(g())
}

func createFunc() func() int {
    counter := 0
    return func() int {
        counter++
        return counter
    }
}`}</CodeBlock>
        <p className="mt-3 font-semibold text-[#1565c0]">Answer: 1, 1 ✦</p>
        <p className="mt-1 text-sm text-[#5f6368]">
          Each createFunc() call creates a NEW counter variable!
          f and g have separate captured variables.
        </p>
      </div>

      
      <h3 className="text-[#5f6368] mt-12 text-xl font-medium">
        🔮 Anonymous Functions
      </h3>
      
      <p className="mt-4">
        Anonymous functions are defined inline without a name. Perfect for quick operations!
      </p>

      <h4 className="font-semibold mt-6 mb-3">Inline Function Definitions</h4>
      <CodeBlock>{`// Anonymous function - no name, just assigned to variable
greet := func(name string) {
    fmt.Println("Hello,", name)
}

greet("Alice")  // Hello, Alice

// Or call immediately!
func(x int) {
    fmt.Println(x * 2)
}(21)  // 42`}</CodeBlock>

      <h4 className="font-semibold mt-6 mb-3">Route::get() Equivalent</h4>
      <CodeBlock>{`// Go: HTTP handler is an anonymous function
http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Hello, World!")
})

// Laravel equivalent:
Route::get('/hello', function() {
    return "Hello, World!";
});`}</CodeBlock>

      <h4 className="font-semibold mt-6 mb-3">⚡ CHALLENGE: Callback Pattern</h4>
      <div className="my-4 p-4 bg-[#f3e5f5] rounded-lg border border-[#9c27b0]">
        <p className="font-semibold">Rewrite this using anonymous functions!</p>
        <CodeBlock>{`func isEven(n int) bool {
    return n % 2 == 0
}

func filterEvens(nums []int) []int {
    var result []int
    for _, n := range nums {
        if isEven(n) {
            result = append(result, n)
        }
    }
    return result
}`}</CodeBlock>
        <details className="mt-3">
          <summary className="cursor-pointer text-[#7b1fa2] font-semibold">Show Answer</summary>
          <CodeBlock>{`func filter(nums []int, fn func(int) bool) []int {
    var result []int
    for _, n := range nums {
        if fn(n) {
            result = append(result, n)
        }
    }
    return result
}

func main() {
    nums := []int{1, 2, 3, 4, 5, 6}
    
    // Use anonymous function inline!
    evens := filter(nums, func(n int) bool {
        return n % 2 == 0
    })
    fmt.Println(evens)  // [2 4 6]
}`}</CodeBlock>
        </details>
      </div>

      
      <h3 className="text-[#5f6368] mt-12 text-xl font-medium">
        🔄 Higher-Order Functions
      </h3>
      
      <p className="mt-4">
        <strong>Higher-order functions</strong> take or return functions. 
        Let's build map, filter, and reduce from scratch!
      </p>

      <h4 className="font-semibold mt-6 mb-3">Map - Transform Each Element</h4>
      <CodeBlock>{`// Map: Transform each element
func Map[T any, U any](items []T, fn func(T) U) []U {
    result := make([]U, len(items))
    for i, item := range items {
        result[i] = fn(item)
    }
    return result
}

func main() {
    numbers := []int{1, 2, 3, 4}
    
    // Double each number
    doubled := Map(numbers, func(n int) int {
        return n * 2
    })
    fmt.Println(doubled)  // [2 4 6 8]
    
    // Convert to strings
    strings := Map(numbers, func(n int) string {
        return fmt.Sprintf("num-%d", n)
    })
    fmt.Println(strings)  // [num-1 num-2 num-3 num-4]
}`}</CodeBlock>

      <h4 className="font-semibold mt-6 mb-3">Filter - Keep Matching Elements</h4>
      <CodeBlock>{`// Filter: Keep elements that match predicate
func Filter[T any](items []T, fn func(T) bool) []T {
    var result []T
    for _, item := range items {
        if fn(item) {
            result = append(result, item)
        }
    }
    return result
}

func main() {
    numbers := []int{1, 2, 3, 4, 5, 6}
    
    // Keep only evens
    evens := Filter(numbers, func(n int) bool {
        return n % 2 == 0
    })
    fmt.Println(evens)  // [2 4 6]
    
    // Keep numbers greater than 3
    big := Filter(numbers, func(n int) bool {
        return n > 3
    })
    fmt.Println(big)  // [4 5 6]
}`}</CodeBlock>

      <h4 className="font-semibold mt-6 mb-3">Reduce - Combine All Elements</h4>
      <CodeBlock>{`// Reduce: Combine all elements into one
func Reduce[T any, R any](items []T, initial R, fn func(R, T) R) R {
    result := initial
    for _, item := range items {
        result = fn(result, item)
    }
    return result
}

func main() {
    numbers := []int{1, 2, 3, 4}
    
    // Sum all numbers
    sum := Reduce(numbers, 0, func(acc int, n int) int {
        return acc + n
    })
    fmt.Println(sum)  // 10
    
    // Find max
    max := Reduce(numbers, 0, func(acc int, n int) int {
        if n > acc {
            return n
        }
        return acc
    })
    fmt.Println(max)  // 4
    
    // Multiply all
    product := Reduce(numbers, 1, func(acc int, n int) int {
        return acc * n
    })
    fmt.Println(product)  // 24
}`}</CodeBlock>

      <h4 className="font-semibold mt-6 mb-3">Laravel Collection Comparison</h4>
      <ComparisonTable>
        <thead>
          <tr>
            <th>Operation</th>
            <th>Go</th>
            <th>PHP/Laravel</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Map</td>
            <td><CodeBlock>{"Map(items, fn)"}</CodeBlock></td>
            <td><CodeBlock>{"->map(fn)"}</CodeBlock></td>
          </tr>
          <tr>
            <td>Filter</td>
            <td><CodeBlock>{"Filter(items, fn)"}</CodeBlock></td>
            <td><CodeBlock>{"->filter(fn)"}</CodeBlock></td>
          </tr>
          <tr>
            <td>Reduce</td>
            <td><CodeBlock>{"Reduce(items, init, fn)"}</CodeBlock></td>
            <td><CodeBlock>{"->reduce(fn, init)"}</CodeBlock></td>
          </tr>
          <tr>
            <td>Generic types</td>
            <td>✓ (Go 1.18+)</td>
            <td>✓ (PHP 8+)</td>
          </tr>
        </tbody>
      </ComparisonTable>

      <CodeBlock>{`// Go: Map, Filter, Reduce
numbers := []int{1, 2, 3, 4, 5}

result := Reduce(
    Filter(Map(numbers, func(n int) int { return n * 2 }),
    0,
    func(acc, n int) int { return acc + n }
)
// Map: [2, 4, 6, 8, 10]
// Filter evens: [2, 4, 6, 8, 10]
// Reduce sum: 30

// Laravel: Chain them!
$result = collect([1, 2, 3, 4, 5])
    ->map(fn($n) => $n * 2)
    ->filter(fn($n) => $n % 2 === 0)
    ->sum();  // 30`}</CodeBlock>

      <h4 className="font-semibold mt-6 mb-3">🔮 PREDICT: What's the Result?</h4>
      <div className="my-4 p-4 bg-[#fff3e0] rounded-lg border border-[#ff9800]">
        <CodeBlock>{`words := []string{"hello", "world", "go"}
upper := Map(words, func(s string) string {
    return strings.ToUpper(s)
})
fmt.Println(upper)`}</CodeBlock>
        <p className="mt-3 font-semibold text-[#e65100]">Answer: [HELLO WORLD GO] ✦</p>
        <p className="mt-1 text-sm text-[#5f6368]">
          Map applies the function to each element!
        </p>
      </div>

      
      <h3 className="text-[#5f6368] mt-12 text-xl font-medium">
        ⚠️ Error Handling with Functions
      </h3>
      
      <p className="mt-4">
        This is where Go's multiple return values shine! The <CodeBlock>{"(result, error)"}</CodeBlock> 
        pattern is idiomatic Go.
      </p>

      <h4 className="font-semibold mt-6 mb-3">The (result, error) Pattern</h4>
      <CodeBlock>{`// Idiomatic Go: Return result AND error
func findUser(id int) (*User, error) {
    if id <= 0 {
        return nil, errors.New("invalid id")
    }
    
    user, ok := database.Load(id)
    if !ok {
        return nil, fmt.Errorf("user %d not found", id)
    }
    
    return user, nil  // Success - error is nil!
}

func main() {
    user, err := findUser(1)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println("Found:", user.Name)
}`}</CodeBlock>

      <div className="my-6 font-mono text-sm bg-[#1a1a2e] text-[#eee] p-4 rounded-lg overflow-x-auto">
        <div className="whitespace-pre">{`┌─────────────────────────────────────────────────────────────┐
    ERROR HANDLING PATTERN                               │
├─────────────────────────────────────────────────────┤
                                                     │
  user, err := findUser(1)                            │
  │      │                                           │
  │      └─ nil = success, otherwise = error message│
  └─ The actual result (or nil if error!)            │
                                                     │
  if err != nil {                                     │
      // Handle failure!                              │
  }                                                  │
  // Use user...                                     │
                                                     │
  ALWAYS check error FIRST!                           │
└─────────────────────────────────────────────────────────────┘`}</div>
      </div>

      <h4 className="font-semibold mt-6 mb-3">Laravel: try/catch vs Go</h4>
      <ComparisonTable>
        <thead>
          <tr>
            <th>Aspect</th>
            <th>Go</th>
            <th>PHP/Laravel</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Error reporting</td>
            <td>Return (result, error)</td>
            <td>throw/try/catch</td>
          </tr>
          <tr>
            <td>Checking errors</td>
            <td><CodeBlock>{"if err != nil"}</CodeBlock></td>
            <td><CodeBlock>{"catch (Exception $e)"}</CodeBlock></td>
          </tr>
          <tr>
            <td>Success case</td>
            <td>error is nil</td>
            <td>No exception thrown</td>
          </tr>
          <tr>
            <td>Multiple errors</td>
            <td>Custom error types</td>
            <td>Multiple catch blocks</td>
          </tr>
        </tbody>
      </ComparisonTable>

      <CodeBlock>{`// Go: Check error explicitly
user, err := findUser(1)
if err != nil {
    log.Error(err)
    return err
}

// Laravel: try/catch
try {
    $user = User::findOrFail($id);
} catch (ModelNotFoundException $e) {
    return response()->json(['error' => 'Not found'], 404);
}

// Or Laravel's "find" which returns null
$user = User::find($id);
if (!$user) {
    return response()->json(['error' => 'Not found'], 404);
}`}</CodeBlock>

      <Warning>
        <p><strong>Golden Rule:</strong></p>
        <p className="mt-2">
          ALWAYS check the error first! If <CodeBlock>{"err != nil"}</CodeBlock>,
          the result might be nil — don't use it!
        </p>
      </Warning>

      <h4 className="font-semibold mt-6 mb-3">⚡ CHALLENGE: Safe Division</h4>
      <div className="my-4 p-4 bg-[#f3e5f5] rounded-lg border border-[#9c27b0]">
        <p className="font-semibold">Implement safe division with error handling!</p>
        <CodeBlock>{`func divide(a, b float64) (float64, error) {
    // Handle: division by zero
    // Return: result, error
}

func main() {
    fmt.Println(divide(10, 2))  // 5, nil
    fmt.Println(divide(10, 0))   // 0, error
}`}</CodeBlock>
        <details className="mt-3">
          <summary className="cursor-pointer text-[#7b1fa2] font-semibold">Show Answer</summary>
          <CodeBlock>{`func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("cannot divide by zero")
    }
    return a / b, nil
}`}</CodeBlock>
        </details>
      </div>

      <h4 className="font-semibold mt-6 mb-3">📊 CHEAT SHEET</h4>
      <div className="my-6 overflow-x-auto border border-[#e8eaed] rounded-lg">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-[#1a73e8] text-white">
              <th className="p-3 text-left">Syntax</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Usage</th>
            </tr>
          </thead>
          <tbody className="bg-[#f8f9fa]">
            <tr className="border-b border-[#e8eaed]">
              <td className="p-3 font-mono text-sm">{"func name(p T) T"}</td>
              <td className="p-3">Basic function</td>
              <td className="p-3">Simple input/output</td>
            </tr>
            <tr className="border-b border-[#e8eaed]">
              <td className="p-3 font-mono text-sm">{"func(a, b T) (T, error)"}</td>
              <td className="p-3">Multiple returns</td>
              <td className="p-3">Error handling</td>
            </tr>
            <tr className="border-b border-[#e8eaed]">
              <td className="p-3 font-mono text-sm">{"func(nums ...int)"}</td>
              <td className="p-3">Variadic</td>
              <td className="p-3">Zero or more args</td>
            </tr>
            <tr className="border-b border-[#e8eaed]">
              <td className="p-3 font-mono text-sm">{"type F func(int) int"}</td>
              <td className="p-3">Function type</td>
              <td className="p-3">Type alias for functions</td>
            </tr>
            <tr className="border-b border-[#e8eaed]">
              <td className="p-3 font-mono text-sm">{"func() int { return x }"}</td>
              <td className="p-3">Closure</td>
              <td className="p-3">Captures outer vars</td>
            </tr>
            <tr className="border-b border-[#e8eaed]">
              <td className="p-3 font-mono text-sm">{"fn := func() {}"}</td>
              <td className="p-3">Anonymous function</td>
              <td className="p-3">Inline function literal</td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-sm">{"i := i"}</td>
              <td className="p-3">Loop capture fix</td>
              <td className="p-3">Fix closure in loop</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 className="font-semibold mt-6 mb-3">🗺️ ROADMAP: What's Next?</h4>
      <div className="my-6 p-4 bg-[#e8f5e9] rounded-lg border border-[#4caf50]">
        <p className="font-semibold mb-2">You've learned functions! Next steps:</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Methods</strong> - Functions attached to types</li>
          <li><strong>Interfaces</strong> - Define behavior contracts</li>
          <li><strong>Go Routines</strong> - Concurrent functions</li>
          <li><strong>Channels</strong> - Communicate between goroutines</li>
        </ol>
      </div>

      
      <h3 className="text-[#5f6368] mt-12 text-xl font-medium">
        📝 Summary
      </h3>
      
      <div className="my-6 p-4 bg-[#f8f9fa] rounded-lg border border-[#e8eaed]">
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Functions</strong> are defined with <CodeBlock>{"func"}</CodeBlock></li>
          <li><strong>Multiple returns</strong> are Go's superpower for error handling</li>
          <li><strong>Variadic</strong> with <CodeBlock>{"..."}</CodeBlock> accepts any number</li>
          <li><strong>Function types</strong> can be declared and used like any type</li>
          <li><strong>Closures</strong> capture variables from outer scope</li>
          <li><strong>Loop variable gotcha:</strong> use <CodeBlock>{"i := i"}</CodeBlock> to fix</li>
          <li><strong>Anonymous functions</strong> are inline function literals</li>
          <li><strong>Higher-order functions</strong> take/return functions (map, filter, reduce)</li>
          <li><strong>Error pattern:</strong> always check <CodeBlock>{"err != nil"}</CodeBlock> first!</li>
        </ul>
      </div>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </section>
  )
}