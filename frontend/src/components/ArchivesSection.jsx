import React, { useState } from 'react';
import {FolderArchive, Plus, Pencil, Trash2, Search, Cpu, X, Save, ShieldAlert, AlertTriangle, Flame, Ghost,
} from 'lucide-react';

const API_URL = 'http://localhost:3000/animatronics';

const FORM_OPTIONS = ['Bear', 'Rabbit', 'Chicken', 'Fox', 'Things'];

const SERIES_OPTIONS = [
    'FNAF 1',
    'FNAF 2',
    'FNAF 3',
    'FNAF 4',
    'FNAF: Sister Location',
    "Freddy Fazbear's Pizzeria Simulator",
    'FNAF: Help Wanted',
    'FNAF: Security Breach',
];

export default function ArchivesSection({ animatronics, onRefresh, isLoading }) {
    // State untuk form tambah data baru
    const [name, setName] = useState('');
    const [formType, setFormType] = useState('');
    const [series, setSeries] = useState('');
    const [threatLevel, setThreatLevel] = useState(5);
    const [isPossessed, setIsPossessed] = useState(true);
    const [behaviorNote, setBehaviorNote] = useState('');

    // State feedback error & loading
    const [apiError, setApiError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // State khusus modal pop-up edit & konfirmasi hapus
    const [editingItem, setEditingItem] = useState(null);
    const [deletingItem, setDeletingItem] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [filterForm, setFilterForm] = useState('ALL');

    // CREATE -> POST /animatronics
    const handleAddSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() || !formType || !series) return;

        setApiError('');
        setIsSubmitting(true);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name.trim(),
                    form: formType,
                    seriesGame: series,
                    threatLevel: Number(threatLevel),
                    isPossessed: Boolean(isPossessed),
                    behaviorNote: behaviorNote.trim() || undefined,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                const msg = Array.isArray(data.message)
                    ? data.message.join(' | ')
                    : data.message || 'Gagal menambahkan data ke server.';
                setApiError(msg);
                return;
            }

            // Reset form & refresh data dari backend
            setName('');
            setFormType('');
            setSeries('');
            setThreatLevel(5);
            setIsPossessed(true);
            setBehaviorNote('');
            await onRefresh();
        } catch (err) {
            setApiError('Tidak dapat terhubung ke server Backend NestJS (port 3000).');
        } finally {
            setIsSubmitting(false);
        }
    };

    // UPDATE -> PATCH /animatronics/:id
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editingItem || !editingItem.name.trim() || !editingItem.form || !editingItem.series) {
            return;
        }

        setApiError('');
        setIsSubmitting(true);

        try {
            const response = await fetch(`${API_URL}/${editingItem.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: editingItem.name.trim(),
                    form: editingItem.form,
                    seriesGame: editingItem.series,
                    threatLevel: Number(editingItem.threatLevel),
                    isPossessed: Boolean(editingItem.isPossessed),
                    behaviorNote: editingItem.behaviorNote?.trim() || '',
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                const msg = Array.isArray(data.message)
                    ? data.message.join(' | ')
                    : data.message || 'Gagal memperbarui data.';
                setApiError(msg);
                return;
            }

            setEditingItem(null);
            await onRefresh();
        } catch (err) {
            setApiError('Gagal menghubungi server Backend saat update data.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // DELETE -> DELETE /animatronics/:id
    const confirmDelete = async () => {
        if (!deletingItem) return;

        setApiError('');
        setIsSubmitting(true);

        try {
            const response = await fetch(`${API_URL}/${deletingItem.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const data = await response.json();
                setApiError(data.message || 'Gagal menghapus data dari server.');
                return;
            }

            if (editingItem?.id === deletingItem.id) setEditingItem(null);
            setDeletingItem(null);
            await onRefresh();
        } catch (err) {
            setApiError('Gagal menghubungi server Backend saat menghapus data.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredAnimatronics = animatronics.filter((item) => {
        const seriesName = item.series || item.seriesGame || '';
        const matchesSearch =
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            seriesName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesForm = filterForm === 'ALL' || item.form === filterForm;
        return matchesSearch && matchesForm;
    });

    return (
        <div className="space-y-6">
            {/* Header Banner */}
            <section className="bg-[#141414] border border-[#2E2E2E] rounded-xl p-6 relative overflow-hidden shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-[#EA580C] uppercase tracking-wider font-semibold mb-1">
                            <FolderArchive className="w-4 h-4" />
                            <span>DATABASE // NESTJS API CONNECTED</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#F5F5F5] font-['Chakra_Petch',sans-serif]">
                            Animatronic Archives
                        </h1>
                        <p className="text-xs sm:text-sm text-[#A3A3A3] mt-1">
                            Kelola catatan entitas animatronik yang terhubung langsung dengan backend NestJS.
                        </p>
                    </div>

                    <div className="px-4 py-2.5 rounded-lg bg-[#1F1F1F] border border-[#2E2E2E] font-mono text-right">
                        <div className="text-[11px] text-[#A3A3A3]">TOTAL ENTITIES LOGGED</div>
                        <div className="text-xl font-bold text-[#EA580C]">
                            {animatronics.length}{' '}
                            <span className="text-xs font-normal text-[#A3A3A3]">RECORDS</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Alert Error dari Backend (ConflictException / ValidationPipe) */}
            {apiError && (
                <div className="p-4 rounded-xl bg-red-950/50 border border-red-500/80 flex items-center justify-between gap-3 text-xs sm:text-sm font-mono text-red-300">
                    <div className="flex items-center gap-2.5">
                        <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                        <span>[BACKEND ERROR] {apiError}</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setApiError('')}
                        className="text-red-400 hover:text-white cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Form Input (Khusus Create) */}
            <section className="bg-[#141414] border border-[#2E2E2E] rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#F5F5F5] font-['Chakra_Petch',sans-serif] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
                        Daftarkan Animatronic Baru
                    </h2>
                </div>

                <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Nama Animatronic */}
                    <div className="md:col-span-2">
                        <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1.5">
                            Nama Animatronic
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Contoh: Chica the Chicken, Bonnie..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2E2E2E] focus:border-[#EA580C] focus:outline-none text-sm text-[#F5F5F5] placeholder-[#525252]"
                        />
                    </div>

                    {/* Form */}
                    <div>
                        <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1.5">
                            Form / Klasifikasi
                        </label>
                        <select
                            required
                            value={formType}
                            onChange={(e) => setFormType(e.target.value)}
                            className={`w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2E2E2E] focus:border-[#EA580C] focus:outline-none text-sm cursor-pointer ${formType === '' ? 'text-[#525252]' : 'text-[#F5F5F5]'
                                }`}
                        >
                            <option value="" disabled>
                                -- Pilih Form --
                            </option>
                            {FORM_OPTIONS.map((opt) => (
                                <option key={opt} value={opt} className="text-[#F5F5F5]">
                                    {opt}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Series Game */}
                    <div>
                        <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1.5">
                            Series Game
                        </label>
                        <select
                            required
                            value={series}
                            onChange={(e) => setSeries(e.target.value)}
                            className={`w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2E2E2E] focus:border-[#EA580C] focus:outline-none text-sm cursor-pointer ${series === '' ? 'text-[#525252]' : 'text-[#F5F5F5]'
                                }`}
                        >
                            <option value="" disabled>
                                -- Pilih Series --
                            </option>
                            {SERIES_OPTIONS.map((srv) => (
                                <option key={srv} value={srv} className="text-[#F5F5F5]">
                                    {srv}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Threat Level */}
                    <div>
                        <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1.5">
                            Threat Level (1 - 10)
                        </label>
                        <input
                            type="number"
                            min={1}
                            max={10}
                            required
                            value={threatLevel}
                            onChange={(e) => setThreatLevel(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2E2E2E] focus:border-[#EA580C] focus:outline-none text-sm text-[#F5F5F5]"
                        />
                    </div>

                    {/* Status Possessed */}
                    <div>
                        <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1.5">
                            Status Entitas
                        </label>
                        <select
                            value={isPossessed ? 'true' : 'false'}
                            onChange={(e) => setIsPossessed(e.target.value === 'true')}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2E2E2E] focus:border-[#EA580C] focus:outline-none text-sm text-[#F5F5F5] cursor-pointer"
                        >
                            <option value="true">Possessed (Aktif/Berbahaya)</option>
                            <option value="false">Normal / Non-Possessed</option>
                        </select>
                    </div>

                    {/* Behavior Note */}
                    <div className="md:col-span-2">
                        <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1.5">
                            Catatan Perilaku (Opsional)
                        </label>
                        <input
                            type="text"
                            placeholder="Contoh: Menyerang dari lorong kiri saat kamera mati..."
                            value={behaviorNote}
                            onChange={(e) => setBehaviorNote(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2E2E2E] focus:border-[#EA580C] focus:outline-none text-sm text-[#F5F5F5] placeholder-[#525252]"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-4 flex justify-end pt-1">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] disabled:opacity-50 text-white font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-[0_0_15px_rgba(234,88,12,0.3)]"
                        >
                            <Plus className="w-4 h-4" />
                            <span>{isSubmitting ? 'Menyimpan...' : 'Tambah ke Archives'}</span>
                        </button>
                    </div>
                </form>
            </section>

            {/* Search & Filter Bar */}
            <section className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-[#A3A3A3] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Cari nama animatronic atau series..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#141414] border border-[#2E2E2E] focus:border-[#EA580C] focus:outline-none text-xs sm:text-sm text-[#F5F5F5]"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                    {['ALL', ...FORM_OPTIONS].map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setFilterForm(tab)}
                            className={`px-3 py-1.5 rounded-md text-xs font-mono uppercase transition-colors cursor-pointer border ${filterForm === tab
                                ? 'bg-[#EA580C]/20 text-[#FB923C] border-[#EA580C]'
                                : 'bg-[#141414] text-[#A3A3A3] border-[#2E2E2E] hover:text-[#F5F5F5]'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </section>

            {/* Character Card Grid */}
            {isLoading ? (
                <div className="bg-[#141414] border border-[#2E2E2E] rounded-xl p-10 text-center font-mono text-xs text-[#EA580C]">
                    MENGHUBUNGKAN KE SERVER BACKEND NESTJS...
                </div>
            ) : filteredAnimatronics.length === 0 ? (
                <div className="bg-[#141414] border border-dashed border-[#2E2E2E] rounded-xl p-10 text-center">
                    <ShieldAlert className="w-10 h-10 text-[#A3A3A3] mx-auto mb-2 opacity-60" />
                    <p className="text-sm font-mono text-[#A3A3A3]">
                        BELUM ADA DATA ANIMATRONIC DI ARCHIVES. SILAKAN TAMBAHKAN TERLEBIH DAHULU.
                    </p>
                </div>
            ) : (
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredAnimatronics.map((item) => (
                        <div
                            key={item.id}
                            className="bg-[#141414] border border-[#2E2E2E] hover:border-[#EA580C]/70 rounded-xl p-5 flex flex-col justify-between transition-all group shadow-lg"
                        >
                            <div>
                                {/* Card Top Meta */}
                                <div className="flex items-center justify-between text-[11px] font-mono text-[#A3A3A3] mb-3 pb-2 border-b border-[#2E2E2E]">
                                    <span className="text-[#EA580C] font-semibold">ID #{item.id}</span>
                                    <span className="px-2 py-0.5 rounded bg-[#1F1F1F] border border-[#2E2E2E] text-[#F5F5F5]">
                                        FORM: {item.form.toUpperCase()}
                                    </span>
                                </div>

                                {/* Entity Name */}
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-[#1F1F1F] border border-[#2E2E2E] flex items-center justify-center text-[#EA580C] shrink-0">
                                        <Cpu className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-[#F5F5F5] uppercase tracking-wide font-['Chakra_Petch',sans-serif] group-hover:text-[#FB923C] transition-colors">
                                            {item.name}
                                        </h3>
                                        <p className="text-xs font-mono text-[#A3A3A3] mt-0.5">
                                            SERIES: <span className="text-[#F5F5F5]">{item.series || item.seriesGame}</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Threat & Possessed Badges */}
                                <div className="flex flex-wrap items-center gap-2 mt-3 pt-2.5 border-t border-[#2E2E2E]/60 text-[11px] font-mono">
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-orange-950/50 border border-orange-500/40 text-[#FB923C]">
                                        <Flame className="w-3 h-3" />
                                        THREAT: {item.threatLevel}/10
                                    </span>
                                    <span
                                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border ${item.isPossessed
                                                ? 'bg-red-950/50 border-red-500/40 text-red-400'
                                                : 'bg-emerald-950/50 border-emerald-500/40 text-emerald-400'
                                            }`}
                                    >
                                        <Ghost className="w-3 h-3" />
                                        {item.isPossessed ? 'POSSESSED' : 'NORMAL'}
                                    </span>
                                </div>

                                {/* Behavior Note */}
                                {item.behaviorNote && (
                                    <p className="mt-2.5 text-xs text-[#A3A3A3] italic line-clamp-2">
                                        "{item.behaviorNote}"
                                    </p>
                                )}
                            </div>

                            {/* Card Actions (Edit & Delete) */}
                            <div className="flex items-center justify-end gap-2 mt-5 pt-3 border-t border-[#2E2E2E]/70">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setEditingItem({
                                            ...item,
                                            series: item.series || item.seriesGame,
                                        })
                                    }
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1F1F1F] hover:bg-[#2A2A2A] border border-[#2E2E2E] hover:border-[#EA580C] text-xs font-mono text-[#F5F5F5] cursor-pointer transition-colors"
                                >
                                    <Pencil className="w-3.5 h-3.5 text-[#FB923C]" />
                                    <span>EDIT</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setDeletingItem(item)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1F1F1F] hover:bg-red-950/50 border border-[#2E2E2E] hover:border-red-500/60 text-xs font-mono text-[#A3A3A3] hover:text-red-400 cursor-pointer transition-colors"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>HAPUS</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {/* POP-UP MODAL EDIT */}
            {editingItem && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
                    onClick={() => setEditingItem(null)}
                >
                    <div
                        className="w-full max-w-md bg-[#141414] border border-[#EA580C] rounded-xl shadow-[0_0_35px_rgba(234,88,12,0.25)] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="px-6 py-4 bg-[#1F1F1F] border-b border-[#2E2E2E] flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-pulse" />
                                <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#F5F5F5] font-['Chakra_Petch',sans-serif]">
                                    Edit Entitas [ID #{editingItem.id}]
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setEditingItem(null)}
                                className="text-[#A3A3A3] hover:text-[#F5F5F5] p-1 rounded cursor-pointer transition-colors"
                                aria-label="Tutup modal edit"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1.5">
                                    Nama Animatronic
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={editingItem.name}
                                    onChange={(e) =>
                                        setEditingItem({ ...editingItem, name: e.target.value })
                                    }
                                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2E2E2E] focus:border-[#EA580C] focus:outline-none text-sm text-[#F5F5F5]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1.5">
                                        Form
                                    </label>
                                    <select
                                        required
                                        value={editingItem.form}
                                        onChange={(e) =>
                                            setEditingItem({ ...editingItem, form: e.target.value })
                                        }
                                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2E2E2E] focus:border-[#EA580C] focus:outline-none text-sm text-[#F5F5F5] cursor-pointer"
                                    >
                                        {FORM_OPTIONS.map((opt) => (
                                            <option key={opt} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1.5">
                                        Threat (1-10)
                                    </label>
                                    <input
                                        type="number"
                                        min={1}
                                        max={10}
                                        required
                                        value={editingItem.threatLevel}
                                        onChange={(e) =>
                                            setEditingItem({
                                                ...editingItem,
                                                threatLevel: Number(e.target.value),
                                            })
                                        }
                                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2E2E2E] focus:border-[#EA580C] focus:outline-none text-sm text-[#F5F5F5]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1.5">
                                    Series Game
                                </label>
                                <select
                                    required
                                    value={editingItem.series}
                                    onChange={(e) =>
                                        setEditingItem({ ...editingItem, series: e.target.value })
                                    }
                                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2E2E2E] focus:border-[#EA580C] focus:outline-none text-sm text-[#F5F5F5] cursor-pointer"
                                >
                                    {SERIES_OPTIONS.map((srv) => (
                                        <option key={srv} value={srv}>
                                            {srv}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1.5">
                                    Status Entitas
                                </label>
                                <select
                                    value={editingItem.isPossessed ? 'true' : 'false'}
                                    onChange={(e) =>
                                        setEditingItem({
                                            ...editingItem,
                                            isPossessed: e.target.value === 'true',
                                        })
                                    }
                                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2E2E2E] focus:border-[#EA580C] focus:outline-none text-sm text-[#F5F5F5] cursor-pointer"
                                >
                                    <option value="true">Possessed (Aktif/Berbahaya)</option>
                                    <option value="false">Normal / Non-Possessed</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1.5">
                                    Catatan Perilaku
                                </label>
                                <input
                                    type="text"
                                    value={editingItem.behaviorNote || ''}
                                    onChange={(e) =>
                                        setEditingItem({
                                            ...editingItem,
                                            behaviorNote: e.target.value,
                                        })
                                    }
                                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2E2E2E] focus:border-[#EA580C] focus:outline-none text-sm text-[#F5F5F5]"
                                />
                            </div>

                            {/* Modal Footer Buttons */}
                            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#2E2E2E]">
                                <button
                                    type="button"
                                    onClick={() => setEditingItem(null)}
                                    className="px-4 py-2 rounded-lg bg-[#1F1F1F] hover:bg-[#2A2A2A] border border-[#2E2E2E] text-xs font-mono text-[#A3A3A3] hover:text-[#F5F5F5] cursor-pointer transition-colors"
                                >
                                    BATAL
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white font-semibold text-xs uppercase tracking-wider cursor-pointer transition-colors shadow-[0_0_12px_rgba(234,88,12,0.35)]"
                                >
                                    <Save className="w-3.5 h-3.5" />
                                    <span>Simpan Perubahan</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* POP-UP MODAL KONFIRMASI HAPUS */}
            {deletingItem && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
                    onClick={() => setDeletingItem(null)}
                >
                    <div
                        className="w-full max-w-md bg-[#141414] border border-red-500/80 rounded-xl shadow-[0_0_35px_rgba(239,68,68,0.25)] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="px-6 py-4 bg-[#1F1F1F] border-b border-[#2E2E2E] flex items-center justify-between">
                            <div className="flex items-center gap-2 text-red-400">
                                <AlertTriangle className="w-4 h-4 animate-pulse" />
                                <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider font-['Chakra_Petch',sans-serif]">
                                    Konfirmasi Penghapusan
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setDeletingItem(null)}
                                className="text-[#A3A3A3] hover:text-[#F5F5F5] p-1 rounded cursor-pointer transition-colors"
                                aria-label="Tutup modal konfirmasi"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-4">
                            <p className="text-sm text-[#A3A3A3] leading-relaxed">
                                Apakah Anda yakin ingin menghapus catatan entitas berikut dari database{' '}
                                <span className="text-[#F5F5F5] font-semibold">Fazbear Archives</span>?
                            </p>

                            <div className="p-3.5 rounded-lg bg-[#0A0A0A] border border-[#2E2E2E] font-mono text-xs space-y-1">
                                <div className="text-red-400 font-semibold">ID #{deletingItem.id}</div>
                                <div className="text-sm font-bold text-[#F5F5F5] uppercase font-['Chakra_Petch',sans-serif]">
                                    {deletingItem.name}
                                </div>
                                <div className="text-[#A3A3A3]">
                                    FORM: <span className="text-[#F5F5F5]">{deletingItem.form}</span> • SERIES:{' '}
                                    <span className="text-[#F5F5F5]">{deletingItem.series || deletingItem.seriesGame}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#2E2E2E]">
                                <button
                                    type="button"
                                    onClick={() => setDeletingItem(null)}
                                    className="px-4 py-2 rounded-lg bg-[#1F1F1F] hover:bg-[#2A2A2A] border border-[#2E2E2E] text-xs font-mono text-[#A3A3A3] hover:text-[#F5F5F5] cursor-pointer transition-colors"
                                >
                                    BATAL
                                </button>
                                <button
                                    type="button"
                                    onClick={confirmDelete}
                                    disabled={isSubmitting}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-xs uppercase tracking-wider cursor-pointer transition-colors shadow-[0_0_12px_rgba(220,38,38,0.4)]"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Ya, Hapus Data</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}