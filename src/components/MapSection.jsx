import React, { useState, useEffect } from 'react';
import {
    MapPin,
    Compass,
    Navigation,
    Cpu,
    Radio,
    ShieldAlert,
    Lock,
    FolderArchive,
} from 'lucide-react';

const MAP_DATA = {
    'FNAF 1': {
        facility: "Freddy Fazbear's Pizza (1993)",
        securityPoint: { x: 50, y: 88, label: 'SECURITY OFFICE' },
        rooms: [
            { id: '1A', name: 'Show Stage (1A)', x: 50, y: 15, w: 36, h: 16 },
            { id: '5', name: 'Backstage (5)', x: 16, y: 20, w: 18, h: 16 },
            { id: '1B', name: 'Dining Area (1B)', x: 50, y: 40, w: 44, h: 22 },
            { id: '1C', name: 'Pirate Cove (1C)', x: 17, y: 44, w: 18, h: 18 },
            { id: '7', name: 'Restrooms (7)', x: 83, y: 38, w: 18, h: 20 },
            { id: '3', name: 'Supply Closet (3)', x: 20, y: 68, w: 16, h: 14 },
            { id: '2A', name: 'West Hall (2A)', x: 36, y: 68, w: 10, h: 24 },
            { id: '4A', name: 'East Hall (4A)', x: 64, y: 68, w: 10, h: 24 },
        ],
        spawns: [
            {
                id: 'f1-freddy',
                name: 'Freddy Fazbear',
                keywords: ['freddy'],
                startRoom: 'Show Stage (CAM 1A)',
                x: 50,
                y: 18,
                path: '50,18 50,40 83,40 83,56 64,56 64,88 55,88',
                route: 'Show Stage → Dining Area → Restrooms → East Hall → Right Office Door',
            },
            {
                id: 'f1-bonnie',
                name: 'Bonnie',
                keywords: ['bonnie'],
                startRoom: 'Show Stage (CAM 1A)',
                x: 39,
                y: 18,
                path: '39,18 39,40 36,40 36,88 45,88',
                route: 'Show Stage → Dining Area / Backstage → West Hall → Left Office Door',
            },
            {
                id: 'f1-chica',
                name: 'Chica',
                keywords: ['chica'],
                startRoom: 'Show Stage (CAM 1A)',
                x: 61,
                y: 18,
                path: '61,18 61,40 83,40 83,56 64,56 64,88 55,88',
                route: 'Show Stage → Dining Area → Restrooms → East Hall → Right Office Door',
            },
            {
                id: 'f1-foxy',
                name: 'Foxy',
                keywords: ['foxy'],
                startRoom: 'Pirate Cove (CAM 1C)',
                x: 17,
                y: 47,
                path: '17,47 36,47 36,88 45,88',
                route: 'Pirate Cove (CAM 1C) → Berlari melalui West Hall → Left Office Door',
            },
        ],
    },
    'FNAF 2': {
        facility: "The New & Improved Freddy Fazbear's Pizza (1987)",
        securityPoint: { x: 50, y: 88, label: 'SECURITY OFFICE' },
        rooms: [
            { id: '08', name: 'Parts & Service (08)', x: 20, y: 20, w: 24, h: 18 },
            { id: '09', name: 'Show Stage (09)', x: 76, y: 18, w: 28, h: 16 },
            { id: '10', name: 'Game Area (10)', x: 52, y: 36, w: 24, h: 18 },
            { id: '11', name: 'Prize Corner (11)', x: 82, y: 40, w: 18, h: 18 },
            { id: '01', name: 'Party Rooms 1-4', x: 22, y: 54, w: 22, h: 28 },
            { id: '12', name: "Kid's Cove (12)", x: 82, y: 64, w: 18, h: 16 },
            { id: 'VENT', name: 'Air Vents & Main Hall', x: 50, y: 66, w: 26, h: 18 },
        ],
        spawns: [
            {
                id: 'f2-toy-freddy',
                name: 'Toy Freddy',
                keywords: ['toy freddy'],
                startRoom: 'Show Stage (CAM 09)',
                x: 76,
                y: 21,
                path: '76,21 52,21 52,36 50,66 50,88',
                route: 'Show Stage (CAM 09) → Game Area → Main Hall → Front Office Hallway',
            },
            {
                id: 'f2-toy-bonnie',
                name: 'Toy Bonnie',
                keywords: ['toy bonnie'],
                startRoom: 'Show Stage (CAM 09)',
                x: 67,
                y: 21,
                path: '67,21 67,54 62,54 62,88 55,88',
                route: 'Show Stage → Party Rooms 3 & 4 → Right Air Vent (CAM 06) → Office',
            },
            {
                id: 'f2-toy-chica',
                name: 'Toy Chica',
                keywords: ['toy chica'],
                startRoom: 'Show Stage (CAM 09)',
                x: 85,
                y: 21,
                path: '85,21 52,21 52,54 38,54 38,88 45,88',
                route: 'Show Stage → Main Hall → Party Room 1 → Left Air Vent (CAM 05) → Office',
            },
            {
                id: 'f2-withered',
                name: 'Withered Animatronics',
                keywords: ['withered'],
                startRoom: 'Parts & Service (CAM 08)',
                x: 20,
                y: 23,
                path: '20,23 20,54 38,54 38,88 45,88',
                route: 'Parts & Service → Main Hall / Party Rooms → Vents & Lorong Tengah → Office',
            },
            {
                id: 'f2-puppet',
                name: 'The Puppet',
                keywords: ['puppet', 'marionette'],
                startRoom: 'Prize Corner (CAM 11)',
                x: 82,
                y: 43,
                path: '82,43 52,43 52,66 50,88',
                route: 'Prize Corner (CAM 11) → Game Area → Main Hall → Langsung menuju Office',
            },
            {
                id: 'f2-mangle',
                name: 'Mangle',
                keywords: ['mangle'],
                startRoom: "Kid's Cove (CAM 12)",
                x: 82,
                y: 67,
                path: '82,67 62,67 62,88 55,88',
                route: "Kid's Cove → Game Area → Main Hall → Right Air Vent (CAM 06) → Office",
            },
            {
                id: 'f2-bb',
                name: 'Balloon Boy',
                keywords: ['balloon boy', 'bb'],
                startRoom: 'Game Area (CAM 10)',
                x: 52,
                y: 39,
                path: '52,39 38,39 38,88 45,88',
                route: 'Game Area (CAM 10) → Left Air Vent (CAM 05) → Masuk ke Office',
            },
        ],
    },
    'FNAF 3': {
        facility: "Fazbear's Fright: The Horror Attraction (2023)",
        securityPoint: { x: 22, y: 82, label: 'OFFICE' },
        rooms: [
            { id: '09', name: 'CAM 09 / 10 (Back Sector)', x: 78, y: 22, w: 26, h: 18 },
            { id: '07', name: 'CAM 07 / 08 (Arcade)', x: 50, y: 26, w: 22, h: 18 },
            { id: '05', name: 'CAM 05 / 06 (Hallway)', x: 48, y: 54, w: 28, h: 16 },
            { id: '02', name: 'CAM 02 / 01 (Window)', x: 22, y: 54, w: 18, h: 18 },
            { id: 'VENT', name: 'Ventilation Grid (CAM 11-15)', x: 76, y: 66, w: 24, h: 22 },
        ],
        spawns: [
            {
                id: 'f3-springtrap',
                name: 'Springtrap',
                keywords: ['springtrap'],
                startRoom: 'CAM 09 / CAM 10 (Sektor Belakang)',
                x: 78,
                y: 25,
                path: '78,25 50,25 50,54 22,54 22,82',
                route: 'CAM 09/10 → CAM 08/07 → CAM 05 → CAM 02 (atau Jalur Ventilasi) → Office',
            },
            {
                id: 'f3-phantom',
                name: 'Phantom Animatronics',
                keywords: ['phantom'],
                startRoom: 'Sistem Kamera & Arcade (CAM 07)',
                x: 50,
                y: 29,
                path: '50,29 22,29 22,82',
                route: 'Muncul pada monitor kamera saat error sistem lalu menyerang di depan Office',
            },
        ],
    },
    'FNAF 4': {
        facility: 'Afton Bedroom & Hallways (1983)',
        securityPoint: { x: 50, y: 56, label: 'BEDROOM' },
        rooms: [
            { id: 'CLOSET', name: 'Center Closet', x: 50, y: 20, w: 22, h: 16 },
            { id: 'LEFT', name: 'Left Hallway', x: 20, y: 56, w: 18, h: 46 },
            { id: 'RIGHT', name: 'Right Hallway', x: 80, y: 56, w: 18, h: 46 },
            { id: 'BED', name: 'The Bed (Behind)', x: 50, y: 86, w: 26, h: 14 },
        ],
        spawns: [
            {
                id: 'f4-nbonnie',
                name: 'Nightmare Bonnie',
                keywords: ['nightmare bonnie'],
                startRoom: 'Ujung Left Hallway',
                x: 20,
                y: 38,
                path: '20,38 20,56 41,56',
                route: 'Ujung Left Hallway → Mendekat ke Pintu Kiri Kamar',
            },
            {
                id: 'f4-nchica',
                name: 'Nightmare Chica',
                keywords: ['nightmare chica'],
                startRoom: 'Ujung Right Hallway',
                x: 80,
                y: 38,
                path: '80,38 80,56 59,56',
                route: 'Ujung Right Hallway → Mendekat ke Pintu Kanan Kamar',
            },
            {
                id: 'f4-nfoxy',
                name: 'Nightmare Foxy',
                keywords: ['nightmare foxy'],
                startRoom: 'Center Closet',
                x: 50,
                y: 23,
                path: '50,23 50,48',
                route: 'Lorong Luar → Menyelinap ke dalam Lemari Tengah (Closet)',
            },
            {
                id: 'f4-nfreddy',
                name: 'Nightmare Freddy',
                keywords: ['nightmare freddy', 'freddles'],
                startRoom: 'The Bed (Behind)',
                x: 50,
                y: 88,
                path: '50,88 50,64',
                route: '3 Freddles berkumpul di atas kasur di belakang pemain',
            },
        ],
    },
    'FNAF: Sister Location': {
        facility: "Circus Baby's Entertainment & Rental",
        securityPoint: { x: 50, y: 24, label: 'PRIMARY CONTROL' },
        rooms: [
            { id: 'BALLORA', name: 'Ballora Gallery', x: 22, y: 48, w: 24, h: 22 },
            { id: 'FUNAUD', name: 'Funtime Auditorium', x: 78, y: 48, w: 24, h: 22 },
            { id: 'CIRCUS', name: 'Circus Gallery', x: 50, y: 58, w: 20, h: 20 },
            { id: 'BREAKER', name: 'Breaker Room', x: 22, y: 80, w: 24, h: 16 },
            { id: 'PARTS', name: 'Parts & Service', x: 78, y: 80, w: 24, h: 16 },
        ],
        spawns: [
            {
                id: 'sl-ballora',
                name: 'Ballora',
                keywords: ['ballora'],
                startRoom: 'Ballora Gallery',
                x: 22,
                y: 51,
                path: '22,51 22,24 41,24',
                route: 'Ballora Gallery → Berpatroli di sekitar jalur menuju Primary Control',
            },
            {
                id: 'sl-ffoxy',
                name: 'Funtime Foxy',
                keywords: ['funtime foxy'],
                startRoom: 'Funtime Auditorium',
                x: 78,
                y: 51,
                path: '78,51 78,80',
                route: 'Funtime Auditorium → Mengintai di kegelapan menuju Parts & Service',
            },
            {
                id: 'sl-ffreddy',
                name: 'Funtime Freddy',
                keywords: ['funtime freddy', 'bon-bon'],
                startRoom: 'Breaker Room',
                x: 22,
                y: 82,
                path: '22,82 22,51 50,51 78,51 78,80',
                route: 'Breaker Room → Melintasi Galeri menuju Parts & Service',
            },
            {
                id: 'sl-baby',
                name: 'Circus Baby',
                keywords: ['circus baby', 'baby'],
                startRoom: 'Circus Gallery',
                x: 50,
                y: 61,
                path: '50,61 50,24',
                route: 'Circus Gallery → Mengawasi dari balik kaca ruang kontrol',
            },
        ],
    },
    "Freddy Fazbear's Pizzeria Simulator": {
        facility: "Freddy Fazbear's Pizza Place (Vent Labyrinth)",
        securityPoint: { x: 50, y: 56, label: 'TERMINAL OFFICE' },
        rooms: [
            { id: 'TRAP-L', name: 'Left Vent Grid', x: 22, y: 32, w: 22, h: 20 },
            { id: 'TRAP-R', name: 'Right Vent Grid', x: 78, y: 32, w: 22, h: 20 },
            { id: 'VENT-L', name: 'Left Office Duct', x: 24, y: 68, w: 18, h: 18 },
            { id: 'VENT-R', name: 'Right Office Duct', x: 76, y: 68, w: 18, h: 18 },
        ],
        spawns: [
            {
                id: 'ffps-scrapbaby',
                name: 'Scrap Baby',
                keywords: ['scrap baby'],
                startRoom: 'Left Outer Vent Grid',
                x: 22,
                y: 35,
                path: '22,35 22,68 41,68 41,56',
                route: 'Outer Vent Grid → Left Office Duct → Terminal Office',
            },
            {
                id: 'ffps-scraptrap',
                name: 'Scraptrap',
                keywords: ['scraptrap', 'afton'],
                startRoom: 'Right Outer Vent Grid',
                x: 78,
                y: 35,
                path: '78,35 78,68 59,68 59,56',
                route: 'Outer Vent Grid → Right Office Duct → Terminal Office',
            },
            {
                id: 'ffps-molten',
                name: 'Molten Freddy & Lefty',
                keywords: ['molten freddy', 'lefty'],
                startRoom: 'Upper Ventilation Grid',
                x: 50,
                y: 22,
                path: '50,22 22,22 22,68 41,68 41,56',
                route: 'Upper Vent Grid → Menelusuri labirin ventilasi menuju kipas Office',
            },
        ],
    },
    'FNAF: Help Wanted': {
        facility: 'Freddy Fazbear Virtual Experience (VR Hub)',
        securityPoint: { x: 50, y: 80, label: 'VR MONITOR HUB' },
        rooms: [
            { id: 'CLASSIC', name: 'Classic FNAF 1-3 Sim', x: 22, y: 30, w: 24, h: 20 },
            { id: 'VENT-REP', name: 'Vent Repair Sector', x: 50, y: 30, w: 22, h: 20 },
            { id: 'DARK', name: 'Dark Rooms & Dreadbear', x: 78, y: 30, w: 24, h: 20 },
        ],
        spawns: [
            {
                id: 'hw-glitchtrap',
                name: 'Glitchtrap',
                keywords: ['glitchtrap', 'malhare'],
                startRoom: 'Main VR Hub (Hidden Tapes)',
                x: 50,
                y: 54,
                path: '50,54 50,74',
                route: 'Tirai Belakang VR Hub → Perlahan mendekat ke meja monitor pemain',
            },
            {
                id: 'hw-dreadbear',
                name: 'Dreadbear',
                keywords: ['dreadbear', 'grimm foxy'],
                startRoom: 'Curse of Dreadbear Sector',
                x: 78,
                y: 33,
                path: '78,33 78,80 58,80',
                route: 'Barn & Corn Maze → Berjalan lurus menuju pos jaga simulasi',
            },
        ],
    },
    'FNAF: Security Breach': {
        facility: "Freddy Fazbear's Mega Pizzaplex",
        securityPoint: { x: 50, y: 88, label: 'MAIN ATRIUM' },
        rooms: [
            { id: 'ROCKROW', name: 'Rockstar Row (Green Rooms)', x: 50, y: 18, w: 52, h: 16 },
            { id: 'GOLF', name: "Monty's Gator Golf", x: 20, y: 46, w: 22, h: 18 },
            { id: 'SALON', name: 'Roxy Raceway & Salon', x: 80, y: 46, w: 22, h: 18 },
            { id: 'DAYCARE', name: 'Superstar Daycare', x: 22, y: 74, w: 22, h: 16 },
            { id: 'BAKERY', name: 'Chica Bakery & Fazer Blast', x: 78, y: 74, w: 22, h: 16 },
        ],
        spawns: [
            {
                id: 'sb-freddy',
                name: 'Glamrock Freddy',
                keywords: ['glamrock freddy'],
                startRoom: "Freddy's Green Room (Rockstar Row)",
                x: 32,
                y: 21,
                path: '32,21 50,21 50,82',
                route: 'Rockstar Row → Utility Tunnels → Main Atrium',
            },
            {
                id: 'sb-monty',
                name: 'Montgomery Gator',
                keywords: ['monty', 'montgomery'],
                startRoom: "Monty's Gator Golf",
                x: 20,
                y: 49,
                path: '20,49 50,49 50,82',
                route: "Rockstar Row → Monty's Gator Golf → Catwalks & Main Atrium",
            },
            {
                id: 'sb-roxy',
                name: 'Roxanne Wolf',
                keywords: ['roxy', 'roxanne'],
                startRoom: 'Roxy Raceway & Salon',
                x: 80,
                y: 49,
                path: '80,49 50,49 50,82',
                route: 'Rockstar Row → Roxy Raceway & Beauty Salon → Main Atrium',
            },
            {
                id: 'sb-chica',
                name: 'Glamrock Chica',
                keywords: ['glamrock chica'],
                startRoom: 'Chica Bakery & Fazer Blast',
                x: 78,
                y: 77,
                path: '78,77 50,77 50,82',
                route: 'Rockstar Row → Bakery & Kitchen → Fazer Blast → Main Atrium',
            },
            {
                id: 'sb-daycare',
                name: 'Sun / Moon',
                keywords: ['sun', 'moon', 'daycare'],
                startRoom: 'Superstar Daycare',
                x: 22,
                y: 77,
                path: '22,77 50,77 50,82',
                route: 'Superstar Daycare → Berpatroli ke seluruh Pizzaplex saat lampu padam',
            },
        ],
    },
};

const SERIES_KEYS = Object.keys(MAP_DATA);

export default function MapSection({ animatronics = [], onNavigateArchives }) {
    // Helper: cek apakah suatu spawn animatronic sudah dicatat di Archives pada seri yang sama
    const isEntityUnlocked = (seriesKey, spawn) => {
        const seriesEntities = animatronics.filter((a) => a.series === seriesKey);
        if (seriesEntities.length === 0) return false;

        return seriesEntities.some((entity) => {
            const lowerName = entity.name.toLowerCase();
            return spawn.keywords.some((kw) => lowerName.includes(kw));
        });
    };

    // Helper: cek apakah minimal 1 animatronic di seri tersebut sudah terbuka
    const isSeriesMapUnlocked = (seriesKey) => {
        return MAP_DATA[seriesKey].spawns.some((spawn) =>
            isEntityUnlocked(seriesKey, spawn)
        );
    };

    const firstUnlockedSeries =
        SERIES_KEYS.find((key) => isSeriesMapUnlocked(key)) || 'FNAF 1';

    const [selectedSeries, setSelectedSeries] = useState(firstUnlockedSeries);
    const [selectedSpawnId, setSelectedSpawnId] = useState(
        MAP_DATA[firstUnlockedSeries].spawns[0].id
    );

    // Sinkronkan pilihan awal saat data Archives berubah
    useEffect(() => {
        if (!isSeriesMapUnlocked(selectedSeries)) {
            const available = SERIES_KEYS.find((key) => isSeriesMapUnlocked(key));
            if (available) {
                setSelectedSeries(available);
                const firstSpawn =
                    MAP_DATA[available].spawns.find((s) => isEntityUnlocked(available, s)) ||
                    MAP_DATA[available].spawns[0];
                setSelectedSpawnId(firstSpawn.id);
            }
        }
    }, [animatronics]);

    const currentMap = MAP_DATA[selectedSeries];
    const currentSeriesUnlocked = isSeriesMapUnlocked(selectedSeries);

    const enrichedSpawns = currentMap.spawns.map((spawn) => ({
        ...spawn,
        unlocked: isEntityUnlocked(selectedSeries, spawn),
    }));

    const unlockedSpawns = enrichedSpawns.filter((s) => s.unlocked);

    const activeSpawn =
        enrichedSpawns.find((s) => s.id === selectedSpawnId) ||
        unlockedSpawns[0] ||
        enrichedSpawns[0];

    const handleSelectSeries = (seriesKey) => {
        if (!isSeriesMapUnlocked(seriesKey)) return;
        setSelectedSeries(seriesKey);
        const firstUnlocked =
            MAP_DATA[seriesKey].spawns.find((s) => isEntityUnlocked(seriesKey, s)) ||
            MAP_DATA[seriesKey].spawns[0];
        setSelectedSpawnId(firstUnlocked.id);
    };

    return (
        <div className="space-y-6">
            {/* Header Banner */}
            <section className="bg-[#141414] border border-[#2E2E2E] rounded-xl p-6 relative overflow-hidden shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-[#EA580C] uppercase tracking-wider font-semibold mb-1">
                            <Compass className="w-4 h-4" />
                            <span>TACTICAL BLUEPRINT // SPAWN & MOVEMENT TRACKER</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#F5F5F5] font-['Chakra_Petch',sans-serif]">
                            Facility Sector Map
                        </h1>
                        <p className="text-xs sm:text-sm text-[#A3A3A3] mt-1">
                            Map setiap seri akan terbuka setelah minimal 1 animatronik dari seri tersebut ditemukan di Archives, dan setiap entitas yang terbuka akan menerangi jalur geraknya di peta.
                        </p>
                    </div>

                    <div className="px-4 py-2.5 rounded-lg bg-[#1F1F1F] border border-[#2E2E2E] font-mono text-right shrink-0">
                        <div className="text-[11px] text-[#A3A3A3]">SECTOR STATUS</div>
                        <div className="text-sm font-bold text-[#FB923C]">
                            {currentSeriesUnlocked
                                ? `${unlockedSpawns.length} / ${enrichedSpawns.length} JALUR TERANG`
                                : 'SECTOR LOCKED'}
                        </div>
                    </div>
                </div>
            </section>

            {/* Series Selector Tabs (Sejajar Lurus Satu Baris) */}
            <section className="flex items-center gap-2 overflow-x-auto pb-1">
                {SERIES_KEYS.map((key) => {
                    const unlocked = isSeriesMapUnlocked(key);
                    const isActive = selectedSeries === key && unlocked;
                    return (
                        <button
                            key={key}
                            type="button"
                            disabled={!unlocked}
                            onClick={() => handleSelectSeries(key)}
                            title={
                                unlocked
                                    ? `Buka peta ${key}`
                                    : `Terkunci — Temukan minimal 1 animatronic ${key} di Archives`
                            }
                            className={`px-3 py-2 rounded-lg text-[11px] font-mono uppercase transition-all border inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 ${isActive
                                    ? 'bg-[#EA580C] text-white border-[#EA580C] font-bold shadow-[0_0_14px_rgba(234,88,12,0.4)] cursor-pointer'
                                    : unlocked
                                        ? 'bg-[#141414] text-[#F5F5F5] border-[#2E2E2E] hover:border-[#EA580C]/70 cursor-pointer'
                                        : 'bg-[#0E0E0E] text-[#525252] border-[#1F1F1F] cursor-not-allowed opacity-70'
                                }`}
                        >
                            {!unlocked && <Lock className="w-3 h-3 text-[#525252] shrink-0" />}
                            <span>{key}</span>
                        </button>
                    );
                })}
            </section>

            {/* Jika Map Belum Ada yang Terbuka Sama Sekali */}
            {!currentSeriesUnlocked ? (
                <section className="bg-[#141414] border-2 border-dashed border-[#2E2E2E] rounded-xl p-10 sm:p-14 text-center shadow-xl">
                    <div className="max-w-md mx-auto flex flex-col items-center">
                        <div className="w-14 h-14 rounded-2xl bg-[#1F1F1F] border border-[#2E2E2E] flex items-center justify-center text-[#737373] mb-4">
                            <Lock className="w-7 h-7" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#F5F5F5] font-['Chakra_Petch',sans-serif]">
                            Seluruh Peta Fasilitas Terkunci
                        </h2>
                        <p className="text-xs sm:text-sm text-[#A3A3A3] mt-2 leading-relaxed">
                            Belum ada animatronik yang tercatat di <span className="text-[#F5F5F5] font-semibold">Archives</span>. Tambahkan minimal satu animatronik (misalnya <span className="text-[#FB923C]">Freddy Fazbear</span> pada <span className="text-[#FB923C]">FNAF 1</span>) untuk membuka denah dan jalur pergerakannya.
                        </p>
                        {onNavigateArchives && (
                            <button
                                type="button"
                                onClick={onNavigateArchives}
                                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer transition-colors"
                            >
                                <FolderArchive className="w-4 h-4" />
                                <span>Buka Archives</span>
                            </button>
                        )}
                    </div>
                </section>
            ) : (
                /* Main Split: Blueprint Map + Spawn Details */
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left 2 Cols: Interactive Tactical Blueprint */}
                    <section className="lg:col-span-2 bg-[#141414] border border-[#2E2E2E] rounded-xl p-5 shadow-xl flex flex-col">
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[#2E2E2E]">
                            <div className="flex items-center gap-2">
                                <Radio className="w-4 h-4 text-[#EA580C] animate-pulse" />
                                <span className="text-xs sm:text-sm font-mono font-semibold text-[#F5F5F5] uppercase">
                                    {currentMap.facility}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-[11px] font-mono text-[#A3A3A3]">
                                <span className="flex items-center gap-1">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C] shadow-[0_0_6px_#EA580C] inline-block" />
                                    Jalur Terang
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#525252] inline-block" />
                                    ????
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500 inline-block" />
                                    Pos Jaga
                                </span>
                            </div>
                        </div>

                        {/* Blueprint Canvas */}
                        <div className="relative w-full aspect-[16/11] bg-[#0A0A0A] border border-[#2E2E2E] rounded-lg overflow-hidden select-none">
                            {/* Blueprint Grid Background */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1A1A1A_1px,transparent_1px),linear-gradient(to_bottom,#1A1A1A_1px,transparent_1px)] [background-size:28px_28px]" />

                            {/* Room Boxes */}
                            {currentMap.rooms.map((room) => (
                                <div
                                    key={room.id}
                                    style={{
                                        left: `${room.x}%`,
                                        top: `${room.y}%`,
                                        width: `${room.w}%`,
                                        height: `${room.h}%`,
                                    }}
                                    className="absolute -translate-x-1/2 -translate-y-1/2 border border-[#2E2E2E] bg-[#141414]/85 rounded flex items-start justify-center pt-1.5 px-1 text-center"
                                >
                                    <span className="text-[9px] sm:text-[10px] font-mono text-[#737373] leading-tight">
                                        {room.name}
                                    </span>
                                </div>
                            ))}

                            {/* SVG Glowing Paths untuk SEMUA animatronic yang sudah terbuka */}
                            <svg
                                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                            >
                                <defs>
                                    <filter id="path-glow" x="-20%" y="-20%" width="140%" height="140%">
                                        <feGaussianBlur stdDeviation="0.8" result="blur" />
                                        <feMerge>
                                            <feMergeNode in="blur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                {unlockedSpawns.map((spawn) => {
                                    const isFocused = spawn.id === activeSpawn.id;
                                    return (
                                        <polyline
                                            key={spawn.id}
                                            points={spawn.path}
                                            fill="none"
                                            stroke={isFocused ? '#FB923C' : '#EA580C'}
                                            strokeWidth={isFocused ? '0.95' : '0.6'}
                                            strokeDasharray={isFocused ? 'none' : '1.6 1.1'}
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            opacity={isFocused ? '1' : '0.65'}
                                            filter="url(#path-glow)"
                                        />
                                    );
                                })}
                            </svg>

                            {/* Security Office Marker */}
                            <div
                                style={{
                                    left: `${currentMap.securityPoint.x}%`,
                                    top: `${currentMap.securityPoint.y}%`,
                                }}
                                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center"
                            >
                                <div className="px-2.5 py-1 rounded bg-emerald-950/95 border border-emerald-500 text-emerald-400 font-mono text-[10px] font-bold shadow-[0_0_12px_rgba(16,185,129,0.4)] whitespace-nowrap">
                                    {currentMap.securityPoint.label}
                                </div>
                            </div>

                            {/* Animatronic Spawn Markers */}
                            {enrichedSpawns.map((spawn) => {
                                const isSelected = spawn.id === activeSpawn.id;
                                return (
                                    <button
                                        key={spawn.id}
                                        type="button"
                                        onClick={() => setSelectedSpawnId(spawn.id)}
                                        style={{ left: `${spawn.x}%`, top: `${spawn.y}%` }}
                                        className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform ${isSelected ? 'scale-110 z-30' : 'z-20 hover:scale-105'
                                            }`}
                                        title={
                                            spawn.unlocked
                                                ? `${spawn.name} — ${spawn.startRoom}`
                                                : '???? (Belum ditemukan di Archives)'
                                        }
                                    >
                                        {spawn.unlocked ? (
                                            <span
                                                className={`flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 transition-all ${isSelected
                                                    ? 'bg-[#EA580C] border-white text-white shadow-[0_0_18px_#EA580C]'
                                                    : 'bg-[#1F1F1F] border-[#EA580C] text-[#FB923C] shadow-[0_0_10px_rgba(234,88,12,0.5)]'
                                                    }`}
                                            >
                                                <MapPin className="w-3.5 h-3.5" />
                                            </span>
                                        ) : (
                                            <span
                                                className={`flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full border text-[10px] font-mono font-bold transition-all ${isSelected
                                                    ? 'bg-[#2A2A2A] border-[#A3A3A3] text-[#F5F5F5]'
                                                    : 'bg-[#141414] border-[#3F3F46] text-[#737373]'
                                                    }`}
                                            >
                                                ?
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Active Spawn Route Readout */}
                        <div
                            className={`mt-4 p-4 rounded-lg border ${activeSpawn.unlocked
                                ? 'bg-[#0A0A0A] border-[#EA580C]/60'
                                : 'bg-[#0A0A0A] border-[#2E2E2E]'
                                }`}
                        >
                            {activeSpawn.unlocked ? (
                                <>
                                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                                        <span className="text-xs font-mono text-[#EA580C] font-bold uppercase flex items-center gap-1.5">
                                            <Navigation className="w-3.5 h-3.5" />
                                            TARGET ENTITY: {activeSpawn.name}
                                        </span>
                                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#1F1F1F] text-[#FB923C] border border-[#2E2E2E]">
                                            START: {activeSpawn.startRoom}
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm font-mono text-[#F5F5F5] mt-1.5">
                                        <span className="text-[#A3A3A3]">RUTE GERAK: </span>
                                        {activeSpawn.route}
                                    </p>
                                </>
                            ) : (
                                <div className="flex items-center gap-3 text-xs font-mono text-[#737373]">
                                    <Lock className="w-4 h-4 text-[#A3A3A3] shrink-0" />
                                    <div>
                                        <div className="text-[#A3A3A3] font-bold uppercase">
                                            TARGET ENTITY: ???? [JALUR BELUM TERBUKA]
                                        </div>
                                        <div className="mt-0.5">
                                            Catat animatronik ini di <span className="text-[#FB923C]">Archives</span> ({selectedSeries}) agar jalurnya menyala di peta.
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Right Col: List of Initial Spawn Locations */}
                    <section className="bg-[#141414] border border-[#2E2E2E] rounded-xl p-5 shadow-xl flex flex-col">
                        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#2E2E2E]">
                            <ShieldAlert className="w-4 h-4 text-[#EA580C]" />
                            <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#F5F5F5] font-['Chakra_Petch',sans-serif]">
                                Titik Awal Animatronic
                            </h2>
                        </div>

                        <div className="space-y-2.5 flex-1">
                            {enrichedSpawns.map((spawn) => {
                                const isSelected = spawn.id === activeSpawn.id;
                                return (
                                    <button
                                        key={spawn.id}
                                        type="button"
                                        onClick={() => setSelectedSpawnId(spawn.id)}
                                        className={`w-full text-left p-3.5 rounded-lg border transition-all cursor-pointer ${isSelected
                                            ? spawn.unlocked
                                                ? 'bg-[#EA580C]/15 border-[#EA580C] shadow-[0_0_15px_rgba(234,88,12,0.15)]'
                                                : 'bg-[#1F1F1F] border-[#525252]'
                                            : 'bg-[#1A1A1A] border-[#2E2E2E] hover:border-[#3F3F46]'
                                            }`}
                                    >
                                        <div className="flex items-start gap-2.5">
                                            {spawn.unlocked ? (
                                                <Cpu
                                                    className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-[#EA580C]' : 'text-[#FB923C]'
                                                        }`}
                                                />
                                            ) : (
                                                <Lock className="w-4 h-4 mt-0.5 shrink-0 text-[#525252]" />
                                            )}

                                            <div>
                                                <div
                                                    className={`text-sm font-bold uppercase font-['Chakra_Petch',sans-serif] ${spawn.unlocked ? 'text-[#F5F5F5]' : 'text-[#737373]'
                                                        }`}
                                                >
                                                    {spawn.unlocked ? spawn.name : '????'}
                                                </div>
                                                <div
                                                    className={`text-xs font-mono mt-0.5 flex items-center gap-1 ${spawn.unlocked ? 'text-[#FB923C]' : 'text-[#525252]'
                                                        }`}
                                                >
                                                    <MapPin className="w-3 h-3 shrink-0" />
                                                    <span>
                                                        {spawn.unlocked ? spawn.startRoom : 'LOKASI AWAL TERENKRIPSI'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
}