import { CodeBlock, Note, ComparisonTable, ComparisonGrid } from '@/components/ui'

export function SlicesAndMaps() {
  return (
    <div>
      <h3 id="slices-and-maps" className="text-[#5f6368] text-xl font-semibold mt-6">
        9. Slices and Maps - Working with Collections
      </h3>
      <p>
        In Go, slices and maps are the primary collection types. While they look similar to JavaScript Arrays and Objects, their memory layout and performance characteristics are significantly different.
      </p>

      <h4 className="font-bold mt-6 mb-2">Slices vs. JavaScript Arrays</h4>
      <p>
        A Go <strong>slice</strong> is a descriptor for a contiguous segment of an underlying array. In contrast, JavaScript Arrays are high-level objects that can be non-contiguous (holey) and store mixed types.
      </p>

      <ComparisonTable>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Go Slice</th>
            <th>JS Array</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Memory</strong></td>
            <td>Contiguous block (Cache-friendly)</td>
            <td>Non-contiguous / Object-based</td>
          </tr>
          <tr>
            <td><strong>Types</strong></td>
            <td>Homogeneous (all same type)</td>
            <td>Heterogeneous (mixed types)</td>
          </tr>
          <tr>
            <td><strong>Growth</strong></td>
            <td>Explicit via <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">append</code></td>
            <td>Implicit via index/push</td>
          </tr>
        </tbody>
      </ComparisonTable>

      <h4 className="font-semibold mt-6">Slice Internals (The Header)</h4>
      <p>A slice is a 3-word structure (header) containing:</p>
      <ul className="list-disc pl-5 my-2">
        <li><strong>Pointer:</strong> Address of the backing array.</li>
        <li><strong>Length:</strong> Number of elements currently in the slice.</li>
        <li><strong>Capacity:</strong> Total elements the backing array can hold.</li>
      </ul>

      <CodeBlock>{`// Go: Creating a slice with capacity
nums := make([]int, 0, 10) // len=0, cap=10
nums = append(nums, 1, 2, 3) // Add elements

// JS: Dynamic array
const nums = [1, 2, 3]; // Automatically grows`}</CodeBlock>

      <Note>
        <strong>Internal Growth:</strong> When <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">append</code> exceeds capacity, Go allocates a new, larger backing array. For small slices, it doubles in size; for large slices (&gt;256 elements), the growth factor transitions to ~1.25x to minimize memory waste.
      </Note>

      <h4 className="font-bold mt-8 mb-2">Maps vs. JavaScript Objects</h4>
      <p>
        Go maps are hash tables designed for performance. JavaScript uses Objects (with hidden classes) or the <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Map</code> class.
      </p>

      <ComparisonGrid
        goContent={
          <>
            <h4 className="font-bold">🐹 Go Map</h4>
            <p>Iteration is <strong>randomized</strong> by design.</p>
            <p>Keys must be <strong>comparable</strong> types.</p>
            <p><strong>Not thread-safe</strong> (panics on concurrent write).</p>
          </>
        }
        jsContent={
          <>
            <h4 className="font-bold">📜 JS Object/Map</h4>
            <p>Object keys are stringified; <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Map</code> keys can be anything.</p>
            <p>Generally preserves insertion order.</p>
            <p>Single-threaded (no concurrent R/W issues).</p>
          </>
        }
      />

      <h4 className="font-semibold mt-6">Map Internals: Buckets & Collisions</h4>
      <p>
        Go maps are implemented as an array of <strong>buckets</strong>. Each bucket holds up to 8 key-value pairs.
      </p>
      <ul className="list-disc pl-5 my-2">
        <li><strong>Hashing:</strong> Go hashes keys to determine bucket index.</li>
        <li><strong>Collision Handling:</strong> Uses chaining with overflow buckets.</li>
        <li><strong>Resizing:</strong> When the load factor exceeds <strong>6.5</strong>, the map grows by doubling the buckets.</li>
      </ul>

      <CodeBlock>{`// Go: Type-safe map
users := make(map[string]int)
users["alice"] = 25

// JS: Object/Map
const users = { "alice": 25 };
// OR
const userMap = new Map([["alice", 25]]);`}</CodeBlock>

      <Note>
        <strong>The Zero Value:</strong> A <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">nil</code> slice is safe to use with <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">append</code>, but a <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">nil</code> map will <strong>panic</strong> if you try to write to it. Always use <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">make</code> for maps!
      </Note>
    </div>
  )
}
