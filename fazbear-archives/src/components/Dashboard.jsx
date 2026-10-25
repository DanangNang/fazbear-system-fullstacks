import React from 'react';
import { Flashlight, Clock, BatteryCharging, Radio, ArrowRight, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import EncounterGuide from './EncounterGuide';

export default function Dashboard({ guardName, guardId, onNavigateAbout }) {
  return (
    <div className="space-y-6">
      {/* 1. Personal Greeting Hero Banner */}
      <section className="bg-[#141414] border border-[#2E2E2E] rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        {/* Subtle orange accent corner glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#EA580C]/12 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#EA580C] mb-1.5 uppercase tracking-wider font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-pulse shadow-[0_0_8px_#EA580C]" />
              TERMINAL SESSION ACTIVE // AUTHORIZED ENTRY
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-wide text-[#F5F5F5] font-['Chakra_Petch',sans-serif]">
              Welcome Back, <span className="text-[#EA580C] drop-shadow-[0_0_12px_rgba(234,88,12,0.4)]">{guardName || 'Security Guard'}</span>
            </h1>

            <p className="text-sm sm:text-base text-[#A3A3A3] mt-1 font-sans">
              Your night shift begins here. Monitor all sectors and report every mechanical anomaly immediately.
            </p>
          </div>

          {/* Quick Metrics Bar in Orange and Black */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <div className="p-3 rounded-lg bg-[#1F1F1F] border border-[#2E2E2E] min-w-[130px]">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#A3A3A3]">
                <Clock className="w-3.5 h-3.5 text-[#EA580C]" />
                CURRENT SHIFT
              </div>
              <div className="text-sm font-bold text-[#F5F5F5] font-mono mt-0.5">
                12:00 AM - 06:00 AM
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#1F1F1F] border border-[#2E2E2E] min-w-[130px]">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#A3A3A3]">
                <BatteryCharging className="w-3.5 h-3.5 text-[#FB923C]" />
                POWER RESERVE
              </div>
              <div className="text-sm font-bold text-[#FB923C] font-mono mt-0.5">
                99% AUXILIARY
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#1F1F1F] border border-[#2E2E2E] min-w-[130px]">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#A3A3A3]">
                <Radio className="w-3.5 h-3.5 text-[#EA580C]" />
                SURVEILLANCE
              </div>
              <div className="text-sm font-bold text-[#F5F5F5] font-mono mt-0.5">
                11 FEEDS ONLINE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Overview of Fazbear Archives */}
      <section className="bg-[#141414] border border-[#2E2E2E] rounded-xl p-5 sm:p-7 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#EA580C] shadow-[0_0_6px_#EA580C]" />
              <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#F5F5F5] font-['Chakra_Petch',sans-serif]">
                Tentang Fazbear Archives
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
              Fazbear Archives adalah repositori internal terenkripsi yang mencatat riwayat insiden, status integritas animatronik, dan manual pertahanan keamanan pos jaga. Setiap petugas pos jaga shift malam wajib memahami rute gerak entitas serta mematuhi seluruh protokol keselamatan sebelum fajar menyingsing.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-[#A3A3A3] pt-1">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#EA580C]" />
                Arsip Terpusat Fazbear Ent.
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#EA580C]" />
                Log Mutlak Shift Malam
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#EA580C]" />
                Protokol Keselamatan Kelas-A
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onNavigateAbout}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1F1F1F] hover:bg-[#2A2A2A] text-[#F5F5F5] hover:text-white border border-[#2E2E2E] hover:border-[#EA580C] transition-colors text-xs font-semibold uppercase tracking-wider shrink-0 cursor-pointer group"
          >
            <FileText className="w-4 h-4 text-[#EA580C]" />
            <span>Pelajari Selengkapnya</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </section>

      {/* 3. Static Tutorial: Encounter Guide */}
      <EncounterGuide />

      {/* 4. Mandatory Closing Advisory Notice with Orange Hazard Styling */}
      <section className="bg-gradient-to-r from-[#141414] via-[#1E1611] to-[#141414] border-2 border-[#EA580C] rounded-xl p-6 sm:p-8 text-center relative overflow-hidden shadow-2xl">
        {/* Striped caution hazard accent on top and bottom in orange and black */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[repeating-linear-gradient(45deg,#EA580C,#EA580C_12px,#0A0A0A_12px,#0A0A0A_24px)]" />
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[repeating-linear-gradient(45deg,#EA580C,#EA580C_12px,#0A0A0A_12px,#0A0A0A_24px)]" />

        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-[#EA580C]/20 border border-[#EA580C] flex items-center justify-center text-[#FB923C] mb-3 shadow-[0_0_24px_rgba(234,88,12,0.4)]">
            <Flashlight className="w-7 h-7 animate-pulse text-[#EA580C]" />
          </div>

          <div className="text-[11px] font-mono uppercase tracking-widest text-[#FB923C] font-bold mb-1">
            Fazbear Security Directive #87
          </div>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-widest text-[#F5F5F5] font-['Chakra_Petch',sans-serif]">
            Stay Strong, Keep Your Flashlight On.
          </h3>

          <p className="text-xs sm:text-sm text-[#A3A3A3] mt-2 max-w-lg leading-relaxed">
            Ingat, mereka mungkin berkeliaran di lorong yang gelap, tetapi sorotan cahaya adalah pertahanan terbaik Anda. Jaga konsentrasi hingga pukul 06:00 AM.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0A0A0A] border border-[#2E2E2E] text-[11px] font-mono text-[#F5F5F5]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>SECURITY GUARD OATH: VIGILANCE THROUGH THE NIGHT</span>
          </div>
        </div>
      </section>
    </div>
  );
}
