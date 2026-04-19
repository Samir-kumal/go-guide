import { CodeBlock, DeepDive, Tip } from '@/components/ui'

export function ArchitectureLayout() {
  return (
    <div>
      <h3 id="architecture-layout" className="text-[#5f6368] text-xl font-semibold mt-6">
        16. Architecture - Project Layout & DI
      </h3>
      <p>
        Senior Staff Engineers don&apos;t just write code; they design systems that are easy to maintain and evolve. 
        Go favors <strong>explicit composition</strong> over inheritance and <strong>structural typing</strong> over rigid hierarchies.
      </p>

      <h4 className="font-bold mt-6 mb-2">Standard Project Layout</h4>
      <p>
        While Go doesn&apos;t enforce a specific folder structure, the community has settled on a <strong>"standard"</strong> layout for large projects.
      </p>
      <ul className="list-disc pl-5 my-2 text-sm leading-relaxed">
        <li><strong>/cmd</strong>: Main entry points for the application (e.g., <code className="bg-[#f5f5f5] px-1 px-0.5 rounded font-mono text-sm">/cmd/server/main.go</code>).</li>
        <li><strong>/internal</strong>: Packages private to this application; other projects cannot import them (enforces encapsulation).</li>
        <li><strong>/pkg</strong>: Library code that is safe to be used by external applications.</li>
        <li><strong>/api</strong>: OpenAPI/Swagger specs, JSON schema files, protocol definition files (gRPC).</li>
      </ul>

      <DeepDive title="Clean Architecture & Dependency Injection">
        <h4 className="font-bold mb-2">Clean Architecture (Ports & Adapters)</h4>
        <p>
          In Go, we define <strong>Interfaces</strong> in our core business logic (the "Port") and implement them in the infrastructure layer (the "Adapter"). 
          This makes swapping a database (e.g., MySQL to PostgreSQL) or a mock service trivial.
        </p>
        <CodeBlock>{`// Domain layer (Port)
type UserService interface {
    GetUser(ctx context.Context, id string) (*User, error)
}

// Infrastructure layer (Adapter)
type UserStore struct { db *sql.DB }
func (s *UserStore) GetUser(...) { ... }`}</CodeBlock>

        <h4 className="font-bold mt-4 mb-2">Pragmatic Dependency Injection</h4>
        <p>
          Java developers are used to reflection-heavy containers (like Spring). 
          <strong>In Go, we prefer manual DI.</strong> We use structs and constructor functions to explicitly pass dependencies down the call chain.
        </p>
        <CodeBlock>{`func NewServer(db *sql.DB, logger *slog.Logger) *Server {
    return &Server{
        db:     db,
        logger: logger,
    }
}`}</CodeBlock>
        <Tip>
          If manual wiring becomes too complex (50+ dependencies), tools like <strong>Google Wire</strong> use code generation to automate the process without runtime reflection.
        </Tip>

        <h4 className="font-bold mt-4 mb-2">Interface Pollution</h4>
        <p>
          Staff engineers avoid creating an interface for every single struct "just in case." 
          <strong>"Only use interfaces when you have at least two concrete implementations"</strong> is a good rule of thumb to avoid unnecessary complexity and boxing allocations.
        </p>

        <div className="mt-6 p-4 bg-[#f8f9fa] border-l-4 border-[#1a73e8] rounded">
          <h4 className="font-bold text-[#1a73e8] mb-2">🏢 Industry Case Study: Netflix</h4>
          <p className="text-sm leading-relaxed">
            <strong>Netflix:</strong> Uses Go for many backend operations and is a major proponent of **Hexagonal Architecture**. 
            During a migration from a monolith to microservices, they were able to swap an entire data source (from a JSON API to a GraphQL source) 
            in just <strong>2 hours</strong>. This was only possible because the core business logic was completely decoupled from the infrastructure 
            via carefully defined Ports (interfaces).
          </p>
        </div>
      </DeepDive>
    </div>
  )
}
