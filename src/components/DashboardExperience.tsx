'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Check,
  CircleHelp,
  Copy,
  Gauge,
  Link as LinkIcon,
  MessageSquare,
  Plus,
  RefreshCcw,
  Save,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { getSupabase } from '@/lib/supabase'

type ProjectStatus = 'Discovery' | 'Build' | 'Review' | 'Launch'

type ProjectVariable = {
  id: string
  project_id: string
  label: string
  value: string
  category: string
  worked_this_week: boolean
  updated_at: string
}

type ProjectQuestion = {
  id: string
  project_id: string
  author: 'client' | 'developer'
  question: string
  answer: string | null
  created_at: string
}

type DashboardProject = {
  id: string
  access_key: string
  name: string
  client_name: string
  summary: string
  status: ProjectStatus
  progress: number
  next_milestone: string
  shared_notes: string
  updated_at: string
}

const demoProject: DashboardProject = {
  id: 'demo-project',
  access_key: 'olkeri-demo-client',
  name: 'Client Portal Launch',
  client_name: 'Olkeri Partner',
  summary:
    'A secure project dashboard for weekly delivery visibility, shared decisions, and direct client questions.',
  status: 'Build',
  progress: 68,
  next_milestone: 'Client feedback pass and deployment checklist',
  shared_notes:
    'Keep notes concise and decision-oriented. Add open questions, approvals, blockers, and links that both teams should see.',
  updated_at: new Date().toISOString(),
}

const demoVariables: ProjectVariable[] = [
  {
    id: 'var-1',
    project_id: demoProject.id,
    label: 'Project phase',
    value: 'Dashboard foundation and client collaboration flow',
    category: 'Delivery',
    worked_this_week: true,
    updated_at: new Date().toISOString(),
  },
  {
    id: 'var-2',
    project_id: demoProject.id,
    label: 'Primary risk',
    value: 'Confirming access model before production data goes live',
    category: 'Risk',
    worked_this_week: true,
    updated_at: new Date().toISOString(),
  },
  {
    id: 'var-3',
    project_id: demoProject.id,
    label: 'Next client action',
    value: 'Review shared notes and add any launch requirements',
    category: 'Client',
    worked_this_week: false,
    updated_at: new Date().toISOString(),
  },
]

const demoQuestions: ProjectQuestion[] = [
  {
    id: 'question-1',
    project_id: demoProject.id,
    author: 'client',
    question: 'Can we use this same link with the leadership team?',
    answer:
      'Yes. The share link is designed for client-side visibility. We should add role-based auth before sensitive documents are attached.',
    created_at: new Date().toISOString(),
  },
]

function readableDate(value: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`
}

export default function DashboardExperience({
  initialAccessKey,
}: {
  initialAccessKey?: string
}) {
  const [project, setProject] = useState<DashboardProject>(demoProject)
  const [variables, setVariables] = useState<ProjectVariable[]>(demoVariables)
  const [questions, setQuestions] = useState<ProjectQuestion[]>(demoQuestions)
  const [mode, setMode] = useState<'developer' | 'client'>(
    initialAccessKey ? 'client' : 'developer',
  )
  const [loading, setLoading] = useState(true)
  const [notice, setNotice] = useState('')
  const [newVariable, setNewVariable] = useState({
    label: '',
    value: '',
    category: 'Delivery',
  })
  const [newQuestion, setNewQuestion] = useState('')
  const [answerDrafts, setAnswerDrafts] = useState<Record<string, string>>({})

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return `/dashboard/${project.access_key}`
    return `${window.location.origin}/dashboard/${project.access_key}`
  }, [project.access_key])

  const activeThisWeek = variables.filter((item) => item.worked_this_week)

  useEffect(() => {
    let isMounted = true

    async function loadProject() {
      const supabase = getSupabase()
      if (!supabase) {
        setLoading(false)
        return
      }

      const query = supabase.from('dashboard_projects').select('*')
      const projectQuery = initialAccessKey
        ? query.eq('access_key', initialAccessKey).single()
        : query.order('updated_at', { ascending: false }).limit(1).maybeSingle()

      const { data, error } = await projectQuery

      if (!isMounted) return

      if (error || !data) {
        setLoading(false)
        return
      }

      const loadedProject = data as DashboardProject
      setProject(loadedProject)

      const [{ data: variableRows }, { data: questionRows }] = await Promise.all([
        supabase
          .from('dashboard_variables')
          .select('*')
          .eq('project_id', loadedProject.id)
          .order('updated_at', { ascending: false }),
        supabase
          .from('dashboard_questions')
          .select('*')
          .eq('project_id', loadedProject.id)
          .order('created_at', { ascending: false }),
      ])

      if (!isMounted) return

      if (variableRows) setVariables(variableRows as ProjectVariable[])
      if (questionRows) setQuestions(questionRows as ProjectQuestion[])
      setLoading(false)
    }

    loadProject()

    return () => {
      isMounted = false
    }
  }, [initialAccessKey])

  async function updateProject(patch: Partial<DashboardProject>) {
    const updatedProject = {
      ...project,
      ...patch,
      updated_at: new Date().toISOString(),
    }
    setProject(updatedProject)
    setNotice('Saved locally')

    const supabase = getSupabase()
    if (!supabase || project.id === demoProject.id) return

    const { error } = await supabase
      .from('dashboard_projects')
      .update({
        ...patch,
        updated_at: updatedProject.updated_at,
      })
      .eq('id', project.id)

    setNotice(error ? 'Could not sync to Supabase' : 'Synced to Supabase')
  }

  async function addVariable() {
    if (!newVariable.label.trim() || !newVariable.value.trim()) return

    const row: ProjectVariable = {
      id: createId('variable'),
      project_id: project.id,
      label: newVariable.label.trim(),
      value: newVariable.value.trim(),
      category: newVariable.category.trim() || 'Delivery',
      worked_this_week: true,
      updated_at: new Date().toISOString(),
    }

    setVariables((current) => [row, ...current])
    setNewVariable({ label: '', value: '', category: 'Delivery' })
    setNotice('Variable added')

    const supabase = getSupabase()
    if (!supabase || project.id === demoProject.id) return

    const { error } = await supabase.from('dashboard_variables').insert(row)
    setNotice(error ? 'Variable added locally only' : 'Variable synced')
  }

  async function toggleWorkedThisWeek(variable: ProjectVariable) {
    const updated = {
      ...variable,
      worked_this_week: !variable.worked_this_week,
      updated_at: new Date().toISOString(),
    }

    setVariables((current) =>
      current.map((item) => (item.id === variable.id ? updated : item)),
    )

    const supabase = getSupabase()
    if (!supabase || project.id === demoProject.id) return

    await supabase
      .from('dashboard_variables')
      .update({
        worked_this_week: updated.worked_this_week,
        updated_at: updated.updated_at,
      })
      .eq('id', variable.id)
  }

  async function askQuestion() {
    if (!newQuestion.trim()) return

    const row: ProjectQuestion = {
      id: createId('question'),
      project_id: project.id,
      author: mode,
      question: newQuestion.trim(),
      answer: null,
      created_at: new Date().toISOString(),
    }

    setQuestions((current) => [row, ...current])
    setNewQuestion('')
    setNotice('Question added')

    const supabase = getSupabase()
    if (!supabase || project.id === demoProject.id) return

    const { error } = await supabase.from('dashboard_questions').insert(row)
    setNotice(error ? 'Question added locally only' : 'Question synced')
  }

  async function saveAnswer(questionId: string) {
    const answer = answerDrafts[questionId]?.trim()
    if (!answer) return

    setQuestions((current) =>
      current.map((item) => (item.id === questionId ? { ...item, answer } : item)),
    )

    const supabase = getSupabase()
    if (!supabase || project.id === demoProject.id) return

    const { error } = await supabase
      .from('dashboard_questions')
      .update({ answer })
      .eq('id', questionId)

    setNotice(error ? 'Answer saved locally only' : 'Answer synced')
  }

  async function copyShareLink() {
    await navigator.clipboard.writeText(shareUrl)
    setNotice('Client link copied')
  }

  return (
    <main className="min-h-screen bg-[#050811] text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(0,255,157,0.16),transparent_30%),linear-gradient(180deg,#050811_0%,#06120e_100%)] px-5 pb-10 pt-28">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-400/10 px-3 py-1 text-sm text-green-200">
              <ShieldCheck size={16} />
              dashboard.olkeri.space
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
              Project clarity for clients and Olkeri developers.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
              Share a live project link, update delivery variables, mark what
              moved this week, answer client questions, and maintain shared notes
              in one focused workspace.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-black/35 p-4 shadow-2xl shadow-green-950/20 backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-white/50">Current project</p>
                <h2 className="mt-1 text-2xl font-semibold text-green-300">
                  {project.name}
                </h2>
              </div>
              <button
                onClick={() => setMode(mode === 'developer' ? 'client' : 'developer')}
                className="inline-flex items-center gap-2 rounded-md border border-white/15 px-3 py-2 text-sm text-white/80 transition hover:border-green-300 hover:text-green-200"
              >
                <RefreshCcw size={16} />
                {mode === 'developer' ? 'Developer' : 'Client'}
              </button>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <Metric label="Progress" value={`${project.progress}%`} />
              <Metric label="Status" value={project.status} />
              <Metric label="This week" value={`${activeThisWeek.length}`} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-4">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm text-white/50">Client</p>
            <p className="mt-1 text-xl font-semibold text-white">
              {project.client_name}
            </p>
            <p className="mt-3 text-sm leading-6 text-white/65">
              {project.summary}
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-green-200">
              <LinkIcon size={16} />
              Client share link
            </div>
            <p className="break-all rounded-md bg-black/45 p-3 text-sm text-white/70">
              {shareUrl}
            </p>
            <button
              onClick={copyShareLink}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-green-400 px-3 py-2 text-sm font-semibold text-black transition hover:bg-green-300"
            >
              <Copy size={16} />
              Copy link
            </button>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm text-white/50">Next milestone</p>
            {mode === 'developer' ? (
              <textarea
                value={project.next_milestone}
                onChange={(event) =>
                  updateProject({ next_milestone: event.target.value })
                }
                rows={4}
                className="mt-2 w-full resize-none rounded-md border border-white/10 bg-black/45 px-3 py-2 text-sm text-white outline-none transition focus:border-green-300"
              />
            ) : (
              <p className="mt-2 text-sm leading-6 text-white/75">
                {project.next_milestone}
              </p>
            )}
          </div>
        </aside>

        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            {(['Discovery', 'Build', 'Review', 'Launch'] as ProjectStatus[]).map(
              (status) => (
                <button
                  key={status}
                  onClick={() =>
                    mode === 'developer' && updateProject({ status })
                  }
                  className={`rounded-lg border p-4 text-left transition ${
                    project.status === status
                      ? 'border-green-300 bg-green-400/10'
                      : 'border-white/10 bg-white/[0.03]'
                  } ${mode === 'developer' ? 'hover:border-green-300' : ''}`}
                >
                  <p className="text-sm text-white/50">Phase</p>
                  <p className="mt-1 font-semibold text-white">{status}</p>
                </button>
              ),
            )}
          </div>

          <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
            <section className="rounded-lg border border-white/10 bg-white/[0.03]">
              <div className="flex flex-col gap-4 border-b border-white/10 p-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-green-200">
                    <Gauge size={18} />
                    <h2 className="text-xl font-semibold">Project variables</h2>
                  </div>
                  <p className="mt-1 text-sm text-white/55">
                    Track scope, blockers, decisions, and weekly movement.
                  </p>
                </div>
                {mode === 'developer' && (
                  <label className="flex items-center gap-3 text-sm text-white/65">
                    Progress
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={project.progress}
                      onChange={(event) =>
                        updateProject({ progress: Number(event.target.value) })
                      }
                      className="accent-green-400"
                    />
                  </label>
                )}
              </div>

              {mode === 'developer' && (
                <div className="grid gap-3 border-b border-white/10 p-5 md:grid-cols-[1fr_1fr_150px_auto]">
                  <input
                    value={newVariable.label}
                    onChange={(event) =>
                      setNewVariable({ ...newVariable, label: event.target.value })
                    }
                    placeholder="Variable"
                    className="rounded-md border border-white/10 bg-black/45 px-3 py-2 text-sm text-white outline-none focus:border-green-300"
                  />
                  <input
                    value={newVariable.value}
                    onChange={(event) =>
                      setNewVariable({ ...newVariable, value: event.target.value })
                    }
                    placeholder="Current value"
                    className="rounded-md border border-white/10 bg-black/45 px-3 py-2 text-sm text-white outline-none focus:border-green-300"
                  />
                  <input
                    value={newVariable.category}
                    onChange={(event) =>
                      setNewVariable({
                        ...newVariable,
                        category: event.target.value,
                      })
                    }
                    placeholder="Category"
                    className="rounded-md border border-white/10 bg-black/45 px-3 py-2 text-sm text-white outline-none focus:border-green-300"
                  />
                  <button
                    onClick={addVariable}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-green-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-green-300"
                  >
                    <Plus size={16} />
                    Add
                  </button>
                </div>
              )}

              <div className="divide-y divide-white/10">
                {variables.map((variable) => (
                  <article
                    key={variable.id}
                    className="grid gap-4 p-5 md:grid-cols-[1fr_auto] md:items-center"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-white/60">
                          {variable.category}
                        </span>
                        {variable.worked_this_week && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-400/15 px-2 py-1 text-xs text-green-200">
                            <Sparkles size={13} />
                            worked on this week
                          </span>
                        )}
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-white">
                        {variable.label}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-white/65">
                        {variable.value}
                      </p>
                      <p className="mt-2 text-xs text-white/40">
                        Updated {readableDate(variable.updated_at)}
                      </p>
                    </div>
                    {mode === 'developer' && (
                      <button
                        onClick={() => toggleWorkedThisWeek(variable)}
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-3 py-2 text-sm text-white/75 transition hover:border-green-300 hover:text-green-200"
                      >
                        <Check size={16} />
                        {variable.worked_this_week ? 'Unmark' : 'Mark'}
                      </button>
                    )}
                  </article>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                <div className="mb-3 flex items-center gap-2 text-green-200">
                  <MessageSquare size={18} />
                  <h2 className="text-xl font-semibold">Shared notes</h2>
                </div>
                <textarea
                  value={project.shared_notes}
                  onChange={(event) =>
                    setProject({ ...project, shared_notes: event.target.value })
                  }
                  onBlur={(event) =>
                    updateProject({ shared_notes: event.target.value })
                  }
                  rows={9}
                  className="w-full resize-none rounded-md border border-white/10 bg-black/45 px-3 py-3 text-sm leading-6 text-white outline-none transition focus:border-green-300"
                />
                <button
                  onClick={() => updateProject({ shared_notes: project.shared_notes })}
                  className="mt-3 inline-flex items-center gap-2 rounded-md border border-green-300/40 px-3 py-2 text-sm text-green-100 transition hover:bg-green-400/10"
                >
                  <Save size={16} />
                  Save notes
                </button>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                <div className="mb-4 flex items-center gap-2 text-green-200">
                  <CircleHelp size={18} />
                  <h2 className="text-xl font-semibold">Questions</h2>
                </div>
                <div className="flex gap-2">
                  <input
                    value={newQuestion}
                    onChange={(event) => setNewQuestion(event.target.value)}
                    placeholder="Ask or log a question"
                    className="min-w-0 flex-1 rounded-md border border-white/10 bg-black/45 px-3 py-2 text-sm text-white outline-none focus:border-green-300"
                  />
                  <button
                    onClick={askQuestion}
                    className="inline-flex items-center justify-center rounded-md bg-green-400 px-3 py-2 text-black transition hover:bg-green-300"
                    aria-label="Add question"
                  >
                    <ArrowUpRight size={18} />
                  </button>
                </div>

                <div className="mt-5 space-y-4">
                  {questions.map((question) => (
                    <article
                      key={question.id}
                      className="rounded-md border border-white/10 bg-black/30 p-4"
                    >
                      <p className="text-sm font-medium text-white">
                        {question.question}
                      </p>
                      <p className="mt-1 text-xs text-white/40">
                        {question.author} · {readableDate(question.created_at)}
                      </p>
                      {question.answer ? (
                        <p className="mt-3 rounded-md bg-green-400/10 p-3 text-sm leading-6 text-green-100">
                          {question.answer}
                        </p>
                      ) : mode === 'developer' ? (
                        <div className="mt-3 space-y-2">
                          <textarea
                            value={answerDrafts[question.id] || ''}
                            onChange={(event) =>
                              setAnswerDrafts({
                                ...answerDrafts,
                                [question.id]: event.target.value,
                              })
                            }
                            rows={3}
                            placeholder="Write an answer"
                            className="w-full resize-none rounded-md border border-white/10 bg-black/45 px-3 py-2 text-sm text-white outline-none focus:border-green-300"
                          />
                          <button
                            onClick={() => saveAnswer(question.id)}
                            className="rounded-md border border-white/15 px-3 py-2 text-sm text-white/75 transition hover:border-green-300 hover:text-green-200"
                          >
                            Save answer
                          </button>
                        </div>
                      ) : (
                        <p className="mt-3 text-sm text-white/45">
                          Waiting for Olkeri to answer.
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
        <div className="rounded-full border border-white/10 bg-black/80 px-4 py-2 text-sm text-white/65 shadow-xl backdrop-blur">
          {loading ? 'Loading dashboard...' : notice || 'Ready'}
        </div>
      </div>
    </main>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] p-3">
      <p className="text-xs text-white/45">{label}</p>
      <p className="mt-1 truncate text-lg font-semibold text-white">{value}</p>
    </div>
  )
}
