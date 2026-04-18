import { ComparisonTable } from '@/components/ui'

export function LearningPath() {
  return (
    <section>
      <h2 id="learning-path" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        Learning Path
      </h2>

      <h3 className="text-[#5f6368]">Interactive Practice</h3>
      <p>Try these code snippets live at <a href="https://go.dev/play" target="_blank" className="text-[#1a73e8]">Go Playground</a>:</p>

      <ComparisonTable>
        <thead><tr><th>Topic</th><th>Go Playground Link</th></tr></thead>
        <tbody>
          {[
            ['Variables & Types', 'https://go.dev/play/p/N7M47tT3p9M'],
            ['Functions', 'https://go.dev/play/p/xRDi1nR2p8K'],
            ['Error Handling', 'https://go.dev/play/p/L4uS1sR1p7J'],
            ['Pointers', 'https://go.dev/play/p/W8vT2sR3p6K'],
            ['Structs', 'https://go.dev/play/p/H9uU4rR4p5H'],
            ['Interfaces', 'https://go.dev/play/p/G8tT5sR5p4G'],
            ['Defer', 'https://go.dev/play/p/F7sU6rR6p3F'],
            ['File Operations', 'https://go.dev/play/p/E6rT7sR7p2E'],
          ].map(([topic, link]) => (
            <tr key={topic}>
              <td>{topic}</td>
              <td><a href={link} target="_blank" className="text-[#1a73e8]">Try it →</a></td>
            </tr>
          ))}
        </tbody>
      </ComparisonTable>

      <h3 className="text-[#5f6368]">Week 1: Basics</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li><a href="https://go.dev/tour" target="_blank" className="text-[#1a73e8]">Go Tour</a> — Interactive introduction</li>
        <li>Variables, functions, control flow</li>
        <li>Basic types and constants</li>
      </ul>

      <h3 className="text-[#5f6368]">Week 2: Intermediate</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>Structs and methods</li>
        <li>Pointers and memory</li>
        <li>Error handling</li>
        <li>Arrays and slices</li>
        <li>Maps (like JavaScript objects)</li>
      </ul>

      <h3 className="text-[#5f6368]">Week 3: Web Dev</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>HTTP servers</li>
        <li>chi router</li>
        <li>Middleware</li>
        <li>JSON handling</li>
      </ul>

      <h3 className="text-[#5f6368]">Week 4: Database</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>pgx/pgxpool</li>
        <li>SQL basics</li>
        <li>sqlc code generation</li>
        <li>Transactions</li>
      </ul>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </section>
  )
}
