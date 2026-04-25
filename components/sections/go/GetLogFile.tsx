import { CodeBlock, Tip } from '@/components/ui'

export function GetLogFile() {
  return (
    <section>
      <h2 id="getlogfile" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        Function: getLogFile()
      </h2>
      <p>Creates a log file for today&apos;s date.</p>
      <CodeBlock>{`func getLogFile() (*os.File, error) {
    logDir := "logs"

    // Create logs directory if it doesn't exist
    if err := os.MkdirAll(logDir, 0755); err != nil {
        return nil, fmt.Errorf("failed to create log directory: %w", err)
    }

    // Create log file: logs/2026-04-15.log
    logFile := filepath.Join(logDir, time.Now().Format("2006-01-02")+".log")

    // Open file in append mode
    f, err := os.OpenFile(logFile, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0644)
    if err != nil {
        return nil, fmt.Errorf("failed to open log file: %w", err)
    }

    return f, nil
}`}</CodeBlock>

      <p><strong>JavaScript equivalent:</strong></p>
      <CodeBlock>{`function getLogFile() {
    const logDir = "logs";

    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }

    const date = new Date().toISOString().split('T')[0];
    const logFile = path.join(logDir, \`\${date}.log\`);

    const f = fs.openSync(logFile, 'a');
    return f;
}`}</CodeBlock>

      <Tip>
        <strong>Tip:</strong> Go uses <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">:=</code> for short variable declaration (infers type), while JavaScript uses{' '}
        <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">const</code> or{' '}
        <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">let</code>.
      </Tip>
      <hr className="border-none border-t border-[#ddd] my-10" />
    </section>
  )
}
