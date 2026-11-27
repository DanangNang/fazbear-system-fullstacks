import React from 'react';
import { BookOpen, Lock, Unlock, FolderArchive } from 'lucide-react';

export default function StoryGameSection({ animatronicsCount, onNavigateArchives }) {
    const targetCount = 70;
    const isUnlocked = animatronicsCount >= targetCount;
    const progressPercent = Math.min((animatronicsCount / targetCount) * 100, 100);

    return (
        <div className="space-y-6">
            {/* Header Banner */}
            <section className="bg-[#141414] border border-[#2E2E2E] rounded-xl p-6 relative overflow-hidden shadow-xl">
                <div className="flex items-center gap-2 text-xs font-mono text-[#EA580C] uppercase tracking-wider font-semibold mb-1">
                    <BookOpen className="w-4 h-4" />
                    <span>CLASSIFIED // LORE & INCIDENT TIMELINE</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#F5F5F5] font-['Chakra_Petch',sans-serif]">
                    Story Game
                </h1>
            </section>

            {/* Main Coming Soon Panel */}
            <section className="bg-[#141414] border-2 border-dashed border-[#2E2E2E] rounded-xl p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.08),transparent_65%)] pointer-events-none" />

                <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#1F1F1F] border border-[#EA580C]/60 flex items-center justify-center text-[#EA580C] mb-5 shadow-[0_0_25px_rgba(234,88,12,0.25)]">
                        {isUnlocked ? (
                            <Unlock className="w-8 h-8 animate-pulse" />
                        ) : (
                            <Lock className="w-8 h-8" />
                        )}
                    </div>

                    <div className="text-xs font-mono uppercase tracking-widest text-[#FB923C] mb-2">
                        {isUnlocked ? 'ACCESS REQUIREMENT MET // ALL 70 ENTITIES LOGGED' : 'RESTRICTED ARCHIVE // LOCKED'}
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-[#F5F5F5] font-['Chakra_Petch',sans-serif] leading-snug">
                        {isUnlocked
                            ? 'Story Mode Timeline Terbuka (70/70 Entitas Teridentifikasi)'
                            : 'Coming Soon - Terbuka Jika Seluruh 70 Animatronic Sudah Ditemukan'}
                    </h2>

                    {/* Progress Bar Sinkron dengan Archives */}
                    <div className="w-full max-w-md mt-6 space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-[#A3A3A3]">PROGRES PENEMUAN ENTITAS:</span>
                            <span className="text-[#EA580C] font-bold">
                                {animatronicsCount} / {targetCount} ANIMATRONIC
                            </span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-[#0A0A0A] border border-[#2E2E2E] overflow-hidden">
                            <div
                                className="h-full bg-[#EA580C] transition-all duration-500 shadow-[0_0_10px_#EA580C]"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onNavigateArchives}
                        className="mt-7 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1F1F1F] hover:bg-[#2A2A2A] border border-[#2E2E2E] hover:border-[#EA580C] text-xs font-mono text-[#F5F5F5] uppercase tracking-wider cursor-pointer transition-colors"
                    >
                        <FolderArchive className="w-4 h-4 text-[#EA580C]" />
                        <span>Tambah Data di Archives</span>
                    </button>
                </div>
            </section>
        </div>
    );
}