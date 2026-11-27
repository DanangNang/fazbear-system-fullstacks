import React, { useState } from 'react';
import {
    Gamepad2,
    Lock,
    Unlock,
    Cpu,
    ArrowRight,
    X,
    FolderArchive,
    ShieldCheck,
} from 'lucide-react';

const SERIES_CATALOG = [
    {
        id: 'FNAF 1',
        code: 'SRV-01 // 1993',
        title: "Five Nights at Freddy's",
        location: "Freddy Fazbear's Pizza (Hurricane, Utah)",
        threatLevel: 'HIGH',
        expectedCount: 5,
    },
    {
        id: 'FNAF 2',
        code: 'SRV-02 // 1987',
        title: "Five Nights at Freddy's 2",
        location: "The New and Improved Freddy Fazbear's Pizza",
        threatLevel: 'SEVERE',
        expectedCount: 13,
    },
    {
        id: 'FNAF 3',
        code: 'SRV-03 // 2023',
        title: "Five Nights at Freddy's 3",
        location: "Fazbear's Fright: The Horror Attraction",
        threatLevel: 'CRITICAL',
        expectedCount: 6,
    },
    {
        id: 'FNAF 4',
        code: 'SRV-04 // 1983',
        title: "Five Nights at Freddy's 4",
        location: 'Afton Residence // Nightmare Sector',
        threatLevel: 'EXTREME',
        expectedCount: 10,
    },
    {
        id: 'FNAF: Sister Location',
        code: 'SRV-05 // SL-85',
        title: 'FNAF: Sister Location',
        location: "Circus Baby's Entertainment and Rental",
        threatLevel: 'CRITICAL',
        expectedCount: 7,
    },
    {
        id: "Freddy Fazbear's Pizzeria Simulator",
        code: 'SRV-06 // FFPS',
        title: "Freddy Fazbear's Pizzeria Simulator",
        location: "Freddy Fazbear's Pizza Place (Labyrinth)",
        threatLevel: 'SEVERE',
        expectedCount: 18,
    },
    {
        id: 'FNAF: Help Wanted',
        code: 'SRV-07 // VR-HW',
        title: 'FNAF: Help Wanted',
        location: 'The Freddy Fazbear Virtual Experience',
        threatLevel: 'ANOMALY',
        expectedCount: 2,
    },
    {
        id: 'FNAF: Security Breach',
        code: 'SRV-08 // MEGA-PP',
        title: 'FNAF: Security Breach',
        location: "Freddy Fazbear's Mega Pizzaplex",
        threatLevel: 'MAXIMUM',
        expectedCount: 9,
    },
];

export default function SeriesGameSection({ animatronics, onNavigateArchives }) {
    const [selectedSeries, setSelectedSeries] = useState(null);

    const getEntitiesBySeries = (seriesId) =>
        animatronics.filter((item) => (item.series || item.seriesGame) === seriesId);

    const unlockedCount = SERIES_CATALOG.filter(
        (s) => getEntitiesBySeries(s.id).length > 0
    ).length;

    return (
        <div className="space-y-6">
            {/* Header Banner */}
            <section className="bg-[#141414] border border-[#2E2E2E] rounded-xl p-6 relative overflow-hidden shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-[#EA580C] uppercase tracking-wider font-semibold mb-1">
                            <Gamepad2 className="w-4 h-4" />
                            <span>TIMELINE // INCIDENT ARCHIVE</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#F5F5F5] font-['Chakra_Petch',sans-serif]">
                            Series Game Directory
                        </h1>
                        <p className="text-xs sm:text-sm text-[#A3A3A3] mt-1">
                            Setiap arsip seri permainan akan terbuka secara otomatis setelah Anda mencatat minimal 1 entitas animatronik dari seri tersebut di menu Archives.
                        </p>
                    </div>

                    <div className="px-4 py-2.5 rounded-lg bg-[#1F1F1F] border border-[#2E2E2E] font-mono text-right shrink-0">
                        <div className="text-[11px] text-[#A3A3A3]">SERIES UNLOCKED</div>
                        <div className="text-xl font-bold text-[#EA580C]">
                            {unlockedCount}{' '}
                            <span className="text-xs font-normal text-[#A3A3A3]">
                                / {SERIES_CATALOG.length} SECTORS
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Series Cards Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SERIES_CATALOG.map((series) => {
                    const entities = getEntitiesBySeries(series.id);
                    const isUnlocked = entities.length > 0;

                    return (
                        <div
                            key={series.id}
                            onClick={() => isUnlocked && setSelectedSeries(series)}
                            className={`rounded-xl p-5 border transition-all flex flex-col justify-between relative overflow-hidden ${isUnlocked
                                ? 'bg-[#141414] border-[#2E2E2E] hover:border-[#EA580C] cursor-pointer shadow-lg group'
                                : 'bg-[#0E0E0E] border-[#1F1F1F] opacity-65 select-none'
                                }`}
                        >
                            <div>
                                <div className="flex items-center justify-between text-[11px] font-mono mb-3 pb-2 border-b border-[#2E2E2E]">
                                    <span className={isUnlocked ? 'text-[#EA580C] font-semibold' : 'text-[#525252]'}>
                                        {series.code}
                                    </span>
                                    {isUnlocked ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#EA580C]/20 text-[#FB923C] border border-[#EA580C]/40">
                                            <Unlock className="w-3 h-3" />
                                            UNLOCKED
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#1A1A1A] text-[#737373] border border-[#262626]">
                                            <Lock className="w-3 h-3" />
                                            LOCKED
                                        </span>
                                    )}
                                </div>

                                <h2
                                    className={`text-base sm:text-lg font-bold uppercase tracking-wide font-['Chakra_Petch',sans-serif] leading-snug ${isUnlocked
                                        ? 'text-[#F5F5F5] group-hover:text-[#FB923C] transition-colors'
                                        : 'text-[#737373]'
                                        }`}
                                >
                                    {series.id}
                                </h2>

                                <p className="text-xs text-[#A3A3A3] mt-1.5 line-clamp-2 min-h-[32px]">
                                    {isUnlocked ? series.location : 'Data lokasi terenkripsi. Temukan entitas di Archives untuk membuka.'}
                                </p>
                            </div>

                            <div className="mt-5 pt-3 border-t border-[#2E2E2E]/70 flex items-center justify-between text-xs font-mono">
                                {isUnlocked ? (
                                    <>
                                        <span className="text-[#F5F5F5] flex items-center gap-1.5">
                                            <Cpu className="w-3.5 h-3.5 text-[#EA580C]" />
                                            {entities.length} / {series.expectedCount} Entitas
                                        </span>
                                        <span className="text-[#FB923C] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                                            INSPECT <ArrowRight className="w-3.5 h-3.5" />
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-[#525252] text-[11px]">
                                        0 / {series.expectedCount} ENTITAS
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* Shortcut ke Archives jika masih banyak yang terkunci */}
            {unlockedCount < SERIES_CATALOG.length && (
                <section className="bg-[#141414] border border-[#2E2E2E] rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="text-xs sm:text-sm text-[#A3A3A3]">
                        Ingin membuka lebih banyak arsip Series Game? Tambahkan data animatronik baru sesuai serinya di halaman{' '}
                        <span className="text-[#F5F5F5] font-semibold">Archives</span>.
                    </div>
                    <button
                        type="button"
                        onClick={onNavigateArchives}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1F1F1F] hover:bg-[#2A2A2A] border border-[#2E2E2E] hover:border-[#EA580C] text-xs font-mono text-[#F5F5F5] uppercase cursor-pointer transition-colors shrink-0"
                    >
                        <FolderArchive className="w-4 h-4 text-[#EA580C]" />
                        <span>Buka Archives</span>
                    </button>
                </section>
            )}

            {/* POP-UP MODAL DETAIL SERIES */}
            {selectedSeries && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
                    onClick={() => setSelectedSeries(null)}
                >
                    <div
                        className="w-full max-w-lg bg-[#141414] border border-[#EA580C] rounded-xl shadow-[0_0_35px_rgba(234,88,12,0.25)] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="px-6 py-4 bg-[#1F1F1F] border-b border-[#2E2E2E] flex items-center justify-between">
                            <div>
                                <div className="text-[11px] font-mono text-[#EA580C] font-semibold">
                                    {selectedSeries.code} // THREAT: {selectedSeries.threatLevel}
                                </div>
                                <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#F5F5F5] font-['Chakra_Petch',sans-serif]">
                                    {selectedSeries.title}
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedSeries(null)}
                                className="text-[#A3A3A3] hover:text-[#F5F5F5] p-1 rounded cursor-pointer transition-colors"
                                aria-label="Tutup detail series"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="p-3 rounded-lg bg-[#0A0A0A] border border-[#2E2E2E] text-xs font-mono">
                                <span className="text-[#A3A3A3]">SECTOR LOCATION: </span>
                                <span className="text-[#F5F5F5]">{selectedSeries.location}</span>
                            </div>

                            <div>
                                <div className="text-xs font-mono text-[#A3A3A3] uppercase mb-2 flex items-center gap-1.5">
                                    <ShieldCheck className="w-3.5 h-3.5 text-[#EA580C]" />
                                    <span>
                                        Animatronic Terdeteksi ({getEntitiesBySeries(selectedSeries.id).length} / {selectedSeries.expectedCount})
                                    </span>
                                </div>

                                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                                    {getEntitiesBySeries(selectedSeries.id).map((entity) => {
                                        const entityStatus =
                                            entity.status || (entity.isPossessed ? 'Possessed' : 'Normal');
                                        return (
                                            <div
                                                key={entity.id}
                                                className="flex items-center justify-between p-3 rounded-lg bg-[#1A1A1A] border border-[#2E2E2E]"
                                            >
                                                <div className="flex items-center gap-2.5">
                                                    <Cpu className="w-4 h-4 text-[#EA580C]" />
                                                    <div>
                                                        <div className="text-sm font-bold text-[#F5F5F5] uppercase font-['Chakra_Petch',sans-serif]">
                                                            {entity.name}
                                                        </div>
                                                        <div className="text-[11px] font-mono text-[#A3A3A3]">
                                                            STATUS: {entityStatus.toUpperCase()}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="px-2.5 py-0.5 rounded bg-[#0A0A0A] border border-[#2E2E2E] text-[11px] font-mono text-[#FB923C]">
                                                    {entity.form.toUpperCase()}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex justify-end pt-2 border-t border-[#2E2E2E]">
                                <button
                                    type="button"
                                    onClick={() => setSelectedSeries(null)}
                                    className="px-4 py-2 rounded-lg bg-[#1F1F1F] hover:bg-[#2A2A2A] border border-[#2E2E2E] text-xs font-mono text-[#F5F5F5] cursor-pointer transition-colors"
                                >
                                    TUTUP ARSIP
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}