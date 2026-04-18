import { CodeBlock, Warning, ComparisonTable } from '@/components/ui'

export function SqlBasics() {
  return (
    <section>
      <h2 id="sql-basics" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        📊 SQL Basics
      </h2>
      <h3 className="text-[#5f6368]">What is a Database?</h3>
      <p>Think of it as a collection of <strong>spreadsheets (tables)</strong>:</p>
      <CodeBlock>{`Database: taskflow_dev
    │
    ├── Table: users
    │   ┌────┬──────────┬─────────────────┬────────────┐
    │   │ id │ name     │ email           │ created_at │
    │   ├────┼──────────┼─────────────────┼────────────┤
    │   │ 1  │ John     │ john@email.com  │ 2025-01-01 │
    │   │ 2  │ Sarah    │ sarah@email.com │ 2025-01-02 │
    │   └────┴──────────┴─────────────────┴────────────┘
    │
    └── Table: tasks
        ┌────┬────────────┬─────────┬──────────┐
        │ id │ title      │ status  │ user_id  │
        ├────┼────────────┼─────────┼──────────┤
        │ 1  │ Buy milk   │ pending │ 1        │
        │ 2  │ Code app   │ done    │ 1        │
        └────┴────────────┴─────────┴──────────┘`}</CodeBlock>

      <h3 className="text-[#5f6368]">The 4 Basic Operations (CRUD)</h3>
      <ComparisonTable>
        <tbody>
          <tr><td><strong>C</strong></td><td>Create</td><td>INSERT</td></tr>
          <tr><td><strong>R</strong></td><td>Read</td><td>SELECT</td></tr>
          <tr><td><strong>U</strong></td><td>Update</td><td>UPDATE</td></tr>
          <tr><td><strong>D</strong></td><td>Delete</td><td>DELETE</td></tr>
        </tbody>
      </ComparisonTable>

      <h3 className="text-[#5f6368]">CREATE</h3>
      <CodeBlock>{`CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    email       TEXT NOT NULL UNIQUE,
    created_at  TIMESTAMP DEFAULT NOW()
);`}</CodeBlock>

      <h3 className="text-[#5f6368]">READ</h3>
      <CodeBlock>{`SELECT * FROM users;
SELECT name, email FROM users;
SELECT * FROM users WHERE id = 1;
SELECT * FROM users ORDER BY created_at DESC;
SELECT * FROM users LIMIT 10;
SELECT COUNT(*) FROM users;`}</CodeBlock>

      <h3 className="text-[#5f6368]">UPDATE</h3>
      <CodeBlock>{`UPDATE users
SET name = 'Johnny'
WHERE id = 1;`}</CodeBlock>
      <Warning>
        <strong>⚠️ ALWAYS use WHERE with UPDATE!</strong> Without it, you update ALL rows:
        <CodeBlock>{`UPDATE users SET name = 'Oops';  -- EVERY user is now named 'Oops' 😱`}</CodeBlock>
      </Warning>

      <h3 className="text-[#5f6368]">DELETE</h3>
      <CodeBlock>{`DELETE FROM users WHERE id = 1;`}</CodeBlock>
      <Warning>
        <strong>⚠️ ALWAYS use WHERE with DELETE!</strong>
        <CodeBlock>{`DELETE FROM users;  -- DELETES EVERY USER 😱😱😱`}</CodeBlock>
      </Warning>

      <h3 className="text-[#5f6368]">JOINs</h3>
      <CodeBlock>{`SELECT users.name, tasks.title, tasks.status
FROM tasks
JOIN users ON tasks.user_id = users.id;`}</CodeBlock>

      <h3 className="text-[#5f6368]">RETURNING Clause (PostgreSQL)</h3>
      <CodeBlock>{`INSERT INTO users (name, email)
VALUES ('John', 'john@email.com')
RETURNING id, name, email, created_at;`}</CodeBlock>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </section>
  )
}
