import { CodeBlock, Note, Warning, ComparisonTable } from '@/components/ui'

export function GetLogFileDetailed() {
  return (
    <section>
      <h2 id="getlogfile-detailed" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        Function: getLogFile() - Detailed Breakdown
      </h2>
      <p>This function creates/opens a daily log file and returns a file handle.</p>

      <CodeBlock>{`func getLogFile() *os.File {
    logDir := "logs"

    if err := os.MkdirAll(logDir, 0755); err != nil {
        slog.Error("Failed to create log directory", "error", err)
        return nil
    }

    logFile := filepath.Join(logDir, time.Now().Format("2006-01-02")+".log")

    f, err := os.OpenFile(logFile, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0644)
    if err != nil {
        slog.Error("Failed to open log file", "error", err)
        return nil
    }

    return f
}`}</CodeBlock>

      <h3 className="text-[#5f6368]">Step 1: Create the logs directory</h3>
      <CodeBlock>{`if err := os.MkdirAll(logDir, 0755); err != nil {
    slog.Error("Failed to create log directory", "error", err)
    return nil
}`}</CodeBlock>
      <p><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">os.MkdirAll</code> creates the <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">logs/</code> directory and any parent directories (like <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">mkdir -p</code>).</p>
      <p><strong>Permissions 0755:</strong> Owner: read+write+execute (7), Group: read+execute (5), Others: read+execute (5)</p>

      <h3 className="text-[#5f6368]">Step 2: Build the filename</h3>
      <CodeBlock>{`logFile := filepath.Join(logDir, time.Now().Format("2006-01-02")+".log")`}</CodeBlock>
      <p>Produces: <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">logs/2026-04-15.log</code></p>

      <Note>
        <strong>⚠️ Go&apos;s weird time formatting:</strong> Go doesn&apos;t use <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">YYYY-MM-DD</code>. It uses a reference date: <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Mon Jan 2 15:04:05 MST 2006</code>
      </Note>

      <ComparisonTable>
        <thead><tr><th>Part</th><th>Meaning</th></tr></thead>
        <tbody>
          <tr><td>2006</td><td>4-digit year</td></tr>
          <tr><td>01</td><td>2-digit month</td></tr>
          <tr><td>02</td><td>2-digit day</td></tr>
        </tbody>
      </ComparisonTable>

      <h3 className="text-[#5f6368]">Step 3: Open the file — os.OpenFile explained</h3>
      <CodeBlock>{`f, err := os.OpenFile(logFile, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0644)`}</CodeBlock>

      <ComparisonTable>
        <thead><tr><th>Flag</th><th>Meaning</th></tr></thead>
        <tbody>
          <tr><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">os.O_CREATE</code></td><td>Create the file if it doesn&apos;t exist</td></tr>
          <tr><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">os.O_WRONLY</code></td><td>Write-only mode</td></tr>
          <tr><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">os.O_APPEND</code></td><td>Add new content to END (don&apos;t overwrite)</td></tr>
        </tbody>
      </ComparisonTable>

      <Warning>
        <strong>Why this combination matters:</strong>
        <ul className="mt-2 space-y-1">
          <li>Without O_APPEND: File content gets overwritten each write ❌</li>
          <li>With O_APPEND: Old logs preserved, new content added to end ✅</li>
        </ul>
      </Warning>

      <CodeBlock>{`getLogFile()
    │
    ├── Create "logs/" directory
    │       └── Failed? → log error, return nil
    │
    ├── Build filename: "logs/2026-04-15.log"
    │
    ├── Open file (create if needed, append mode)
    │       └── Failed? → log error, return nil
    │
    └── Return file handle ✅`}</CodeBlock>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </section>
  )
}
