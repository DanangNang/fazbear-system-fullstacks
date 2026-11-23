# 🐻 Fazbear Archives (Fullstack)
> *"Another Night. Another Shift. Stay Alert."*

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)

Fazbear Archives adalah aplikasi web fullstack **Security Management System** bertema dark industrial yang terinspirasi dari semesta **Five Nights at Freddy's (FNAF)**. Aplikasi ini dirancang sebagai terminal pengawasan internal bagi petugas keamanan shift malam untuk mendata entitas animatronic melalui REST API **NestJS**, memantau denah fasilitas dan jalur pergerakan, mengelola peralatan pertahanan (*counter tools*), serta menghubungkan feed kamera langsung melalui kabel data USB perangkat seluler.

Proyek ini merupakan pengembangan lanjutan dari repository frontend sebelumnya ([DanangNang/fazbear-archives](https://github.com/DanangNang/fazbear-archives)) dengan menambahkan pondasi backend berbasis **NestJS** berarsitektur **MVC (Model-View-Controller)**, validasi DTO global, dan *exception handling*.

---

## 📋 Fitur Utama

| Fitur | Deskripsi |
| :--- | :--- |
| 🔐 **Simulated Login** | Masuk ke terminal keamanan menggunakan nama petugas dan Security ID. |
| 📊 **Dashboard** | Pusat kendali shift malam dengan status operasional dan informasi utama sistem. |
| 🗂️ **Archives (Fullstack CRUD)** | Pencatatan kartu entitas animatronic (`id`, `name`, `form`, `seriesGame`, `threatLevel`, `isPossessed`, `behaviorNote`, `loggedAt`) yang terintegrasi penuh dengan REST API NestJS (`GET`, `POST`, `PATCH`, `DELETE`). |
| 🎮 **Series Game** | Katalog seri FNAF yang terbuka otomatis ketika minimal satu animatronic dari seri terkait telah dicatat di Archives, beserta modal detail entitas. |
| 🛠️ **Tools (CRUD)** | Manajemen peralatan pertahanan (*counter tools*) untuk menghadapi serangan animatronic lengkap dengan indikator kapasitas/daya tahan. |
| 📖 **Story Game** | Modul arsip lore yang terkunci hingga 10 entitas animatronic ditemukan, dilengkapi progress bar sinkronisasi data. |
| 🗺️ **Facility Map** | Denah interaktif fasilitas (FNAF 1 – Security Breach) yang terhubung dengan Archives; entitas yang belum tercatat tampil sebagai `????` dan jalur pergerakan menyala terang otomatis saat terbuka. |
| 📷 **CCTV Camera Feed** | Integrasi kamera HP melalui kabel data USB (Webcam / Iriun / DroidCam) dengan overlay monitor CCTV retro, mode Night Vision, pemilih kanal kamera, dan fitur Capture Snapshot. |
| 🔋 **Live Office Power** | Indikator `OFFICE POWER` pada header atas yang tersinkronisasi secara *real-time* dengan persentase baterai laptop menggunakan Battery Status API. |
| 👤 **Guard Profile & Log Out** | Pop-up profil petugas keamanan untuk melihat kredensial shift aktif dan keluar dari sistem. |

---

## 🔄 Alur Sistem Fullstack

```text
Login
  |
  v
Header & Navigation Bar
  ├── [Header] Kamera (USB Live CCTV Feed) | Office Power (Live Battery) | Guard Profile
  |
  v
Dashboard
  ├──> Archives <══[REST API: GET, POST, PATCH, DELETE]══> NestJS Backend (Port 3000)
  |       ├──> Membuka kunci Series Game & Detail Entitas        └──> MVC (Controller -> Service -> In-Memory Array)
  |       ├──> Membuka kunci & jalur terang pada Facility Map
  |       └──> Menghitung progres pembukaan Story Game (Target: 10 Entitas)
  ├──> Tools (CRUD Peralatan Counter & Kapasitas)
  ├──> Story Game (Progress Bar Sinkronisasi Lore)
  ├──> Map (Denah Fasilitas & Jalur Pergerakan SVG)
  └──> About (Informasi Sistem)
```

---

## ⚙️ Arsitektur Backend NestJS (`resource: animatronics`)

Backend dibangun mengikuti struktur **MVC (Model-View-Controller)** dengan detail spesifikasi:
- **Entity (`Animatronic`)**: Merepresentasikan struktur data utama dengan 8 field bertipe variatif (`id: number`, `name: string`, `form: string`, `seriesGame: string`, `threatLevel: number`, `isPossessed: boolean`, `behaviorNote?: string`, `loggedAt: string`).
- **Service (`AnimatronicsService`)**: Mengimplementasikan operasi CRUD lengkap (`create`, `findAll`, `findOne`, `update`, `remove`) dengan penyimpanan array sementara di memori (*in-memory*).
- **Controller (`AnimatronicsController`)**: Menyediakan endpoint `GET /animatronics`, `GET /animatronics/:id`, `POST /animatronics`, `PATCH /animatronics/:id`, dan `DELETE /animatronics/:id` menggunakan *Dependency Injection* melalui `constructor`.
- **DTO & Global ValidationPipe**: Validasi request body pada `CreateAnimatronicDto` dan `UpdateAnimatronicDto` menggunakan `class-validator` (`@IsString`, `@MinLength`, `@IsIn`, `@IsInt`, `@Min`, `@Max`, `@IsBoolean`, `@IsOptional`) yang diaktifkan secara global di `main.ts`.
- **Exception Handling**:
  - `ConflictException (409)`: Menolak penambahan atau pembaruan entitas dengan nama yang sudah terdaftar di arsip Fazbear.
  - `NotFoundException (404)`: Menangani request `GET`, `PATCH`, atau `DELETE` untuk ID entitas yang tidak ditemukan.

---

## 🛠️ Tech Stack & Browser API

- **Frontend:** React.js, Vite, JavaScript (JSX), Tailwind CSS, Lucide React Icons
- **Backend:** NestJS, TypeScript, `class-validator`, `class-transformer`, `@nestjs/mapped-types`
- **Web APIs:**
  - **Fetch API**: Komunikasi asinkron antara React Frontend dan NestJS Backend.
  - **MediaDevices API (`navigator.mediaDevices`)**: Mendeteksi dan menampilkan stream video kamera HP via USB bridge.
  - **Battery Status API (`navigator.getBattery()`)**: Menyinkronkan indikator `OFFICE POWER` dengan persentase baterai perangkat.
- **Development Tools:** Node.js, npm, VS Code REST Client, Git, GitHub

---

## 📁 Struktur Project

```text
fazbear-system-fullstacks/
├── backend/                          # Backend REST API (NestJS + TypeScript)
│   ├── src/
│   │   ├── animatronics/
│   │   │   ├── dto/
│   │   │   │   ├── create-animatronic.dto.ts
│   │   │   │   └── update-animatronic.dto.ts
│   │   │   ├── entities/
│   │   │   │   └── animatronic.entity.ts
│   │   │   ├── animatronics.controller.ts
│   │   │   ├── animatronics.module.ts
│   │   │   └── animatronics.service.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── test-api.http                 # File pengujian endpoint REST Client
│   └── package.json
├── frontend/                         # Frontend Web App (React + Vite + Tailwind CSS)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ArchivesSection.jsx
│   │   │   ├── SeriesGameSection.jsx
│   │   │   ├── ToolsSection.jsx
│   │   │   ├── StoryGameSection.jsx
│   │   │   ├── MapSection.jsx
│   │   │   ├── CameraSection.jsx
│   │   │   ├── AboutSection.jsx
│   │   │   └── ProfilePopup.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── docs/
│   └── screenshots/                  # Dokumentasi screenshot pengujian API & Frontend
└── README.md
```

---

## 🚀 Cara Menjalankan Project

**1. Clone repository**

```bash
git clone [https://github.com/DanangNang/fazbear-system-fullstacks.git](https://github.com/DanangNang/fazbear-system-fullstacks.git)
cd fazbear-system-fullstacks
```

**2. Jalankan Backend Server (NestJS)**

```bash
cd backend
npm install
npm run start:dev
```

Backend API akan berjalan pada:

```text
http://localhost:3000/animatronics
```

**3. Jalankan Frontend Client (React + Vite)**

Buka terminal baru pada root proyek, lalu jalankan:

```bash
cd frontend
npm install
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

---

## 📸 Dokumentasi Pengujian (Screenshots)

### 1. Setup NestJS & Generate Resource MVC
![Setup NestJS Resource](docs/screenshots/01-setup-nestjs.png)

### 2. Pengujian Endpoint via REST Client
- **GET All Animatronics (`200 OK`)**
  ![GET All](docs/screenshots/02-rest-get-all.png)
- **POST Create Animatronic (`201 Created`)**
  ![POST Create](docs/screenshots/03-rest-post-create.png)
- **GET One Animatronic by ID (`200 OK`)**
  ![GET One](docs/screenshots/04-rest-get-one.png)
- **PATCH Update Animatronic (`200 OK`)**
  ![PATCH Update](docs/screenshots/05-rest-patch-update.png)
- **DELETE Animatronic (`200 OK`)**
  ![DELETE](docs/screenshots/06-rest-delete.png)

### 3. Pengujian Exception Handling & Validasi DTO
- **ConflictException (`409 Conflict` — Data Duplikat)**
  ![Error 409](docs/screenshots/07-rest-error-conflict-409.png)
- **NotFoundException (`404 Not Found` — ID Tidak Ditemukan)**
  ![Error 404](docs/screenshots/08-rest-error-notfound-404.png)
- **ValidationPipe (`400 Bad Request` — Validasi Input DTO)**
  ![Error 400](docs/screenshots/09-rest-error-validation-400.png)

### 4. Integrasi Fullstack (Frontend React + Backend NestJS)
- **Menambah Data (`POST`) dari Halaman Archives**
  ![Frontend Create](docs/screenshots/10-fe-create.png)
- **Mengubah Data (`PATCH`) melalui Modal Edit**
  ![Frontend Update](docs/screenshots/11-fe-update.png)
- **Menghapus Data (`DELETE`) melalui Modal Konfirmasi**
  ![Frontend Delete](docs/screenshots/12-fe-delete.png)

---

## 📌 Catatan Pengembangan

- Data pada fitur utama **Archives** kini dikelola secara penuh oleh server **NestJS** menggunakan penyimpanan *in-memory* array, sedangkan data pendukung **Tools** tetap tersimpan di `localStorage` browser.
- Sinkronisasi baterai `OFFICE POWER` berjalan optimal pada browser berbasis Chromium (Microsoft Edge, Google Chrome) yang mendukung Battery Status API.

## 🔮 Future Development

- Integrasi database persisten (PostgreSQL / SQLite dengan Prisma atau TypeORM) untuk menggantikan penyimpanan *in-memory* array.
- Pembuatan resource backend tambahan untuk manajemen **Tools** dan autentikasi petugas keamanan berbasis token (JWT).
- Mode simulasi shift malam interaktif dengan konsumsi daya dan audio peringatan animatronic.

<p align="center">
  <strong>FAZBEAR ARCHIVES</strong><br>
  <em>"Another Night. Another Shift. Stay Alert."</em><br><br>
  Made with React & NestJS — Inspired by the Five Nights at Freddy's universe.
</p>