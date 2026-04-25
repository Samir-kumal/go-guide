"use client"

import { CodeBlock, Note, Tip, ComparisonTable, Warning } from '@/components/ui'

export function BlocksScopeTutorial() {
  return (
    <section>
      <h2 id="blocks-scope-tutorial" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        Part 10: Blocks, Scope & Declarations
      </h2>
      <p className="mt-4">
        This tutorial covers Go's block system, scoping rules, and various declaration types.
        You'll understand how Go manages variable visibility and lifetime, with comparisons to PHP.
      </p>

      
      <h3 className="text-[#5f6368] mt-8 text-xl font-medium">
        📦 What Are Blocks?
      </h3>
      <p className="mt-4">
        A block is a sequence of statements enclosed in braces. Blocks determine scope boundaries.
      </p>

      
      <h4 className="font-semibold mt-6 mb-3">🔨 Explicit Blocks</h4>
      <p className="mt-4">
        Explicit blocks are defined with curly braces <code>{"{ }"}</code>. They create their own scope boundaries.
      </p>

      <CodeBlock>{`// Block with braces - creates a new scope
func main() {
    {  // Start of inner block
        x := 10
        fmt.Println(x)  // ✓ x is accessible here
    }  // End of inner block - x no longer exists
    
    // fmt.Println(x)  // ✗ ERROR: undefined: x
}`}</CodeBlock>

      
      <h4 className="font-semibold mt-6 mb-3">🎯 Implicit Blocks</h4>
      <p className="mt-4">
        Go also has implicit blocks that you might not see directly:
      </p>

      <CodeBlock>{`// Go's implicit blocks:
// 1. Universe block - predeclared identifiers (int, string, etc.)
// 2. Package block - all files in the same package
// 3. File block - the entire file (for imports)
// 4. Function block - inside a function body
// 5. For/if/switch blocks - control flow constructs

// Example: package block - shared across files
package main  // All code in this file shares package block

// Example: imports are in their own implicit block
import ("fmt")  // fmt is only available in this file's universe`}</CodeBlock>

      <Note>
        <strong>Key Insight:</strong> Each block scope can "see" identifiers from outer blocks, 
        but not vice versa. This is called lexical scoping.
      </Note>

      
      <h3 className="text-[#5f6368] mt-8 text-xl font-medium">
        🔍 Lexical Scoping
      </h3>
      <p className="mt-4">
        Lexical scoping (also called static scoping) means the scope of a variable is determined 
        by where it appears in the source code, not at runtime.
      </p>

      <CodeBlock>{`// Lexical scoping in action
func main() {
    x := "outer"
    
    if true {
        x := "inner"  // This is a NEW variable, shadows the outer one
        fmt.Println(x)  // Prints: inner
    }
    
    fmt.Println(x)  // Prints: outer (inner was destroyed)
}`}</CodeBlock>

      <h4 className="font-semibold mt-6 mb-3">⚠️ Variable Shadowing</h4>
      <p className="mt-4">
        When you declare a variable with the same name in an inner block, it shadows the outer one.
        This can lead to subtle bugs!
      </p>

      <CodeBlock>{`// Shadowing can cause confusion
func main() {
    x := 10
    
    if x > 5 {
        x := 20  // This DECLARES a new x, doesn't assign to outer!
        fmt.Println(x)  // 20 (the new shadowed x)
    }
    
    fmt.Println(x)  // Still 10! The outer x was not modified
}

// Correct way to modify outer variable
func main() {
    x := 10
    
    if x > 5 {
        x = 20  // Assignment to existing variable
        fmt.Println(x)  // 20
    }
    
    fmt.Println(x)  // 20 - outer x was modified
}`}</CodeBlock>

      <Warning>
        Avoid shadowing unless intentional. Use your IDE to detect shadowed variables.
      </Warning>

      
      <h3 className="text-[#5f6368] mt-8 text-xl font-medium">
        📝 Declaration Types
      </h3>
      <p className="mt-4">
        Go has five ways to declare identifiers:
      </p>

      
      <h4 className="font-semibold mt-6 mb-3">1. const - Constants</h4>
      <CodeBlock>{`// Constants - fixed values that cannot change
const Pi = 3.14159
const greeting = "Hello"

// Multiple constants in a group
const (
    StatusOK = 200
    StatusNotFound = 404
    StatusServerError = 500
)

// Typed vs untyped constants
const typedInt int = 42        // Type: int
const untyped = 42           // Untyped, inferred as int
const untypedFloat = 3.14    // Untyped, inferred as float64`}</CodeBlock>

      <h4 className="font-semibold mt-6 mb-3">2. var - Variables</h4>
      <CodeBlock>{`// Variables - can change value
var count int = 0
var name string = "Alice"

// Package-level variables (declared outside functions)
var globalVar = "I'm global to this file"

// Short variable declaration (只能在函数内)
x := 10  // same as: var x int = 10`}</CodeBlock>

      <h4 className="font-semibold mt-6 mb-3">3. type - Type Declarations</h4>
      <CodeBlock>{`// Type alias - another name for an existing type
type myInt = int  // myInt is just an alias for int

// Type definition - creates a NEW type
type Age int  // Age is a NEW type, not interchangeable with int

var age Age = 25
// var x int = age  // ERROR: cannot use age (type Age) as type int
var x int = int(age)  // OK: explicit conversion required`}</CodeBlock>

      <h4 className="font-semibold mt-6 mb-3">4. func - Functions</h4>
      <CodeBlock>{`// Function declaration
func greet(name string) string {
    return "Hello, " + name
}

// Method - function associated with a type
type Person struct {
    Name string
}

func (p Person) Greet() string {
    return "Hello, " + p.Name
}`}</CodeBlock>

      <h4 className="font-semibold mt-6 mb-3">5. short var (:=) - Short Declaration</h4>
      <CodeBlock>{`// Short variable declaration
// Automatically infers type and declares variable
x := 10                       // int
name := "Alice"               // string
isValid := true               // bool
numbers := []int{1, 2, 3}    // []int

// Can declare multiple at once
a, b := 1, "hello"`}</CodeBlock>

      
      <h3 className="text-[#5f6368] mt-8 text-xl font-medium">
        🔢 Constants and iota
      </h3>
      <p className="mt-4">
        <code>iota</code> is a built-in constant generator that resets to 0 for each new const group.
      </p>

      <CodeBlock>{`// iota starts at 0 in each const block
const (
    Zero = iota  // 0
    One          // 1 (implicitly = iota)
    Two          // 2 (implicitly = iota)
)

// Common pattern: enumerations
const (
    Read = 1 << iota  // 1 (1 << 0)
    Write             // 2 (1 << 1)
    Execute          // 4 (1 << 2)
)

// Another pattern
const (
    StarOK   // 0 (iota)
    StarErr // 1 (iota)
)`}</CodeBlock>

      
      <h3 className="text-[#5f6368] mt-8 text-xl font-medium">
        🏷️ Exported vs Unexported Identifiers
      </h3>
      <p className="mt-4">
        In Go, the first letter's case determines visibility:
      </p>

      <CodeBlock>{`// Exported (public) - uppercase first letter
var ExportedVar = "I can be seen outside"
func PublicFunction() {}

// Unexported (private) - lowercase first letter
var privateVar = "I can only be used in this package"
func privateFunction() {}

// Same rule applies to types
type PublicType struct{}    // Accessible outside
type publicType struct{}  // Only within package

// Fields and methods
type Person struct {
    Name string  // Exported - accessible outside
    age  int   // Unexported - only within package
}

func (p Person) GetAge() int { return p.age }  // Getter for private field`}</CodeBlock>

      <ComparisonTable>
        <thead>
          <tr>
            <th>Go</th>
            <th>PHP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Uppercase (Export)</td>
            <td>public</td>
          </tr>
          <tr>
            <td>Lowercase (Unexport)</td>
            <td>private</td>
          </tr>
          <tr>
            <td>No "protected"</td>
            <td>Use first-letter uppercase in same package</td>
          </tr>
        </tbody>
      </ComparisonTable>

      
      <h3 className="text-[#5f6368] mt-8 text-xl font-medium">
        🏷️ Labels
      </h3>
      <p className="mt-4">
        Labels provide named targets for <code>break</code>, <code>continue</code>, and <code>goto</code>.
      </p>

      <CodeBlock>{`// Label with break - exit nested loop
func findMatrix() {
    matrix := [][]int{{1, 2}, {3, 4}}
    
search:
    for i := 0; i < len(matrix); i++ {
        for j := 0; j < len(matrix[i]); j++ {
            if matrix[i][j] == 3 {
                fmt.Printf("Found at [%d][%d]\\n", i, j)
                break search  // Break outer loop
            }
        }
    }
}

// Label with continue - skip to outer loop iteration
func process() {
outer:
    for i := 0; i < 3; i++ {
        for j := 0; j < 3; j++ {
            if j == 1 {
                continue outer  // Continue outer loop
            }
            fmt.Println(i, j)
        }
    }
}`}</CodeBlock>

      <Tip>
        Avoid <code>goto</code> except in simple error handling. It can make control flow hard to follow.
      </Tip>

      <CodeBlock>{`// goto example - use sparingly
func process() error {
    f, err := os.Open("file.txt")
    if err != nil {
        return err
    }
    defer f.Close()
    
    // Simple error handling pattern
    data, err := io.ReadAll(f)
    if err != nil {
        goto failed  // Jump to cleanup
    }
    
    // ... process data ...
    
    return nil
    
failed:
    return err
}`}</CodeBlock>

      
      <h3 className="text-[#5f6368] mt-8 text-xl font-medium">
        🔤 Predeclared Identifiers
      </h3>
      <p className="mt-4">
        Go has several predeclared identifiers available without importing anything:
      </p>

      <CodeBlock>{`// Types (built-in)
bool    byte    complex64   complex128  error    float32  float64
int     int8    int16      int32     int64    rune    string
uint    uint8   uint16     uint32   uint64  uintptr

// Constants
true  false  iota  nil

// Functions
append  cap    close   complex   copy    delete   imag    len
make    new    panic   print    println  real    recover`}</CodeBlock>

      <Note>
        Predeclared types like <code>int</code>, <code>float64</code> etc. are actually type definitions, 
        not aliases. They're machine-dependent sizes.
      </Note>

      
      <h3 className="text-[#5f6368] mt-8 text-xl font-medium">
        ⚖️ Go vs PHP: Comparison
      </h3>

      <ComparisonTable>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Go</th>
            <th>PHP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Function scope</td>
            <td>Declared inside function</td>
            <td>Declared inside function</td>
          </tr>
          <tr>
            <td>Global scope</td>
            <td>Package-level (lowercase = private)</td>
            <td>Declared outside functions</td>
          </tr>
          <tr>
            <td>Block scope</td>
            <td>Curly braces {"{}"}</td>
            <td>Use {} blocks</td>
          </tr>
          <tr>
            <td>Static variables</td>
            <td>Package-level + init once pattern</td>
            <td>Use static keyword</td>
          </tr>
        </tbody>
      </ComparisonTable>

      <ComparisonTable>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Go</th>
            <th>PHP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Declaration</td>
            <td>const</td>
            <td>const or define()</td>
          </tr>
          <tr>
            <td>Enumeration</td>
            <td>iota</td>
            <td>Manual enum pattern</td>
          </tr>
          <tr>
            <td>Type safety</td>
            <td>Can be typed or untyped</td>
            <td>Loose typing</td>
          </tr>
        </tbody>
      </ComparisonTable>

      <ComparisonTable>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Go</th>
            <th>PHP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Public</td>
            <td>Uppercase first letter</td>
            <td>public keyword</td>
          </tr>
          <tr>
            <td>Private</td>
            <td>Lowercase first letter</td>
            <td>private keyword</td>
          </tr>
          <tr>
            <td>Package</td>
            <td>Shared within package</td>
            <td>N/A in vanilla PHP</td>
          </tr>
        </tbody>
      </ComparisonTable>

      
      <h3 className="text-[#5f6368] mt-8 text-xl font-medium">
        📋 Summary
      </h3>
      <ul className="mt-4 list-disc pl-6 space-y-2">
        <li><strong>Blocks</strong> are explicit (curly braces) or implicit (package, file, etc.)</li>
        <li><strong>Lexical scoping</strong> - scope determined by source code structure</li>
        <li><strong>Shadowing</strong> - inner variable with same name hides outer; avoid!</li>
        <li><strong>5 declaration types:</strong> const, var, type, func, short var (:=)</li>
        <li><strong>Type alias</strong> (=) vs <strong>type definition</strong> (without =)</li>
        <li><strong>Exported</strong>: uppercase first letter; <strong>unexported</strong>: lowercase</li>
        <li><strong>iota</strong> for enumerations</li>
        <li><strong>Labels</strong> for break/continue in nested loops</li>
        <li><strong>Predeclared</strong> identifiers available everywhere</li>
      </ul>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Next:</strong> Part 11 - <a href="/go/interfaces" className="text-blue-600 underline">Interfaces</a> - 
          Go's powerful interface system and polymorphism
        </p>
      </div>
    </section>
  )
}