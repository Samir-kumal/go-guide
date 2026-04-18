import { CodeBlock, Warning, Tip, ComparisonTable } from '@/components/ui'

export function Sqlc() {
  return (
    <section>
      <h2 id="sqlc" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        ⚡ SQLC — Code Generation
      </h2>

      <h3 className="text-[#5f6368]">The Problem</h3>
      <CodeBlock>{`// Manual way — writing Go database code by hand 😩
func GetUser(ctx context.Context, pool *pgxpool.Pool, id int) (User, error) {
    var user User
    err := pool.QueryRow(ctx,
        "SELECT id, name, email, created_at FROM users WHERE id = $1",
        id,
    ).Scan(&user.ID, &user.Name, &user.Email, &user.CreatedAt)
    return user, err
}`}</CodeBlock>

      <Warning>
        <strong>Problems:</strong>
        <ul className="mt-2 space-y-1">
          <li>❌ SQL is just a string — typos not caught until runtime</li>
          <li>❌ Must manually map each column to a Go field</li>
          <li>❌ Wrong column order? Bug found only at runtime</li>
        </ul>
      </Warning>

      <h3 className="text-[#5f6368]">Step 1: Configure SQLC</h3>
      <CodeBlock>{`version: "2"
sql:
  - engine: "postgresql"
    queries: "sql/queries/"
    schema: "sql/schema/"
    gen:
      go:
        package: "db"
        out: "internal/db"`}</CodeBlock>

      <h3 className="text-[#5f6368]">Step 2: Define Your Schema</h3>
      <CodeBlock>{`CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    email       TEXT NOT NULL UNIQUE,
    created_at  TIMESTAMP DEFAULT NOW()
);`}</CodeBlock>

      <h3 className="text-[#5f6368]">Step 3: Write Your Queries</h3>
      <CodeBlock>{`-- name: GetUser :one
SELECT * FROM users WHERE id = $1;

-- name: ListUsers :many
SELECT * FROM users ORDER BY created_at DESC;

-- name: CreateUser :one
INSERT INTO users (name, email)
VALUES ($1, $2)
RETURNING *;

-- name: DeleteUser :exec
DELETE FROM users WHERE id = $1;`}</CodeBlock>

      <ComparisonTable>
        <thead><tr><th>Tag</th><th>Meaning</th></tr></thead>
        <tbody>
          <tr><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">:one</code></td><td>Returns one row</td></tr>
          <tr><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">:many</code></td><td>Returns multiple rows</td></tr>
          <tr><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">:exec</code></td><td>Returns nothing</td></tr>
          <tr><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">:execresult</code></td><td>Returns rows affected</td></tr>
        </tbody>
      </ComparisonTable>

      <h3 className="text-[#5f6368]">Step 4: Run SQLC Generate</h3>
      <CodeBlock>{`$ sqlc generate`}</CodeBlock>

      <h3 className="text-[#5f6368]">Step 5: Generated Code</h3>
      <CodeBlock>{`// models.go — auto-generated
type User struct {
    ID        int32     \`json:"id"\`
    Name      string   \`json:"name"\`
    Email     string   \`json:"email"\`
    CreatedAt time.Time \`json:"created_at"\`
}`}</CodeBlock>

      <h3 className="text-[#5f6368]">Step 6: Use the Generated Code</h3>
      <CodeBlock>{`queries := db.New(pool)

user, err := queries.CreateUser(ctx, db.CreateUserParams{
    Name:  "John",
    Email: "john@email.com",
})

users, err := queries.ListUsers(ctx)
err := queries.DeleteUser(ctx, 1)`}</CodeBlock>

      <Tip>
        <strong>Manual vs SQLC:</strong> Manual = write all boilerplate. SQLC = write SQL + magic comments, get type-safe Go.
      </Tip>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </section>
  )
}
