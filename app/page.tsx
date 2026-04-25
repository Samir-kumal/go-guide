import Link from 'next/link'
import { languageList, languages } from '@/lib/languages'

export default function HomePage() {
  const langEntries = Object.entries(languages)
  
  return (
    <div className="max-w-4xl mx-auto py-20 px-10">
      <h1 className="text-4xl font-bold mb-4">
        Programming Docs
      </h1>
      <p className="text-xl text-[#666] mb-10">
        Interactive guides for understanding programming languages and frameworks.
      </p>

      <h2 className="text-2xl font-semibold mb-6">Choose a Language</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {langEntries.map(([id, lang]) => (
          <Link
            key={id}
            href={`/${id}`}
            className="block p-6 rounded-lg border-2 transition-all hover:shadow-lg"
            style={{
              borderColor: lang.color,
              color: lang.color,
            }}
          >
            <h3 className="text-xl font-bold mb-2">{lang.name}</h3>
            <p className="text-sm text-[#666]">{lang.description}</p>
            <span
              className="inline-block mt-4 px-3 py-1 rounded text-sm font-medium text-white"
              style={{ backgroundColor: lang.color }}
            >
              Explore →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}