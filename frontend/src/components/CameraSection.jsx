import React, { useState, useEffect, useRef } from 'react';
import {
    Camera,
    Video,
    VideoOff,
    RefreshCw,
    Smartphone,
    Usb,
    AlertTriangle,
    Eye,
    Download,
    Radio,
    Trash2,
    HardDrive,
    Maximize2,
    X,
} from 'lucide-react';

const CCTV_CHANNELS = [
    { id: 'CAM 01', label: 'CAM 01 // SHOW STAGE' },
    { id: 'CAM 02', label: 'CAM 02 // WEST HALLWAY' },
    { id: 'CAM 03', label: 'CAM 03 // EAST HALLWAY' },
    { id: 'CAM 04', label: 'CAM 04 // PIRATE COVE' },
    { id: 'CAM 05', label: 'CAM 05 // PARTS & SERVICE' },
    { id: 'CAM 06', label: 'CAM 06 // OFFICE PERIMETER' },
];

const STORAGE_KEY = 'fazbear_camera_snapshots';

export default function CameraSection() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [devices, setDevices] = useState([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [activeChannel, setActiveChannel] = useState(CCTV_CHANNELS[0]);
    const [isSwitchingCam, setIsSwitchingCam] = useState(false);
    const [nightVision, setNightVision] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());

    // Storage Galeri Snapshot (Persisten di localStorage)
    const [snapshots, setSnapshots] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });
    const [previewSnapshot, setPreviewSnapshot] = useState(null);

    const handleSwitchChannel = (channel) => {
        if (channel.id === activeChannel.id) return;
        setIsSwitchingCam(true);
        setActiveChannel(channel);
        setTimeout(() => setIsSwitchingCam(false), 380);
    };

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshots));
        } catch (err) {
            setErrorMsg('Penyimpanan foto penuh! Hapus beberapa foto lama di CCTV Storage.');
        }
    }, [snapshots]);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const scanVideoDevices = async () => {
        setErrorMsg('');
        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                setErrorMsg('Browser tidak mendukung akses MediaDevices API.');
                return;
            }

            const allDevices = await navigator.mediaDevices.enumerateDevices();
            const videoInputs = allDevices.filter((d) => d.kind === 'videoinput');
            setDevices(videoInputs);

            if (videoInputs.length > 0 && !selectedDeviceId) {
                const usbCam = videoInputs.find((d) =>
                    /droidcam|iriun|usb|camo|phone|android|iphone|external/i.test(d.label)
                );
                setSelectedDeviceId(usbCam ? usbCam.deviceId : videoInputs[0].deviceId);
            }
        } catch (err) {
            setErrorMsg('Gagal memindai perangkat kamera USB.');
        }
    };

    useEffect(() => {
        scanVideoDevices();
        navigator.mediaDevices?.addEventListener('devicechange', scanVideoDevices);
        return () => {
            navigator.mediaDevices?.removeEventListener('devicechange', scanVideoDevices);
            stopCameraStream();
        };
    }, []);

    const stopCameraStream = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }
        setIsStreaming(false);
    };

    const startCameraStream = async (overrideDeviceId) => {
        setErrorMsg('');
        stopCameraStream();

        const targetId = overrideDeviceId || selectedDeviceId;

        try {
            const constraints = {
                video: targetId
                    ? { deviceId: { exact: targetId }, width: { ideal: 1280 }, height: { ideal: 720 } }
                    : { width: { ideal: 1280 }, height: { ideal: 720 } },
                audio: false,
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
            }

            setIsStreaming(true);
            await scanVideoDevices();
        } catch (err) {
            setIsStreaming(false);
            if (err.name === 'NotAllowedError') {
                setErrorMsg('Izin akses kamera ditolak. Izinkan akses kamera pada browser.');
            } else if (err.name === 'NotFoundError' || err.name === 'OverconstrainedError') {
                setErrorMsg('Perangkat kamera HP / USB tidak ditemukan. Pastikan kabel data tersambung dan mode USB Webcam/Bridge aktif.');
            } else {
                setErrorMsg(`Gagal menghubungkan feed kamera: ${err.message}`);
            }
        }
    };

    const handleDeviceChange = (newId) => {
        setSelectedDeviceId(newId);
        if (isStreaming) {
            startCameraStream(newId);
        }
    };

    // Capture Foto & Simpan ke Storage
    const handleTakeSnapshot = () => {
        if (!videoRef.current || !canvasRef.current || !isStreaming) return;
        const video = videoRef.current;
        const canvas = canvasRef.current;

        const targetWidth = 960;
        const ratio = (video.videoHeight || 720) / (video.videoWidth || 1280);
        canvas.width = targetWidth;
        canvas.height = Math.round(targetWidth * ratio);

        const ctx = canvas.getContext('2d');
        if (nightVision) {
            ctx.filter = 'sepia(100%) hue-rotate(70deg) saturate(300%) contrast(125%) brightness(95%)';
        } else {
            ctx.filter = 'contrast(110%)';
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        const now = new Date();

        const newPhoto = {
            id: `CAP-${Date.now()}`,
            channelId: activeChannel.id,
            channelLabel: activeChannel.label,
            mode: nightVision ? 'NIGHT VISION' : 'STANDARD',
            capturedAt: now.toLocaleTimeString('id-ID', { hour12: false }),
            capturedDate: now.toLocaleDateString('id-ID'),
            imageUrl: imageDataUrl,
        };

        setSnapshots((prev) => [newPhoto, ...prev]);
    };

    const handleDeleteSnapshot = (id) => {
        setSnapshots((prev) => prev.filter((item) => item.id !== id));
        if (previewSnapshot?.id === id) setPreviewSnapshot(null);
    };

    const handleClearAllSnapshots = () => {
        setSnapshots([]);
        setPreviewSnapshot(null);
    };

    return (
        <div className="space-y-6">
            {/* Header Banner */}
            <section className="bg-[#141414] border border-[#2E2E2E] rounded-xl p-6 relative overflow-hidden shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-[#EA580C] uppercase tracking-wider font-semibold mb-1">
                            <Camera className="w-4 h-4" />
                            <span>SURVEILLANCE FEED // USB DATA LINK BRIDGE</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#F5F5F5] font-['Chakra_Petch',sans-serif]">
                            Fazbear CCTV Camera Feed
                        </h1>
                        <p className="text-xs sm:text-sm text-[#A3A3A3] mt-1">
                            Hubungkan kamera HP melalui kabel data USB (USB Webcam / DroidCam / Iriun) untuk menampilkan pantauan langsung ke terminal keamanan.
                        </p>
                    </div>

                    <div className="px-4 py-2.5 rounded-lg bg-[#1F1F1F] border border-[#2E2E2E] font-mono text-right shrink-0">
                        <div className="text-[11px] text-[#A3A3A3]">SIGNAL STATUS</div>
                        <div
                            className={`text-sm font-bold flex items-center justify-end gap-1.5 ${isStreaming ? 'text-emerald-400' : 'text-[#EA580C]'
                                }`}
                        >
                            <Radio className={`w-3.5 h-3.5 ${isStreaming ? 'animate-pulse' : ''}`} />
                            <span>{isStreaming ? 'LIVE USB FEED' : 'STANDBY / OFFLINE'}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Control Bar */}
            <section className="bg-[#141414] border border-[#2E2E2E] rounded-xl p-5 shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
                    <div className="lg:col-span-6">
                        <label className="flex items-center gap-1.5 text-xs font-mono text-[#A3A3A3] uppercase mb-1.5">
                            <Smartphone className="w-3.5 h-3.5 text-[#EA580C]" />
                            <span>Pilih Perangkat Kamera (Kabel Data HP / Webcam)</span>
                        </label>
                        <div className="flex gap-2">
                            <select
                                value={selectedDeviceId}
                                onChange={(e) => handleDeviceChange(e.target.value)}
                                className="flex-1 px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2E2E2E] focus:border-[#EA580C] focus:outline-none text-xs sm:text-sm font-mono text-[#F5F5F5]"
                            >
                                {devices.length === 0 ? (
                                    <option value="">-- Belum ada kamera terdeteksi --</option>
                                ) : (
                                    devices.map((device, index) => (
                                        <option key={device.deviceId || index} value={device.deviceId}>
                                            {device.label || `USB / Video Device #${index + 1}`}
                                        </option>
                                    ))
                                )}
                            </select>

                            <button
                                type="button"
                                onClick={scanVideoDevices}
                                title="Pindai ulang kabel USB"
                                className="px-3 py-2.5 rounded-lg bg-[#1F1F1F] hover:bg-[#2A2A2A] border border-[#2E2E2E] hover:border-[#EA580C] text-[#F5F5F5] cursor-pointer transition-colors"
                            >
                                <RefreshCw className="w-4 h-4 text-[#FB923C]" />
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-6 flex flex-wrap items-center justify-start lg:justify-end gap-2.5">
                        {!isStreaming ? (
                            <button
                                type="button"
                                onClick={() => startCameraStream()}
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white font-semibold text-xs font-mono uppercase tracking-wider cursor-pointer transition-colors shadow-[0_0_15px_rgba(234,88,12,0.35)]"
                            >
                                <Video className="w-4 h-4" />
                                <span>Hubungkan Kamera</span>
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={stopCameraStream}
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-xs font-mono uppercase tracking-wider cursor-pointer transition-colors"
                            >
                                <VideoOff className="w-4 h-4" />
                                <span>Putuskan Koneksi</span>
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={() => setNightVision((prev) => !prev)}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border text-xs font-mono uppercase cursor-pointer transition-colors ${nightVision
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400'
                                : 'bg-[#1F1F1F] border-[#2E2E2E] text-[#A3A3A3] hover:text-[#F5F5F5]'
                                }`}
                        >
                            <Eye className="w-4 h-4" />
                            <span>Night Vision</span>
                        </button>

                        <button
                            type="button"
                            disabled={!isStreaming}
                            onClick={handleTakeSnapshot}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#1F1F1F] hover:bg-[#2A2A2A] disabled:opacity-40 disabled:cursor-not-allowed border border-[#EA580C]/70 text-xs font-mono text-[#FB923C] uppercase cursor-pointer transition-colors"
                        >
                            <Camera className="w-4 h-4 text-[#EA580C]" />
                            <span>Capture & Save</span>
                        </button>
                    </div>
                </div>

                {errorMsg && (
                    <div className="mt-4 p-3.5 rounded-lg bg-red-950/40 border border-red-500/60 flex items-start gap-2.5 text-xs font-mono text-red-300">
                        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <span>{errorMsg}</span>
                    </div>
                )}
            </section>

            {/* Main CCTV Monitor + Channel Selector */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <section className="lg:col-span-3 bg-[#141414] border border-[#2E2E2E] rounded-xl p-4 shadow-2xl">
                    <div className="relative w-full aspect-video bg-[#050505] border border-[#2E2E2E] rounded-lg overflow-hidden">
                        <video
                            ref={videoRef}
                            playsInline
                            muted
                            className={`w-full h-full object-cover transition-all duration-300 ${isStreaming ? 'opacity-100' : 'opacity-0'
                                } ${nightVision
                                    ? 'sepia hue-rotate-[70deg] saturate-[300%] contrast-125 brightness-95'
                                    : 'contrast-110'
                                }`}
                        />

                        {/* Animasi Static Glitch saat Pergantian Kamera */}
                        {isSwitchingCam && (
                            <div className="absolute inset-0 z-20 bg-black/90 flex flex-col items-center justify-center pointer-events-none animate-pulse">
                                <div className="w-full h-1 bg-[#EA580C]/80 shadow-[0_0_15px_#EA580C] mb-3" />
                                <div className="px-4 py-1.5 rounded bg-[#141414] border border-[#EA580C] font-mono text-xs text-[#FB923C] tracking-widest uppercase">
                                    SWITCHING FEED // {activeChannel.label}...
                                </div>
                                <div className="w-full h-0.5 bg-white/30 mt-3" />
                            </div>
                        )}

                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] [background-size:100%_4px] opacity-60" />

                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none font-mono">
                            <div className="flex items-center gap-2 px-3 py-1 rounded bg-black/70 border border-white/15 text-xs text-[#F5F5F5]">
                                <span
                                    className={`w-2.5 h-2.5 rounded-full ${isStreaming ? 'bg-red-500 animate-ping' : 'bg-[#525252]'
                                        }`}
                                />
                                <span className="font-bold">{isStreaming ? 'REC' : 'NO SIGNAL'}</span>
                                <span className="text-[#EA580C]">|</span>
                                <span className="text-[#FB923C]">{activeChannel.label}</span>
                            </div>

                            <div className="px-3 py-1 rounded bg-black/70 border border-white/15 text-xs text-[#A3A3A3]">
                                {currentTime.toLocaleTimeString('id-ID', { hour12: false })} WIB
                            </div>
                        </div>

                        <div className="absolute top-2.5 left-2.5 w-5 h-5 border-t-2 border-l-2 border-[#EA580C]/70 pointer-events-none" />
                        <div className="absolute top-2.5 right-2.5 w-5 h-5 border-t-2 border-r-2 border-[#EA580C]/70 pointer-events-none" />
                        <div className="absolute bottom-2.5 left-2.5 w-5 h-5 border-b-2 border-l-2 border-[#EA580C]/70 pointer-events-none" />
                        <div className="absolute bottom-2.5 right-2.5 w-5 h-5 border-b-2 border-r-2 border-[#EA580C]/70 pointer-events-none" />

                        {!isStreaming && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                <div className="w-16 h-16 rounded-2xl bg-[#141414] border border-[#2E2E2E] flex items-center justify-center text-[#EA580C] mb-4">
                                    <Usb className="w-8 h-8" />
                                </div>
                                <h3 className="text-lg font-bold uppercase tracking-wider text-[#F5F5F5] font-['Chakra_Petch',sans-serif]">
                                    Menunggu Sambungan Kabel Data HP
                                </h3>
                                <p className="text-xs font-mono text-[#A3A3A3] max-w-md mt-2 leading-relaxed">
                                    1. Sambungkan HP ke laptop/PC menggunakan kabel data USB.<br />
                                    2. Aktifkan mode <span className="text-[#FB923C]">USB Webcam</span> di pengaturan USB HP (atau jalankan DroidCam / Iriun USB).<br />
                                    3. Pilih perangkat di atas lalu klik <span className="text-[#EA580C]">Hubungkan Kamera</span>.
                                </p>
                            </div>
                        )}
                    </div>

                    <canvas ref={canvasRef} className="hidden" />
                </section>

                {/* Right Panel: CCTV Channel Switcher */}
                <section className="bg-[#141414] border border-[#2E2E2E] rounded-xl p-5 shadow-xl flex flex-col justify-between space-y-5">
                    <div>
                        <div className="text-xs font-mono text-[#EA580C] uppercase font-bold mb-3 pb-2 border-b border-[#2E2E2E]">
                            CCTV FEED OVERLAY
                        </div>
                        <div className="space-y-2">
                            {CCTV_CHANNELS.map((ch) => {
                                const isSelected = activeChannel.id === ch.id;
                                return (
                                    <button
                                        key={ch.id}
                                        type="button"
                                        onClick={() => handleSwitchChannel(ch)}
                                        className={`w-full text-left px-3 py-2.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${isSelected
                                            ? 'bg-[#EA580C] text-white border-[#EA580C] font-bold shadow-[0_0_12px_rgba(234,88,12,0.35)]'
                                            : 'bg-[#1A1A1A] text-[#A3A3A3] border-[#2E2E2E] hover:border-[#EA580C]/60 hover:text-[#F5F5F5]'
                                            }`}
                                    >
                                        {ch.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#0A0A0A] border border-[#2E2E2E] font-mono text-xs space-y-1">
                        <div className="text-[#A3A3A3] flex items-center gap-1.5">
                            <HardDrive className="w-3.5 h-3.5 text-[#EA580C]" />
                            <span>EVIDENCE STORAGE</span>
                        </div>
                        <div className="text-base font-bold text-[#F5F5F5]">
                            {snapshots.length} <span className="text-xs font-normal text-[#A3A3A3]">SNAPSHOTS SAVED</span>
                        </div>
                    </div>
                </section>
            </div>

            {/* CCTV Snapshot Storage Gallery */}
            <section className="bg-[#141414] border border-[#2E2E2E] rounded-xl p-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#2E2E2E]">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-[#EA580C] uppercase font-bold">
                            <HardDrive className="w-4 h-4" />
                            <span>CCTV SNAPSHOT STORAGE // EVIDENCE ARCHIVE</span>
                        </div>
                        <p className="text-xs text-[#A3A3A3] mt-0.5">
                            Seluruh hasil tangkapan kamera tersimpan otomatis di memori lokal browser.
                        </p>
                    </div>

                    {snapshots.length > 0 && (
                        <button
                            type="button"
                            onClick={handleClearAllSnapshots}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/50 hover:bg-red-900/70 border border-red-500/50 text-xs font-mono text-red-400 cursor-pointer transition-colors self-start sm:self-auto"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Kosongkan Storage</span>
                        </button>
                    )}
                </div>

                {snapshots.length === 0 ? (
                    <div className="p-8 rounded-lg bg-[#0A0A0A] border border-dashed border-[#2E2E2E] text-center font-mono text-xs text-[#A3A3A3]">
                        BELUM ADA FOTO TERSIMPAN. HUBUNGKAN KAMERA LALU TEKAN TOMBOL <span className="text-[#EA580C]">CAPTURE & SAVE</span>.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {snapshots.map((snap) => (
                            <div
                                key={snap.id}
                                className="bg-[#0A0A0A] border border-[#2E2E2E] hover:border-[#EA580C]/70 rounded-lg overflow-hidden flex flex-col justify-between group"
                            >
                                <div className="relative aspect-video bg-black overflow-hidden">
                                    <img
                                        src={snap.imageUrl}
                                        alt={snap.channelLabel}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setPreviewSnapshot(snap)}
                                        title="Perbesar foto"
                                        className="absolute top-2 right-2 p-1.5 rounded bg-black/75 border border-white/15 text-white hover:text-[#EA580C] cursor-pointer"
                                    >
                                        <Maximize2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                <div className="p-3 font-mono text-[11px] space-y-2">
                                    <div>
                                        <div className="text-[#FB923C] font-bold truncate">{snap.channelLabel}</div>
                                        <div className="text-[#A3A3A3]">
                                            {snap.capturedDate} • {snap.capturedAt} WIB
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-[#2E2E2E]">
                                        <a
                                            href={snap.imageUrl}
                                            download={`fazbear-${snap.channelId.toLowerCase().replace(' ', '-')}-${snap.capturedAt.replace(/:/g, '-')}.jpg`}
                                            className="inline-flex items-center gap-1 text-[#F5F5F5] hover:text-[#EA580C]"
                                        >
                                            <Download className="w-3.5 h-3.5" />
                                            <span>UNDUH</span>
                                        </a>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteSnapshot(snap.id)}
                                            className="inline-flex items-center gap-1 text-[#A3A3A3] hover:text-red-400 cursor-pointer"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                            <span>HAPUS</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Modal Preview Foto Besar */}
            {previewSnapshot && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs"
                    onClick={() => setPreviewSnapshot(null)}
                >
                    <div
                        className="w-full max-w-3xl bg-[#141414] border border-[#EA580C] rounded-xl overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="px-5 py-3 bg-[#1F1F1F] border-b border-[#2E2E2E] flex items-center justify-between font-mono text-xs">
                            <span className="text-[#FB923C] font-bold">
                                {previewSnapshot.channelLabel} // {previewSnapshot.capturedDate} {previewSnapshot.capturedAt} WIB
                            </span>
                            <button
                                type="button"
                                onClick={() => setPreviewSnapshot(null)}
                                className="text-[#A3A3A3] hover:text-white cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <img
                            src={previewSnapshot.imageUrl}
                            alt={previewSnapshot.channelLabel}
                            className="w-full max-h-[75vh] object-contain bg-black"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}