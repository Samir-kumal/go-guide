'use client'

import { CodeBlock, Note, Tip, ComparisonTable, Warning } from '@/components/ui'

export function SlicesTutorial() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="slices-tutorial" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
          Slices Types - The Complete Guide
        </h2>
        
        <div className="bg-[#f8f9fa] p-4 rounded-lg my-4 border-l-4 border-[#1a73e8]">
          <p className="font-semibold mb-2">Learning Roadmap</p>
          <ul className="text-sm space-y-1">
            <li>1. What is a slice vs array?</li>
            <li>2. Creating slices (every method)</li>
            <li>3. Slice internals - the slice header</li>
            <li>4. Slice operations</li>
            <li>5. Slice gotchas</li>
            <li>6. Laravel comparison</li>
            <li>7. 2D slices</li>
          </ul>
        </div>
        
        <p className="text-[#5f6368] mt-4">
          By the end of this tutorial, you will understand Go slices inside and out, 
          with PHP/Laravel comparisons to help you relate to concepts you already know!
        </p>
      </section>

      <section>
        <h3 className="text-[#1a73e8] mt-8 text-xl font-semibold">
          What is a Slice vs Array?
        </h3>
        
        <p className="mt-3 text-[#5f6368]">
          Lets start with the most important question: whats the difference between 
          an array and a slice in Go?
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>
        
        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Array = A fixed pizza box - always holds the same number of slices</li>
            <li>Slice = A magic window into a pizza - it can grow or shrink!</li>
          </ul>
        </div>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Arrays in Go</h4>
        <p className="text-[#5f6368] mt-2">
          An array in Go is a fixed-size container. Once created, you cannot change its length!
        </p>

        <CodeBlock>{"arr := [5]int{1, 2, 3, 4, 5}\n\n// This will NOT work:\n// arr = append(arr, 6) // ERROR: cannot append to array\n\n// Arrays are rarely used directly in Go\nfmt.Println(arr)"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Slices in Go</h4>
        <p className="text-[#5f6368] mt-2">
          A slice is a flexible view into an array. It can grow, shrink, and you can create 
          multiple slices from the same array!
        </p>

        <CodeBlock>{"nums := []int{1, 2, 3, 4, 5}\n\n// This WORKS!\nnums = append(nums, 6)\n\n// Create a window (just indexes 1 to 3)\nwindow := nums[1:3]\n\nfmt.Println(nums)\nfmt.Println(window)"}</CodeBlock>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Go Array</th>
              <th>Go Slice</th>
              <th>PHP Array</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Size</td>
              <td>Fixed at compile time</td>
              <td>Dynamic (grows)</td>
              <td>Dynamic</td>
            </tr>
            <tr>
              <td>Memory</td>
              <td>Contiguous block</td>
              <td>Header + Array</td>
              <td>Hash table</td>
            </tr>
            <tr>
              <td>Common usage</td>
              <td>Rarely</td>
              <td>All the time!</td>
              <td>Everywhere</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <Tip>
          AHA Moment: In Go, almost nobody uses arrays directly! 
          Slices are the go-to data structure for lists.
        </Tip>
      </section>

      <section>
        <h3 className="text-[#1a73e8] mt-10 text-xl font-semibold">
          Creating Slices (Every Method)
        </h3>
        
        <p className="mt-3 text-[#5f6368]">
          There are multiple ways to create slices in Go. Lets cover each one!
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">1. Slice Literal</h4>
        <p className="text-[#5f6368] mt-2">The simplest way!</p>

        <CodeBlock>{"// Direct literal\nnumbers := []int{1, 2, 3}\n\n// With strings\nnames := []string{\"Alice\", \"Bob\", \"Charlie\"}\n\n// Empty but typed slice\nempty := []int{}\n\nfmt.Println(numbers)\nfmt.Println(names)"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">2. Using make()</h4>
        <p className="text-[#5f6368] mt-2">
          The make() function pre-allocates memory.
        </p>

        <CodeBlock>{"// make(type, length, capacity)\n\n// Empty slice with capacity 10 (but length 0)\nslice1 := make([]int, 0, 10)\nfmt.Printf(\"len=%d, cap=%d\\n\", len(slice1), cap(slice1))\n\n// Slice with 5 zeros (length 5, capacity 5)\nslice2 := make([]int, 5)\nfmt.Printf(\"len=%d, cap=%d\\n\", len(slice2), cap(slice2))\n\n// Slice with length 3, capacity 10\nslice3 := make([]int, 3, 10)\nfmt.Printf(\"len=%d, cap=%d\\n\", len(slice3), cap(slice3))"}</CodeBlock>

        <Tip>
          When to use make(): If you know approximately how many elements you will add, 
          pre-allocate with make() to avoid repeated memory allocations!
        </Tip>

        <h4 className="text-[#5f6368] mt-6 font-semibold">3. From an Array - Slicing</h4>
        <p className="text-[#5f6368] mt-2">
          You can create a slice window into an existing array.
        </p>

        <CodeBlock>{"arr := [5]int{10, 20, 30, 40, 50}\n\n// arr[low:high]\ns1 := arr[0:3]\ns2 := arr[1:]\ns3 := arr[:3]\ns4 := arr[:]\n\nfmt.Println(s1, s2, s3, s4)"}</CodeBlock>

        <Note>
          Slicing Syntax: array[low:high] gives you elements from low (inclusive) 
          to high (exclusive).
        </Note>

        <h4 className="text-[#5f6368] mt-6 font-semibold">4. nil vs Empty vs Zero-Length</h4>
        <p className="text-[#5f6368] mt-2">Three empty states that confuse beginners:</p>

        <CodeBlock>{"// nil slice - no underlying array\nvar nilSlice []int\nfmt.Println(nilSlice == nil)\n\n// empty slice (with backing array)\nemptySlice := []int{}\nfmt.Println(emptySlice == nil)\n\n// Zero-length slice\nzeroLen := make([]int, 0)\nfmt.Println(zeroLen == nil)"}</CodeBlock>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Type</th>
              <th>== nil?</th>
              <th>Length</th>
              <th>Capacity</th>
              <th>Safe with append?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>var s []int</td>
              <td>true</td>
              <td>0</td>
              <td>0</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>[]int{}</td>
              <td>false</td>
              <td>0</td>
              <td>0</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>make([]int, 0)</td>
              <td>false</td>
              <td>0</td>
              <td>0+</td>
              <td>Yes</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <Warning>
          Common Mistake: Dont check for nil to know if a slice is empty! 
          Use len(s) == 0 instead.
        </Warning>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Create Slices</p>
          <p className="mt-2 text-sm">Practice creating slices with different methods:</p>
          <CodeBlock>{"// Exercise 1: Create a slice with your friends names\nnames := []string{\"Emma\", \"Liam\", \"Olivia\"}\nfmt.Println(names)\n\n// Exercise 2: Pre-allocate for 100 elements\nbuffer := make([]int, 0, 100)\nfmt.Printf(\"Capacity: %d\\n\", cap(buffer))\n\n// Exercise 3: Get middle 3 elements from array\narr := [5]int{10, 20, 30, 40, 50}\nmiddle := arr[1:4]\nfmt.Println(middle)"}</CodeBlock>
        </div>
      </section>

      <section>
        <h3 className="text-[#1a73e8] mt-10 text-xl font-semibold">
          Slice Internals - The Slice Header
        </h3>
        
        <p className="mt-3 text-[#5f6368]">
          Understanding the slice header is the AHA moment!
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The 3-Field Struct</h4>
        <p className="text-[#5f6368] mt-2">Every slice has a hidden header with exactly 3 fields:</p>

        <CodeBlock>{"// What a slice actually looks like internally:\ntype sliceHeader struct {\n    pointer uintptr  // points to first element in array\n    length int     // how many elements currently\n    capacity int  // total slots in underlying array\n}"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Multiple Slices Sharing One Array</h4>
        <p className="text-[#5f6368] mt-2">
          This is the KEY concept: multiple slices can share the same underlying array!
        </p>

        <CodeBlock>{"arr := [10]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}\n\nsliceA := arr[0:5]\nsliceB := arr[3:8]\n\nfmt.Println(\"sliceA:\", sliceA)\nfmt.Println(\"sliceB:\", sliceB)\n\n// THEY SHARE THE SAME UNDERLYING ARRAY!"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Growth Strategy</h4>
        <p className="text-[#5f6368] mt-2">Watch how slices grow when you append beyond capacity:</p>

        <CodeBlock>{"slice := []int{1, 2, 3}\nfmt.Printf(\"Start: len=%d, cap=%d\\n\", len(slice), cap(slice))\n\nslice = append(slice, 4)\nfmt.Printf(\"Add 4: len=%d, cap=%d\\n\", len(slice), cap(slice))\n\nslice = append(slice, 5)\nfmt.Printf(\"Add 5: len=%d, cap=%d\\n\", len(slice), cap(slice))\n\nfor i := 6; i <= 20; i++ {\n    slice = append(slice, i)\n}\nfmt.Printf(\"Add 6-20: len=%d, cap=%d\\n\", len(slice), cap(slice))"}</CodeBlock>

        <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded-lg my-4 font-mono text-sm">
          <p>Growth factors:</p>
          <p>- Less than 256 elements: 2x (doubles)</p>
          <p>- 256 or more elements: 1.25x (25% growth)</p>
        </div>

        <Tip>
          Performance Tip: If you know approximately how many elements 
          you will add, use make() to pre-allocate!
        </Tip>
      </section>

      <section>
        <h3 className="text-[#1a73e8] mt-10 text-xl font-semibold">
          Slice Operations
        </h3>
        
        <p className="mt-3 text-[#5f6368]">
          Lets cover each slice operation!
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Indexing</h4>
        <p className="text-[#5f6368] mt-2">Get or set elements by index:</p>

        <CodeBlock>{"slice := []int{10, 20, 30, 40, 50}\n\nfirst := slice[0]\nthird := slice[2]\n\nslice[1] = 25\n\nfmt.Println(first, third, slice)"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Slicing Operations</h4>
        <p className="text-[#5f6368] mt-2">Create new slices by slicing:</p>

        <CodeBlock>{"slice := []int{10, 20, 30, 40, 50, 60}\n\nsub := slice[1:4]\nfirstThree := slice[:3]\nlastThree := slice[3:]\nall := slice[:]\n\nfmt.Println(sub, firstThree, lastThree, all)"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">append() - The Most Important!</h4>
        <p className="text-[#5f6368] mt-2">Add elements to the end:</p>

        <CodeBlock>{"slice := []int{1, 2, 3}\n\nslice = append(slice, 4)\nslice = append(slice, 5, 6, 7)\n\nother := []int{8, 9, 10}\nslice = append(slice, other...)\n\nfmt.Println(slice)"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">copy()</h4>
        <CodeBlock>{"src := []int{1, 2, 3, 4, 5}\ndst := make([]int, len(src))\n\nn := copy(dst, src)\nfmt.Printf(\"Copied %d elements: %v\\n\", n, dst)"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">len() and cap()</h4>
        <CodeBlock>{"slice := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}\n\nfmt.Println(len(slice))\nfmt.Println(cap(slice))\n\nslice = append(slice, 11)\nfmt.Println(len(slice), cap(slice))"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Iterating with range</h4>
        <CodeBlock>{"fruits := []string{\"apple\", \"banana\", \"cherry\"}\n\nfor i, fruit := range fruits {\n    fmt.Printf(\"%d: %s\\n\", i, fruit)\n}"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Deleting Elements</h4>
        <CodeBlock>{"slice := []int{1, 2, 3, 4, 5, 6}\n\n// Delete at index 2\nslice = append(slice[:2], slice[3:]...)\nfmt.Println(slice)\n\n// Delete first element\nslice = slice[1:]\nfmt.Println(slice)\n\n// Delete last element\nslice = slice[:len(slice)-1]\nfmt.Println(slice)"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Inserting Elements</h4>
        <CodeBlock>{"slice := []int{1, 2, 5}\n\n// Insert 3 and 4 at index 2\ninsert := []int{3, 4}\nslice = append(slice[:2], append(insert, slice[2:]...)...)\nfmt.Println(slice)\n\n// Insert at beginning\nslice = append([]int{0}, slice...)\nfmt.Println(slice)\n\n// Insert at end\nslice = append(slice, 6)\nfmt.Println(slice)"}</CodeBlock>
      </section>

      <section>
        <h3 className="text-[#1a73e8] mt-10 text-xl font-semibold">
          Slice Gotchas - Common Mistakes
        </h3>
        
        <p className="mt-3 text-[#5f6368]">
          These are the gotchas that trip up even experienced Go developers!
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">1. Shared Underlying Array Mutations</h4>
        <p className="text-[#5f6368] mt-2">
          When two slices share an array, modifying one affects the other!
        </p>

        <CodeBlock>{"arr := [5]int{1, 2, 3, 4, 5}\n\nsliceA := arr[:3]\nsliceB := arr[2:]\n\nsliceA[2] = 99\n\nfmt.Println(\"sliceA:\", sliceA)\nfmt.Println(\"sliceB:\", sliceB)\nfmt.Println(\"arr:\", arr)"}</CodeBlock>

        <Warning>
          WARNING: Always use make() to create independent copies when needed!
        </Warning>

        <h4 className="text-[#5f6368] mt-6 font-semibold">2. Append Breaking Shared Reference</h4>
        <p className="text-[#5f6368] mt-2">
          The classic I appended to a slice and broke my function bug!
        </p>

        <CodeBlock>{"func addMore(s []int) {\n    s = append(s, 99)\n}\n\nfunc addMoreFixed(s []int) []int {\n    return append(s, 99)\n}\n\narr := [3]int{1, 2, 3}\nslice := arr[:]\n\naddMore(slice)\nfmt.Println(\"slice:\", slice)\n\nslice = addMoreFixed(slice)\nfmt.Println(\"slice:\", slice)"}</CodeBlock>

        <Tip>
          Rule: Always use the return value of append()! 
          Go may allocate a new array, so reassign to be safe.
        </Tip>

        <h4 className="text-[#5f6368] mt-6 font-semibold">3. Memory Leaks</h4>
        <CodeBlock>{"large := make([]byte, 1e9)\nlarge[0] = 1\n\nsmall := large[1e9/100:]\n\nsmallCopy := make([]byte, len(small))\ncopy(smallCopy, small)"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">4. nil vs Empty Slice Gotcha</h4>
        <CodeBlock>{"var nilSlice []int\nemptyLiteral := []int{}\n\nfmt.Println(nilSlice == nil)\nfmt.Println(emptyLiteral == nil)"}</CodeBlock>
      </section>

      <section>
        <h3 className="text-[#1a73e8] mt-10 text-xl font-semibold">
          Laravel Comparison
        </h3>
        
        <p className="mt-3 text-[#5f6368]">
          Lets compare Go slices to Laravel Collections and PHP arrays!
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Laravel Collection vs Go Slice</h4>
        
        <ComparisonTable>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Go Slice</th>
              <th>Laravel Collection</th>
              <th>PHP Array</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Creation</td>
              <td>{"[]int{1,2,3}"}</td>
              <td>{"collect([1,2,3])"}</td>
              <td>[1,2,3]</td>
            </tr>
            <tr>
              <td>Length</td>
              <td>{"len(s)"}</td>
              <td>{"$c->count()"}</td>
              <td>{"count($arr)"}</td>
            </tr>
            <tr>
              <td>Iterate</td>
              <td>{"for i,v range s"}</td>
              <td>{"$c->each(fn)"}</td>
              <td>{"foreach($arr as $v)"}</td>
            </tr>
            <tr>
              <td>map</td>
              <td>{"Manual loop"}</td>
              <td>{"$c->map(fn)"}</td>
              <td>{"array_map(fn, $arr)"}</td>
            </tr>
            <tr>
              <td>filter</td>
              <td>{"Manual loop"}</td>
              <td>{"$c->filter(fn)"}</td>
              <td>{"array_filter($arr)"}</td>
            </tr>
            <tr>
              <td>Add item</td>
              <td>{"append()"}</td>
              <td>{"$c->push($item)"}</td>
              <td>{"$arr[] = $item"}</td>
            </tr>
            <tr>
              <td>Type safety</td>
              <td>Yes (compile time)</td>
              <td>No (runtime)</td>
              <td>No (runtime)</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Collection map() vs Manual Loop</h4>
        
        <CodeBlock>{"// PHP/Laravel:\n$numbers = collect([1, 2, 3, 4, 5])\n    ->map(fn($n) => $n * 2)\n    ->all();\n\n// Go: Manual loop required!\nfunc double(nums []int) []int {\n    result := make([]int, len(nums))\n    for i, n := range nums {\n        result[i] = n * 2\n    }\n    return result\n}\nresult := double([]int{1, 2, 3, 4, 5})"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Collection filter()</h4>
        
        <CodeBlock>{"// PHP/Laravel:\n$evens = collect([1, 2, 3, 4, 5])\n    ->filter(fn($n) => $n % 2 == 0)\n    ->all();\n\n// Go: Manual loop!\nfunc filterEvens(nums []int) []int {\n    var result []int\n    for _, n := range nums {\n        if n % 2 == 0 {\n            result = append(result, n)\n        }\n    }\n    return result\n}\nevens := filterEvens([]int{1, 2, 3, 4, 5})"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Eloquent Results</h4>
        <p className="text-[#5f6368] mt-2">
          When you call Model::all() or Model::get(), you get a Laravel Collection!
        </p>

        <CodeBlock>{"// Laravel: Eloquent returns Collection\n$users = User::where('active', true)->get();\n\n// Chain methods!\n$names = User::where('active', true)\n    ->get()\n    ->filter(fn($u) => $u->age >= 18)\n    ->map(fn($u) => $u->name)\n    ->all();"}</CodeBlock>

        <CodeBlock>{"// Go equivalent:\ntype User struct {\n    ID     int\n    Name   string\n    Age    int\n    Active bool\n}\n\nfunc getActiveUsers(users []User) []string {\n    var names []string\n    for _, u := range users {\n        if u.Active && u.Age >= 18 {\n            names = append(names, u.Name)\n        }\n    }\n    return names\n}"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">CRUD Example: Laravel vs Go</h4>
        
        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold text-blue-800">Laravel</p>
            <CodeBlock>{"// Create\nUser::create(['name' => 'Alice', 'email' => 'alice@example.com']);\n\n// Read\n$user = User::find(1);\n$users = User::all();\n\n// Update\n$user->update(['name' => 'Alice Updated']);\n\n// Delete\n$user->delete();"}</CodeBlock>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="font-semibold text-green-800">Go</p>
            <CodeBlock>{"// Create\nuser := User{Name: \"Alice\", Email: \"alice@example.com\"}\ndb.Create(&user)\n\n// Read\nvar user User\ndb.First(&user, 1)\nvar users []User\ndb.Find(&users)\n\n// Update\ndb.Model(&user).Update(\"name\", \"Alice Updated\")\n\n// Delete\ndb.Delete(&user)"}</CodeBlock>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-[#1a73e8] mt-10 text-xl font-semibold">
          2D Slices
        </h3>
        
        <p className="mt-3 text-[#5f6368]">
          Slices can contain other slices! This is like a 2D array or matrix.
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Slice of Slices vs Array of Arrays</h4>
        
        <CodeBlock>{"// 2D slice (slice of slices)\nmatrix := [][]int{\n    {1, 2, 3},\n    {4, 5, 6},\n    {7, 8, 9},\n}\n\n// Can grow each row independently!\n\n// Array of arrays\nvar fixed [3][3]int\n\n// Access elements\nfmt.Println(matrix[0][1])\n\n// Add a new row\nmatrix = append(matrix, []int{10, 11, 12})"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Memory Layout</h4>
        
        <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded-lg my-4 font-mono text-sm">
          <p>{"matrix := [][]int{"}</p>
          <p>{"{1, 2, 3},  row 0: slice"}</p>
          <p>{"{4, 5, 6},  row 1: slice"}</p>
          <p>{"{7, 8, 9},  row 2: slice"}</p>
          <p>{"}"}</p>
          <p>Outer slice: {"{pointer, len=3, cap=3}"}</p>
          <p>Each row is a SEPARATE slice!</p>
        </div>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Nested Arrays in Laravel</h4>
        
        <CodeBlock>{"// Laravel\n$matrix = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9],\n];\n\necho $matrix[0][1];"}</CodeBlock>

        <CodeBlock>{"// Go equivalent\nmatrix := [][]int{\n    {1, 2, 3},\n    {4, 5, 6},\n    {7, 8, 9},\n}\n\nfmt.Println(matrix[0][1])"}</CodeBlock>

        <section className="mt-10">
          <h3 className="text-[#1a73e8] text-2xl font-semibold">
            CHEAT SHEET: Slice Operations
          </h3>
          
          <ComparisonTable>
            <thead>
              <tr>
                <th>Operation</th>
                <th>Code</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Create</td>
                <td>{"[]int{1,2,3}"}</td>
                <td>Slice literal</td>
              </tr>
              <tr>
                <td>Create</td>
                <td>{"make([]int, len, cap)"}</td>
                <td>Pre-allocate</td>
              </tr>
              <tr>
                <td>Length</td>
                <td>{"len(s)"}</td>
                <td>Number of elements</td>
              </tr>
              <tr>
                <td>Capacity</td>
                <td>{"cap(s)"}</td>
                <td>Slots available</td>
              </tr>
              <tr>
                <td>Append</td>
                <td>{"append(s, items...)"}</td>
                <td>Add elements</td>
              </tr>
              <tr>
                <td>Copy</td>
                <td>{"copy(dst, src)"}</td>
                <td>Copy elements</td>
              </tr>
              <tr>
                <td>Slice</td>
                <td>{"s[low:high]"}</td>
                <td>Sub-slice</td>
              </tr>
              <tr>
                <td>Iterate</td>
                <td>{"for i,v range s"}</td>
                <td>Loop with index/value</td>
              </tr>
            </tbody>
          </ComparisonTable>
        </section>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-6">
          <p className="font-semibold text-[#2e7d32]">AHA MOMENT: The Key Takeaways</p>
          <ul className="mt-2 space-y-2">
            <li>Arrays are fixed - almost never use them!</li>
            <li>Slices are dynamic - use them everywhere!</li>
            <li>Slice header has 3 fields: pointer, len, cap</li>
            <li>Multiple slices can share one array - dangerous!</li>
            <li>append() returns new slice - always use the return!</li>
            <li>Check with len(), not nil!</li>
            <li>Laravel Collections have built-in map/filter</li>
          </ul>
        </div>
      </section>
    </div>
  )
}