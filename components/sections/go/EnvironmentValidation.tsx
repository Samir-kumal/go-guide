import { CodeBlock, Note, ComparisonTable } from '@/components/ui'

export function EnvironmentValidation() {
  return (
    <section>
      <h2 id="deep-dive-environment-variable-validation" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        Deep Dive: Environment Variable Validation
      </h2>
      <CodeBlock>{`totpKey := os.Getenv("TOTP_ENCRYPTION_KEY")
if totpKey == "" {
    logger.Error("TOTP_ENCRYPTION_KEY is required")
    os.Exit(1)
}

if _, err := base64.StdEncoding.DecodeString(totpKey); err != nil {
    logger.Error("Invalid base64")
    os.Exit(1)
}`}</CodeBlock>

      <p>This code performs only <strong>two checks</strong>:</p>
      <ComparisonTable>
        <thead><tr><th>Check</th><th>What It Validates</th></tr></thead>
        <tbody>
          <tr><td>Empty check</td><td>The environment variable exists</td></tr>
          <tr><td>Base64 validation</td><td>The string is properly encoded base64</td></tr>
        </tbody>
      </ComparisonTable>

      <p><strong>Valid:</strong> <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">export TOTP_ENCRYPTION_KEY=&quot;YXMyMHUxMjM0NTY3ODkwYWJjZGVmZ2hpamtsbW5vcA==&quot;</code></p>

      <Note>
        <strong>Key Takeaway:</strong> The key is just a secret string encoded in base64. Validation ensures proper format only — not length, strength, or correctness.
      </Note>
      <hr className="border-none border-t border-[#ddd] my-10" />
    </section>
  )
}
