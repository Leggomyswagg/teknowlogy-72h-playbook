import { useState } from 'react'
import {
  ArrowUpRight, Check, ChevronRight, Clock, Copy, DollarSign,
  ExternalLink, MapPin, Target, Timer, TriangleAlert, Zap
} from 'lucide-react'

export default function App() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#EDEDED] antialiased p-8">
      <h1 className="text-[44px] font-bold">Loading full playbook…</h1>
      <p className="text-white/60 mt-4">If you see this, the full App.jsx is still uploading. Refresh in a moment.</p>
    </div>
  )
}
