import { CodeBlock, DeepDive, Tip } from '@/components/ui'

export function ProfilingObservability() {
  return (
    <div>
      <h3 id="profiling-observability" className="text-[#5f6368] text-xl font-semibold mt-6">
        15. Observability - Logging, Tracing & Profiling
      </h3>
      <p>
        Building for scale means knowing <strong>exactly</strong> what your system is doing at any given microsecond. 
        Go provides world-class tooling for observability directly in the standard library.
      </p>

      <h4 className="font-bold mt-6 mb-2">Structured Logging with slog</h4>
      <p>
        Introduced in Go 1.21, <code className="bg-[#f5f5f5] px-1 px-0.5 rounded font-mono text-sm">log/slog</code> provides structured logging out of the box. 
        Forget plain text logs; Staff-level systems use JSON for machine-readability.
      </p>
      <CodeBlock>{`logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
logger.Info("request started", 
    slog.String("method", "GET"), 
    slog.Int("status", 200),
)`}</CodeBlock>

      <DeepDive title="Production Profiling & Tracing">
        <h4 className="font-bold mb-2">Continuous Profiling: pprof</h4>
        <p>
          Go allows you to collect CPU and heap profiles from <strong>live production instances</strong> with almost zero overhead. 
          This is essential for identifying bottlenecks that only appear under load.
        </p>
        <CodeBlock>{`import _ "net/http/pprof"

func main() {
    go func() {
        log.Println(http.ListenAndServe("localhost:6060", nil))
    }()
    // ... rest of your code
}`}</CodeBlock>
        <Tip>
          Use <code className="bg-[#f5f5f5] px-1 px-0.5 rounded font-mono text-sm">go tool pprof http://localhost:6060/debug/pprof/profile</code> to analyze.
        </Tip>

        <h4 className="font-bold mt-4 mb-2">Execution Tracing</h4>
        <p>
          While pprof is for sample-based profiling, <code className="bg-[#f5f5f5] px-1 px-0.5 rounded font-mono text-sm">go tool trace</code> provides a nanosecond-level visualization of the Go scheduler. 
          Use it to debug latency spikes caused by GC, network I/O, or goroutine contention.
        </p>

        <h4 className="font-bold mt-4 mb-2">Distributed Tracing: OpenTelemetry</h4>
        <p>
          In microservices, a single user request might traverse 10 services. 
          Staff engineers use OpenTelemetry (OTel) to propagate a "Trace ID" through headers, allowing you to visualize the entire request lifecycle across the fleet.
        </p>

        <div className="mt-6 p-4 bg-[#f8f9fa] border-l-4 border-[#1a73e8] rounded">
          <h4 className="font-bold text-[#1a73e8] mb-2">🏢 Industry Case Study: Twitch</h4>
          <p className="text-sm leading-relaxed">
            <strong>Twitch:</strong> For their massive video ingestion services, Twitch uses **continuous pprof profiling**. 
            By analyzing heap profiles in production, they identified "hidden" allocations in high-traffic hot paths—specifically 
            during JSON encoding. By replacing these frequent allocations with <code className="bg-[#f5f5f5] px-1 px-0.5 rounded font-mono text-sm">sync.Pool</code> to reuse memory buffers, 
            they achieved significant CPU savings and dramatically reduced GC pressure.
          </p>
        </div>
      </DeepDive>
    </div>
  )
}
