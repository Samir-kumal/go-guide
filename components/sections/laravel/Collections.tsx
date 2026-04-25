import { CodeBlock, Note, Tip } from '@/components/ui'

export function Collections() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="collections" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Collections
        </h2>
        <p>The <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Illuminate\\Support\\Collection</code> class provides a fluent, convenient wrapper for working with arrays of data.</p>
        
        <h3 className="text-[#5f6368] mt-6 font-semibold">Creating Collections</h3>
        <CodeBlock>{`$collection = collect([1, 2, 3]);`}</CodeBlock>

        <h3 className="text-[#5f6368] mt-8 font-semibold">Available Methods</h3>
        <p>Collections are immutable; every method returns an entirely new collection instance.</p>
        <CodeBlock>{`$collection = collect(['alice', 'bob', 'charlie', null])
    ->map(fn($name) => strtoupper($name))
    ->reject(fn($name) => empty($name));

// ['ALICE', 'BOB', 'CHARLIE']`}</CodeBlock>

        <h4 className="font-semibold mt-4">Common Methods:</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">filter()</code>: Filters the collection using a callback.</li>
          <li><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">first()</code>: Returns the first element in the collection.</li>
          <li><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">pluck()</code>: Retrieves all values for a given key.</li>
          <li><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">reduce()</code>: Reduces the collection to a single value.</li>
        </ul>

        <Tip>
          <strong>JS Tip:</strong> Laravel Collections are like Lodash or the native JavaScript Array methods (<code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">map</code>, <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">filter</code>, <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">reduce</code>), but with much more power and consistency.
        </Tip>
      </section>

      <section>
        <h3 id="higher-order-messages" className="text-[#5f6368] mt-8 font-semibold">Higher Order Messages</h3>
        <p>Higher order messages provide a shortcut for common actions on collections.</p>
        <CodeBlock>{`// Instead of this:
$users->each(function ($user) {
    $user->markAsVip();
});

// You can do this:
$users->each->markAsVip();`}</CodeBlock>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}
