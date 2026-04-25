import { Basics } from '@/components/sections/php/Basics'

export default function PhpGuidePage() {
  return (
    <>
      <h1 className="text-[#777BB4] border-b-4 border-[#777BB4] pb-2.5 text-3xl font-bold">
        PHP Documentation
      </h1>
      <p className="italic">
        Comprehensive guide to PHP server-side scripting.
      </p>
      <hr className="border-none border-t border-[#ddd] my-10" />
      
      <Basics />

      <p className="text-center text-[#666] mt-10">
        <em>Document created for learning purposes. Happy coding!</em>
      </p>
    </>
  )
}
