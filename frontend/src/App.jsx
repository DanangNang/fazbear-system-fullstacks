import React, { useState, useEffect, useCallback, useMemo } from 'react';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ArchivesSection from './components/ArchivesSection';
import AboutSection from './components/AboutSection';
import ProfilePopup from './components/ProfilePopup';
import SeriesGameSection from './components/SeriesGameSection';
import ToolsSection from './components/ToolsSection';
import StoryGameSection from './components/StoryGameSection';
import MapSection from './components/MapSection';
import CameraSection from './components/CameraSection';

const API_URL = 'http://localhost:3000/animatronics';

// Preset Lengkap Seluruh Animatronic untuk Akun Quick Demo (Nearbys / FAZ-0001)
const DEMO_ALL_ANIMATRONICS = [
  // FNAF 1
  { id: 1001, name: 'Freddy Fazbear', form: 'Bear', seriesGame: 'FNAF 1', series: 'FNAF 1', threatLevel: 7, isPossessed: true, status: 'Possessed', behaviorNote: 'Bergerak melalui East Hall menuju pintu kanan saat daya menipis.' },
  { id: 1002, name: 'Bonnie The Bunny', form: 'Rabbit', seriesGame: 'FNAF 1', series: 'FNAF 1', threatLevel: 6, isPossessed: true, status: 'Possessed', behaviorNote: 'Patroli agresif melalui West Hall menuju pintu kiri.' },
  { id: 1003, name: 'Chica The Chick', form: 'Chicken', seriesGame: 'FNAF 1', series: 'FNAF 1', threatLevel: 6, isPossessed: true, status: 'Possessed', behaviorNote: 'Sering terdengar di Kitchen dan mendekat dari East Hall.' },
  { id: 1004, name: 'Foxy The Pirate', form: 'Fox', seriesGame: 'FNAF 1', series: 'FNAF 1', threatLevel: 8, isPossessed: true, status: 'Possessed', behaviorNote: 'Berlari cepat dari Pirate Cove jika jarang dipantau di kamera.' },
  { id: 1005, name: 'Golden Freddy', form: 'Bear', seriesGame: 'FNAF 1', series: 'FNAF 1', threatLevel: 10, isPossessed: true, status: 'Possessed', behaviorNote: 'Entitas halusinasi ekstrem; segera angkat monitor kamera saat muncul.' },

  // FNAF 2
  { id: 1006, name: 'Toy Freddy', form: 'Bear', seriesGame: 'FNAF 2', series: 'FNAF 2', threatLevel: 6, isPossessed: false, status: 'Normal', behaviorNote: 'Mendekat melalui lorong utama; kenakan topeng Freddy.' },
  { id: 1007, name: 'Toy Bonnie', form: 'Rabbit', seriesGame: 'FNAF 2', series: 'FNAF 2', threatLevel: 6, isPossessed: false, status: 'Normal', behaviorNote: 'Masuk melalui ventilasi kanan.' },
  { id: 1008, name: 'Toy Chica', form: 'Chicken', seriesGame: 'FNAF 2', series: 'FNAF 2', threatLevel: 6, isPossessed: false, status: 'Normal', behaviorNote: 'Masuk melalui ventilasi kiri.' },
  { id: 1009, name: 'Mangle', form: 'Fox', seriesGame: 'FNAF 2', series: 'FNAF 2', threatLevel: 8, isPossessed: true, status: 'Possessed', behaviorNote: 'Mengeluarkan gangguan frekuensi radio dari ventilasi kanan.' },
  { id: 1010, name: 'Balloon Boy', form: 'Human Robot', seriesGame: 'FNAF 2', series: 'FNAF 2', threatLevel: 5, isPossessed: false, status: 'Normal', behaviorNote: 'Melumpuhkan senter jika berhasil masuk ke kantor.' },
  { id: 1011, name: 'Marionette', form: 'Things', seriesGame: 'FNAF 2', series: 'FNAF 2', threatLevel: 9, isPossessed: true, status: 'Possessed', behaviorNote: 'Wajib memutar Music Box di CAM 11 secara berkala.' },
  { id: 1012, name: 'Withered Freddy', form: 'Bear', seriesGame: 'FNAF 2', series: 'FNAF 2', threatLevel: 8, isPossessed: true, status: 'Possessed', behaviorNote: 'Keluar dari Parts & Service menuju lorong utama.' },
  { id: 1013, name: 'Withered Bonnie', form: 'Rabbit', seriesGame: 'FNAF 2', series: 'FNAF 2', threatLevel: 8, isPossessed: true, status: 'Possessed', behaviorNote: 'Menyerang lewat ventilasi kiri.' },
  { id: 1014, name: 'Withered Chica', form: 'Chicken', seriesGame: 'FNAF 2', series: 'FNAF 2', threatLevel: 8, isPossessed: true, status: 'Possessed', behaviorNote: 'Menyerang lewat ventilasi kanan.' },
  { id: 1015, name: 'Withered Foxy', form: 'Fox', seriesGame: 'FNAF 2', series: 'FNAF 2', threatLevel: 9, isPossessed: true, status: 'Possessed', behaviorNote: 'Kebal terhadap topeng; sorot dengan senter berulang kali.' },
  { id: 1016, name: 'Withered Golden Freddy', form: 'Bear', seriesGame: 'FNAF 2', series: 'FNAF 2', threatLevel: 10, isPossessed: true, status: 'Possessed', behaviorNote: 'Muncul di lorong atau kantor; pakai topeng secepatnya.' },
  { id: 1017, name: 'Shadow Freddy', form: 'Bear', seriesGame: 'FNAF 2', series: 'FNAF 2', threatLevel: 7, isPossessed: true, status: 'Pasif', behaviorNote: 'Anomali bayangan langka di Parts & Service.' },
  { id: 1018, name: 'Shadow Bonnie', form: 'Rabbit', seriesGame: 'FNAF 2', series: 'FNAF 2', threatLevel: 7, isPossessed: true, status: 'Pasif', behaviorNote: 'Anomali bayangan yang muncul di sisi kiri kantor.' },

  // FNAF 3
  { id: 1019, name: 'Springtrap', form: 'Rabbit', seriesGame: 'FNAF 3', series: 'FNAF 3', threatLevel: 10, isPossessed: true, status: 'Possessed', behaviorNote: 'Pancing menjauh dengan Audio Lure dan segel jalur ventilasi.' },
  { id: 1020, name: 'Phantom Freddy', form: 'Bear', seriesGame: 'FNAF 3', series: 'FNAF 3', threatLevel: 5, isPossessed: true, status: 'Normal', behaviorNote: 'Berjalan di luar kaca depan kantor; buka monitor agar menghilang.' },
  { id: 1021, name: 'Phantom Chica', form: 'Chicken', seriesGame: 'FNAF 3', series: 'FNAF 3', threatLevel: 5, isPossessed: true, status: 'Normal', behaviorNote: 'Muncul di mesin arcade CAM 07.' },
  { id: 1022, name: 'Phantom Foxy', form: 'Fox', seriesGame: 'FNAF 3', series: 'FNAF 3', threatLevel: 6, isPossessed: true, status: 'Normal', behaviorNote: 'Menyergap di sisi kiri kantor jika tidak waspada.' },
  { id: 1023, name: 'Phantom Mangle', form: 'Fox', seriesGame: 'FNAF 3', series: 'FNAF 3', threatLevel: 5, isPossessed: true, status: 'Normal', behaviorNote: 'Mengganggu sistem audio saat terlihat di CAM 04.' },
  { id: 1024, name: 'Phantom Balloon Boy', form: 'Human Robot', seriesGame: 'FNAF 3', series: 'FNAF 3', threatLevel: 5, isPossessed: true, status: 'Normal', behaviorNote: 'Tutup kamera seketika saat wajahnya memenuhi layar.' },

  // FNAF 4
  { id: 1025, name: 'Nightmare Freddy', form: 'Bear', seriesGame: 'FNAF 4', series: 'FNAF 4', threatLevel: 8, isPossessed: true, status: 'Possessed', behaviorNote: 'Usir Freddles di atas kasur dengan senter secara berkala.' },
  { id: 1026, name: 'Nightmare Bonnie', form: 'Rabbit', seriesGame: 'FNAF 4', series: 'FNAF 4', threatLevel: 8, isPossessed: true, status: 'Possessed', behaviorNote: 'Dengarkan suara napas di pintu kiri sebelum menyalakan senter.' },
  { id: 1027, name: 'Nightmare Chica', form: 'Chicken', seriesGame: 'FNAF 4', series: 'FNAF 4', threatLevel: 8, isPossessed: true, status: 'Possessed', behaviorNote: 'Dengarkan suara napas di pintu kanan sebelum menyalakan senter.' },
  { id: 1028, name: 'Nightmare Foxy', form: 'Fox', seriesGame: 'FNAF 4', series: 'FNAF 4', threatLevel: 8, isPossessed: true, status: 'Possessed', behaviorNote: 'Periksa lemari tengah (Closet) dan tahan pintunya.' },
  { id: 1029, name: 'Nightmare Fredbear', form: 'Bear', seriesGame: 'FNAF 4', series: 'FNAF 4', threatLevel: 10, isPossessed: true, status: 'Possessed', behaviorNote: 'Bergerak sangat cepat di semua sisi kamar dan lemari.' },
  { id: 1030, name: 'Nightmare', form: 'Bear', seriesGame: 'FNAF 4', series: 'FNAF 4', threatLevel: 10, isPossessed: true, status: 'Possessed', behaviorNote: 'Wujud bayangan transparan dengan tingkat agresi tertinggi.' },
  { id: 1031, name: 'Plushtrap', form: 'Rabbit', seriesGame: 'FNAF 4', series: 'FNAF 4', threatLevel: 5, isPossessed: false, status: 'Normal', behaviorNote: 'Hentikan tepat di atas tanda silang (X) dengan senter.' },
  { id: 1032, name: 'Nightmare Balloon Boy', form: 'Human Robot', seriesGame: 'FNAF 4', series: 'FNAF 4', threatLevel: 6, isPossessed: false, status: 'Normal', behaviorNote: 'Varian mimpi buruk di lorong kursi.' },
  { id: 1033, name: 'Nightmare Mangle', form: 'Fox', seriesGame: 'FNAF 4', series: 'FNAF 4', threatLevel: 8, isPossessed: true, status: 'Possessed', behaviorNote: 'Menimbulkan statis radio di dalam lemari tengah.' },
  { id: 1034, name: 'Nightmarionette', form: 'Things', seriesGame: 'FNAF 4', series: 'FNAF 4', threatLevel: 10, isPossessed: true, status: 'Possessed', behaviorNote: 'Menggantikan posisi Nightmare di malam terakhir.' },

  // FNAF: Sister Location
  { id: 1035, name: 'Circus Baby', form: 'Human Robot', seriesGame: 'FNAF: Sister Location', series: 'FNAF: Sister Location', threatLevel: 9, isPossessed: true, status: 'Possessed', behaviorNote: 'Memandu sekaligus memanipulasi teknisi di fasilitas bawah tanah.' },
  { id: 1036, name: 'Ballora', form: 'Human Robot', seriesGame: 'FNAF: Sister Location', series: 'FNAF: Sister Location', threatLevel: 8, isPossessed: true, status: 'Possessed', behaviorNote: 'Sangat peka terhadap suara langkah; berhenti saat musik mendekat.' },
  { id: 1037, name: 'Funtime Freddy (+ Bon Bon)', form: 'Bear', seriesGame: 'FNAF: Sister Location', series: 'FNAF: Sister Location', threatLevel: 8, isPossessed: true, status: 'Possessed', behaviorNote: 'Gunakan Audio Lure untuk menahan pergerakannya di Breaker Room.' },
  { id: 1038, name: 'Funtime Foxy', form: 'Fox', seriesGame: 'FNAF: Sister Location', series: 'FNAF: Sister Location', threatLevel: 8, isPossessed: false, status: 'Normal', behaviorNote: 'Gunakan Flash Beacon secara hemat saat melintasi Funtime Auditorium.' },
  { id: 1039, name: 'Ennard', form: 'Things', seriesGame: 'FNAF: Sister Location', series: 'FNAF: Sister Location', threatLevel: 10, isPossessed: true, status: 'Possessed', behaviorNote: 'Gabungan seluruh endoskeleton di Private Room.' },
  { id: 1040, name: 'Yenndo', form: 'Bear', seriesGame: 'FNAF: Sister Location', series: 'FNAF: Sister Location', threatLevel: 7, isPossessed: false, status: 'Normal', behaviorNote: 'Endoskeleton beruang yang menguras oksigen bila ditatap lama.' },
  { id: 1041, name: 'Bonnett', form: 'Rabbit', seriesGame: 'FNAF: Sister Location', series: 'FNAF: Sister Location', threatLevel: 5, isPossessed: false, status: 'Normal', behaviorNote: 'Klik hidungnya saat melintas di layar kantor.' },

  // Freddy Fazbear's Pizzeria Simulator
  { id: 1042, name: 'Happy Frog', form: 'Frog', seriesGame: "Freddy Fazbear's Pizzeria Simulator", series: "Freddy Fazbear's Pizzeria Simulator", threatLevel: 2, isPossessed: false, status: 'Pasif', behaviorNote: 'Unit panggung utama grup Mediocre Melodies.' },
  { id: 1043, name: 'Mr Hippo', form: 'Hippo', seriesGame: "Freddy Fazbear's Pizzeria Simulator", series: "Freddy Fazbear's Pizzeria Simulator", threatLevel: 2, isPossessed: false, status: 'Pasif', behaviorNote: 'Unit panggung utama yang gemar bercerita panjang.' },
  { id: 1044, name: 'Pigpatch', form: 'Pig', seriesGame: "Freddy Fazbear's Pizzeria Simulator", series: "Freddy Fazbear's Pizzeria Simulator", threatLevel: 2, isPossessed: false, status: 'Pasif', behaviorNote: 'Pemain banjo di panggung Mediocre Melodies.' },
  { id: 1045, name: 'NeddBear', form: 'Bear', seriesGame: "Freddy Fazbear's Pizzeria Simulator", series: "Freddy Fazbear's Pizzeria Simulator", threatLevel: 2, isPossessed: false, status: 'Pasif', behaviorNote: 'Unit beruang pasif di panggung utama.' },
  { id: 1046, name: 'Music Man', form: 'Things', seriesGame: "Freddy Fazbear's Pizzeria Simulator", series: "Freddy Fazbear's Pizzeria Simulator", threatLevel: 3, isPossessed: false, status: 'Pasif', behaviorNote: 'Sensitif terhadap kebisingan simbal.' },
  { id: 1047, name: 'El Chip', form: 'Things', seriesGame: "Freddy Fazbear's Pizzeria Simulator", series: "Freddy Fazbear's Pizzeria Simulator", threatLevel: 2, isPossessed: false, status: 'Pasif', behaviorNote: 'Maskot restoran bertema fiesta.' },
  { id: 1048, name: 'Funtime Chica', form: 'Chicken', seriesGame: "Freddy Fazbear's Pizzeria Simulator", series: "Freddy Fazbear's Pizzeria Simulator", threatLevel: 2, isPossessed: false, status: 'Pasif', behaviorNote: 'Unit atraksi panggung utama.' },
  { id: 1049, name: 'Rockstar Freddy', form: 'Bear', seriesGame: "Freddy Fazbear's Pizzeria Simulator", series: "Freddy Fazbear's Pizzeria Simulator", threatLevel: 3, isPossessed: false, status: 'Pasif', behaviorNote: 'Vokalis utama Rockstar Main Stage.' },
  { id: 1050, name: 'Rockstar Bonnie', form: 'Rabbit', seriesGame: "Freddy Fazbear's Pizzeria Simulator", series: "Freddy Fazbear's Pizzeria Simulator", threatLevel: 3, isPossessed: false, status: 'Pasif', behaviorNote: 'Gitaris utama Rockstar Main Stage.' },
  { id: 1051, name: 'Rockstar Chica', form: 'Chicken', seriesGame: "Freddy Fazbear's Pizzeria Simulator", series: "Freddy Fazbear's Pizzeria Simulator", threatLevel: 3, isPossessed: false, status: 'Pasif', behaviorNote: 'Pemain marakas di Rockstar Main Stage.' },
  { id: 1052, name: 'Rockstar Foxy', form: 'Fox', seriesGame: "Freddy Fazbear's Pizzeria Simulator", series: "Freddy Fazbear's Pizzeria Simulator", threatLevel: 3, isPossessed: false, status: 'Pasif', behaviorNote: 'Memiliki burung beo pendamping di Foxy Stage.' },
  { id: 1053, name: 'Security Puppet', form: 'Things', seriesGame: "Freddy Fazbear's Pizzeria Simulator", series: "Freddy Fazbear's Pizzeria Simulator", threatLevel: 1, isPossessed: false, status: 'Pasif', behaviorNote: 'Sistem pengawas gelang keamanan anak.' },
  { id: 1054, name: 'Candy Cadet', form: 'Things', seriesGame: "Freddy Fazbear's Pizzeria Simulator", series: "Freddy Fazbear's Pizzeria Simulator", threatLevel: 1, isPossessed: false, status: 'Pasif', behaviorNote: 'Robot dispenser permen dan kisah misteri.' },
  { id: 1055, name: 'Helpy', form: 'Bear', seriesGame: "Freddy Fazbear's Pizzeria Simulator", series: "Freddy Fazbear's Pizzeria Simulator", threatLevel: 1, isPossessed: false, status: 'Pasif', behaviorNote: 'Asisten mini manajer di ruang kantor.' },
  { id: 1056, name: 'Molten Freddy', form: 'Bear', seriesGame: "Freddy Fazbear's Pizzeria Simulator", series: "Freddy Fazbear's Pizzeria Simulator", threatLevel: 9, isPossessed: true, status: 'Possessed', behaviorNote: 'Bergerak cepat di ventilasi labirin bawah tanah.' },
  { id: 1057, name: 'Scraptrap', form: 'Rabbit', seriesGame: "Freddy Fazbear's Pizzeria Simulator", series: "Freddy Fazbear's Pizzeria Simulator", threatLevel: 10, isPossessed: true, status: 'Possessed', behaviorNote: 'Menyusup melalui saluran ventilasi bawah tanah.' },
  { id: 1058, name: 'Scrap Baby', form: 'Human Robot', seriesGame: "Freddy Fazbear's Pizzeria Simulator", series: "Freddy Fazbear's Pizzeria Simulator", threatLevel: 10, isPossessed: true, status: 'Possessed', behaviorNote: 'Gunakan Taser saat melakukan salvage.' },
  { id: 1059, name: 'Lefty', form: 'Bear', seriesGame: "Freddy Fazbear's Pizzeria Simulator", series: "Freddy Fazbear's Pizzeria Simulator", threatLevel: 9, isPossessed: true, status: 'Possessed', behaviorNote: 'Menyimpan Marionette di dalam cangkangnya.' },

  // FNAF: Help Wanted
  { id: 1060, name: 'Dreadbear', form: 'Bear', seriesGame: 'FNAF: Help Wanted', series: 'FNAF: Help Wanted', threatLevel: 8, isPossessed: false, status: 'Normal', behaviorNote: 'Entitas eksperimen di Curse of Dreadbear Hub.' },
  { id: 1061, name: 'Glitchtrap', form: 'Rabbit', seriesGame: 'FNAF: Help Wanted', series: 'FNAF: Help Wanted', threatLevel: 10, isPossessed: true, status: 'Possessed', behaviorNote: 'Anomali digital yang mencoba mengambil alih kesadaran pengguna VR.' },

  // FNAF: Security Breach
  { id: 1062, name: 'Glamrock Freddy', form: 'Bear', seriesGame: 'FNAF: Security Breach', series: 'FNAF: Security Breach', threatLevel: 1, isPossessed: false, status: 'Pasif', behaviorNote: 'Mode aman aktif; melindungi dan membantu navigasi di Pizzaplex.' },
  { id: 1063, name: 'Glamrock Chica', form: 'Chicken', seriesGame: 'FNAF: Security Breach', series: 'FNAF: Security Breach', threatLevel: 8, isPossessed: false, status: 'Normal', behaviorNote: 'Berpatroli di Main Atrium dan mudah terdistraksi oleh makanan.' },
  { id: 1064, name: 'Roxanne Wolf', form: 'Wolf', seriesGame: 'FNAF: Security Breach', series: 'FNAF: Security Breach', threatLevel: 8, isPossessed: false, status: 'Normal', behaviorNote: 'Dilengkapi mata pelacak yang mampu mendeteksi menembus dinding.' },
  { id: 1065, name: 'Montgomery Gator', form: 'Gator', seriesGame: 'FNAF: Security Breach', series: 'FNAF: Security Breach', threatLevel: 9, isPossessed: false, status: 'Normal', behaviorNote: 'Memiliki kekuatan fisik tinggi untuk mendobrak gerbang keamanan.' },
  { id: 1066, name: 'Sun & Moon', form: 'Human Robot', seriesGame: 'FNAF: Security Breach', series: 'FNAF: Security Breach', threatLevel: 9, isPossessed: false, status: 'Normal', behaviorNote: 'Sun bersikap ramah saat terang; Moon berburu saat lampu padam.' },
  { id: 1067, name: 'Glamrock Bonnie', form: 'Rabbit', seriesGame: 'FNAF: Security Breach', series: 'FNAF: Security Breach', threatLevel: 2, isPossessed: false, status: 'Pasif', behaviorNote: 'Arsip unit lama dari Bonnie Bowl.' },
  { id: 1068, name: 'Vanny', form: 'Rabbit', seriesGame: 'FNAF: Security Breach', series: 'FNAF: Security Breach', threatLevel: 9, isPossessed: true, status: 'Possessed', behaviorNote: 'Mengganggu sinyal kamera Fazwatch saat berada di dekat lokasi.' },
  { id: 1069, name: 'The Blob', form: 'Things', seriesGame: 'FNAF: Security Breach', series: 'FNAF: Security Breach', threatLevel: 10, isPossessed: true, status: 'Possessed', behaviorNote: 'Massa kabel dan topeng animatronik raksasa di area Sinkhole.' },
  { id: 1070, name: 'Burntrap', form: 'Rabbit', seriesGame: 'FNAF: Security Breach', series: 'FNAF: Security Breach', threatLevel: 10, isPossessed: true, status: 'Possessed', behaviorNote: 'Berupaya membajak kendali Glamrock Freddy dari ruang bawah tanah.' },
];

// Preset Lengkap Tools untuk Akun Quick Demo (Nearbys / FAZ-0001)
const DEMO_ALL_TOOLS = [
  { id: 'TOOL-01', name: 'Heavy Security Blast Doors', capacity: '100% Hydraulic Power' },
  { id: 'TOOL-02', name: 'Freddy Fazbear Spare Mask', capacity: 'Unlimited (Manual Wear)' },
  { id: 'TOOL-03', name: 'High-Lumen Tactical Flashlight', capacity: '100% Battery Reserve' },
  { id: 'TOOL-04', name: 'Remote Music Box Winder', capacity: 'Continuous Signal Link' },
  { id: 'TOOL-05', name: 'Fazbear Audio Lure System', capacity: 'Unlimited (Cooldown 5s)' },
  { id: 'TOOL-06', name: 'Controlled Shock Taser', capacity: '3 High-Voltage Charges' },
  { id: 'TOOL-07', name: 'Fazcam Optical Stun', capacity: 'Rechargeable (15s Cooldown)' },
  { id: 'TOOL-08', name: 'Fazerblaster Laser', capacity: '6 Pulse Shots / Recharge' },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [guardName, setGuardName] = useState('');
  const [guardId, setSecurityId] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [animatronics, setAnimatronics] = useState([]);
  const [isLoadingArchives, setIsLoadingArchives] = useState(false);

  const [tools, setTools] = useState(() => {
    const saved = localStorage.getItem('fazbear_tools');
    return saved ? JSON.parse(saved) : [];
  });

  // Cek apakah akun yang sedang login adalah Quick Demo Personnel: Nearbys (FAZ-0001)
  const isDemoFullAccess = useMemo(() => {
    return (
      guardName.trim().toLowerCase() === 'nearbys' &&
      guardId.trim().toUpperCase() === 'FAZ-0001'
    );
  }, [guardName, guardId]);

  // Gabungkan data backend dengan seluruh preset jika akun adalah Nearbys (FAZ-0001)
  const effectiveAnimatronics = useMemo(() => {
    if (!isDemoFullAccess) return animatronics;

    const existingNames = new Set(animatronics.map((a) => a.name.toLowerCase().trim()));
    const missingPresets = DEMO_ALL_ANIMATRONICS.filter(
      (preset) => !existingNames.has(preset.name.toLowerCase().trim())
    );
    return [...animatronics, ...missingPresets];
  }, [animatronics, isDemoFullAccess]);

  // Gabungkan tools tersimpan dengan seluruh preset tools jika akun adalah Nearbys (FAZ-0001)
  const effectiveTools = useMemo(() => {
    if (!isDemoFullAccess) return tools;

    const existingToolNames = new Set(tools.map((t) => t.name.toLowerCase().trim()));
    const missingTools = DEMO_ALL_TOOLS.filter(
      (preset) => !existingToolNames.has(preset.name.toLowerCase().trim())
    );
    return [...tools, ...missingTools];
  }, [tools, isDemoFullAccess]);

  // Ambil data dari Backend NestJS
  const fetchAnimatronics = useCallback(async () => {
    setIsLoadingArchives(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Gagal mengambil data dari server NestJS');
      const data = await response.json();

      // Mapping seriesGame dari backend agar tetap kompatibel dengan SeriesGameSection & MapSection
      const normalized = data.map((item) => ({
        ...item,
        series: item.seriesGame,
      }));
      setAnimatronics(normalized);
    } catch (error) {
      console.error('Error fetching animatronics:', error);
    } finally {
      setIsLoadingArchives(false);
    }
  }, []);

  useEffect(() => {
    fetchAnimatronics();
  }, [fetchAnimatronics]);

  useEffect(() => {
    localStorage.setItem('fazbear_tools', JSON.stringify(tools));
  }, [tools]);

  const handleLogin = ({ name, id }) => {
    setGuardName(name);
    setSecurityId(id);
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setGuardName('');
    setSecurityId('');
    setIsProfileOpen(false);
    setActiveTab('dashboard');
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] flex flex-col relative selection:bg-[#EA580C] selection:text-white">
      {/* Background CRT and grid scanline atmosphere with subtle amber/orange glow */}
      <div className="fixed inset-0 bg-[radial-gradient(#222222_1px,transparent_1px)] [background-size:24px_24px] opacity-35 pointer-events-none" />
      <div className="crt-overlay fixed inset-0 pointer-events-none" />

      {/* Gabungan Topbar + Navbar Tabs */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        guardName={guardName}
        guardId={guardId}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        {activeTab === 'dashboard' && (
          <Dashboard
            guardName={guardName}
            guardId={guardId}
            onNavigateAbout={() => setActiveTab('about')}
          />
        )}
        {activeTab === 'archives' && (
          <ArchivesSection
            animatronics={effectiveAnimatronics}
            onRefresh={fetchAnimatronics}
            isLoading={isLoadingArchives}
          />
        )}
        {activeTab === 'about' && <AboutSection />}

        {activeTab === 'series' && (
          <SeriesGameSection
            animatronics={effectiveAnimatronics}
            onNavigateArchives={() => setActiveTab('archives')}
          />
        )}

        {activeTab === 'tools' && (
          <ToolsSection tools={effectiveTools} setTools={setTools} />
        )}

        {activeTab === 'story' && (
          <StoryGameSection
            animatronicsCount={effectiveAnimatronics.length}
            onNavigateArchives={() => setActiveTab('archives')}
          />
        )}
        {activeTab === 'map' && <MapSection animatronics={effectiveAnimatronics} />}
        {activeTab === 'camera' && <CameraSection />}
      </main>

      {/* Profile Popup Modal */}
      <ProfilePopup
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        guardName={guardName}
        guardId={guardId}
        onLogout={handleLogout}
      />

      {/* Footer */}
      <footer className="bg-[#141414] border-t border-[#2E2E2E] py-4 px-4 sm:px-6 lg:px-8 mt-auto relative z-10 text-center text-xs text-[#A3A3A3] font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Fazbear Archives // Security Management System v1.987</span>
          <span className="text-[#EA580C] font-semibold">STAY ALERT // 12:00 AM - 06:00 AM</span>
        </div>
      </footer>
    </div>
  );
}