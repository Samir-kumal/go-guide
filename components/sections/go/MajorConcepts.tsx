import { Goroutines } from './major/Goroutines'
import { Channels } from './major/Channels'
import { InterfacesTutorial } from './major/InterfacesTutorial'
import { ErrorHandlingDeep } from './major/ErrorHandlingDeep'
import { DeferPanicRecover } from './major/DeferPanicRecover'
import { SyncPackage } from './major/SyncPackage'
import { ContextSection } from './major/ContextSection'
import { StructsAndTags } from './major/StructsAndTags'
import { SlicesAndMaps } from './major/SlicesAndMaps'
import { Testing } from './major/Testing'
import { Modules } from './major/Modules'
import { Generics } from './major/Generics'
import { MemoryManagement } from './major/MemoryManagement'
import { AdvancedConcurrency } from './major/AdvancedConcurrency'
import { ProfilingObservability } from './major/ProfilingObservability'
import { ArchitectureLayout } from './major/ArchitectureLayout'
import { SummaryTable } from './major/SummaryTable'

export function MajorConcepts() {
  return (
    <section>
      <h2 id="major-go-concepts-deep-dive" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        Major Go Concepts Deep Dive
      </h2>
      <Goroutines />
      <Channels />
      <InterfacesTutorial />
      <ErrorHandlingDeep />
      <DeferPanicRecover />
      <SyncPackage />
      <ContextSection />
      <StructsAndTags />
      <SlicesAndMaps />
      <Testing />
      <Modules />
      <Generics />
      <MemoryManagement />
      <AdvancedConcurrency />
      <ProfilingObservability />
      <ArchitectureLayout />
      <SummaryTable />
      <hr className="border-none border-t border-[#ddd] my-10" />
    </section>
  )
}
