import React from 'react';
import { Camera, Eye, Flashlight, ShieldCheck, ClipboardCheck, AlertOctagon, BatteryWarning } from 'lucide-react';

export default function EncounterGuide() {
  const steps = [
    {
      step: '01',
      title: 'Kamera & Deteksi Pergerakan',
      subtitle: 'Monitor Sector CAM-1A s/d CAM-2B',
      icon: Camera,
      tag: 'TAHAP 1: OBSERVASI',
      tagColor: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
      description:
        'Lakukan rotasi pengecekan kamera pengawas setiap 10-15 detik. Awasi panggung utama (Show Stage) dan Pirate Cove. Jika terdengar suara langkah berat, gesekan logam, atau tawa audio glitch, segera telusuri kamera lorong terdekat.',
      protocols: [
        'Periksa apakah Foxy mulai mengintip dari tirai Pirate Cove.',
        'Waspadai hilangnya Bonnie atau Chica dari panggung.',
        'Jangan buka monitor kamera terlalu lama untuk menghemat daya.',
      ],
    },
    {
      step: '02',
      title: 'Identifikasi Karakter & Jalur Serangan',
      subtitle: 'Klasifikasi Animatronik Aktif',
      icon: Eye,
      tag: 'TAHAP 2: IDENTIFIKASI',
      tagColor: 'text-orange-300 border-orange-300/30 bg-orange-300/10',
      description:
        'Tentukan entitas yang bergerak ke arah pos jaga. Setiap karakter memiliki pola gerak yang spesifik dan jalur blind spot yang berbeda.',
      protocols: [
        'Bonnie: Selalu mendekati kantor pos jaga melalui Lorong Kiri (West Hall).',
        'Chica: Mendekat perlahan melalui Dapur dan Lorong Kanan (East Hall).',
        'Freddy: Bergerak dalam kegelapan saat daya rendah; amati mata yang menyala.',
        'Foxy: Berlari cepat melalui West Hall; dengarkan suara hentakan kaki.',
      ],
    },
    {
      step: '03',
      title: 'Tindakan Pertahanan & Flashlight',
      subtitle: 'Eksekusi Pintu & Pencahayaan',
      icon: Flashlight,
      tag: 'TAHAP 3: DEFENSE SOP',
      tagColor: 'text-[#EA580C] border-[#EA580C]/40 bg-[#EA580C]/10',
      description:
        'Gunakan tombol lampu pintu (Door Light) untuk mengecek blind spot jendela. Jika mata animatronik terlihat di ambang pintu, segera tekan tombol untuk menutup pintu pelindung baja.',
      protocols: [
        'Nyalakan lampu lorong hanya secara berkala (quick flash).',
        'Tutup pintu baja HANYA saat animatronic tepat di ambang pintu.',
        'Buka kembali pintu baja begitu entitas telah beranjak pergi.',
        'Jaga penggunaan daya generator tetap berada di bawah batas kritis.',
      ],
    },
    {
      step: '04',
      title: 'Pencatatan Log & Arsip Insiden',
      subtitle: 'Dokumentasi Formulir Standar Fazbear',
      icon: ClipboardCheck,
      tag: 'TAHAP 4: ARCHIVE LOG',
      tagColor: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
      description:
        'Setelah ancaman mereda atau pergantian shift pukul 06:00 AM, catat seluruh parameter anomali ke dalam sistem Arsip Keamanan Internal.',
      protocols: [
        'Catat jam & menit kemunculan pertama (misal: 02:45 AM).',
        'Nama entitas & tingkat keagresifan (Rendah / Sedang / Sangat Agresif).',
        'Persentase konsumsi daya cadangan saat insiden berlangsung.',
        'Lampirkan tanda tangan digital Security Guard bersangkutan.',
      ],
    },
  ];

  return (
    <section className="bg-[#141414] border border-[#2E2E2E] rounded-xl p-5 sm:p-7 shadow-xl">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#2E2E2E] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C] shadow-[0_0_6px_#EA580C]" />
            <h2 className="text-xl font-bold uppercase tracking-wider text-[#F5F5F5] font-['Chakra_Petch',sans-serif]">
              Tutorial Prosedur Encounter Animatronik
            </h2>
          </div>
          <p className="text-xs text-[#A3A3A3] font-mono mt-1">
            Standard Operating Procedure (SOP) Keamanan Shift Malam // Dokumen Rahasia Dok-87
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto px-3 py-1 rounded-md bg-[#1F1F1F] border border-[#2E2E2E] text-xs font-mono text-[#F5F5F5]">
          <ShieldCheck className="w-4 h-4 text-[#EA580C]" />
          <span>STATUS PROTOKOL: AKTIF</span>
        </div>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="bg-[#1F1F1F] border border-[#2E2E2E] rounded-lg p-5 flex flex-col justify-between hover:border-[#EA580C]/60 transition-all group shadow-sm hover:shadow-md"
            >
              <div>
                {/* Step Top Bar */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold font-mono text-[#EA580C] group-hover:scale-105 transition-transform drop-shadow-[0_0_8px_rgba(234,88,12,0.3)]">
                    {item.step}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${item.tagColor}`}
                  >
                    {item.tag}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded bg-[#141414] border border-[#2E2E2E] text-[#F5F5F5] group-hover:text-[#EA580C] shrink-0 mt-0.5 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-[#F5F5F5] group-hover:text-white leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#A3A3A3] font-mono">{item.subtitle}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-[#A3A3A3] leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Actionable SOP Checklist */}
              <div className="bg-[#141414] border border-[#2E2E2E] rounded-md p-3">
                <div className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertOctagon className="w-3 h-3 text-[#EA580C]" />
                  Instruksi Tindakan Lapangan:
                </div>
                <ul className="space-y-1.5 text-xs text-[#F5F5F5]">
                  {item.protocols.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#EA580C] font-bold font-mono text-[10px] mt-0.5">
                        &gt;
                      </span>
                      <span className="text-[#F5F5F5]/90 leading-tight">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Extra Night Guard Caution Note in Orange/Black */}
      <div className="mt-5 p-4 rounded-lg bg-[#1F1F1F] border border-[#2E2E2E] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-[#EA580C]/10 text-[#EA580C] border border-[#EA580C]/30 shrink-0">
            <BatteryWarning className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-[#F5F5F5] font-mono">
              PERINGATAN MANAJEMEN DAYA GEDUNG
            </div>
            <div className="text-[#A3A3A3]">
              Setiap penutupan pintu baja mengonsumsi daya 2x lebih cepat. Matikan lampu setelah pengecekan.
            </div>
          </div>
        </div>

        <div className="font-mono text-[#EA580C] font-bold shrink-0 text-right">
          MAX CONSUMPTION: USAGE BAR 4
        </div>
      </div>
    </section>
  );
}
