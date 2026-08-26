import { useState } from 'react'
import {
  ArrowUpRight, Check, ChevronRight, Clock, Copy, DollarSign,
  ExternalLink, MapPin, Target, Timer, TriangleAlert, Zap
} from 'lucide-react'

const SCRIPTS = [
  {
    id: 'ig-bay',
    label: 'IG DM → Bay-Made',
    channel: 'Instagram DM',
    text: `Hey [Owner Name]! John from Teknowlogy — I'm literally down the street in Oakland.

Made you a 60-sec Loom audit of your Shopify — found you're getting crushed with "where's my order?" tickets after gift box drops.

Built a 15-min fix that auto-answers 70% of them. Can I show you in 2 min? 

→ onboard.teknowlogy.co/bay-made`,
  },
  {
    id: 'email-bay',
    label: 'Email → Bay-Made',
    channel: 'Email',
    subject: '60-sec audit: Bay-Made WISMO leak = 12 hrs/wk',
    text: `Subject: 60-sec audit: Bay-Made WISMO leak = 12 hrs/wk

[Name] —

I'm John, founder of Teknowlogy LLC (Oakland Shopify ops agency).

Watched your gift box launch -> massive spike in "where is my order?" DMs/comments. Your team is small, so that's 10-12 hrs/week lost.

I made a 60-sec Loom tearing down your store: [LOOM LINK]

The fix: WISMO Killer
• 15 min install
• Uses your Gorgias + AfterShip (no new cost)
• Auto-deflects 70% of tracking tickets

Offer: Free 3-day proof. If I don't save you 10 hours, delete it. No charge.

Worth a 2-min walkthrough tomorrow? I can swing by Lakeshore.

John
Teknowlogy.co
onboard.teknowlogy.co`,
  },
  {
    id: 'walkin',
    label: 'Walk-in Opener',
    channel: 'In-Person • 3295 Lakeshore Ave',
    text: `"Hey, is [Owner] in? I'm John from Teknowlogy — we're an Oakland Shopify agency just down the street.

I made your store a 60-second audit — noticed gift boxes spike your 'where's my order' tickets hard.

I built a 15-minute fix for Bay-Made specifically. Can I show you in 2 minutes on my phone? If it's useless, I'll bounce.

[Show Loom on phone, QR to onboard.teknowlogy.co]"`,
  },
  {
    id: 'followup',
    label: 'Day 3 Follow-up',
    channel: 'DM / Email',
    text: `Saw you opened the Loom 👀

Quick Q: want me to install WISMO free for 3 days?

No access to anything sensitive — just Gorgias + AfterShip. Takes 15 min, you keep it even if you don't continue.

I can do it today at 2pm if you're around the shop.

— John`,
  },
  {
    id: 'close',
    label: 'Day 6 Closing',
    channel: 'Report + Close',
    text: `Here's your 3-day proof report for Bay-Made:

• Tickets deflected: 47 (70%)
• Hours saved: 11.5 hrs
• $ saved: $287 (at $25/hr support)
• CSAT up: tracking replies < 2 min vs 4 hrs

That's $1,148/mo in support savings alone — not counting recovered sales.

Two ways to keep it:

1) WISMO Only: $297/mo — I maintain rules, macros, AfterShip sync
2) Growth Stack $991/mo — WISMO + Review Harvest + Cart Rescue (adds $2-4k/mo in reviews + recovered carts)

Most shops pick #2 after seeing this report. Want me to keep it live?

onboard.teknowlogy.co/activate`,
  },
]

const MATRIX = [
  { name: 'WISMO Killer', install: '15 min', resources: 'AfterShip + Gorgias', first: '24h', close: '40%', effort: 1, profit: '$297 standalone / $991 bundled', highlight: true },
  { name: 'Review Harvest', install: '30 min', resources: 'Judge.me + Claude Vision', first: '3 days', close: '25%', effort: 2, profit: '$991/mo', highlight: false },
  { name: 'Cart Rescue', install: '60 min', resources: 'SMS compliance + Voice', first: '7 days', close: '18%', effort: 4, profit: '$1,500+/mo', highlight: false },
  { name: 'VIP Replenishment', install: '25 min', resources: 'Klaviyo / SMS', first: '25 days', close: '22%', effort: 2, profit: '$600/mo add-on', highlight: false },
]

const PLAN = {
  'Day 1': [
    { time: 'Hour 0-0:15', title: 'Deploy V2 Portal FIXED', detail: 'GitHub → Vercel → CNAME onboard → cname.vercel-dns.com. Test onboard.teknowlogy.co loads. This unblocks everything.', critical: true },
    { time: 'Hour 0:15-0:45', title: 'Import n8n JSON + Webhook', detail: 'Import automator, set webhook URL, test with fake brand “Test Bay-Made”. Confirm Gorgias intent fires.', critical: true },
    { time: 'Hour 1-1:30', title: 'Record 3 Looms (60 sec each)', detail: 'Bay-Made, Dope Era, Peerless. Script: “Found WISMO leak, 2-min fix, 10 hrs saved”. Screen-share their Shopify site.', critical: true },
    { time: 'Hour 1:30-2:00', title: 'Build 1-page PDF proposal', detail: 'Reuse existing Proposal PDF → replace with WISMO Proof offer. Export.', critical: false },
  ],
  'Day 2': [
    { time: '10:00 AM', title: 'WALK IN: Bay-Made 3295 Lakeshore Ave', detail: 'Bring 1-page proposal + phone with Loom. Script: “I’m John from Teknowlogy down the street, made you a 60-sec audit, 2 min?”', critical: true },
    { time: '10:30 AM', title: 'Drop Dope Era flyer', detail: 'Same block. Leave flyer + QR to onboard link. Don’t pitch hard — plant seed.', critical: false },
    { time: '2:00 PM', title: 'Send IG DMs + Emails with Loom', detail: 'Bay-Made, Peerless, 2 backup Oakland brands. Link: onboard.teknowlogy.co + Loom. Subject lines ready in Scripts tab.', critical: true },
    { time: '4:00 PM', title: 'Log opens / replies in tracker', detail: 'Who opened Loom? Star them for Day 3 follow-up. Prep WISMO install checklist.', critical: false },
  ],
  'Day 3': [
    { time: '10:00 AM', title: 'Follow-up DM: “Saw you opened”', detail: 'Copy-paste follow-up script. Offer free 3-day install. No pressure.', critical: true },
    { time: '2:00 PM', title: 'Install for first YES (45 min total)', detail: 'Get Gorgias access + AfterShip tracking. Create intent, rule, macro, test, turn on 70% deflect.', critical: true },
    { time: 'Day 3 EOD', title: 'Launch proof tracker', detail: 'Screenshot Gorgias dashboard before. Set reminder Day 6 for proof report.', critical: true },
    { time: 'Day 6', title: 'Close $991 with proof report', detail: 'Show: Tickets deflected, hours saved, $ saved. Anchor $400-800 support savings. Close WISMO Only or Growth.', critical: true },
  ],
}

const SOP = [
  { step: '1', title: 'Get Gorgias access + AfterShip tracking', cmd: 'Client invites john@teknowlogy.co to Gorgias (Agent). Confirm AfterShip connected to Shopify.' },
  { step: '2', title: 'Create intent "Where is my order?"', cmd: 'Gorgias → Intent → New. Keywords: where is / tracking / WISMO / status / shipped. Confidence 0.75+' },
  { step: '3', title: 'Rule: auto-reply with tracking + ETA', cmd: 'Rule: IF intent=WISMO AND order_status=fulfilled THEN auto-reply macro {{tracking_link}} + {{eta}}. ELSE tag "WISMO-manual".' },
  { step: '4', title: 'Add macro', cmd: 'Macro: "Hey {{first_name}}, your {{product}} shipped! Tracking: {{tracking}} - arriving {{ETA}}. Track here: {{aftership_link}}"' },
  { step: '5', title: 'Test + Turn on 70% deflect', cmd: 'Test with your own order. Set auto-deflect threshold to 70% for 3 days. Screenshot before/after dashboard.' },
]

export default function App() {
  const [day, setDay] = useState('Day 2')
  const [done, setDone] = useState(new Set())
  const [copied, setCopied] = useState(null)
  const [scriptIdx, setScriptIdx] = useState(0)

  const toggle = (id) => {
    const next = new Set(done)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setDone(next)
  }

  const copy = async (text, id) => {
    await navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 1800)
  }

  const totalTasks = Object.values(PLAN).flat().length
  const doneCount = done.size

  return (
    <div className="min-h-screen bg-[#080808] text-[#EDEDED] antialiased">
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#080808]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-white text-black flex items-center justify-center font-bold text-[11px]">T</div>
            <span className="mono text-[11px] tracking-[0.18em] text-white/60">TEKNOWLOGY LLC</span>
            <span className="hidden md:inline h-3 w-px bg-white/10 mx-2" />
            <span className="hidden md:inline mono text-[11px] text-white/40">72H PROFIT PLAYBOOK • OAKLAND</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 rounded-full border border-white/10 px-3 py-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
              <span className="mono text-[10px] tracking-wide text-white/60">LIVE: {doneCount}/{totalTasks} TASKS</span>
            </div>
            <a href="https://onboard.teknowlogy.co" target="_blank" rel="noreferrer" className="mono text-[11px] px-3 py-1.5 rounded-full bg-white text-black font-medium hover:bg-white/90 transition flex items-center gap-1">
              onboard.teknowlogy.co <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 md:px-8 pt-14 pb-10 md:pt-20 md:pb-16">
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/10 px-3 py-1 mb-6">
              <Zap className="w-3 h-3 text-[#00FF88]" />
              <span className="mono text-[10px] tracking-[0.14em] text-[#00FF88]">HIGHEST LEVERAGE • WISMO WEDGE</span>
            </div>
            <h1 className="text-[44px] md:text-[64px] font-bold leading-[0.92] tracking-tight">
              72 HOUR<br /><span className="text-white/30">PROFIT</span><br />PLAYBOOK
            </h1>
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 min-w-[200px]">
                <div className="mono text-[10px] text-white/40 tracking-wide">GOAL</div>
                <div className="text-[18px] font-semibold tracking-tight mt-1">$991 MRR in <3 hrs work</div>
                <div className="mono text-[11px] text-white/40 mt-1">Least Time / Effort / Resources</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 min-w-[200px]">
                <div className="mono text-[10px] text-white/40">OWNER</div>
                <div className="text-[15px] font-medium mt-1 flex items-center gap-1.5">John • Oakland <MapPin className="w-3.5 h-3.5 text-white/40" /></div>
                <div className="mono text-[11px] text-white/40 mt-1">Shopify Agency • Bay-Made First</div>
              </div>
            </div>
          </div>

          <div className="md:pt-2">
            <div className="rounded-2xl border border-white/10 bg-[#0F0F0F] p-6 md:p-7">
              <div className="flex items-center justify-between mb-5">
                <span className="mono text-[11px] tracking-[0.12em] text-white/50">EXECUTIVE SUMMARY</span>
                <span className="mono text-[10px] px-2 py-0.5 rounded-full bg-[#00FF88]/15 text-[#00FF88] border border-[#00FF88]/20">TL;DR</span>
              </div>
              <p className="text-[14.5px] leading-relaxed text-white/80">
                You already built everything: Master Agency Site, Onboarding Portal V2, Proposal PDF, Checklist, n8n automator.{' '}
                <span className="text-white font-medium">Highest ROI is NOT selling full $991 upfront.</span>
              </p>
              <div className="mt-5 rounded-[10px] bg-[#00FF88]/10 border border-[#00FF88]/20 p-4">
                <div className="flex gap-2.5">
                  <Target className="w-4 h-4 text-[#00FF88] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[13px] font-semibold text-[#00FF88]">WISMO Killer = wedge.</div>
                    <div className="text-[12.5px] leading-relaxed text-white/70 mt-1">15 min install, $0 new cost (client’s AfterShip + Gorgias), immediate pain relief. Free 3-day proof → $297/mo → $991/mo Growth.</div>
                  </div>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {[['BUILT', 'Site, Portal V2, PDF, n8n'], ['WEDGE', 'WISMO Killer 15min'], ['CLOSE', 'Free Proof → $991']].map(([k, v]) => (
                  <div key={k} className="rounded-lg bg-white/[0.04] border border-white/5 p-3">
                    <div className="mono text-[10px] text-white/40">{k}</div>
                    <div className="text-[12px] font-medium mt-1 leading-tight">{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 mono text-[11px] text-white/50"><Timer className="w-3.5 h-3.5" /> Total Work: <3 hours</div>
              <div className="flex items-center gap-1.5 mono text-[11px] text-[#00FF88]"><Clock className="w-3.5 h-3.5" /> First $ in 24h</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 md:px-8 pb-12">
        <div className="flex items-end justify-between mb-6 gap-4">
          <h2 className="text-[18px] md:text-[20px] font-semibold tracking-tight">Profit vs Effort Matrix</h2>
          <span className="mono text-[11px] text-white/40 whitespace-nowrap">Sort by leverage ↓</span>
        </div>
        <div className="rounded-[14px] border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[860px]">
              <div className="grid grid-cols-[160px_90px_160px_90px_80px_70px_1fr] mono text-[10px] tracking-[0.12em] text-white/40 px-5 py-3.5 bg-white/[0.03] border-b border-white/10">
                <div>PLAY</div><div>INSTALL</div><div>RESOURCES</div><div>FIRST $</div><div>CLOSE</div><div>EFFORT</div><div>PROFIT</div>
              </div>
              {MATRIX.map((p) => (
                <div key={p.name} className={`grid grid-cols-[160px_90px_160px_90px_80px_70px_1fr] items-center px-5 py-4 border-b border-white/5 last:border-0 text-[13px] ${p.highlight ? 'bg-[#00FF88]/10' : 'bg-[#0F0F0F] hover:bg-white/[0.02]'}`}>
                  <div className="flex items-center gap-2 font-medium">
                    {p.highlight && <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" />}
                    {p.name}
                    {p.highlight && <span className="mono text-[9px] px-1.5 py-0.5 rounded bg-[#00FF88] text-black font-bold">HIGHEST LEVERAGE</span>}
                  </div>
                  <div className="mono text-[12px] text-white/70">{p.install}</div>
                  <div className="mono text-[11px] text-white/60 leading-tight">{p.resources}</div>
                  <div className="mono text-[12px] text-white/70">{p.first}</div>
                  <div className="mono text-[12px]">{p.close}</div>
                  <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, k) => (<div key={k} className={`w-1 h-3.5 rounded-full ${k < p.effort ? 'bg-white/80' : 'bg-white/15'}`} />))}</div>
                  <div className={`text-[12px] leading-tight ${p.highlight ? 'text-[#00FF88] font-medium' : 'text-white/70'}`}>{p.profit}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 md:px-8 pb-12 grid md:grid-cols-[1.2fr_0.8fr] gap-6 md:gap-8">
        <div className="rounded-2xl border border-white/10 bg-[#0F0F0F] p-6 md:p-7">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-[11px] font-bold">1</div>
            <h3 className="text-[16px] font-semibold tracking-tight">The #1 Play: Bay-Made + WISMO Killer</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-3 mb-5">
            <div className="rounded-xl border border-[#00FF88]/20 bg-[#00FF88]/10 p-4">
              <div className="mono text-[10px] text-[#00FF88]">BAY-MADE • #1 TARGET</div>
              <div className="text-[13px] font-medium mt-2 leading-snug">120 local artists, gift boxes = massive WISMO spikes, small team, owner responsive</div>
              <div className="mono text-[11px] text-white/50 mt-2 flex items-center gap-1"><MapPin className="w-3 h-3" /> 3295 Lakeshore Ave • walk-in possible</div>
              <div className="mt-3 inline-flex mono text-[10px] px-2 py-1 rounded-full bg-[#00FF88] text-black font-bold">FASTEST YES • LEAST SOPHISTICATED</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mono text-[10px] text-white/40">DOPE ERA • #2</div>
              <div className="text-[13px] font-medium mt-2 leading-snug">Biggest leak ($28k in support + lost repeat)</div>
              <div className="mono text-[11px] text-white/40 mt-2">But harder close, more stakeholders</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mono text-[10px] text-white/40">PEERLESS • #3</div>
              <div className="text-[13px] font-medium mt-2 leading-snug">Best LTV but slower cycle</div>
              <div className="mono text-[11px] text-white/40 mt-2">Good for Growth stack later</div>
            </div>
          </div>
          <div className="rounded-[10px] bg-white/[0.03] border border-white/10 px-4 py-3 flex items-center gap-3">
            <TriangleAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-[12.5px] leading-relaxed text-white/70">Why Bay-Made first: Oakland-based, you can literally walk in. Gift box season = WISMO nightmare right now. Least sophisticated tooling = instant value.</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0F0F0F] p-6 md:p-7">
          <h3 className="text-[16px] font-semibold tracking-tight flex items-center gap-2"><DollarSign className="w-4 h-4 text-[#00FF88]" /> Offer Ladder (Don’t sell $991 day 1)</h3>
          <div className="mt-6 relative">
            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/10" />
            <div className="space-y-5">
              <div className="relative flex gap-4">
                <div className="w-6 h-6 rounded-full bg-[#00FF88] text-black flex items-center justify-center text-[11px] font-bold z-10">1</div>
                <div className="flex-1 -mt-0.5">
                  <div className="mono text-[10px] text-[#00FF88] tracking-wide">DAY 1-3 • FREE</div>
                  <div className="text-[14px] font-semibold mt-1">3-Day WISMO Proof</div>
                  <div className="text-[12.5px] text-white/60 mt-1 leading-snug">“If I don’t save 10 hours, delete it” — zero risk, uses their stack</div>
                </div>
              </div>
              <div className="relative flex gap-4">
                <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-[11px] font-bold z-10">2</div>
                <div className="flex-1 -mt-0.5">
                  <div className="mono text-[10px] text-white/40 tracking-wide">DAY 4 • ANCHOR</div>
                  <div className="text-[14px] font-semibold mt-1">$297/mo WISMO Only OR $991/mo Growth</div>
                  <div className="text-[12.5px] text-white/60 mt-1 leading-snug">Growth = WISMO + Review Harvest + Cart Rescue. Show $400-800/mo support savings alone.</div>
                  <div className="mt-2 inline-flex mono text-[10px] px-2 py-1 rounded bg-white/10 border border-white/10 text-white/70">Anchor: $400-800 saved → $991 feels cheap</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-[10px] bg-white text-black px-4 py-3 flex items-center justify-between">
            <div className="mono text-[11px] font-medium">Math: 40% close × $991 = $396 expected / 3 hrs = $132/hr</div>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 md:px-8 pb-12">
        <div className="rounded-[20px] border border-white/10 bg-[#0F0F0F] overflow-hidden">
          <div className="px-6 md:px-8 py-5 md:py-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-[16px] md:text-[17px] font-semibold tracking-tight flex items-center gap-2.5"><Clock className="w-4 h-4" /> 72-Hour Execution Plan</h3>
            <div className="flex items-center gap-2.5 flex-wrap">
              {['Day 1', 'Day 2', 'Day 3'].map((d) => (
                <button key={d} onClick={() => setDay(d)} className={`mono text-[11px] px-4 py-2 rounded-full border transition ${day === d ? 'bg-white text-black border-white shadow-sm' : 'bg-transparent text-white/50 border-white/15 hover:border-white/30 hover:text-white/80'}`}>{d}</button>
              ))}
              <div className="ml-1 mono text-[10px] text-white/40 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10">{doneCount}/{totalTasks} DONE</div>
            </div>
          </div>
          <div className="p-5 md:p-8">
            <div className="space-y-3.5">
              {PLAN[day].map((task, i) => {
                const id = `${day}-${i}`
                const isDone = done.has(id)
                return (
                  <div key={id} className={`group flex gap-4 rounded-[14px] border px-4 md:px-5 py-4 md:py-5 transition ${isDone ? 'bg-[#00FF88]/10 border-[#00FF88]/20' : 'bg-white/[0.02] border-white/10 hover:border-white/15'}`}>
                    <label className="flex items-center justify-center shrink-0 mt-0.5 cursor-pointer">
                      <input type="checkbox" checked={isDone} onChange={() => toggle(id)} className="w-5 h-5 rounded-md bg-transparent border border-white/20 checked:bg-[#00FF88] checked:border-[#00FF88] accent-[#00FF88] cursor-pointer" />
                    </label>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`mono text-[10px] px-2.5 py-1 rounded-full border ${task.critical ? 'bg-white text-black border-white' : 'bg-white/5 text-white/50 border-white/10'}`}>{task.time}</span>
                        <span className={`text-[13.5px] font-medium ${isDone ? 'line-through text-white/40' : ''}`}>{task.title}</span>
                        {task.critical && <span className="mono text-[9px] px-1.5 py-0.5 rounded bg-amber-400/15 text-amber-300 border border-amber-400/20">CRITICAL PATH</span>}
                      </div>
                      <div className="text-[12.5px] leading-relaxed text-white/55 mt-2">{task.detail}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/20 shrink-0 mt-1 hidden md:block" />
                  </div>
                )
              })}
            </div>
            <div className="mt-8 rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-3.5 flex items-center gap-2 mono text-[11px] text-white/50">
              <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" /> Tip: Walk-in = 10× email. Do Bay-Made in person, others async.
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 md:px-8 pb-12 grid md:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="rounded-2xl border border-white/10 bg-[#0F0F0F] p-6 md:p-7">
          <h3 className="text-[16px] font-semibold tracking-tight">Installation SOP — WISMO Killer (15 min)</h3>
          <div className="mt-6 space-y-4">
            {SOP.map((s) => (
              <div key={s.step} className="flex gap-4">
                <div className="w-7 h-7 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center mono text-[11px] font-medium shrink-0">{s.step}</div>
                <div className="flex-1">
                  <div className="text-[13px] font-medium">{s.title}</div>
                  <div className="mono text-[11px] leading-relaxed text-white/50 mt-1 bg-black/50 border border-white/5 rounded-lg px-3 py-2">{s.cmd}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#0F0F0F] p-6">
            <h4 className="mono text-[11px] tracking-[0.12em] text-white/50 mb-4">METRICS TO TRACK</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-[10px] bg-white/[0.04] border border-white/5 px-4 py-3">
                <span className="text-[12.5px] text-white/70">Tickets deflected</span>
                <span className="mono text-[12px] font-medium">Gorgias intent report</span>
              </div>
              <div className="flex items-center justify-between rounded-[10px] bg-white/[0.04] border border-white/5 px-4 py-3">
                <span className="text-[12.5px] text-white/70">Hours saved</span>
                <span className="mono text-[12px] font-medium">Tickets × 8 min avg</span>
              </div>
              <div className="flex items-center justify-between rounded-[10px] bg-[#00FF88]/10 border border-[#00FF88]/20 px-4 py-3">
                <span className="text-[12.5px] text-[#00FF88]">$ saved</span>
                <span className="mono text-[12px] font-medium text-[#00FF88]">Hours × $25/hr</span>
              </div>
            </div>
            <div className="mt-4 mono text-[10px] text-white/30">Formula: Report Day 6 = deflect × $25 to anchor $991</div>
          </div>

          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
            <h4 className="mono text-[11px] tracking-[0.12em] text-red-300/80 mb-3 flex items-center gap-1.5"><TriangleAlert className="w-3.5 h-3.5" /> WHAT NOT TO DO</h4>
            <ul className="space-y-2.5 text-[12.5px] leading-relaxed text-white/70">
              {['Don’t build new system — use V2 portal already built', 'Don’t run ads — walk-in + Loom only', 'Don’t sell full $991 stack day 1 — wedge with free proof', 'Don’t email only — walk-in = 10× conversion', 'Don’t over-engineer — 15 min install, not 60'].map((t) => (
                <li key={t} className="flex gap-2"><span className="text-red-400">×</span> {t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 md:px-8 pb-20">
        <div className="rounded-2xl border border-white/10 bg-[#0F0F0F] overflow-hidden">
          <div className="px-6 md:px-7 py-5 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-[16px] font-semibold tracking-tight">Copy-Paste Scripts</h3>
            <span className="mono text-[11px] text-white/40">Personalize [brackets] before sending</span>
          </div>
          <div className="grid md:grid-cols-[240px_1fr]">
            <div className="border-b md:border-b-0 md:border-r border-white/10 p-2 space-y-1">
              {SCRIPTS.map((s, i) => (
                <button key={s.id} onClick={() => setScriptIdx(i)} className={`w-full text-left rounded-[10px] px-3 py-3 border transition ${scriptIdx === i ? 'bg-white text-black border-white' : 'bg-transparent border-transparent hover:bg-white/[0.04] hover:border-white/10'}`}>
                  <div className={`mono text-[10px] tracking-wide ${scriptIdx === i ? 'text-black/50' : 'text-white/40'}`}>{s.channel}</div>
                  <div className="text-[13px] font-medium mt-1 leading-tight">{s.label}</div>
                </button>
              ))}
            </div>
            <div className="p-6 md:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mono text-[10px] tracking-[0.14em] text-white/40">{SCRIPTS[scriptIdx].channel}</div>
                  <div className="text-[15px] font-semibold mt-1">{SCRIPTS[scriptIdx].label}</div>
                  {SCRIPTS[scriptIdx].subject && <div className="mono text-[11px] text-white/50 mt-2">Subject: {SCRIPTS[scriptIdx].subject}</div>}
                </div>
                <button onClick={() => copy(SCRIPTS[scriptIdx].text, SCRIPTS[scriptIdx].id)} className="mono text-[11px] px-3.5 py-2 rounded-full bg-white text-black font-medium flex items-center gap-1.5 hover:bg-white/90 transition">
                  {copied === SCRIPTS[scriptIdx].id ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                </button>
              </div>
              <div className="mt-5 rounded-xl bg-[#080808] border border-white/10 p-4 md:p-5 overflow-auto">
                <pre className="mono text-[12px] leading-relaxed text-white/80 whitespace-pre-wrap break-words">{SCRIPTS[scriptIdx].text}</pre>
              </div>
              <div className="mt-4 flex items-center gap-2 mono text-[11px] text-white/30"><span className="w-1 h-1 rounded-full bg-white/30" /> Replace [Owner Name] + paste Loom link before sending</div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 mono text-[11px] text-white/30">
          <span>TEKNOWLOGY LLC • 72H PROFIT PLAYBOOK • Built for John • Oakland, CA • Least Time, Effort, Resources</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" /> WISMO First • Proof → $991</span>
        </div>
      </div>
    </div>
  )
}
