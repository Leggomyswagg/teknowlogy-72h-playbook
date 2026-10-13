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
    { id: 'ig', label: 'IG DM', channel: 'Instagram', text: 'Hey [Owner]! John from Teknowlogy - down the street in Oakland. Made a 60-sec Loom of your Shopify WISMO leak. 15-min fix auto-answers 70%. Can I show you in 2 min? onboard.teknowlogy.co/bay-made' },
    { id: 'email', label: 'Email', channel: 'Email', text: 'Subject: 60-sec audit: WISMO leak = 12 hrs/wk\n\nI made a Loom of your store. WISMO Killer: 15 min install, uses Gorgias + AfterShip, free 3-day proof. John - Teknowlogy.co' },
    { id: 'walk', label: 'Walk-in', channel: 'In-Person', text: 'Hey, is [Owner] in? John from Teknowlogy down the street. Made a 60-sec audit - gift boxes spike your WISMO tickets. 15-min fix. 2 min on my phone?' },
    { id: 'follow', label: 'Follow-up', channel: 'DM', text: 'Saw you opened the Loom. Want me to install WISMO free for 3 days? 15 min, keep it even if you stop. John' },
    { id: 'close', label: 'Close', channel: 'Report', text: '3-day proof: 47 tickets deflected (70%), 11.5 hrs saved, $287. WISMO Only $297/mo or Growth $991/mo. onboard.teknowlogy.co/activate' },
  ]

  const plan = {
    'Day 1': [
      { time: '0-0:15', title: 'Deploy portal', detail: 'GitHub to Vercel to CNAME', critical: true },
      { time: '0:15-0:45', title: 'Import n8n', detail: 'Webhook + test', critical: true },
      { time: '1-1:30', title: 'Record 3 Looms', detail: 'Bay-Made, Dope Era, Peerless', critical: true },
      { time: '1:30-2:00', title: 'PDF proposal', detail: 'WISMO proof offer', critical: false },
    ],
    'Day 2': [
      { time: '10:00', title: 'WALK IN Bay-Made', detail: '3295 Lakeshore Ave', critical: true },
      { time: '10:30', title: 'Drop Dope Era flyer', detail: 'Same block', critical: false },
      { time: '14:00', title: 'IG DMs + Emails', detail: 'With Loom links', critical: true },
      { time: '16:00', title: 'Log opens', detail: 'Star for Day 3', critical: false },
    ],
    'Day 3': [
      { time: '10:00', title: 'Follow-up DM', detail: 'Saw you opened', critical: true },
      { time: '14:00', title: 'Install first YES', detail: 'Gorgias + AfterShip', critical: true },
      { time: 'EOD', title: 'Proof tracker', detail: 'Screenshot before', critical: true },
      { time: 'Day 6', title: 'Close $991', detail: 'Show hours saved', critical: true },
    ],
  }

  const total = Object.values(plan).flat().length

  return (
    <div className="min-h-screen bg-[#080808] text-[#EDEDED] antialiased">
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#080808]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-[1200px] px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-white text-black flex items-center justify-center font-bold text-[11px]">T</div>
            <span className="mono text-[11px] tracking-[0.18em] text-white/60">TEKNOWLOGY LLC</span>
            <span className="hidden md:inline mono text-[11px] text-white/40">72H PROFIT PLAYBOOK</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 rounded-full border border-white/10 px-3 py-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
              <span className="mono text-[10px] text-white/60">LIVE: {done.size}/{total} TASKS</span>
            </div>
            <a href="https://onboard.teknowlogy.co" target="_blank" rel="noreferrer" className="mono text-[11px] px-3 py-1.5 rounded-full bg-white text-black font-medium flex items-center gap-1">
              onboard.teknowlogy.co <ExternalLink className="w-3 h-3" />
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
          72 HOUR<br /><span className="text-white/30">PROFIT</span><br />PLAYBOOK
        </h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 min-w-[200px]">
            <div className="mono text-[10px] text-white/40">GOAL</div>
            <div className="text-[18px] font-semibold mt-1">$991 MRR in under 3 hrs work</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 min-w-[200px]">
            <div className="mono text-[10px] text-white/40">OWNER</div>
            <div className="text-[15px] font-medium mt-1 flex items-center gap-1.5">John - Oakland <MapPin className="w-3.5 h-3.5 text-white/40" /></div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-[#0F0F0F] p-6">
          <div className="flex items-center justify-between mb-5">
            <span className="mono text-[11px] text-white/50">EXECUTIVE SUMMARY</span>
            <span className="mono text-[10px] px-2 py-0.5 rounded-full bg-[#00FF88]/15 text-[#00FF88]">TL;DR</span>
          </div>
          <p className="text-[14.5px] leading-relaxed text-white/80">
            Highest ROI is NOT selling full $991 upfront. <span className="text-white font-medium">WISMO Killer = wedge.</span> 15 min install, free 3-day proof, then $297 or $991 Growth.
          </p>
          <div className="mt-5 rounded-[10px] bg-[#00FF88]/10 border border-[#00FF88]/20 p-4 flex gap-2.5">
            <Target className="w-4 h-4 text-[#00FF88] mt-0.5 shrink-0" />
            <div>
              <div className="text-[13px] font-semibold text-[#00FF88]">Bay-Made first (3295 Lakeshore Ave)</div>
              <div className="text-[12.5px] text-white/70 mt-1">Walk-in possible. Gift box season = WISMO nightmare. Least sophisticated = instant value.</div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[20px] border border-white/10 bg-[#0F0F0F] overflow-hidden">
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
            <span className="mono text-[11px] text-white/40">Personalize [brackets]</span>
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
            <li className="flex gap-2"><span className="text-red-400">x</span> Don't email only - walk-in = 10x conversion</li>
            <li className="flex gap-2"><span className="text-red-400">x</span> Don't over-engineer - 15 min install</li>
          </ul>
        </div>

        <div className="mt-6 mono text-[11px] text-white/30 flex justify-between">
          <span>TEKNOWLOGY LLC - Oakland, CA</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" /> WISMO First - Proof to $991</span>
        </div>
      </div>
    </div>
  )
}
