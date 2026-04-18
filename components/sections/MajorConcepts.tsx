import { Goroutines } from './major/Goroutines'
import { Channels } from './major/Channels'
import { InterfacesConcept } from './major/InterfacesConcept'
import { ErrorHandlingDeep } from './major/ErrorHandlingDeep'
import { DeferPanicRecover } from './major/DeferPanicRecover'
import { SyncPackage } from './major/SyncPackage'
import { ContextSection } from './major/ContextSection'
import { StructsAndTags } from './major/StructsAndTags'
import { SummaryTable } from './major/SummaryTable'

export function MajorConcepts() {
  return (
    <section>
      <h2 id="major-go-concepts-deep-dive" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        Major Go Concepts Deep Dive
      </h2>
      <Goroutines />
      <Channels />
      <InterfacesConcept />
      <ErrorHandlingDeep />
      <DeferPanicRecover />
      <SyncPackage />
      <ContextSection />
      <StructsAndTags />
      <SummaryTable />
      <hr className="border-none border-t border-[#ddd] my-10" />
    </section>
  )
}
