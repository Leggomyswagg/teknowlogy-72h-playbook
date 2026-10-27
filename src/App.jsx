import { useEffect, useRef, useState } from 'react'
import {
  ArrowUpRight, Check, ChevronRight, Clock, Copy, DollarSign,
  ExternalLink, MapPin, Target, Timer, TriangleAlert, Zap
} from 'lucide-react'

const PROGRESS_KEY = 'teknowlogy-72h-progress-v1'
const TASK_ID = /^Day [123]-[0-3]$/

function loadProgress() {
  try {
    const stored = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '[]')
    return new Set(Array.isArray(stored) ? stored.filter(id => typeof id === 'string' && TASK_ID.test(id)) : [])
  } catch {
    return new Set()
  }
}

export default function App() {
  const [day, setDay] = useState('Day 2')
  const [done, setDone] = useState(loadProgress)
  const [copied, setCopied] = useState(null)
  const [notice, setNotice] = useState('')
  const copyTimer = useRef(null)
  const [scriptIdx, setScriptIdx] = useState(0)

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify([...done]))
    } catch {
      setNotice('This browser cannot save progress. Keep this tab open to retain your checklist.')
    }
  }, [done])

  useEffect(() => () => clearTimeout(copyTimer.current), [])

  const toggle = (id) => {
    setDone(previous => {
      const next = new Set(previous)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const copy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text)
      setNotice('')
      setCopied(id)
      clearTimeout(copyTimer.current)
      copyTimer.current = setTimeout(() => setCopied(null), 1800)
    } catch {
      setCopied(null)
      setNotice('Clipboard access is unavailable. Select the script below and copy it manually.')
    }
  }

  const scripts = [
    { id: 'ig', label: 'IG DM', channel: 'Instagram', text: 'Hi [Owner], I am [Your name] from [Your business]. I noticed [specific issue you verified] on your store. Would a short walkthrough of a possible fix be useful? [Your booking URL]' },
    { id: 'email', label: 'Email', channel: 'Email', text: 'Subject: One improvement for [Store]\n\nHi [Owner], I reviewed [specific page or process] and noticed [verified finding]. Here is a short audit: [Your Loom URL]. If it is useful, we can discuss a small trial with an agreed scope and price. [Your name] — [Your business]' },
    { id: 'walk', label: 'Walk-in', channel: 'In-Person', text: 'Hi, is the person responsible for online orders available? I am [Your name] from [Your business]. I prepared a short example about [verified issue]. Is now a good time for a two-minute introduction?' },
    { id: 'follow', label: 'Follow-up', channel: 'DM', text: 'Hi [Owner], following up on the audit I sent. [One useful finding]. Would you like to discuss a trial? If this is not relevant, I will not follow up further. [Your name]' },
    { id: 'close', label: 'Close', channel: 'Report', text: 'Trial results for [Store], [date range]: [measured tickets handled], [measured time saved], and [known limitations]. Based on those results, the proposed next step is [scope] at [agreed price]. Would you like to continue? [Your booking URL]' },
  ]

  const plan = {
    'Day 1': [
      { time: '0-0:15', title: 'Deploy portal', detail: 'GitHub to Vercel to CNAME', critical: true },
      { time: '0:15-0:45', title: 'Import n8n', detail: 'Webhook + test', critical: true },
      { time: '1-1:30', title: 'Record 3 Looms', detail: 'Use three researched prospects', critical: true },
      { time: '1:30-2:00', title: 'PDF proposal', detail: 'WISMO proof offer', critical: false },
    ],
    'Day 2': [
      { time: '10:00', title: 'Introduce your offer locally', detail: 'Choose a suitable business and ask permission', critical: true },
      { time: '10:30', title: 'Share an audit summary', detail: 'Personalize a verified finding', critical: false },
      { time: '14:00', title: 'IG DMs + Emails', detail: 'With Loom links', critical: true },
      { time: '16:00', title: 'Log opens', detail: 'Star for Day 3', critical: false },
    ],
    'Day 3': [
      { time: '10:00', title: 'Follow-up DM', detail: 'Add one useful verified finding', critical: true },
      { time: '14:00', title: 'Install first YES', detail: 'Gorgias + AfterShip', critical: true },
      { time: 'EOD', title: 'Proof tracker', detail: 'Screenshot before', critical: true },
      { time: 'Day 6', title: 'Close $991', detail: 'Show hours saved', critical: true },
    ],
  }

  const total = Object.values(plan).flat().length

  return (
    <div className="min-h-screen bg-[#080808] text-[#EDEDED] antialiased">
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#080808]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-[1200px] px-6 h-14 flex items-center justify-between site-header">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-white text-black flex items-center justify-center font-bold text-[11px]">T</div>
            <span className="mono text-[11px] tracking-[0.18em] text-white/60">TEKNOWLOGY LLC</span>
            <span className="hidden md:inline mono text-[11px] text-white/40">72H LAUNCH PLAYBOOK</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 rounded-full border border-white/10 px-3 py-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
              <span className="mono text-[10px] text-white/60">PROGRESS: {done.size}/{total} TASKS</span>
            </div>
            <a href="#execution-plan" className="mono text-[11px] px-3 py-1.5 rounded-full bg-white text-black font-medium flex items-center gap-1">
              Start the plan <ChevronRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 pt-14 pb-10">
        {notice && <p role="status" className="text-[12.5px] text-white/70 mb-6">{notice}</p>}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/10 px-3 py-1 mb-6">
          <Zap className="w-3 h-3 text-[#00FF88]" />
          <span className="mono text-[10px] tracking-[0.14em] text-[#00FF88]">HIGHEST LEVERAGE - WISMO WEDGE</span>
        </div>
        <h1 className="text-[44px] md:text-[64px] font-bold leading-[0.92] tracking-tight">
          72 HOUR<br /><span className="text-white/30">LAUNCH</span><br />PLAYBOOK
        </h1>
        <p className="mt-5 text-[12.5px] text-white/70">An editable outreach plan. Verify every claim and prospect detail. Revenue, time savings and results depend on your own execution.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 min-w-[200px]">
            <div className="mono text-[10px] text-white/40">ILLUSTRATIVE TARGET</div>
            <div className="text-[18px] font-semibold mt-1">$991 MRR — validate your own offer</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 min-w-[200px]">
            <div className="mono text-[10px] text-white/40">OWNER</div>
            <div className="text-[15px] font-medium mt-1 flex items-center gap-1.5">Your business — Oakland <MapPin className="w-3.5 h-3.5 text-white/40" /></div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-[#0F0F0F] p-6">
          <div className="flex items-center justify-between mb-5">
            <span className="mono text-[11px] text-white/50">EXECUTIVE SUMMARY</span>
            <span className="mono text-[10px] px-2 py-0.5 rounded-full bg-[#00FF88]/15 text-[#00FF88]">TL;DR</span>
          </div>
          <p className="text-[14.5px] leading-relaxed text-white/80">
            Start with a narrowly scoped offer. <span className="text-white font-medium">WISMO Killer = wedge.</span> Agree on a trial, measure actual results, then propose a paid next step. Pricing and timing are examples, not promised outcomes.
          </p>
          <div className="mt-5 rounded-[10px] bg-[#00FF88]/10 border border-[#00FF88]/20 p-4 flex gap-2.5">
            <Target className="w-4 h-4 text-[#00FF88] mt-0.5 shrink-0" />
            <div>
              <div className="text-[13px] font-semibold text-[#00FF88]">Start with a researched prospect</div>
              <div className="text-[12.5px] text-white/70 mt-1">Check the business, verify a relevant problem and ask whether an introduction would be useful.</div>
            </div>
          </div>
        </div>

        <div id="execution-plan" className="mt-8 rounded-[20px] border border-white/10 bg-[#0F0F0F] overflow-hidden">
          <div className="px-6 py-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-[16px] font-semibold flex items-center gap-2"><Clock className="w-4 h-4" /> 72-Hour Execution Plan</h3>
            <div className="flex gap-2">
              {['Day 1', 'Day 2', 'Day 3'].map((d) => (
                <button key={d} onClick={() => setDay(d)} className={`mono text-[11px] px-4 py-2 rounded-full border ${day === d ? 'bg-white text-black border-white' : 'text-white/50 border-white/15'}`}>{d}</button>
              ))}
            </div>
          </div>
          <div className="p-5 space-y-3">
            {plan[day].map((task, i) => {
              const id = day + '-' + i
              const isDone = done.has(id)
              return (
                <div key={id} className={`flex gap-4 rounded-[14px] border px-4 py-4 ${isDone ? 'bg-[#00FF88]/10 border-[#00FF88]/20' : 'bg-white/[0.02] border-white/10'}`}>
                  <input type="checkbox" aria-label={task.title} checked={isDone} onChange={() => toggle(id)} className="w-5 h-5 mt-0.5 accent-[#00FF88] cursor-pointer" />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`mono text-[10px] px-2 py-1 rounded-full border ${task.critical ? 'bg-white text-black' : 'text-white/50 border-white/10'}`}>{task.time}</span>
                      <span className={`text-[13.5px] font-medium ${isDone ? 'line-through text-white/40' : ''}`}>{task.title}</span>
                      {task.critical && <span className="mono text-[9px] px-1.5 py-0.5 rounded bg-amber-400/15 text-amber-300">CRITICAL</span>}
                    </div>
                    <div className="text-[12.5px] text-white/55 mt-2">{task.detail}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-[#0F0F0F] overflow-hidden">
          <div className="px-6 py-5 border-b border-white/10 flex justify-between">
            <h3 className="text-[16px] font-semibold">Copy-Paste Scripts</h3>
            <span className="mono text-[11px] text-white/40">Replace [brackets] with verified facts</span>
          </div>
          <div className="grid md:grid-cols-[200px_1fr]">
            <div className="border-r border-white/10 p-2 space-y-1">
              {scripts.map((s, i) => (
                <button key={s.id} onClick={() => setScriptIdx(i)} className={`w-full text-left rounded-[10px] px-3 py-3 ${scriptIdx === i ? 'bg-white text-black' : 'hover:bg-white/[0.04]'}`}>
                  <div className={`mono text-[10px] ${scriptIdx === i ? 'text-black/50' : 'text-white/40'}`}>{s.channel}</div>
                  <div className="text-[13px] font-medium mt-1">{s.label}</div>
                </button>
              ))}
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="mono text-[10px] text-white/40">{scripts[scriptIdx].channel}</div>
                  <div className="text-[15px] font-semibold mt-1">{scripts[scriptIdx].label}</div>
                </div>
                <button onClick={() => copy(scripts[scriptIdx].text, scripts[scriptIdx].id)} className="mono text-[11px] px-3 py-2 rounded-full bg-white text-black flex items-center gap-1.5">
                  {copied === scripts[scriptIdx].id ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                </button>
              </div>
              <pre className="mt-5 mono text-[12px] text-white/80 whitespace-pre-wrap bg-[#080808] border border-white/10 rounded-xl p-4">{scripts[scriptIdx].text}</pre>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
          <h4 className="mono text-[11px] text-red-300/80 mb-3 flex items-center gap-1.5"><TriangleAlert className="w-3.5 h-3.5" /> WHAT NOT TO DO</h4>
          <ul className="space-y-2 text-[12.5px] text-white/70">
            <li className="flex gap-2"><span className="text-red-400">x</span> Don't sell full $991 day 1 - wedge with free proof</li>
            <li className="flex gap-2"><span className="text-red-400">x</span> Choose a respectful, relevant contact method</li>
            <li className="flex gap-2"><span className="text-red-400">x</span> Agree on the scope before installing anything</li>
          </ul>
        </div>

        <div className="mt-6 mono text-[11px] text-white/30 flex justify-between site-footer">
          <span>TEKNOWLOGY LLC - Oakland, CA</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" /> WISMO First - Proof to $991</span>
        </div>
      </div>
    </div>
  )
}
