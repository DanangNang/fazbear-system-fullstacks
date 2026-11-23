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
} from 'lucide-react';

const CCTV_CHANNELS = [
    { id: 'CAM 01', label: 'CAM 01 // SHOW STAGE' },
    { id: 'CAM 02', label: 'CAM 02 // WEST HALLWAY' },
    { id: 'CAM 03', label: 'CAM 03 // EAST HALLWAY' },
    { id: 'CAM 04', label: 'CAM 04 // PIRATE COVE' },
    { id: 'CAM 05', label: 'CAM 05 // PARTS & SERVICE' },
    { id: 'CAM 06', label: 'CAM 06 // OFFICE PERIMETER' },
];

export default function CameraSection() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [devices, setDevices] = useState([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [activeChannel, setActiveChannel] = useState(CCTV_CHANNELS[0]);
    const [nightVision, setNightVision] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [snapshotUrl, setSnapshotUrl] = useState(null);

    // Update jam real-time untuk HUD CCTV
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Fungsi memindai perangkat kamera (termasuk USB Smartphone Bridge)
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
                // Prioritaskan kamera eksternal / HP via USB jika terdeteksi dari labelnya
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
            // Refresh label device setelah izin kamera diberikan browser
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

    const handleTakeSnapshot = () => {
        if (!videoRef.current || !canvasRef.current || !isStreaming) return;
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth || 1280;
        canvas.height = video.videoHeight || 720;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setSnapshotUrl(canvas.toDataURL('image/png'));
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

            {/* Control Bar: USB Device Selector & Actions */}
            <section className="bg-[#141414] border border-[#2E2E2E] rounded-xl p-5 shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
                    {/* Select Camera Device */}
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

                    {/* Connect / Disconnect & Night Vision Buttons */}
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
                            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#1F1F1F] hover:bg-[#2A2A2A] disabled:opacity-40 disabled:cursor-not-allowed border border-[#2E2E2E] text-xs font-mono text-[#F5F5F5] uppercase cursor-pointer transition-colors"
                        >
                            <Download className="w-4 h-4 text-[#EA580C]" />
                            <span>Capture</span>
                        </button>
                    </div>
                </div>

                {/* Error Alert */}
                {errorMsg && (
                    <div className="mt-4 p-3.5 rounded-lg bg-red-950/40 border border-red-500/60 flex items-start gap-2.5 text-xs font-mono text-red-300">
                        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <span>{errorMsg}</span>
                    </div>
                )}
            </section>

            {/* Main CCTV Monitor + Channel Selector */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Monitor Screen (3 Cols) */}
                <section className="lg:col-span-3 bg-[#141414] border border-[#2E2E2E] rounded-xl p-4 shadow-2xl">
                    <div className="relative w-full aspect-video bg-[#050505] border border-[#2E2E2E] rounded-lg overflow-hidden">
                        {/* Live Video Element */}
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

                        {/* CRT Scanline Overlay */}
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] [background-size:100%_4px] opacity-60" />

                        {/* CCTV HUD Overlay (Top) */}
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

                        {/* Corner Brackets */}
                        <div className="absolute top-2.5 left-2.5 w-5 h-5 border-t-2 border-l-2 border-[#EA580C]/70 pointer-events-none" />
                        <div className="absolute top-2.5 right-2.5 w-5 h-5 border-t-2 border-r-2 border-[#EA580C]/70 pointer-events-none" />
                        <div className="absolute bottom-2.5 left-2.5 w-5 h-5 border-b-2 border-l-2 border-[#EA580C]/70 pointer-events-none" />
                        <div className="absolute bottom-2.5 right-2.5 w-5 h-5 border-b-2 border-r-2 border-[#EA580C]/70 pointer-events-none" />

                        {/* Placeholder saat kamera belum terhubung */}
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

                {/* Right Panel: CCTV Channel Switcher & Last Snapshot */}
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
                                        onClick={() => setActiveChannel(ch)}
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

                    {/* Preview Hasil Capture Snapshot */}
                    {snapshotUrl && (
                        <div className="pt-3 border-t border-[#2E2E2E]">
                            <div className="flex items-center justify-between text-[11px] font-mono text-[#A3A3A3] mb-2">
                                <span>LAST CAPTURE</span>
                                <a
                                    href={snapshotUrl}
                                    download={`fazbear-${activeChannel.id.toLowerCase().replace(' ', '-')}.png`}
                                    className="text-[#FB923C] hover:underline"
                                >
                                    SIMPAN PNG
                                </a>
                            </div>
                            <img
                                src={snapshotUrl}
                                alt="CCTV Snapshot"
                                className="w-full rounded border border-[#2E2E2E] object-cover"
                            />
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}