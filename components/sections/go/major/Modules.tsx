import { CodeBlock, Note, ComparisonTable } from '@/components/ui'

export function Modules() {
  return (
    <div>
      <h3 id="modules-and-dependency-management" className="text-[#5f6368] text-xl font-semibold mt-6">
        11. Modules - Dependency Management
      </h3>
      <p>
        Coming from the <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">npm</code> ecosystem, you are used to <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">package.json</code> and <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">node_modules</code>. Go uses <strong>Modules</strong> via <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">go.mod</code> and <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">go.sum</code>.
      </p>

      <h4 className="font-bold mt-6 mb-2">Comparison: Go vs. NPM</h4>
      <p>
        The most significant difference is how dependencies are stored. Go downloads dependencies into a <strong>global cache</strong> (usually <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">$GOPATH/pkg/mod</code>) instead of a local <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">node_modules</code> folder in every project.
      </p>

      <ComparisonTable>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Go Modules</th>
            <th>NPM / Yarn</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Manifest</strong></td>
            <td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">go.mod</code></td>
            <td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">package.json</code></td>
          </tr>
          <tr>
            <td><strong>Lockfile</strong></td>
            <td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">go.sum</code></td>
            <td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">package-lock.json</code> / <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">yarn.lock</code></td>
          </tr>
          <tr>
            <td><strong>Storage</strong></td>
            <td>Global Cache (<code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">pkg/mod</code>)</td>
            <td>Local <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">node_modules</code></td>
          </tr>
          <tr>
            <td><strong>Resolving</strong></td>
            <td>Minimal Version Selection</td>
            <td>Semantic Versioning (Ranges)</td>
          </tr>
        </tbody>
      </ComparisonTable>

      <h4 className="font-semibold mt-6">The go.mod File</h4>
      <p>
        A <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">go.mod</code> file defines the module path, the Go version, and required dependencies.
      </p>

      <CodeBlock>{`// go.mod
module github.com/user/myproject

go 1.21

require (
    github.com/google/uuid v1.4.0
    github.com/lib/pq v1.10.9
)`}</CodeBlock>

      <h4 className="font-semibold mt-6">Common Commands</h4>
      <ul className="list-disc pl-5 my-2">
        <li><strong>Initialize:</strong> <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">go mod init [name]</code> (like <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">npm init</code>)</li>
        <li><strong>Add Dependency:</strong> <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">go get [url]</code> (like <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">npm install</code>)</li>
        <li><strong>Cleanup:</strong> <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">go mod tidy</code> (Removes unused deps and adds missing ones)</li>
      </ul>

      <Note>
        <strong>Implicit Installs:</strong> In Go, you often don&apos;t need to run "install" commands manually. When you import a new package and run <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">go build</code> or <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">go mod tidy</code>, Go will automatically fetch the missing dependencies.
      </Note>
    </div>
  )
}
