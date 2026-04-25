'use client'

import { CodeBlock, Note, Tip, ComparisonTable, Warning } from '@/components/ui'

export function CollectionsTutorial() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="collections-tutorial" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Laravel Collections - The Complete Guide
        </h2>

        <div className="bg-[#f8f9fa] p-4 rounded-lg my-4 border-l-4 border-[#FF2D20]">
          <p className="font-semibold mb-2">Learning Roadmap</p>
          <ul className="text-sm space-y-1">
            <li>1. What are Collections?</li>
            <li>2. Creating Collections</li>
            <li>3. Essential methods (map, filter, reduce)</li>
            <li>4. More useful methods</li>
            <li>5. Higher-order messaging</li>
            <li>6. Collections vs JS/Go comparison</li>
            <li>7. Performance tips</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          By the end of this tutorial, you will master Laravel Collections, understanding 
          their power compared to JavaScript array methods and Go slices!
        </p>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          What are Collections?
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>PHP Array = A messy drawer where you throw everything in randomly</li>
            <li>Laravel Collection = A well-organized toolbox where every tool has its place</li>
            <li>Methods like map/filter = Magic wands that transform arrays with elegant syntax!</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          The <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Illuminate\Support\Collection</code> class provides a fluent, 
          convenient wrapper for working with arrays of data. Collections are <strong>immutable</strong> - 
          every method returns a new collection instance!
        </p>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Feature</th>
              <th>PHP Array</th>
              <th>Laravel Collection</th>
              <th>JavaScript Array</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Fluent syntax</td>
              <td>No</td>
              <td>Yes (chainable)</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Immutable</td>
              <td>No</td>
              <td>Yes</td>
              <td>Some methods</td>
            </tr>
            <tr>
              <td>100+ methods</td>
              <td>Limited</td>
              <td>Yes!</td>
              <td>Moderate</td>
            </tr>
            <tr>
              <td>Type safety</td>
              <td>None</td>
              <td>Weak (runtime)</td>
              <td>TypeScript helps</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <Tip>
          AHA Moment: Collections are like JavaScript's array methods on steroids! 
          Every method is chainable and returns a new collection.
        </Tip>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Creating Collections
        </h3>

        <p className="text-[#5f6368] mt-3">
          The collect() helper wraps any array in a Collection instance.
        </p>

        <CodeBlock>{`// From a simple array
$collection = collect([1, 2, 3]);

// From Eloquent query (returns Collection!)
$users = User::all();
$users = User::where('active', true)->get();

// From a range
$nums = collect(range(1, 10));

// Empty collection
$empty = collect();`}</CodeBlock>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Create Collections</p>
          <p className="mt-2 text-sm">Practice creating collections:</p>
          <CodeBlock>{`// Exercise 1: Create from array of names
$names = collect(['Alice', 'Bob', 'Charlie']);
echo $names->count();

// Exercise 2: Create from Eloquent
$activeUsers = User::where('status', 'active')->get();

// Exercise 3: Create empty then add items
$items = collect();
$items = $items->merge(['apple', 'banana']);
echo $items->first();`}</CodeBlock>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Essential Methods: map, filter, reduce
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">map() - Transform Every Item</h4>
        <p className="text-[#5f6368] mt-2">
          map() transforms each item in the collection and returns a new collection.
        </p>

        <CodeBlock>{`// Double every number
$numbers = collect([1, 2, 3, 4, 5]);
$doubled = $numbers->map(fn($n) => $n * 2);

// [2, 4, 6, 8, 10]

// Transform objects
$users = collect([
    ['name' => 'Alice', 'age' => 25],
    ['name' => 'Bob', 'age' => 30],
]);

$names = $users->map(fn($user) => $user['name']);
// ['Alice', 'Bob']`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">filter() - Keep Matching Items</h4>
        <p className="text-[#5f6368] mt-2">
          filter() keeps only items where the callback returns true.
        </p>

        <CodeBlock>{`$numbers = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// Keep only even numbers
$evens = $numbers->filter(fn($n) => $n % 2 === 0);
// [2, 4, 6, 8, 10]

// Keep adults only
$users = collect([
    ['name' => 'Alice', 'age' => 25],
    ['name' => 'Bob', 'age' => 15],
    ['name' => 'Charlie', 'age' => 30],
]);

$adults = $users->filter(fn($user) => $user['age'] >= 18);
// [['name' => 'Alice', ...], ['name' => 'Charlie', ...]]`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">reduce() - Combine to Single Value</h4>
        <p className="text-[#5f6368] mt-2">
          reduce() combines all items into a single value (like summing).
        </p>

        <CodeBlock>{`$numbers = collect([1, 2, 3, 4, 5]);

// Sum all numbers
$sum = $numbers->reduce(fn($carry, $item) => $carry + $item, 0);
// 15

// Could also use sum()
$sum = $numbers->sum();
// 15

// Concatenate strings
$words = collect(['Hello', 'World']);
$result = $words->reduce(fn($carry, $item) => "$carry $item", '');
// 'Hello World'`}</CodeBlock>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Chain Methods</p>
          <p className="mt-2 text-sm">Combine map, filter, and reduce:</p>
          <CodeBlock>{`// Exercise: Get total price of expensive items (price > 100)
$products = collect([
    ['name' => 'Laptop', 'price' => 999],
    ['name' => 'Mouse', 'price' => 25],
    ['name' => 'Monitor', 'price' => 299],
    ['name' => 'Keyboard', 'price' => 89],
]);

$total = $products
    ->filter(fn($p) => $p['price'] > 100)
    ->sum('price');
// 1298`}</CodeBlock>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          More Useful Methods
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">first() and last()</h4>
        <CodeBlock>{`$users = collect([
    ['name' => 'Alice', 'score' => 95],
    ['name' => 'Bob', 'score' => 82],
    ['name' => 'Charlie', 'score' => 78],
]);

$first = $users->first();
// ['name' => 'Alice', 'score' => 95]

$last = $users->last();
// ['name' => 'Charlie', 'score' => 78]

// First matching condition
$topStudent = $users->first(fn($u) => $u['score'] >= 90);
// ['name' => 'Alice', 'score' => 95]`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">pluck() - Extract Values</h4>
        <p className="text-[#5f6368] mt-2">
          pluck() retrieves all values for a given key (like map + pluck).
        </p>
        <CodeBlock>{`$users = collect([
    ['id' => 1, 'name' => 'Alice'],
    ['id' => 2, 'name' => 'Bob'],
    ['id' => 3, 'name' => 'Charlie'],
]);

// Get all names
$names = $users->pluck('name');
// ['Alice', 'Bob', 'Charlie']

// Get names keyed by id
$indexed = $users->pluck('name', 'id');
// [1 => 'Alice', 2 => 'Bob', 3 => 'Charlie']`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">reject() - Remove Matching Items</h4>
        <p className="text-[#5f6368] mt-2">
          reject() removes items where the callback returns true (opposite of filter).
        </p>
        <CodeBlock>{`$items = collect([1, 2, 3, 4, 5, 6]);

// Remove even numbers
$odds = $items->reject(fn($n) => $n % 2 === 0);
// [1, 3, 5]`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">flatten() and flatMap()</h4>
        <CodeBlock>{`// Flatten nested arrays
$nested = collect([[1, 2], [3, 4], [5, 6]]);
$flat = $nested->flatten();
// [1, 2, 3, 4, 5, 6]

// flatMap = map + flatten
$words = collect(['hello', 'world']);
$result = $words->flatMap(fn($word) => str_split($word));
// ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">groupBy() and chunk()</h4>
        <CodeBlock>{`// Group by a key
$products = collect([
    ['category' => 'Electronics', 'name' => 'Laptop'],
    ['category' => 'Electronics', 'name' => 'Mouse'],
    ['category' => 'Furniture', 'name' => 'Chair'],
]);

$grouped = $products->groupBy('category');
// Collection {
//   'Electronics' => Collection{[...]},
//   'Furniture' => Collection{[...]}
// }

// Chunk into smaller collections
$chunks = collect([1, 2, 3, 4, 5, 6, 7, 8])->chunk(3);
// Collection{[1,2,3], [4,5,6], [7,8]}`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">sortBy() and unique()</h4>
        <CodeBlock>{`// Sort by key
$users = collect([
    ['name' => 'Charlie', 'age' => 30],
    ['name' => 'Alice', 'age' => 25],
    ['name' => 'Bob', 'age' => 35],
]);

$sorted = $users->sortBy('age');
// Alice (25), Charlie (30), Bob (35)

// Remove duplicates
$numbers = collect([1, 2, 2, 3, 3, 3, 4]);
$unique = $numbers->unique();
// [1, 2, 3, 4]`}</CodeBlock>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Higher Order Messaging
        </h3>

        <p className="text-[#5f6368] mt-2">
          Higher order messages provide a shortcut for common actions on collections.
        </p>

        <CodeBlock>{`// Instead of this:
$users->each(function ($user) {
    $user->markAsVip();
});

// You can do this:
$users->each->markAsVip();`}</CodeBlock>

        <CodeBlock>{`// More examples:
$users->each->update(['notified' => true]);

$orders->each->calculateTotals();

$posts->each->publish();`}</CodeBlock>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Method</th>
              <th>Regular Syntax</th>
              <th>Higher Order</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>each</td>
              <td>{"->each(fn($item) => ...)"}</td>
              <td>{"->each->method()"}</td>
            </tr>
            <tr>
              <td>map</td>
              <td>{"->map(fn($item) => ...)"}</td>
              <td>{"->map->property"}</td>
            </tr>
            <tr>
              <td>filter</td>
              <td>{"->filter(fn($item) => ...)"}</td>
              <td>{"->filter->property"}</td>
            </tr>
          </tbody>
        </ComparisonTable>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          JavaScript / Go Comparison
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Laravel Collection vs JavaScript Array</h4>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Operation</th>
              <th>Laravel Collection</th>
              <th>JavaScript Array</th>
              <th>Go Slice</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Create</td>
              <td>{"collect([1,2,3])"}</td>
              <td>{"[1,2,3]"}</td>
              <td>{"[]int{1,2,3}"}</td>
            </tr>
            <tr>
              <td>map</td>
              <td>{"->map(fn($v) => ...)"}</td>
              <td>{"[].map(v => ...)"}</td>
              <td>Manual loop</td>
            </tr>
            <tr>
              <td>filter</td>
              <td>{"->filter(fn($v) => ...)"}</td>
              <td>{"[].filter(v => ...)"}</td>
              <td>Manual loop</td>
            </tr>
            <tr>
              <td>reduce</td>
              <td>{"->reduce(fn($c, $v) => ..., 0)"}</td>
              <td>{"[].reduce((c,v) => ..., 0)"}</td>
              <td>Manual loop</td>
            </tr>
            <tr>
              <td>first</td>
              <td>{"->first()"}</td>
              <td>{"[0]"}</td>
              <td>{"slice[0]"}</td>
            </tr>
            <tr>
              <td>sum</td>
              <td>{"->sum()"}</td>
              <td>{"[].reduce((a,b) => a+b, 0)"}</td>
              <td>Manual loop</td>
            </tr>
            <tr>
              <td>contains</td>
              <td>{"->contains($val)"}</td>
              <td>{"[].includes(val)"}</td>
              <td>Manual loop</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <h4 className="text-[#5f6368] mt-6 font-semibold">map() Side by Side</h4>

        <div className="grid md:grid-cols-3 gap-4 my-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold text-blue-800">Laravel</p>
            <CodeBlock>{`$doubled = collect([1,2,3])
    ->map(fn($n) => $n * 2);
// [2, 4, 6]`}</CodeBlock>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="font-semibold text-yellow-800">JavaScript</p>
            <CodeBlock>{`const doubled = [1,2,3]
    .map(n => n * 2);
// [2, 4, 6]`}</CodeBlock>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="font-semibold text-green-800">Go</p>
            <CodeBlock>{`doubled := make([]int, len(nums))
for i, n := range nums {
    doubled[i] = n * 2
}`}</CodeBlock>
          </div>
        </div>

        <h4 className="text-[#5f6368] mt-6 font-semibold">filter() Side by Side</h4>

        <div className="grid md:grid-cols-3 gap-4 my-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold text-blue-800">Laravel</p>
            <CodeBlock>{`$evens = collect([1,2,3,4])
    ->filter(fn($n) => $n % 2 == 0);
// [2, 4]`}</CodeBlock>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="font-semibold text-yellow-800">JavaScript</p>
            <CodeBlock>{`const evens = [1,2,3,4]
    .filter(n => n % 2 === 0);
// [2, 4]`}</CodeBlock>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="font-semibold text-green-800">Go</p>
            <CodeBlock>{`var evens []int
for _, n := range nums {
    if n % 2 == 0 {
        evens = append(evens, n)
    }
}`}</CodeBlock>
          </div>
        </div>

        <Tip>
          Key Insight: Laravel Collections have the same fluent chainability as JavaScript, 
          but Go requires explicit loops for every transformation!
        </Tip>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Performance Tips
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Lazy Collections</h4>
        <p className="text-[#5f6368] mt-2">
          For large datasets, use lazy() to defer processing until absolutely needed.
        </p>
        <CodeBlock>{`// Regular collection - processes immediately
$users = User::all()->map(fn($u) => expensiveOp($u));

// Lazy collection - only processes when iterated
$users = User::lazy()->map(fn($u) => expensiveOp($u));`}</CodeBlock>

        <Warning>
          Performance Warning: Chaining many methods on large datasets can be slow. 
          Use lazy() when processing thousands of records!
        </Warning>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Early Termination</h4>
        <p className="text-[#5f6368] mt-2">
          Use first() instead of filter()-&gt;first() to avoid processing entire collection.
        </p>
        <CodeBlock>{`// Bad: Processes entire collection
$user = $users->filter(fn($u) => $u->id === 1)->first();

// Good: Stops at first match
$user = $users->first(fn($u) => $u->id === 1);`}</CodeBlock>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-6">
          <p className="font-semibold text-[#2e7d32]">AHA MOMENT: Key Takeaways</p>
          <ul className="mt-2 space-y-2">
            <li>Collections are immutable - every method returns a new instance!</li>
            <li>Use collect() to wrap arrays, or get() from Eloquent</li>
            <li>Chaining is your friend - .map()-&gt;filter()-&gt;first() is idiomatic</li>
            <li>100+ methods cover almost every array operation you need</li>
            <li>Higher-order messaging makes simple operations elegant</li>
            <li>Use lazy() for large datasets to save memory</li>
            <li>Go requires manual loops - no map/filter/reduce built-in!</li>
          </ul>
        </div>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}