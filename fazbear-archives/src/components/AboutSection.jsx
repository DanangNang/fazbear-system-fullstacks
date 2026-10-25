import React from 'react';
import { Shield, BookOpen, MapPin, Lock } from 'lucide-react';

export default function AboutSection() {
  const directives = [
    {
      code: 'DIRECTIVE-01',
      title: 'Pemantauan Berkelanjutan',
      text: 'Security Guard diwajibkan tetap berada di dalam Security Office dari pukul 12:00 AM hingga 06:00 AM tanpa meninggalkan pos kecuali ada evakuasi darurat.',
    },
    {
      code: 'DIRECTIVE-02',
      title: 'Konservasi Daya Cadangan',
      text: 'Generator darurat memiliki cadangan daya terbatas untuk satu malam shift. Pemadaman total akan mematikan sistem pintu otomatis.',
    },
    {
      code: 'DIRECTIVE-03',
      title: 'Kerahasiaan Dokumen & Rekaman',
      text: 'Semua rekaman CCTV, anomali mekanikal, dan audio log di Fazbear Archives berstatus proprietary dan dilindungi perjanjian kerahasiaan ketat.',
    },
    {
      code: 'DIRECTIVE-04',
      title: 'Klaim Tanggung Jawab',
      text: 'Fazbear Entertainment tidak bertanggung jawab atas disorientasi, paranoia, atau cedera fisik akibat kegagalan mengikuti instruksi keselamatan.',
    },
  ];

  const facilityZones = [
    { name: 'Show Stage (CAM-1A)', status: 'Active Stage', detail: 'Freddy, Bonnie, Chica starting zone' },
    { name: 'Dining Area (CAM-1B)', status: 'Main Hall', detail: 'Wide camera angle, acoustic monitoring' },
    { name: 'Pirate Cove (CAM-1C)', status: 'Restricted Curtain', detail: 'Foxy the Pirate containment' },
    { name: 'West Hall (CAM-2A)', status: 'Blind Corner', detail: 'High sprint corridor leading to left door' },
    { name: 'East Hall (CAM-4A/B)', status: 'Secondary Corridor', detail: 'Direct path toward right security door' },
    { name: 'Security Office', status: 'Guard Station', detail: 'Primary control terminal & twin blast doors' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#141414] border border-[#2E2E2E] rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#EA580C] mb-1.5 uppercase tracking-wider font-semibold">
              <Shield className="w-3.5 h-3.5" />
              Fazbear Entertainment Security Division
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-[#F5F5F5] font-['Chakra_Petch',sans-serif]">
              Tentang Fazbear Archives
            </h1>
            <p className="text-sm text-[#A3A3A3] mt-2 leading-relaxed">
              Fazbear Archives adalah sistem basis data dan portal manajemen keamanan internal resmi milik Fazbear Entertainment Inc. Sistem ini dirancang khusus untuk mendukung operasional Security Guard selama jam operasional malam (12:00 AM - 06:00 AM), memastikan keselamatan aset gerai pizza, pemantauan perangkat animatronik, serta pencatatan insiden secara akurat.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#1F1F1F] border border-[#2E2E2E] shrink-0 font-mono text-xs space-y-1.5 min-w-[200px]">
            <div className="text-[#A3A3A3] uppercase">System Classification:</div>
            <div className="text-[#EA580C] font-bold">INTERNAL USE ONLY</div>
            <div className="text-[#A3A3A3] pt-1">Revision: 1987.11-RC</div>
            <div className="text-[#FB923C] font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#EA580C] shadow-[0_0_6px_#EA580C]" />
              DATABASE SECURE
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Directives and Facility Zones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Directives */}
        <div className="bg-[#141414] border border-[#2E2E2E] rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#2E2E2E]">
            <BookOpen className="w-5 h-5 text-[#EA580C]" />
            <h2 className="text-lg font-bold uppercase tracking-wide text-[#F5F5F5] font-['Chakra_Petch',sans-serif]">
              Petunjuk & Regulasi Pos Jaga
            </h2>
          </div>

          <div className="space-y-3.5">
            {directives.map((dir) => (
              <div
                key={dir.code}
                className="p-3.5 rounded-lg bg-[#1F1F1F] border border-[#2E2E2E] hover:border-[#EA580C]/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#F5F5F5]">{dir.title}</span>
                  <span className="text-[10px] font-mono text-[#FB923C] px-1.5 py-0.5 rounded bg-[#141414]">
                    {dir.code}
                  </span>
                </div>
                <p className="text-xs text-[#A3A3A3] leading-relaxed">{dir.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Facility Map / Sector Directory */}
        <div className="bg-[#141414] border border-[#2E2E2E] rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#2E2E2E]">
            <MapPin className="w-5 h-5 text-[#EA580C]" />
            <h2 className="text-lg font-bold uppercase tracking-wide text-[#F5F5F5] font-['Chakra_Petch',sans-serif]">
              Daftar Sektor Pengawasan
            </h2>
          </div>

          <div className="space-y-2.5">
            {facilityZones.map((zone, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-[#1F1F1F] border border-[#2E2E2E] hover:border-[#EA580C]/30 transition-colors"
              >
                <div>
                  <div className="text-xs font-semibold text-[#F5F5F5] font-mono">{zone.name}</div>
                  <div className="text-[11px] text-[#A3A3A3]">{zone.detail}</div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#141414] text-[#F5F5F5] border border-[#2E2E2E] shrink-0">
                  {zone.status}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-[#2E2E2E] flex items-center justify-between text-xs text-[#A3A3A3] font-mono">
            <span>TOTAL KAMERA: 11 CHANNELS</span>
            <span className="text-[#FB923C]">FEED RESOLUTION: 480i CRT</span>
          </div>
        </div>
      </div>

      {/* Legal & Historical Note */}
      <div className="bg-[#141414] border border-[#2E2E2E] rounded-xl p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-[#1F1F1F] border border-[#2E2E2E] text-[#EA580C] shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wide text-[#F5F5F5] font-['Chakra_Petch',sans-serif]">
              Pemberitahuan Kerahasiaan & Hak Cipta
            </h3>
            <p className="text-xs text-[#A3A3A3] mt-1.5 leading-relaxed">
              Seluruh sistem, modul pengarsipan, dan panduan keselamatan di dalam sistem ini merupakan properti eksklusif Fazbear Entertainment Inc. Setiap penyebaran, penyalinan, atau penyalahgunaan data arsip keamanan di luar pengawasan manajemen adalah pelanggaran hukum berat. Tetap patuhi protokol malam Anda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
