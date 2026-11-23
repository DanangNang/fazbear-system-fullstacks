# 🐻 Fazbear Archives
> *"Another Night. Another Shift. Stay Alert."*

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

Fazbear Archives adalah aplikasi web **Security Management System** bertema dark industrial yang terinspirasi dari semesta **Five Nights at Freddy's (FNAF)**. Aplikasi ini dirancang sebagai terminal pengawasan internal bagi petugas keamanan shift malam untuk mendata entitas animatronic, memantau denah fasilitas dan jalur pergerakan, mengelola peralatan pertahanan (*counter tools*), serta menghubungkan feed kamera langsung melalui kabel data USB perangkat seluler.

Proyek ini dikembangkan menggunakan **React.js**, **Vite**, dan **Tailwind CSS** dengan penyimpanan data persisten berbasis `localStorage` serta integrasi browser API modern (WebRTC MediaDevices & Battery Status API).

## 📋 Fitur Utama

| Fitur | Deskripsi |
| :--- | :--- |
| 🔐 **Simulated Login** | Masuk ke terminal keamanan menggunakan nama petugas dan Security ID. |
| 📊 **Dashboard** | Pusat kendali shift malam dengan status operasional dan informasi utama sistem. |
| 🗂️ **Archives (CRUD)** | Pencatatan kartu entitas animatronic (nama, seri, lokasi, tingkat ancaman, catatan) lengkap dengan pop-up modal Edit dan Konfirmasi Hapus. |
| 🎮 **Series Game** | Katalog seri FNAF yang terbuka otomatis ketika minimal satu animatronic dari seri terkait telah dicatat di Archives, beserta modal detail entitas. |
| 🛠️ **Tools (CRUD)** | Manajemen peralatan pertahanan (*counter tools*) untuk menghadapi serangan animatronic lengkap dengan indikator kapasitas/daya tahan. |
| 📖 **Story Game** | Modul arsip lore yang terkunci hingga 10 entitas animatronic ditemukan, dilengkapi progress bar sinkronisasi data. |
| 🗺️ **Facility Map** | Denah interaktif fasilitas (FNAF 1 – Security Breach) yang terhubung dengan Archives; entitas yang belum tercatat tampil sebagai `????` dan jalur pergerakan menyala terang otomatis saat terbuka. |
| 📷 **CCTV Camera Feed** | Integrasi kamera HP melalui kabel data USB (Webcam / Iriun / DroidCam) dengan overlay monitor CCTV retro, mode Night Vision, pemilih kanal kamera, dan fitur Capture Snapshot. |
| 🔋 **Live Office Power** | Indikator `OFFICE POWER` pada header atas yang tersinkronisasi secara *real-time* dengan persentase baterai laptop menggunakan Battery Status API. |
| 👤 **Guard Profile & Log Out** | Pop-up profil petugas keamanan untuk melihat kredensial shift aktif dan keluar dari sistem. |

## 🔄 Alur Sistem

```text
Login
  |
  v
Header & Navigation Bar
  ├── [Header] Kamera (USB Live CCTV Feed) | Office Power (Live Battery) | Guard Profile
  |
  v
Dashboard
  ├──> Archives (CRUD Entitas Animatronic -> localStorage)
  |       ├──> Membuka kunci Series Game & Detail Entitas
  |       ├──> Membuka kunci & jalur terang pada Facility Map
  |       └──> Menghitung progres pembukaan Story Game (Target: 10 Entitas)
  ├──> Tools (CRUD Peralatan Counter & Kapasitas)
  ├──> Story Game (Progress Bar Sinkronisasi Lore)
  ├──> Map (Denah Fasilitas & Jalur Pergerakan SVG)
  └──> About (Informasi Sistem)
```

## 🛠️ Tech Stack & Browser API

- **Frontend:** React.js, Vite, JavaScript (JSX), Lucide React Icons
- **Styling:** Tailwind CSS (Dark Industrial Theme, *Chakra Petch* & *JetBrains Mono*)
- **State & Persistence:** React `useState`, `useEffect`, `localStorage`
- **Web APIs:**
  - **MediaDevices API (`navigator.mediaDevices`)**: Mendeteksi dan menampilkan stream video kamera HP via USB bridge.
  - **Battery Status API (`navigator.getBattery()`)**: Menyinkronkan indikator `OFFICE POWER` dengan persentase baterai perangkat.
- **Development Tools:** Node.js, npm, Git, GitHub

### Konsep React yang Diterapkan

- Modular Component Architecture & Props Drilling
- State Management & Side Effects (`useState`, `useEffect`)
- Persistent Storage Synchronization (`localStorage`)
- Controlled Forms & Modal Dialogs (Edit & Delete Confirmation)
- Dynamic List Rendering (`.map()`) & Conditional Unlock Logic

## 📁 Struktur Project

```text
fazbear-archives/
├── public/
├── src/
│   ├── components/
│   │   ├── LoginPage.jsx
│   │   ├── Navbar.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ArchivesSection.jsx
│   │   ├── SeriesGameSection.jsx
│   │   ├── ToolsSection.jsx
│   │   ├── StoryGameSection.jsx
│   │   ├── MapSection.jsx
│   │   ├── CameraSection.jsx
│   │   ├── AboutSection.jsx
│   │   └── ProfilePopup.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Cara Menjalankan Project

**1. Clone repository**

```bash
git clone [https://github.com/username/fazbear-archives.git](https://github.com/username/fazbear-archives.git)
cd fazbear-archives
```

**2. Install dependencies**

```bash
npm install
```

**3. Jalankan development server**

```bash
npm run dev
```

Buka alamat berikut pada browser:

```text
http://localhost:5173
```

**4. Menghubungkan Kamera HP via Kabel Data USB (Opsional)**

1. Sambungkan HP ke laptop/PC menggunakan kabel data USB.
2. Aktifkan mode **USB Webcam** pada pengaturan USB perangkat, atau jalankan aplikasi USB camera bridge seperti **Iriun Webcam** / **DroidCam**.
3. Klik tombol **Kamera** pada header atas aplikasi, pilih perangkat kamera USB pada dropdown, lalu tekan **Hubungkan Kamera**.

## 📌 Catatan Pengembangan

- Seluruh data pada **Archives** dan **Tools** tersimpan secara persisten di `localStorage` browser sehingga tidak hilang saat halaman dimuat ulang.
- Sinkronisasi baterai `OFFICE POWER` berjalan optimal pada browser berbasis Chromium (Microsoft Edge, Google Chrome) yang mendukung Battery Status API.
- Aplikasi berjalan sepenuhnya di sisi klien (*client-side*) tanpa memerlukan server backend eksternal.

## 🔮 Future Development

- Integrasi backend API dan database cloud untuk sinkronisasi lintas perangkat.
- Sistem autentikasi petugas keamanan berbasis token (JWT).
- Mode simulasi shift malam interaktif dengan konsumsi daya dan audio peringatan animatronic.
- Fitur ekspor/impor data arsip dalam format JSON atau PDF.

<p align="center">
  <strong>FAZBEAR ARCHIVES</strong><br>
  <em>"Another Night. Another Shift. Stay Alert."</em><br><br>
  Made with React and inspired by the Five Nights at Freddy's universe.
</p>