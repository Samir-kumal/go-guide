import { CodeBlock, Note, ComparisonTable } from '@/components/ui'

export function Transactions() {
  return (
    <section>
      <h2 id="transactions" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        🔄 Transactions
      </h2>
      <p>A transaction is a group of operations that must <strong>ALL succeed or ALL fail</strong>.</p>

      <h3 className="text-[#5f6368]">Transaction Rules: ACID</h3>
      <ComparisonTable>
        <tbody>
          <tr><td><strong>A</strong></td><td>Atomicity</td><td>All or nothing. No partial changes.</td></tr>
          <tr><td><strong>C</strong></td><td>Consistency</td><td>Database stays valid.</td></tr>
          <tr><td><strong>I</strong></td><td>Isolation</td><td>Others don&apos;t see incomplete changes.</td></tr>
          <tr><td><strong>D</strong></td><td>Durability</td><td>Once committed, it&apos;s permanent.</td></tr>
        </tbody>
      </ComparisonTable>

      <h3 className="text-[#5f6368]">Transactions in Go with pgx</h3>
      <CodeBlock>{`func TransferMoney(ctx context.Context, pool *pgxpool.Pool, fromID, toID int, amount int) error {
    tx, err := pool.Begin(ctx)
    if err != nil {
        return err
    }
    defer tx.Rollback(ctx)

    _, err = tx.Exec(ctx,
        "UPDATE accounts SET balance = balance - $1 WHERE user_id = $2",
        amount, fromID,
    )
    if err != nil {
        return err
    }

    _, err = tx.Exec(ctx,
        "UPDATE accounts SET balance = balance + $1 WHERE user_id = $2",
        amount, toID,
    )
    if err != nil {
        return err
    }

    return tx.Commit(ctx)
}`}</CodeBlock>

      <h3 className="text-[#5f6368]">Transactions with SQLC</h3>
      <CodeBlock>{`func TransferMoney(ctx context.Context, pool *pgxpool.Pool, fromID, toID int32, amount int32) error {
    tx, err := pool.Begin(ctx)
    if err != nil {
        return err
    }
    defer tx.Rollback(ctx)

    queries := db.New(tx)  // ← pass tx instead of pool!

    err = queries.DeductBalance(ctx, ...)
    if err != nil {
        return err
    }

    return tx.Commit(ctx)
}`}</CodeBlock>

      <Note>
        <h4 className="font-bold">Summary</h4>
        <ul className="mt-2 space-y-1">
          <li><strong>SQL:</strong> CREATE, INSERT, SELECT, UPDATE, DELETE</li>
          <li><strong>SQLC:</strong> Write SQL with magic comments, get Go code</li>
          <li><strong>Transactions:</strong> Group ops together, all succeed/fail together</li>
        </ul>
      </Note>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </section>
  )
}
