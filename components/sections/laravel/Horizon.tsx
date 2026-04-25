import { CodeBlock, Note, Tip } from '@/components/ui'

export function Horizon() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="horizon" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Laravel Horizon (Queue Dashboard)
        </h2>
        <p>Laravel Horizon provides a beautiful dashboard and code-driven configuration for your Laravel powered Redis queues.</p>
        
        <h3 className="text-[#5f6368] mt-6 font-semibold">Monitoring Your Queues</h3>
        <p>Horizon allows you to easily monitor key metrics of your queue system such as job throughput, runtime, and job failures.</p>
        
        <h3 className="text-[#5f6368] mt-8 font-semibold">Configuration (Code-driven)</h3>
        <p>All of your worker configuration is stored in a single, simple configuration file (<code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">config/horizon.php</code>).</p>
        <CodeBlock>{`'environments' => [
    'production' => [
        'supervisor-1' => [
            'connection' => 'redis',
            'queue' => ['default', 'notifications'],
            'balance' => 'auto',
            'minProcesses' => 1,
            'maxProcesses' => 10,
        ],
    ],
],`}</CodeBlock>

        <Tip>
          <strong>JS Tip:</strong> This is the equivalent of having a beautiful UI for <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">BullBoard</code> or <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">PM2</code> metrics, but specifically for your background jobs. It allows for &quot;Auto-balancing&quot;, which means it will scale worker processes up or down based on the number of pending jobs.
        </Tip>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}
