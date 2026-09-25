'use client'

import { useMemo, useState } from 'react'

import ProjectCard from '@/components/ProjectCard'
import { appCopy } from '@/lib/articles'
import { projectCategories, projects, type ProjectCategory } from '@/lib/projects'
import { useAppLanguage } from '@/lib/use-app-language'

type Filter = ProjectCategory | 'all'

export default function WorkGrid() {
  const appLanguage = useAppLanguage()
  const copy = appCopy[appLanguage].studio
  const [filter, setFilter] = useState<Filter>('all')

  // Categories with nothing in them would render as dead buttons, so only the
  // ones that actually have projects get a tab.
  const availableCategories = useMemo(
    () => projectCategories.filter(category => projects.some(p => p.category === category.id)),
    []
  )

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter(p => p.category === filter)),
    [filter]
  )

  return (
    <div>
      <h1 className="bg-gradient-to-r from-white to-green-300 bg-clip-text text-5xl font-medium leading-tight text-transparent sm:text-6xl">
        {copy.workPageTitle}
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
        {copy.workPageSub}
      </p>

      <div className="mt-12 flex flex-wrap gap-2">
        <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
          {copy.filterAll} ({projects.length})
        </FilterButton>

        {availableCategories.map(category => (
          <FilterButton
            key={category.id}
            active={filter === category.id}
            onClick={() => setFilter(category.id)}
          >
            {copy.cats[category.id]} ({projects.filter(p => p.category === category.id).length})
          </FilterButton>
        ))}
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map(project => (
          <ProjectCard
            key={project.slug}
            project={project}
            language={appLanguage}
            labels={{
              privateLabel: copy.privateLabel,
              viewCode: copy.viewCode,
              category: copy.cats[project.category],
            }}
          />
        ))}
      </div>
    </div>
  )
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-md border px-4 py-2 text-sm transition-colors ${
        active
          ? 'border-green-400 bg-green-400/15 text-green-200'
          : 'border-white/15 text-white/65 hover:border-white/30 hover:text-white'
      }`}
    >
      {children}
    </button>
  )
}
