'use client'

import { CodeBlock, Note, Tip, ComparisonTable, Warning } from '@/components/ui'

export function MapsTutorial() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="maps-tutorial" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
          Map Types - The Complete Guide
        </h2>
        
        <div className="bg-[#f8f9fa] p-4 rounded-lg my-4 border-l-4 border-[#1a73e8]">
          <p className="font-semibold mb-2">Learning Roadmap</p>
          <ul className="text-sm space-y-1">
            <li>1. What is a map (dictionary analogy)</li>
            <li>2. Creating maps (literal, make, nil vs empty)</li>
            <li>3. Map operations (add, read, delete, check existence)</li>
            <li>4. Map internals (hash buckets simplified)</li>
            <li>5. Map key requirements</li>
            <li>6. Map patterns (set, count, group, cache)</li>
            <li>7. Laravel comparison</li>
            <li>8. Map gotchas</li>
            <li>9. CHEAT SHEET</li>
          </ul>
        </div>
        
        <p className="text-[#5f6368] mt-4">
          By the end of this tutorial, you will understand Go maps inside and out,
          with PHP/Laravel comparisons to help you relate to concepts you already know!
        </p>
      </section>

      <section>
        <h3 className="text-[#1a73e8] mt-8 text-xl font-semibold">
          What is a Map?
        </h3>
        
        <p className="mt-3 text-[#5f6368]">
          A map in Go is a key-value store, like a dictionary or hash table.
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>
        
        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Map = A phonebook - you look up a name (key) to get a number (value)</li>
            <li>Key: The person's name</li>
            <li>Value: The phone number</li>
          </ul>
        </div>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Basic Map Usage</h4>
        <p className="text-[#5f6368] mt-2">
          Maps store key-value pairs for fast lookup.
        </p>

        <CodeBlock>{"// phonebook: key (name) -> value (phone)\nphonebook := map[string]string{\n    \"Alice\": \"555-1234\",\n    \"Bob\":   \"555-5678\",\n    \"Carol\": \"555-9999\",\n}\n\n// Look up a value by key\nfmt.Println(phonebook[\"Alice\"])  // 555-1234"}</CodeBlock>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Go Map</th>
              <th>PHP Array</th>
              <th>Laravel Collection</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Structure</td>
              <td>Key-value store</td>
              <td>Associative array</td>
              <td>Keyed collection</td>
            </tr>
            <tr>
              <td>Lookup</td>
              <td>O(1) average</td>
              <td>O(1) average</td>
              <td>O(n) linear</td>
            </tr>
            <tr>
              <td>Type safety</td>
              <td>Yes (compile time)</td>
              <td>No (runtime)</td>
              <td>No (runtime)</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <Tip>
          AHA Moment: Maps are the Go equivalent of PHP associative arrays!
          Use maps when you need fast lookups by key.
        </Tip>
      </section>

      <section>
        <h3 className="text-[#1a73e8] mt-10 text-xl font-semibold">
          Creating Maps (Every Method)
        </h3>
        
        <p className="mt-3 text-[#5f6368]">
          There are multiple ways to create maps in Go. Lets cover each one!
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">1. Map Literal</h4>
        <p className="text-[#5f6368] mt-2">The simplest way!</p>

        <CodeBlock>{"// Direct literal\nscores := map[string]int{\n    \"Alice\": 95,\n    \"Bob\":   87,\n    \"Carol\": 92,\n}\n\n// With strings\nconfigs := map[string]string{\n    \"host\": \"localhost\",\n    \"port\": \"8080\",\n}\n\n// Empty but typed map\nempty := map[string]int{}\n\nfmt.Println(scores)\nfmt.Println(empty)"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">2. Using make()</h4>
        <p className="text-[#5f6368] mt-2">
          The make() function pre-allocates memory for the map.
        </p>

        <CodeBlock>{"// make(map[keyType]valueType)\n// Pre-allocate for expected entries\ncache := make(map[string]string, 100)\n\ncache[\"foo\"] = \"bar\"\n\nfmt.Printf(\"Len: %d\\n\", len(cache))"}</CodeBlock>

        <Tip>
          When to use make(): If you know approximately how many entries you will add,
          pre-allocate with make() to avoid repeated rehashes!
        </Tip>

        <h4 className="text-[#5f6368] mt-6 font-semibold">3. nil vs Empty vs Zero-Entry</h4>
        <p className="text-[#5f6368] mt-2">Three empty states that confuse beginners:</p>

        <CodeBlock>{"// nil map - no underlying storage\nvar nilMap map[string]int\nfmt.Println(nilMap == nil)\n\n// empty map (with backing storage)\nemptyMap := map[string]int{}\nfmt.Println(emptyMap == nil)\n\n// make with zero entries\nmadeMap := make(map[string]int)\nfmt.Println(madeMap == nil)"}</CodeBlock>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Type</th>
              <th>== nil?</th>
              <th>Length</th>
              <th>Safe with write?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{"var m map[K]V"}</td>
              <td>true</td>
              <td>0</td>
              <td>NO - PANIC!</td>
            </tr>
            <tr>
              <td>{"map[K]V{}"}</td>
              <td>false</td>
              <td>0</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>{"make(map[K]V)"}</td>
              <td>false</td>
              <td>0</td>
              <td>Yes</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <Warning>
          Critical: Writing to a nil map causes a PANIC! Always use make() or
          map literal {} to create maps before writing to them.
        </Warning>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Create Maps</p>
          <p className="mt-2 text-sm">Practice creating maps with different methods:</p>
          <CodeBlock>{"// Exercise 1: Create a map with your friends ages\nages := map[string]int{\"Emma\": 25, \"Liam\": 30}\nfmt.Println(ages)\n\n// Exercise 2: Pre-allocate for 50 entries\nbuffer := make(map[string]int, 50)\nfmt.Printf(\"Capacity hint: %d\\n\", len(buffer))\n\n\n// Exercise 3: Check for nil vs empty\nvar nilMap map[string]int\nemptyMap := map[string]int{}\nfmt.Println(nilMap == nil, emptyMap == nil)"}</CodeBlock>
        </div>
      </section>

      <section>
        <h3 className="text-[#1a73e8] mt-10 text-xl font-semibold">
          Map Operations
        </h3>
        
        <p className="mt-3 text-[#5f6368]">
          Lets cover each map operation!
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Adding/Updating Entries</h4>
        <p className="text-[#5f6368] mt-2">Simply assign to add or update:</p>

        <CodeBlock>{"scores := make(map[string]int)\n\n// Add new entry\nscores[\"Alice\"] = 95\n\n// Update existing entry\nscores[\"Alice\"] = 98\n\nfmt.Println(scores)"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Reading Values</h4>
        <p className="text-[#5f6368] mt-2">Get a value by key:</p>

        <CodeBlock>{"scores := map[string]int{\n    \"Alice\": 95,\n    \"Bob\":   87,\n}\n\n// Get value\naliceScore := scores[\"Alice\"]\nfmt.Println(aliceScore)  // 95\n\n// Key doesn't exist - returns zero value\nmissing := scores[\"Dave\"]\nfmt.Println(missing)  // 0"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Comma-OK Idiom</h4>
        <p className="text-[#5f6368] mt-2">
          Check if a key exists using the comma-ok pattern:
        </p>

        <CodeBlock>{"scores := map[string]int{\n    \"Alice\": 95,\n    \"Bob\":   87,\n}\n\n// comma-ok idiom\nscore, exists := scores[\"Alice\"]\nif exists {\n    fmt.Printf(\"Alice exists: %d\\n\", score)\n} else {\n    fmt.Println(\"Alice not found\")\n\n// Check for missing key\n_, missing := scores[\"Dave\"]\nif !missing {\n    fmt.Println(\"Dave not found\")\n}"}</CodeBlock>

        <Note>
          The comma-ok idiom is essential: value, boolean := map[key] returns
          boolean = true if the key exists, false if not.
        </Note>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Deleting Entries</h4>
        <p className="text-[#5f6368] mt-2">Use delete() to remove entries:</p>

        <CodeBlock>{"scores := map[string]int{\n    \"Alice\": 95,\n    \"Bob\":   87,\n}\n\n// Delete a key\ndelete(scores, \"Alice\")\n\n// Safe to delete non-existent key\ndelete(scores, \"Dave\")\n\nfmt.Println(scores)"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">len() - Map Length</h4>
        <CodeBlock>{"scores := map[string]int{\n    \"Alice\": 95,\n    \"Bob\":   87,\n    \"Carol\": 92,\n}\n\nfmt.Println(len(scores))  // 3"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Iterating with range</h4>
        <p className="text-[#5f6368] mt-2">Order is NOT guaranteed:</p>

        <CodeBlock>{"scores := map[string]int{\n    \"Alice\": 95,\n    \"Bob\":   87,\n    \"Carol\": 92,\n}\n\n// Iterate - order is random!\nfor name, score := range scores {\n    fmt.Printf(\"%s: %d\\n\", name, score)\n}\n\n// Just keys\nfor name := range scores {\n    fmt.Println(name)\n}\n\n// Just values\nfor _, score := range scores {\n    fmt.Println(score)\n}"}</CodeBlock>

        <div className="bg-[#fff3e0] border-l-4 border-[#ff9800] p-4 my-4">
          <p className="font-semibold text-[#e65100]">Important: Map Iteration Order</p>
          <p className="mt-2 text-sm">
            Go map iteration order is RANDOM. Every run gives different results!
            Don't rely on order for anything important.
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-[#1a73e8] mt-10 text-xl font-semibold">
          Map Internals - Hash Buckets (Simplified)
        </h3>
        
        <p className="mt-3 text-[#5f6368]">
          Understanding internals helps you use maps effectively!
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">How Maps Work</h4>
        <p className="text-[#5f6368] mt-2">
          Maps use hash tables internally for O(1) average lookups.
        </p>

        <CodeBlock>{"// What happens when you access a map:\n// 1. Hash the key\n// 2. Find the bucket\n// 3. Search within bucket\n\n// map[string]int stores {key -> hash -> bucket -> value}\nscores := map[string]int{\n    \"Alice\": 95,\n}\n\n// Access is O(1) average - very fast!"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Bucket Structure</h4>
        
        <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded-lg my-4 font-mono text-sm">
          <p>Map Internal Structure:</p>
          <p>- Array of buckets (pointers)</p>
          <p>- Each bucket holds 8 key-value pairs</p>
          <p>- When bucket full, grows to 2x buckets</p>
          <p>- Uses consistent hashing</p>
        </div>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Growth Strategy</h4>
        <p className="text-[#5f6368] mt-2">
          Maps grow automatically when they get full:
        </p>

        <CodeBlock>{"m := make(map[int]int)\n\nfor i := 0; i < 1000; i++ {\n    m[i] = i * 10\n}\n\n// Go handles rehashing automatically!"}</CodeBlock>

        <Tip>
          Performance Tip: Maps are very efficient for lookups.
          But for ordered data or iteration, consider using slices.
        </Tip>
      </section>

      <section>
        <h3 className="text-[#1a73e8] mt-10 text-xl font-semibold">
          Map Key Requirements
        </h3>
        
        <p className="mt-3 text-[#5f6368]">
          Not all types can be map keys. Heres the rule.
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Key Requirements</h4>
        
        <ComparisonTable>
          <thead>
            <tr>
              <th>Type</th>
              <th>Can be key?</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>int, uint</td>
              <td>Yes</td>
              <td>All integer types</td>
            </tr>
            <tr>
              <td>float</td>
              <td>Yes</td>
              <td>Except NaN</td>
            </tr>
            <tr>
              <td>string</td>
              <td>Yes</td>
              <td>Most common!</td>
            </tr>
            <tr>
              <td>bool</td>
              <td>Yes</td>
              <td>True/false</td>
            </tr>
            <tr>
              <td>struct</td>
              <td>Yes</td>
              <td>If all fields comparable</td>
            </tr>
            <tr>
              <td>pointer</td>
              <td>Yes</td>
              <td></td>
            </tr>
            <tr>
              <td>interface</td>
              <td>Yes</td>
              <td>If concrete type comparable</td>
            </tr>
            <tr>
              <td>slice</td>
              <td>NO</td>
              <td>Not comparable</td>
            </tr>
            <tr>
              <td>map</td>
              <td>NO</td>
              <td>Not comparable</td>
            </tr>
            <tr>
              <td>slice, map, func</td>
              <td>NO</td>
              <td>Cannot use as key</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Valid Key Examples</h4>
        
        <CodeBlock>{"// Common keys:\nages := map[string]int{\"Alice\": 25}\n\nscores := map[int]int{1: 100, 2: 200}\n\n// Struct as key (if all fields comparable)\ntype Point struct { X, Y int }\npoints := map[Point]string{\n    {X: 1, Y: 2}: \"origin\",\n}"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Invalid Key Examples</h4>
        
        <CodeBlock>{"// NOT VALID - slice as key:\n// bad := map[[]string]int{[]} // COMPILE ERROR!\n\n// Workaround: convert to string\nkey := []string{\"a\", \"b\"}\nstr := strings.Join(key, \":\")\nm := map[string]int{str: 10}"}</CodeBlock>

        <Warning>
          Slice cannot be map keys - they are not comparable!
          Use string conversion or custom wrapper struct.
        </Warning>
      </section>

      <section>
        <h3 className="text-[#1a73e8] mt-10 text-xl font-semibold">
          Map Patterns
        </h3>
        
        <p className="mt-3 text-[#5f6368]">
          Common patterns for working with maps!
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">1. Set (Unique Values)</h4>
        <p className="text-[#5f6368] mt-2">
          Use a map to track unique values - set pattern:
        </p>

        <CodeBlock>{"// Find unique items in slice\nitems := []string{\"apple\", \"banana\", \"apple\", \"cherry\", \"banana\"}\n\nunique := make(map[string]bool)\nfor _, item := range items {\n    unique[item] = true\n}\n\nvar result []string\nfor k := range unique {\n    result = append(result, k)\n}\nfmt.Println(result)"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">2. Counting</h4>
        <p className="text-[#5f6368] mt-2">Count occurrences:</p>

        <CodeBlock>{"// Count words in text\nwords := []string{\"hello\", \"world\", \"hello\", \"go\", \"hello\"}\n\ncounts := make(map[string]int)\nfor _, word := range words {\n    counts[word]++\n}\n\nfmt.Println(counts)  // map[hello:3 go:1 world:1]"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">3. Grouping</h4>
        <p className="text-[#5f6368] mt-2">Group items by a key:</p>

        <CodeBlock>{"// Group users by department\ntype User struct {\n    Name string\n    Dept  string\n}\n\nusers := []User{\n    {\"Alice\", \"Engineering\"},\n    {\"Bob\", \"Engineering\"},\n    {\"Carol\", \"Sales\"},\n}\n\nbyDept := make(map[string][]string)\nfor _, u := range users {\n    byDept[u.Dept] = append(byDept[u.Dept], u.Name)\n}\n\nfmt.Println(byDept)"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">4. Cache Pattern</h4>
        <p className="text-[#5f6368] mt-2">Simple in-memory cache:</p>

        <CodeBlock>{"// Simple cache for expensive computations\ntype Cache struct {\n    data map[string]any\n}\n\nfunc NewCache() *Cache {\n    return &Cache{data: make(map[string]any)}\n}\n\nfunc (c *Cache) Get(key string) (any, bool) {\n    val, ok := c.data[key]\n    return val, ok\n}\n\nfunc (c *Cache) Set(key string, value any) {\n    c.data[key] = value\n}"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">5. Finding Duplicate Pairs</h4>
        
        <CodeBlock>{"// Find common items between two slices\na := []string{\"apple\", \"banana\", \"cherry\"}\nb := []string{\"banana\", \"cherry\", \"date\"}\n\ncommon := make(map[string]bool)\nfor _, s := range a {\n    common[s] = true\n}\n\nvar result []string\nfor _, s := range b {\n    if common[s] {\n        result = append(result, s)\n    }\n}\nfmt.Println(result)  // [banana cherry]"}</CodeBlock>
      </section>

      <section>
        <h3 className="text-[#1a73e8] mt-10 text-xl font-semibold">
          Laravel Comparison
        </h3>
        
        <p className="mt-3 text-[#5f6368]">
          Lets compare Go maps to Laravel features!
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">PHP/Laravel Associative Arrays</h4>
        
        <ComparisonTable>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Go Map</th>
              <th>PHP Array</th>
              <th>Laravel</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Creation</td>
              <td>{"map[K]V{}"}</td>
              <td>{"['key' => 'value']"}</td>
              <td>{'["key" => "value"]'}</td>
            </tr>
            <tr>
              <td>Lookup</td>
              <td>{"m[key]"}</td>
              <td>{"$arr['key']"}</td>
              <td>$arr["key"]</td>
            </tr>
            <tr>
              <td>Check exists</td>
              <td>{"_, ok := m[k]"}</td>
              <td>{"isset($arr['key'])"}</td>
              <td>Arr::has()</td>
            </tr>
            <tr>
              <td>Delete</td>
              <td>{"delete(m, k)"}</td>
              <td>{"unset($arr['key'])"}</td>
              <td>Arr::forget()</td>
            </tr>
            <tr>
              <td>Keys</td>
              <td>{"for k range m"}</td>
              <td>{"array_keys($arr)"}</td>
              <td>Arr::keys()</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Laravel Cache Facade</h4>
        <p className="text-[#5f6368] mt-2">
          Laravel Cache is similar to a map for key-value storage:
        </p>

        <CodeBlock>{"// Laravel Cache facade\nCache::put('key', 'value', 60);\n$value = Cache::get('key');\nCache::forget('key');\n\n// Go equivalent (simple in-memory):\ncache := make(map[string]any)\ncache[\"key\"] = \"value\"\nvalue := cache[\"key\"]\ndelete(cache, \"key\")"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Collection groupBy()</h4>
        <p className="text-[#5f6368] mt-2">
          Laravel Collections groupBy() is like Go map grouping:
        </p>

        <CodeBlock>{"// Laravel:\n$users = User::all()->groupBy('department');\n\n// Go:\nusers := []User{\n    {Name: \"Alice\", Dept: \"Eng\"},\n    {Name: \"Bob\", Dept: \"Eng\"},\n    {Name: \"Carol\", Dept: \"Sales\"},\n}\n\nbyDept := make(map[string][]User)\nfor _, u := range users {\n    byDept[u.Dept] = append(byDept[u.Dept], u)\n}"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibling">Laravel Config Files</h4>
        <p className="text-[#5f6368] mt-2">
          Laravel config files are essentially maps:
        </p>

        <CodeBlock>{"// Laravel config/database.php\nreturn [\n    'default' => 'mysql',\n    'connections' => [\n        'mysql' => [...],\n    ],\n];\n\n// Go equivalent:\ntype Config struct {\n    Default     string\n    Connections map[string]DBConfig\n}"}</CodeBlock>
      </section>

      <section>
        <h3 className="text-[#1a73e8] mt-10 text-xl font-semibold">
          Map Gotchas - Common Mistakes
        </h3>
        
        <p className="mt-3 text-[#5f6368]">
          These are the gotchas that trip up even experienced Go developers!
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">1. Writing to nil Map - PANIC!</h4>
        <p className="text-[#5f6368] mt-2">
          This is the biggest gotcha - writing to nil map panics!
        </p>

        <CodeBlock>{"// DANGEROUS - DON'T DO THIS!\n// var m map[string]int\n// m[\"key\"] = 1  // PANIC!\n\n// CORRECT - initialize first:\nvar m map[string]int\nif m == nil {\n    m = make(map[string]int)\n}\nm[\"key\"] = 1\n\n// Or just use literal:\nm := map[string]int{}\nm[\"key\"] = 1"}</CodeBlock>

        <Warning>
          CRITICAL: Always initialize maps before writing to them!
          Use make() or {} literal to create the map first.
        </Warning>

        <h4 className="text-[#5f6368] mt-6 font-semibold">2. Concurrent Map Access</h4>
        <p className="text-[#5f6368] mt-2">
          Maps are NOT safe for concurrent access. Use sync.Map or mutex!
        </p>

        <CodeBlock>{"// UNSAFE - concurrent access causes race condition:\n// var m map[string]int\n// go func() { m[\"key\"] = 1 }()\n// go func() { _ = m[\"key\"] }()\n\n// SAFE - use sync.Map:\nvar safe sync.Map\nsafe.Store(\"key\", 1)\nval, _ := safe.Load(\"key\")\n\n// SAFE - use mutex:\nvar mu sync.RWMutex\nmu.Lock()\nm[\"key\"] = 1\nmu.Unlock()"}</CodeBlock>

        <Tip>
          For concurrent maps, use sync.Map or sync.RWMutex to protect access.
          Go 1.9+ has sync.Map for concurrent use.
        </Tip>

        <h4 className="text-[#5f6368] mt-6 font-semibold">3. Map Value is NOT Pointer</h4>
        <p className="text-[#5f6368] mt-2">
          Getting a value from map returns a COPY, not a reference!
        </p>

        <CodeBlock>{"m := map[string]User{\n    \"alice\": {Name: \"Alice\"},\n}\n\n// This modifies a COPY, not the map!\nuser := m[\"alice\"]\nuser.Name = \"Bob\"\n\nfmt.Println(m[\"alice\"].Name)  // Still \"Alice\"\n\n// To modify, assign back:\nm[\"alice\"].Name = \"Bob\"\nfmt.Println(m[\"alice\"].Name)  // \"Bob\""}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">4. Iteration and Modification</h4>
        <p className="text-[#5f6368] mt-2">
          Don't modify map while iterating - undefined behavior:
        </p>

        <CodeBlock>{"m := map[string]int{\n    \"a\": 1,\n    \"b\": 2,\n}\n\n// DON'T modify during iteration\n// for k, v := range m {\n//     delete(m, k)  // May panic in older Go!\n// }\n\n\n// Copy keys first, then iterate\nfor k := range m {\n    fmt.Println(k, m[k])\n}"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">5. Zero Value Confusion</h4>
        <p className="text-[#5f6368] mt-2">
          Missing keys return zero value - use comma-ok to check:
        </p>

        <CodeBlock>{"m := map[string]int{}\n\n// This returns 0 - is it missing or zero?\nval := m[\"missing\"]\nfmt.Println(val)  // 0 - but is it missing?\n\n// Use comma-ok to check:\nval, exists := m[\"missing\"]\nif !exists {\n    fmt.Println(\"Key does not exist\")\n}"}</CodeBlock>
      </section>

      <section className="mt-10">
        <h3 className="text-[#1a73e8] text-2xl font-semibold">
          CHEAT SHEET: Map Operations
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
              <td>Create literal</td>
              <td>{"map[K]V{}"}</td>
              <td>Map literal</td>
            </tr>
            <tr>
              <td>Create make</td>
              <td>{"make(map[K]V)"}</td>
              <td>Make empty map</td>
            </tr>
            <tr>
              <td>Write</td>
              <td>{"m[key] = value"}</td>
              <td>Add/update entry</td>
            </tr>
            <tr>
              <td>Read</td>
              <td>{"m[key]"}</td>
              <td>Get value by key</td>
            </tr>
            <tr>
              <td>Check exists</td>
              <td>{"v, ok := m[k]"}</td>
              <td>Comma-ok idiom</td>
            </tr>
            <tr>
              <td>Delete</td>
              <td>{"delete(m, k)"}</td>
              <td>Remove entry</td>
            </tr>
            <tr>
              <td>Length</td>
              <td>{"len(m)"}</td>
              <td>Number of entries</td>
            </tr>
            <tr>
              <td>Iterate</td>
              <td>{"for k,v range m"}</td>
              <td>Loop (random order)</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-6">
          <p className="font-semibold text-[#2e7d32]">AHA MOMENT: The Key Takeaways</p>
          <ul className="mt-2 space-y-2">
            <li>Map = key-value store, like PHP associative array</li>
            <li>Always initialize before writing - or PANIC!</li>
            <li>Use comma-ok idiom to check key existence</li>
            <li>Iterate in random order - don't rely on order</li>
            <li>Map keys must be comparable (not slices)</li>
            <li>NOT safe for concurrent access - use sync.Map</li>
            <li>Use for set, count, group patterns</li>
            <li>Laravel Cache and Collections similar!</li>
          </ul>
        </div>
      </section>
    </div>
  )
}