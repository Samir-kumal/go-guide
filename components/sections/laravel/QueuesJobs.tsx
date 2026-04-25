import { CodeBlock, Note, Tip } from '@/components/ui'

export function QueuesJobs() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="queues-jobs" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Queues & Jobs
        </h2>
        <p>Laravel queues allow you to defer time-consuming tasks, such as sending an email or processing a file, until a later time, which drastically speeds up web requests to your application.</p>
        
        <h3 className="text-[#5f6368] mt-6 font-semibold">Creating & Dispatching Jobs</h3>
        <CodeBlock>{`# php artisan make:job ProcessPodcast

class ProcessPodcast implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle(AudioProcessor $processor): void
    {
        $processor->process($this->podcast);
    }
}

// Dispatching
ProcessPodcast::dispatch($podcast);

// Delayed dispatching
ProcessPodcast::dispatch($podcast)->delay(now()->addMinutes(10));`}</CodeBlock>

        <Tip>
          <strong>JS Tip:</strong> This is like using <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">BullMQ</code> or <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Bee-Queue</code> with Redis in Node.js, but built directly into the framework with a unified API for different backends.
        </Tip>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}
