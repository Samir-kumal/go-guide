import { ComparisonTable } from '@/components/ui'

export function Resources() {
  return (
    <section>
      <h2 id="resources" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        Resources
      </h2>
      <ComparisonTable>
        <thead><tr><th>Resource</th><th>Link</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td>Go Tour</td><td><a href="https://go.dev/tour" target="_blank" className="text-[#1a73e8]">go.dev/tour</a></td><td>Interactive basics</td></tr>
          <tr><td>Go by Example</td><td><a href="https://gobyexample.com/" target="_blank" className="text-[#1a73e8]">gobyexample.com</a></td><td>Code examples</td></tr>
          <tr><td>Go Docs</td><td><a href="https://pkg.go.dev" target="_blank" className="text-[#1a73e8]">pkg.go.dev</a></td><td>Package documentation</td></tr>
          <tr><td>Chi Router</td><td><a href="https://github.com/go-chi/chi" target="_blank" className="text-[#1a73e8]">GitHub</a></td><td>Router used in this code</td></tr>
          <tr><td>PGX</td><td><a href="https://pkg.go.dev/github.com/jackc/pgx/v5" target="_blank" className="text-[#1a73e8]">pkg.go.dev</a></td><td>PostgreSQL driver</td></tr>
        </tbody>
      </ComparisonTable>
      <hr className="border-none border-t border-[#ddd] my-10" />
    </section>
  )
}
