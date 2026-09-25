import type { Project } from '@/lib/projects'

type Labels = {
  privateLabel: string
  viewCode: string
  category: string
}

export default function ProjectCard({
  project,
  labels,
}: {
  project: Project
  labels: Labels
}) {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-white/10 bg-black/40 p-6 transition-colors hover:border-green-400/40">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-medium text-white transition-colors group-hover:text-green-400">
          {project.name}
        </h3>
        <span className="shrink-0 rounded bg-green-400/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-green-300/90">
          {labels.category}
        </span>
      </div>

      <p className="mt-4 flex-1 text-sm leading-6 text-white/65">{project.blurb}</p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.stack.map(item => (
          <li
            key={item}
            className="rounded border border-white/10 px-2 py-1 text-[11px] text-white/55"
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-5 border-t border-white/10 pt-4 text-sm">
        {project.repo ? (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-green-300 transition-colors hover:text-green-200"
          >
            {labels.viewCode}
            <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <span className="text-white/35">{labels.privateLabel}</span>
        )}
      </div>
    </article>
  )
}
