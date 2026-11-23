import React, { useState } from 'react';
import {
    Wrench,
    Plus,
    Pencil,
    Trash2,
    Search,
    Shield,
    X,
    Save,
    ShieldAlert,
    AlertTriangle,
    Gauge,
} from 'lucide-react';

export default function ToolsSection({ tools, setTools }) {
    // State form tambah alat baru
    const [toolName, setToolName] = useState('');
    const [capacity, setCapacity] = useState('');

    // State modal pop-up edit & hapus
    const [editingTool, setEditingTool] = useState(null);
    const [deletingTool, setDeletingTool] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');

    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (!toolName.trim() || !capacity.trim()) return;

        const newTool = {
            id: `TLS-${Date.now().toString().slice(-5)}`,
            name: toolName.trim(),
            capacity: capacity.trim(),
        };

        setTools((prev) => [newTool, ...prev]);
        setToolName('');
        setCapacity('');
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!editingTool || !editingTool.name.trim() || !editingTool.capacity.trim()) {
            return;
        }

        setTools((prev) =>
            prev.map((item) =>
                item.id === editingTool.id
                    ? {
                        ...item,
                        name: editingTool.name.trim(),
                        capacity: editingTool.capacity.trim(),
                    }
                    : item
            )
        );
        setEditingTool(null);
    };

    const confirmDelete = () => {
        if (!deletingTool) return;
        setTools((prev) => prev.filter((item) => item.id !== deletingTool.id));
        if (editingTool?.id === deletingTool.id) setEditingTool(null);
        setDeletingTool(null);
    };

    const filteredTools = tools.filter(
        (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.capacity.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header Banner */}
            <section className="bg-[#141414] border border-[#2E2E2E] rounded-xl p-6 relative overflow-hidden shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-[#EA580C] uppercase tracking-wider font-semibold mb-1">
                            <Wrench className="w-4 h-4" />
                            <span>ARMORY // COUNTERMEASURE EQUIPMENT</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#F5F5F5] font-['Chakra_Petch',sans-serif]">
                            Security Counter Tools
                        </h1>
                        <p className="text-xs sm:text-sm text-[#A3A3A3] mt-1">
                            Daftarkan dan pantau kapasitas perlengkapan pertahanan untuk menahan pergerakan animatronik saat shift malam.
                        </p>
                    </div>

                    <div className="px-4 py-2.5 rounded-lg bg-[#1F1F1F] border border-[#2E2E2E] font-mono text-right shrink-0">
                        <div className="text-[11px] text-[#A3A3A3]">EQUIPMENT REGISTERED</div>
                        <div className="text-xl font-bold text-[#EA580C]">
                            {tools.length}{' '}
                            <span className="text-xs font-normal text-[#A3A3A3]">TOOLS</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Form Tambah Alat (Create) */}
            <section className="bg-[#141414] border border-[#2E2E2E] rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#F5F5F5] font-['Chakra_Petch',sans-serif] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
                        Tambahkan Alat Pertahanan Baru
                    </h2>
                </div>

                <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Nama Alat */}
                    <div className="md:col-span-2">
                        <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1.5">
                            Nama Alat
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Contoh: Tactical Flashlight, Freddy Mask, Controlled Shock..."
                            value={toolName}
                            onChange={(e) => setToolName(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2E2E2E] focus:border-[#EA580C] focus:outline-none text-sm text-[#F5F5F5] placeholder-[#525252]"
                        />
                    </div>

                    {/* Kapasitas */}
                    <div>
                        <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1.5">
                            Kapasitas / Daya Tahan
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Contoh: 100% Battery, 3 Charges, Unlimited..."
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2E2E2E] focus:border-[#EA580C] focus:outline-none text-sm text-[#F5F5F5] placeholder-[#525252]"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-3 flex justify-end pt-1">
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-[0_0_15px_rgba(234,88,12,0.3)]"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Simpan Alat</span>
                        </button>
                    </div>
                </form>
            </section>

            {/* Search Bar */}
            <section className="flex items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-[#A3A3A3] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Cari nama alat atau kapasitas..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#141414] border border-[#2E2E2E] focus:border-[#EA580C] focus:outline-none text-xs sm:text-sm text-[#F5F5F5]"
                    />
                </div>
            </section>

            {/* Tools Card Grid */}
            {filteredTools.length === 0 ? (
                <div className="bg-[#141414] border border-dashed border-[#2E2E2E] rounded-xl p-10 text-center">
                    <ShieldAlert className="w-10 h-10 text-[#A3A3A3] mx-auto mb-2 opacity-60" />
                    <p className="text-sm font-mono text-[#A3A3A3]">
                        BELUM ADA ALAT COUNTER YANG TERDAFTAR. SILAKAN TAMBAHKAN TERLEBIH DAHULU.
                    </p>
                </div>
            ) : (
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTools.map((tool) => (
                        <div
                            key={tool.id}
                            className="bg-[#141414] border border-[#2E2E2E] hover:border-[#EA580C]/70 rounded-xl p-5 flex flex-col justify-between transition-all group shadow-lg"
                        >
                            <div>
                                {/* Card Top Meta */}
                                <div className="flex items-center justify-between text-[11px] font-mono text-[#A3A3A3] mb-3 pb-2 border-b border-[#2E2E2E]">
                                    <span className="text-[#EA580C] font-semibold">{tool.id}</span>
                                    <span className="px-2 py-0.5 rounded bg-[#1F1F1F] border border-[#2E2E2E] text-[#FB923C]">
                                        COUNTER GEAR
                                    </span>
                                </div>

                                {/* Tool Name & Capacity */}
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-[#1F1F1F] border border-[#2E2E2E] flex items-center justify-center text-[#EA580C] shrink-0">
                                        <Shield className="w-5 h-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-lg font-bold text-[#F5F5F5] uppercase tracking-wide font-['Chakra_Petch',sans-serif] group-hover:text-[#FB923C] transition-colors truncate">
                                            {tool.name}
                                        </h3>
                                        <div className="flex items-center gap-1.5 text-xs font-mono text-[#A3A3A3] mt-1">
                                            <Gauge className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
                                            <span>
                                                KAPASITAS: <span className="text-[#F5F5F5]">{tool.capacity}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Actions (Edit & Delete) */}
                            <div className="flex items-center justify-end gap-2 mt-5 pt-3 border-t border-[#2E2E2E]/70">
                                <button
                                    type="button"
                                    onClick={() => setEditingTool({ ...tool })}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1F1F1F] hover:bg-[#2A2A2A] border border-[#2E2E2E] hover:border-[#EA580C] text-xs font-mono text-[#F5F5F5] cursor-pointer transition-colors"
                                >
                                    <Pencil className="w-3.5 h-3.5 text-[#FB923C]" />
                                    <span>EDIT</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setDeletingTool(tool)}
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
            {editingTool && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
                    onClick={() => setEditingTool(null)}
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
                                    Edit Alat [{editingTool.id}]
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setEditingTool(null)}
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
                                    Nama Alat
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={editingTool.name}
                                    onChange={(e) =>
                                        setEditingTool({ ...editingTool, name: e.target.value })
                                    }
                                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2E2E2E] focus:border-[#EA580C] focus:outline-none text-sm text-[#F5F5F5]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1.5">
                                    Kapasitas / Daya Tahan
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={editingTool.capacity}
                                    onChange={(e) =>
                                        setEditingTool({ ...editingTool, capacity: e.target.value })
                                    }
                                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2E2E2E] focus:border-[#EA580C] focus:outline-none text-sm text-[#F5F5F5]"
                                />
                            </div>

                            {/* Modal Footer Buttons */}
                            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#2E2E2E]">
                                <button
                                    type="button"
                                    onClick={() => setEditingTool(null)}
                                    className="px-4 py-2 rounded-lg bg-[#1F1F1F] hover:bg-[#2A2A2A] border border-[#2E2E2E] text-xs font-mono text-[#A3A3A3] hover:text-[#F5F5F5] cursor-pointer transition-colors"
                                >
                                    BATAL
                                </button>
                                <button
                                    type="submit"
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
            {deletingTool && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
                    onClick={() => setDeletingTool(null)}
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
                                onClick={() => setDeletingTool(null)}
                                className="text-[#A3A3A3] hover:text-[#F5F5F5] p-1 rounded cursor-pointer transition-colors"
                                aria-label="Tutup modal konfirmasi"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-4">
                            <p className="text-sm text-[#A3A3A3] leading-relaxed">
                                Apakah Anda yakin ingin menghapus perlengkapan pertahanan berikut dari inventaris?
                            </p>

                            <div className="p-3.5 rounded-lg bg-[#0A0A0A] border border-[#2E2E2E] font-mono text-xs space-y-1">
                                <div className="text-red-400 font-semibold">{deletingTool.id}</div>
                                <div className="text-sm font-bold text-[#F5F5F5] uppercase font-['Chakra_Petch',sans-serif]">
                                    {deletingTool.name}
                                </div>
                                <div className="text-[#A3A3A3]">
                                    KAPASITAS: <span className="text-[#F5F5F5]">{deletingTool.capacity}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#2E2E2E]">
                                <button
                                    type="button"
                                    onClick={() => setDeletingTool(null)}
                                    className="px-4 py-2 rounded-lg bg-[#1F1F1F] hover:bg-[#2A2A2A] border border-[#2E2E2E] text-xs font-mono text-[#A3A3A3] hover:text-[#F5F5F5] cursor-pointer transition-colors"
                                >
                                    BATAL
                                </button>
                                <button
                                    type="button"
                                    onClick={confirmDelete}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-xs uppercase tracking-wider cursor-pointer transition-colors shadow-[0_0_12px_rgba(220,38,38,0.4)]"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Ya, Hapus Alat</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}