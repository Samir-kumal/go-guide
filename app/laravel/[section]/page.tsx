import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface Props {
  params: Promise<{ section: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params
  return {
    title: `Laravel - ${formatTitle(section)} | Programming Docs`,
    description: `Learn Laravel programming: ${section}`,
  }
}

function capitalize(str: string): string {
  return str.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('')
}

function formatTitle(sectionId: string): string {
  return sectionId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default async function LaravelSectionPage({ params }: Props) {
  const { section } = await params

  const componentName = capitalize(section)

  try {
    const module = await import(`@/components/sections/laravel/${componentName}`)
    const Component = module[componentName] || module.default

    if (!Component) {
      notFound()
    }

    return (
      <>
        <h1 className="text-[#FF2D20] border-b-4 border-[#FF2D20] pb-2.5 text-3xl font-bold">
          {formatTitle(section)}
        </h1>
        <Component />
      </>
    )
  } catch {
    notFound()
  }
}