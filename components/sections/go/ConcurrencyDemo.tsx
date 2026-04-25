'use client'
import { useState } from 'react'
import { CodeBlock, ComparisonGrid } from '@/components/ui'

type Mode = 'idle' | 'sequential' | 'concurrent'

const SEQUENTIAL_STEPS = [
  'Starting task 1...',
  '⏳ Waiting for task 1... (100ms)',
  '✅ Task 1 done!',
  'Starting task 2...',
  '⏳ Waiting for task 2... (100ms)',
  '✅ Task 2 done!',
  'Starting task 3...',
  '⏳ Waiting for task 3... (100ms)',
  '✅ Task 3 done!',
  '🎉 All done! Total time: 300ms',
]

const CONCURRENT_STEPS = [
  'Starting all tasks at once! ⚡',
  '✅ All 3 tasks running simultaneously...',
  '⏳ Waiting for all to complete... (100ms)',
  '🎉 All done! Total time: 100ms',
  '⚡ 3x FASTER than sequential!',
]

export function ConcurrencyDemo() {
  const [mode, setMode] = useState<Mode>('idle')

  return (
    <section>
      <h2 id="concurrency" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        🎮 Go vs JavaScript Concurrency - Visual Demo
      </h2>
      <p>One of Go&apos;s most powerful features is built-in concurrency.</p>

      <h3 className="text-[#5f6368]">The Core Difference</h3>
      <ComparisonGrid
        left={
          <>
            <h4 className="font-bold">🐹 Go - Goroutines</h4>
            <p><strong>Lightweight threads</strong></p>
            <p>Stack: ~2KB (grows as needed)</p>
            <p>Can create: 100,000+</p>
            <p className="text-2xl my-2">⚡ super fast</p>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#00d4aa] text-white mr-1">go func()</span>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#0288d1] text-white">chan</span>
          </>
        }
        right={
          <>
            <h4 className="font-bold">📜 JavaScript - Async/Await</h4>
            <p><strong>Event Loop</strong></p>
            <p>Single thread with callbacks</p>
            <p>Non-blocking I/O</p>
            <p className="text-2xl my-2">🐢 single thread</p>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#f44336] text-white mr-1">async</span>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#ff9800] text-white">await</span>
          </>
        }
      />

      <h3 className="text-[#5f6368]">Code Comparison</h3>
      <h4>JavaScript - Sequential (one at a time)</h4>
      <CodeBlock>{`async function fetchAll() {
    // These run ONE AT A TIME
    const user = await fetch('/api/user');      // Wait... ⚠️
    const posts = await fetch('/api/posts');    // Then wait... ⚠️
    const todos = await fetch('/api/todos');    // Then wait... ⚠️

    // Total time: 3 × 100ms = 900ms ❌
}`}</CodeBlock>

      <h4>Go - Concurrent (all at once)</h4>
      <CodeBlock>{`func fetchAll() {
    var wg sync.WaitGroup
    var user User
    var posts []Post
    var todos []Todo

    wg.Add(3)
    go func() {
        defer wg.Done()
        db.Query(&user)
    }()
    go func() {
        defer wg.Done()
        db.Query(&posts)
    }()
    go func() {
        defer wg.Done()
        db.Query(&todos)
    }()

    wg.Wait() // Wait for all 3 to finish! ✅
    // Total time: 1 × 100ms = 100ms ✅
}`}</CodeBlock>

      <h3 className="text-[#5f6368]">Interactive Demo</h3>
      <p>Click to see the difference:</p>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setMode('sequential')}
          className="bg-[#1a73e8] text-white border-none px-6 py-3 rounded-md text-base cursor-pointer hover:scale-105 transition-transform"
        >
          ▶️ Run Sequential (JS)
        </button>
        <button
          onClick={() => setMode('concurrent')}
          className="bg-[#1a73e8] text-white border-none px-6 py-3 rounded-md text-base cursor-pointer hover:scale-105 transition-transform"
        >
          ⚡ Run Concurrent (Go)
        </button>
      </div>

      {mode !== 'idle' && (
        <div
          className={`mt-5 p-5 rounded-lg ${
            mode === 'sequential' ? 'bg-[#fff3e0]' : 'bg-[#e0f7f0]'
          }`}
        >
          <pre className="text-left bg-transparent text-[#333] p-0 text-sm">
            {(mode === 'sequential' ? SEQUENTIAL_STEPS : CONCURRENT_STEPS).join('\n')}
          </pre>
        </div>
      )}

      <div className="mt-5 text-sm text-[#666]">
        <p><strong>Why this matters:</strong></p>
        <ul className="mt-2 space-y-1 list-disc pl-5">
          <li>Go can handle 10,000+ concurrent database queries</li>
          <li>JavaScript would need connection pooling + careful ordering</li>
          <li>Go&apos;s channels make parallel programming simple</li>
        </ul>
      </div>

      <h3 id="production" className="text-[#5f6368] mt-8">🏢 Who Uses Go in Production?</h3>
      <div className="flex flex-wrap justify-center gap-4 my-5 p-5 bg-[#f9f9f9] rounded-lg">
        {[
          { emoji: '🔍', company: 'Google', product: 'Kubernetes', desc: 'Container orchestration' },
          { emoji: '📘', company: 'Facebook', product: 'Hydra', desc: 'Database query language' },
          { emoji: '☁️', company: 'AWS', product: 'Lambda', desc: 'Serverless functions' },
          { emoji: '🎬', company: 'YouTube', product: 'Vitess', desc: 'MySQL scaling' },
          { emoji: '💳', company: 'Dropbox', product: 'Backend', desc: 'File storage' },
          { emoji: '🚗', company: 'Uber', product: 'Microservices', desc: 'Matchmaking' },
        ].map(({ emoji, company, product, desc }) => (
          <div key={company} className="text-center p-5">
            <div className="text-4xl">{emoji}</div>
            <h4 className="font-bold my-1">{company}</h4>
            <p className="font-bold">{product}</p>
            <p className="text-xs text-[#666]">{desc}</p>
          </div>
        ))}
      </div>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </section>
  )
}
