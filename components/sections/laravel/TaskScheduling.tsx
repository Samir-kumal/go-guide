import { CodeBlock, Note, Tip } from '@/components/ui'

export function TaskScheduling() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="task-scheduling" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Task Scheduling
        </h2>
        <p>Laravel&apos;s command scheduler allows you to fluently and expressively define your command schedule within Laravel itself.</p>
        
        <h3 className="text-[#5f6368] mt-6 font-semibold">Defining Schedules</h3>
        <p>Your task schedule is typically defined in your application&apos;s <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">routes/console.php</code> file.</p>
        <CodeBlock>{`use Illuminate\\Support\\Facades\\Schedule;

Schedule::call(function () {
    DB::table('recent_users')->delete();
})->daily();

Schedule::command('emails:send')->hourly();`}</CodeBlock>

        <Tip>
          <strong>JS Tip:</strong> Instead of writing multiple <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">cron</code> entries on your server, you only need one entry that runs Laravel&apos;s scheduler every minute. This keeps your schedule in version control!
        </Tip>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}
