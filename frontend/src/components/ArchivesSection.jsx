import React, { useState, useEffect, useRef } from 'react';
import {
    FolderArchive,
    Plus,
    Pencil,
    Trash2,
    Search,
    Cpu,
    X,
    Save,
    ShieldAlert,
    AlertTriangle,
    Flame,
    Ghost,
    ImagePlus,
    RotateCcw,
    ArchiveRestore,
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

const compressImageFile = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const maxDim = 480;
                let { width, height } = img;
                if (width > maxDim || height > maxDim) {
                    if (width > height) {
                        height = Math.round((height * maxDim) / width);
                        width = maxDim;
                    } else {
                        width = Math.round((width * maxDim) / height);
                        height = maxDim;
                    }
                }
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', 0.82));
            };
            img.onerror = reject;
            img.src = event.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

export default function ArchivesSection({ animatronics, onRefresh, isLoading }) {
    const fileInputRef = useRef(null);

    // Tab aktif: 'ACTIVE' atau 'TRASH'
    const [activeView, setActiveView] = useState('ACTIVE');
    const [trashItems, setTrashItems] = useState([]);

    // State form tambah data baru
    const [name, setName] = useState('');
    const [formType, setFormType] = useState('');
    const [series, setSeries] = useState('');
    const [threatLevel, setThreatLevel] = useState(5);
    const [isPossessed, setIsPossessed] = useState(true);
    const [behaviorNote, setBehaviorNote] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    // State feedback error & loading
    const [apiError, setApiError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Modal edit & hapus
    const [editingItem, setEditingItem] = useState(null);
    const [deletingItem, setDeletingItem] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [filterForm, setFilterForm] = useState('ALL');

    // Ambil isi Trash dari backend
    const fetchTrashItems = async () => {
        try {
            const res = await fetch(`${API_URL}/trash/all`);
            if (res.ok) {
                const data = await res.json();
                setTrashItems(data);
            }
        } catch {
            // Abaikan error jaringan sementara
        }
    };

    useEffect(() => {
        fetchTrashItems();
    }, [animatronics]);

    const handleImageUpload = async (e, isEdit = false) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            setApiError('File yang diunggah harus berupa gambar (JPG, PNG, WEBP).');
            return;
        }
        try {
            const compressed = await compressImageFile(file);
            if (isEdit && editingItem) {
                setEditingItem({ ...editingItem, imageUrl: compressed });
            } else {
                setImageUrl(compressed);
            }
        } catch {
            setApiError('Gagal memproses file foto animatronic.');
        }
    };

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
                    imageUrl: imageUrl || undefined,
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

            setName('');
            setFormType('');
            setSeries('');
            setThreatLevel(5);
            setIsPossessed(true);
            setBehaviorNote('');
            setImageUrl('');
            if (fileInputRef.current) fileInputRef.current.value = '';
            await onRefresh();
            await fetchTrashItems();
        } catch {
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
                    imageUrl: editingItem.imageUrl || '',
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
        } catch {
            setApiError('Gagal menghubungi server Backend saat update data.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // MOVE TO TRASH -> DELETE /animatronics/:id
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
                setApiError(data.message || 'Gagal memindahkan data ke Trash.');
                return;
            }

            if (editingItem?.id === deletingItem.id) setEditingItem(null);
            setDeletingItem(null);
            await onRefresh();
            await fetchTrashItems();
        } catch {
            setApiError('Gagal menghubungi server Backend saat memindahkan data.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // RESTORE FROM TRASH -> POST /animatronics/trash/:id/restore
    const handleRestoreItem = async (id) => {
        setApiError('');
        try {
            const response = await fetch(`${API_URL}/trash/${id}/restore`, {
                method: 'POST',
            });
            const data = await response.json();
            if (!response.ok) {
                setApiError(data.message || 'Gagal mengembalikan data dari Trash.');
                return;
            }
            await onRefresh();
            await fetchTrashItems();
        } catch {
            setApiError('Gagal terhubung ke server saat mengembalikan data.');
        }
    };

    // PERMANENT DELETE ONE -> DELETE /animatronics/trash/:id
    const handlePermanentDelete = async (id) => {
        setApiError('');
        try {
            const response = await fetch(`${API_URL}/trash/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                await fetchTrashItems();
            }
        } catch {
            setApiError('Gagal menghapus permanen data dari Trash.');
        }
    };

    // EMPTY ALL TRASH -> DELETE /animatronics/trash/empty
    const handleEmptyTrash = async () => {
        setApiError('');
        try {
            const response = await fetch(`${API_URL}/trash/empty`, {
                method: 'DELETE',
            });
            if (response.ok) {
                await fetchTrashItems();
            }
        } catch {
            setApiError('Gagal mengosongkan Trash.');
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
                            Kelola catatan entitas animatronik, unggah foto dokumentasi, dan pulihkan data terhapus melalui Trash Bin.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="px-4 py-2.5 rounded-lg bg-[#1F1F1F] border border-[#2E2E2E] font-mono text-right">
                            <div className="text-[11px] text-[#A3A3A3]">ACTIVE ARCHIVES</div>
                            <div className="text-xl font-bold text-[#EA580C]">
                                {animatronics.length} <span className="text-xs font-normal text-[#A3A3A3]">RECORDS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Alert Error */}
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

            {/* Mode Switcher: Active Archives vs Trash Bin */}
            <div className="flex items-center justify-between gap-3 border-b border-[#2E2E2E] pb-3">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setActiveView('ACTIVE')}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase font-semibold cursor-pointer transition-colors border ${activeView === 'ACTIVE'
                            ? 'bg-[#EA580C] text-white border-[#EA580C]'
                            : 'bg-[#141414] text-[#A3A3A3] border-[#2E2E2E] hover:text-[#F5F5F5]'
                            }`}
                    >
                        <FolderArchive className="w-3.5 h-3.5" />
                        <span>Active Archives ({animatronics.length})</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveView('TRASH')}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase font-semibold cursor-pointer transition-colors border ${activeView === 'TRASH'
                            ? 'bg-red-600 text-white border-red-600'
                            : 'bg-[#141414] text-[#A3A3A3] border-[#2E2E2E] hover:text-[#F5F5F5]'
                            }`}
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Trash Bin ({trashItems.length})</span>
                    </button>
                </div>

                {activeView === 'TRASH' && trashItems.length > 0 && (
                    <button
                        type="button"
                        onClick={handleEmptyTrash}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-950/60 hover:bg-red-900/80 border border-red-500/60 text-xs font-mono text-red-300 cursor-pointer transition-colors"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Kosongkan Trash Permanen</span>
                    </button>
                )}
            </div>

            {activeView === 'ACTIVE' ? (
                <>
                    {/* Form Input (Khusus Create) */}
                    <section className="bg-[#141414] border border-[#2E2E2E] rounded-xl p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#F5F5F5] font-['Chakra_Petch',sans-serif] flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
                                Daftarkan Animatronic Baru
                            </h2>
                        </div>

                        <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1.5">
                                    Nama Animatronic
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: Freddy Fazbear, Bonnie..."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2E2E2E] focus:border-[#EA580C] focus:outline-none text-sm text-[#F5F5F5] placeholder-[#525252]"
                                />
                            </div>

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

                            {/* Upload Foto Animatronic */}
                            <div className="md:col-span-4">
                                <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1.5">
                                    Foto Entitas Animatronic (Opsional)
                                </label>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                    <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0A0A0A] hover:bg-[#1F1F1F] border border-dashed border-[#2E2E2E] hover:border-[#EA580C] text-xs font-mono text-[#F5F5F5] cursor-pointer transition-colors">
                                        <ImagePlus className="w-4 h-4 text-[#EA580C]" />
                                        <span>{imageUrl ? 'Ganti Foto Entitas' : 'Pilih File Foto (JPG/PNG)'}</span>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e, false)}
                                            className="hidden"
                                        />
                                    </label>

                                    {imageUrl && (
                                        <div className="flex items-center gap-2.5 bg-[#0A0A0A] px-3 py-1.5 rounded-lg border border-[#2E2E2E]">
                                            <img
                                                src={imageUrl}
                                                alt="Preview"
                                                className="w-10 h-10 rounded object-cover border border-[#EA580C]/50"
                                            />
                                            <span className="text-xs font-mono text-emerald-400">Foto siap diunggah</span>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setImageUrl('');
                                                    if (fileInputRef.current) fileInputRef.current.value = '';
                                                }}
                                                className="text-[#A3A3A3] hover:text-red-400 cursor-pointer"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

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
                                        <div className="flex items-center justify-between text-[11px] font-mono text-[#A3A3A3] mb-3 pb-2 border-b border-[#2E2E2E]">
                                            <span className="text-[#EA580C] font-semibold">ID #{item.id}</span>
                                            <span className="px-2 py-0.5 rounded bg-[#1F1F1F] border border-[#2E2E2E] text-[#F5F5F5]">
                                                FORM: {item.form.toUpperCase()}
                                            </span>
                                        </div>

                                        {item.imageUrl && (
                                            <div className="mb-3 rounded-lg overflow-hidden border border-[#2E2E2E] bg-[#0A0A0A] aspect-video">
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        )}

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

                                        {item.behaviorNote && (
                                            <p className="mt-2.5 text-xs text-[#A3A3A3] italic line-clamp-2">
                                                "{item.behaviorNote}"
                                            </p>
                                        )}
                                    </div>

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
                </>
            ) : (
                /* TRASH BIN SECTION */
                <section className="space-y-4">
                    {trashItems.length === 0 ? (
                        <div className="bg-[#141414] border border-dashed border-[#2E2E2E] rounded-xl p-10 text-center">
                            <ArchiveRestore className="w-10 h-10 text-[#A3A3A3] mx-auto mb-2 opacity-60" />
                            <p className="text-sm font-mono text-[#A3A3A3]">
                                TRASH BIN KOSONG. JIKA ARCHIVES JUGA KOSONG, PENAMBAHAN DATA BARU AKAN RESET KE ID #1.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {trashItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-[#141414]/80 border border-red-900/50 rounded-xl p-5 flex flex-col justify-between shadow-lg"
                                >
                                    <div>
                                        <div className="flex items-center justify-between text-[11px] font-mono text-[#A3A3A3] mb-3 pb-2 border-b border-[#2E2E2E]">
                                            <span className="text-red-400 font-semibold">DELETED ID #{item.id}</span>
                                            <span className="px-2 py-0.5 rounded bg-red-950/50 border border-red-500/30 text-red-300">
                                                {item.form.toUpperCase()}
                                            </span>
                                        </div>

                                        {item.imageUrl && (
                                            <div className="mb-3 rounded-lg overflow-hidden border border-[#2E2E2E] bg-[#0A0A0A] aspect-video opacity-75">
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover grayscale"
                                                />
                                            </div>
                                        )}

                                        <h3 className="text-lg font-bold text-[#F5F5F5] uppercase tracking-wide font-['Chakra_Petch',sans-serif]">
                                            {item.name}
                                        </h3>
                                        <p className="text-xs font-mono text-[#A3A3A3] mt-0.5">
                                            SERIES: <span className="text-[#F5F5F5]">{item.seriesGame}</span>
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-end gap-2 mt-5 pt-3 border-t border-[#2E2E2E]/70">
                                        <button
                                            type="button"
                                            onClick={() => handleRestoreItem(item.id)}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/60 text-xs font-mono text-emerald-300 cursor-pointer transition-colors"
                                        >
                                            <RotateCcw className="w-3.5 h-3.5" />
                                            <span>RESTORE</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handlePermanentDelete(item.id)}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1F1F1F] hover:bg-red-950/60 border border-[#2E2E2E] hover:border-red-500/60 text-xs font-mono text-red-400 cursor-pointer transition-colors"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                            <span>PERMANEN</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            )}

            {/* POP-UP MODAL EDIT */}
            {editingItem && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto"
                    onClick={() => setEditingItem(null)}
                >
                    <div
                        className="w-full max-w-md bg-[#141414] border border-[#EA580C] rounded-xl shadow-[0_0_35px_rgba(234,88,12,0.25)] overflow-hidden my-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
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
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

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

                            <div>
                                <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1.5">
                                    Foto Entitas
                                </label>
                                <div className="flex items-center gap-3">
                                    <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0A0A0A] hover:bg-[#1F1F1F] border border-[#2E2E2E] hover:border-[#EA580C] text-xs font-mono text-[#F5F5F5] cursor-pointer">
                                        <ImagePlus className="w-4 h-4 text-[#EA580C]" />
                                        <span>{editingItem.imageUrl ? 'Ubah Foto' : 'Upload Foto'}</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e, true)}
                                            className="hidden"
                                        />
                                    </label>
                                    {editingItem.imageUrl && (
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={editingItem.imageUrl}
                                                alt="Preview Edit"
                                                className="w-10 h-10 rounded object-cover border border-[#EA580C]"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setEditingItem({ ...editingItem, imageUrl: '' })
                                                }
                                                className="text-xs font-mono text-red-400 hover:underline cursor-pointer"
                                            >
                                                Hapus Foto
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

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

            {/* POP-UP MODAL KONFIRMASI PINDAH KE TRASH */}
            {deletingItem && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
                    onClick={() => setDeletingItem(null)}
                >
                    <div
                        className="w-full max-w-md bg-[#141414] border border-red-500/80 rounded-xl shadow-[0_0_35px_rgba(239,68,68,0.25)] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="px-6 py-4 bg-[#1F1F1F] border-b border-[#2E2E2E] flex items-center justify-between">
                            <div className="flex items-center gap-2 text-red-400">
                                <AlertTriangle className="w-4 h-4 animate-pulse" />
                                <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider font-['Chakra_Petch',sans-serif]">
                                    Pindahkan ke Trash Bin
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setDeletingItem(null)}
                                className="text-[#A3A3A3] hover:text-[#F5F5F5] p-1 rounded cursor-pointer transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <p className="text-sm text-[#A3A3A3] leading-relaxed">
                                Entitas berikut akan dipindahkan ke <span className="text-[#F5F5F5] font-semibold">Trash Bin</span> dan masih dapat dipulihkan kembali sewaktu-waktu:
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
                                    <span>Pindahkan ke Trash</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}