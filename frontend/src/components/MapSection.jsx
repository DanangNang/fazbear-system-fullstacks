import React, { useState, useEffect } from 'react';
import { Map, Eye, HelpCircle, Navigation, Layers, Shield, AlertCircle, Video } from 'lucide-react';

const SERIES_MAPS = [
    {
        id: 'FNAF 1',
        title: 'FNAF 1 // Freddy Fazbear’s Pizza',
        subtitle: 'Denah Utama Pos Keamanan, Koridor Barat-Timur & 11 Kamera CCTV',
        floors: [
            {
                id: 'FNAF1-L1',
                label: 'Lantai 1 (Main Floor)',
                cameras: [
                    { code: 'CAM 1A', name: 'Show Stage', x: 350, y: 80 },
                    { code: 'CAM 1B', name: 'Dining Area', x: 350, y: 185 },
                    { code: 'CAM 1C', name: 'Pirate Cove', x: 95, y: 218 },
                    { code: 'CAM 5', name: 'Backstage', x: 95, y: 120 },
                    { code: 'CAM 7', name: 'Restrooms', x: 605, y: 135 },
                    { code: 'CAM 6', name: 'Kitchen (Audio)', x: 615, y: 315 },
                    { code: 'CAM 3', name: 'Supply Closet', x: 162, y: 360 },
                    { code: 'CAM 2A', name: 'West Hall', x: 248, y: 315 },
                    { code: 'CAM 2B', name: 'W. Hall Corner', x: 248, y: 425 },
                    { code: 'CAM 4A', name: 'East Hall', x: 452, y: 315 },
                    { code: 'CAM 4B', name: 'E. Hall Corner', x: 452, y: 425 },
                ],
                rooms: [
                    { id: 'stage', label: 'SHOW STAGE', x: 240, y: 25, w: 220, h: 65 },
                    { id: 'dining', label: 'DINING AREA', x: 130, y: 105, w: 440, h: 175 },
                    { id: 'backstage', label: 'BACKSTAGE', x: 35, y: 105, w: 75, h: 85 },
                    { id: 'pirate', label: 'PIRATE COVE', x: 45, y: 205, w: 65, h: 75 },
                    { id: 'restrooms', label: 'RESTROOMS', x: 590, y: 120, w: 65, h: 145 },
                    { id: 'kitchen', label: 'KITCHEN', x: 530, y: 295, w: 125, h: 95 },
                    { id: 'supply', label: 'SUPPLY CLOSET', x: 145, y: 345, w: 65, h: 75 },
                    { id: 'westhall', label: 'WEST HALL', x: 230, y: 295, w: 65, h: 145 },
                    { id: 'easthall', label: 'EAST HALL', x: 405, y: 295, w: 65, h: 145 },
                    { id: 'hallway_mid', label: 'HALL BUFFER', x: 315, y: 335, w: 70, h: 45 },
                    { id: 'office', label: 'YOU (OFFICE)', x: 315, y: 390, w: 70, h: 50, isYou: true },
                ],
                connectors: [
                    'M350,90 L350,105',
                    'M110,145 L130,145',
                    'M110,240 L130,240',
                    'M570,180 L590,180',
                    'M565,280 L565,295',
                    'M262,280 L262,295',
                    'M437,280 L437,295',
                    'M210,382 L230,382',
                    'M295,415 L315,415',
                    'M385,415 L405,415',
                ],
                entities: [
                    { name: 'Bonnie The Bunny', x: 285, y: 58, color: '#6366F1', path: 'M285,58 L262,180 L262,415 L315,415' },
                    { name: 'Freddy Fazbear', x: 350, y: 58, color: '#92400E', path: 'M350,58 L437,180 L437,415 L385,415' },
                    { name: 'Chica The Chick', x: 415, y: 58, color: '#FACC15', path: 'M415,58 L437,230 L437,415 L385,415' },
                    { name: 'Foxy The Pirate', x: 77, y: 242, color: '#DC2626', path: 'M77,242 L262,242 L262,415 L315,415' },
                    { name: 'Golden Freddy', x: 350, y: 357, color: '#EAB308', ring: true, path: 'M350,357 L350,390' },
                ],
            },
        ],
    },
    {
        id: 'FNAF 2',
        title: 'FNAF 2 // New Freddy Fazbear’s Pizza',
        subtitle: 'Denah Party Rooms, Main Hall, Prize Corner & 12 Kamera CCTV',
        floors: [
            {
                id: 'FNAF2-L1',
                label: 'Lantai 1 (Main Floor)',
                cameras: [
                    { code: 'CAM 01', name: 'Party Room 1', x: 85, y: 235 },
                    { code: 'CAM 02', name: 'Party Room 2', x: 390, y: 235 },
                    { code: 'CAM 03', name: 'Party Room 3', x: 85, y: 310 },
                    { code: 'CAM 04', name: 'Party Room 4', x: 390, y: 310 },
                    { code: 'CAM 05', name: 'Left Air Vent', x: 125, y: 408 },
                    { code: 'CAM 06', name: 'Right Air Vent', x: 355, y: 408 },
                    { code: 'CAM 07', name: 'Main Hall', x: 310, y: 170 },
                    { code: 'CAM 08', name: 'Parts / Service', x: 145, y: 165 },
                    { code: 'CAM 09', name: 'Show Stage', x: 547, y: 92 },
                    { code: 'CAM 10', name: 'Game Area', x: 540, y: 185 },
                    { code: 'CAM 11', name: 'Prize Corner', x: 612, y: 320 },
                    { code: 'CAM 12', name: 'Kids Cove', x: 465, y: 120 },
                ],
                rooms: [
                    { id: 'parts', label: 'PARTS / SERVICE', x: 45, y: 35, w: 120, h: 145 },
                    { id: 'top1', label: 'HALL ANNEX A', x: 225, y: 30, w: 75, h: 45 },
                    { id: 'top2', label: 'HALL ANNEX B', x: 325, y: 30, w: 75, h: 45 },
                    { id: 'stage2', label: 'SHOW STAGE', x: 475, y: 45, w: 145, h: 55 },
                    { id: 'mainhall', label: 'MAIN HALL', x: 195, y: 100, w: 235, h: 90 },
                    { id: 'gamearea', label: 'GAME AREA', x: 445, y: 100, w: 210, h: 185 },
                    { id: 'prize', label: 'PRIZE CORNER', x: 545, y: 305, w: 85, h: 75 },
                    { id: 'corridor', label: 'CENTER HALL', x: 195, y: 205, w: 85, h: 175 },
                    { id: 'pr1', label: 'PARTY 1', x: 65, y: 220, w: 110, h: 55 },
                    { id: 'pr2', label: 'PARTY 2', x: 300, y: 220, w: 110, h: 55 },
                    { id: 'pr3', label: 'PARTY 3', x: 65, y: 295, w: 110, h: 55 },
                    { id: 'pr4', label: 'PARTY 4', x: 300, y: 295, w: 110, h: 55 },
                    { id: 'office2', label: 'YOU (OFFICE)', x: 195, y: 395, w: 85, h: 50, isYou: true },
                ],
                connectors: [
                    'M165,135 L195,135',
                    'M262,75 L262,100',
                    'M362,75 L362,100',
                    'M430,145 L445,145',
                    'M587,285 L587,305',
                    'M237,190 L237,205',
                    'M175,247 L195,247',
                    'M280,247 L300,247',
                    'M175,322 L195,322',
                    'M280,322 L300,322',
                    'M237,380 L237,395',
                    'M105,350 L105,420 L195,420',
                    'M375,350 L375,420 L280,420',
                ],
                entities: [
                    { name: 'Toy Bonnie', x: 505, y: 72, color: '#06B6D4', path: 'M505,72 L355,247 L375,420 L280,420' },
                    { name: 'Toy Freddy', x: 547, y: 72, color: '#92400E', path: 'M547,72 L310,145 L237,290 L237,395' },
                    { name: 'Toy Chica', x: 590, y: 72, color: '#FACC15', path: 'M590,72 L237,145 L120,322 L105,420 L195,420' },
                    { name: 'Balloon Boy', x: 475, y: 245, color: '#3B82F6', path: 'M475,245 L237,245 L105,322 L105,420 L195,420' },
                    { name: 'Marionette', x: 635, y: 195, color: '#F5F5F5', ring: true, path: 'M635,195 L310,145 L237,395' },
                    { name: 'Mangle', x: 587, y: 342, color: '#F472B6', path: 'M587,342 L445,200 L375,322 L375,420 L280,420' },
                    { name: 'Withered Bonnie', x: 75, y: 65, color: '#6366F1', path: 'M75,65 L237,145 L105,322 L105,420 L195,420' },
                    { name: 'Withered Freddy', x: 135, y: 65, color: '#78350F', path: 'M135,65 L237,145 L237,395' },
                    { name: 'Withered Chica', x: 75, y: 135, color: '#CA8A04', path: 'M75,135 L237,145 L375,322 L375,420 L280,420' },
                    { name: 'Withered Foxy', x: 135, y: 135, color: '#DC2626', ring: true, path: 'M135,135 L237,145 L237,395' },
                    { name: 'Shadow Freddy', x: 105, y: 100, color: '#A855F7', ring: true, path: 'M105,100 L237,145 L237,395' },
                    { name: 'Withered Golden Freddy', x: 215, y: 410, color: '#EAB308', ring: true, path: 'M215,410 L237,420' },
                    { name: 'Shadow Bonnie', x: 260, y: 410, color: '#C084FC', ring: true, path: 'M260,410 L237,420' },
                ],
            },
        ],
    },
    {
        id: 'FNAF 3',
        title: 'FNAF 3 // Fazbear’s Fright Horror Attraction',
        subtitle: 'Denah Lorong Atraksi & 15 Kamera (10 Ruang + 5 Ventilasi)',
        floors: [
            {
                id: 'FNAF3-L1',
                label: 'Lantai 1 (Attraction Floor)',
                cameras: [
                    { code: 'CAM 01', name: 'Office Hall', x: 254, y: 405 },
                    { code: 'CAM 02', name: 'Hallway 02', x: 385, y: 315 },
                    { code: 'CAM 05', name: 'East Corridor', x: 498, y: 290 },
                    { code: 'CAM 06', name: 'Inner Corridor', x: 441, y: 220 },
                    { code: 'CAM 07', name: 'Arcade Hall', x: 385, y: 255 },
                    { code: 'CAM 08', name: 'West Corridor', x: 246, y: 170 },
                    { code: 'CAM 09', name: 'North Hall', x: 385, y: 195 },
                    { code: 'CAM 10', name: 'Entrance Hall', x: 465, y: 140 },
                    { code: 'CAM 11', name: 'Vent 11', x: 165, y: 100 },
                    { code: 'CAM 12', name: 'Vent 12', x: 195, y: 150 },
                    { code: 'CAM 13', name: 'Vent 13', x: 545, y: 160 },
                    { code: 'CAM 14', name: 'Vent 14', x: 545, y: 345 },
                    { code: 'CAM 15', name: 'Vent 15', x: 450, y: 345 },
                ],
                vents: [
                    'M165,85 L395,85 L395,120',
                    'M165,85 L165,245 L230,245',
                    'M195,135 L195,295 L290,295',
                    'M485,135 L545,135 L545,360 L410,360',
                    'M450,285 L450,360',
                ],
                rooms: [
                    { id: 'cam10', label: 'CAM 10', x: 355, y: 110, w: 130, h: 42 },
                    { id: 'cam09', label: 'CAM 09', x: 280, y: 168, w: 125, h: 42 },
                    { id: 'cam08', label: 'CAM 08', x: 225, y: 155, w: 42, h: 120 },
                    { id: 'cam07', label: 'CAM 07', x: 280, y: 225, w: 125, h: 42 },
                    { id: 'cam06', label: 'CAM 06', x: 420, y: 205, w: 42, h: 105 },
                    { id: 'cam05', label: 'CAM 05', x: 478, y: 205, w: 42, h: 105 },
                    { id: 'cam02', label: 'CAM 02', x: 280, y: 285, w: 125, h: 42 },
                    { id: 'cam01', label: 'CAM 01', x: 235, y: 285, w: 38, h: 135 },
                    { id: 'office3', label: 'YOU (OFFICE)', x: 295, y: 345, w: 115, h: 65, isYou: true },
                ],
                connectors: [
                    'M380,152 L380,168',
                    'M267,189 L280,189',
                    'M315,210 L315,225',
                    'M405,246 L420,246',
                    'M462,255 L478,255',
                    'M405,305 L420,305',
                    'M273,375 L295,375',
                ],
                entities: [
                    { name: 'Springtrap', x: 420, y: 131, color: '#65A30D', path: 'M420,131 L340,189 L340,305 L254,305 L254,375 L295,375' },
                    { name: 'Phantom Freddy', x: 254, y: 340, color: '#A3E635', path: 'M254,340 L254,375 L295,375' },
                    { name: 'Phantom Chica', x: 340, y: 246, color: '#FACC15', path: 'M340,246 L254,246 L254,375 L295,375' },
                    { name: 'Phantom Foxy', x: 315, y: 365, color: '#EF4444', path: 'M315,365 L350,375' },
                    { name: 'Phantom Mangle', x: 441, y: 255, color: '#F472B6', path: 'M441,255 L340,305 L295,375' },
                    { name: 'Phantom Balloon Boy', x: 246, y: 205, color: '#38BDF8', path: 'M246,205 L254,375 L295,375' },
                ],
            },
        ],
    },
    {
        id: 'FNAF 4',
        title: 'FNAF 4 // Bedroom & Plushtrap Hallway',
        subtitle: 'Denah Kamar Tidur & 5 Titik Pantau Senter (Flashlight Checkpoints)',
        floors: [
            {
                id: 'FNAF4-L1',
                label: 'Lantai 1 (House Floor)',
                cameras: [
                    { code: 'CHK 01', name: 'Plushtrap X-Spot', x: 97, y: 315 },
                    { code: 'CHK 02', name: 'Left Door Hall', x: 245, y: 265 },
                    { code: 'CHK 03', name: 'Center Closet', x: 367, y: 155 },
                    { code: 'CHK 04', name: 'Right Door Hall', x: 490, y: 265 },
                    { code: 'CHK 05', name: 'Bed Check', x: 367, y: 335 },
                ],
                rooms: [
                    { id: 'plushtrap_hall', label: 'PLUSHTRAP HALLWAY', x: 65, y: 120, w: 65, h: 255 },
                    { id: 'pl_r1', label: 'ROOM 1', x: 25, y: 185, w: 40, h: 55 },
                    { id: 'pl_r2', label: 'ROOM 2', x: 130, y: 185, w: 40, h: 55 },
                    { id: 'pl_r3', label: 'ROOM 3', x: 25, y: 255, w: 40, h: 55 },
                    { id: 'pl_r4', label: 'ROOM 4', x: 130, y: 255, w: 40, h: 55 },
                    { id: 'top_hall', label: 'NORTH HALLWAY', x: 215, y: 40, w: 305, h: 55 },
                    { id: 'kitchen4', label: 'KITCHEN', x: 520, y: 40, w: 60, h: 55 },
                    { id: 'left_hall', label: 'LEFT HALL', x: 215, y: 95, w: 60, h: 255 },
                    { id: 'closet', label: 'CLOSET', x: 335, y: 95, w: 65, h: 70 },
                    { id: 'bedroom', label: 'BEDROOM', x: 275, y: 95, w: 185, h: 195 },
                    { id: 'right_hall', label: 'RIGHT HALL', x: 460, y: 95, w: 60, h: 255 },
                    { id: 'you_bed', label: 'YOU (BED)', x: 275, y: 290, w: 185, h: 60, isYou: true },
                    { id: 'under_bed', label: 'BEHIND / UNDER BED', x: 275, y: 350, w: 185, h: 65 },
                ],
                connectors: ['M97,375 L97,415 L245,415 L245,350'],
                entities: [
                    { name: 'Nightmare Balloon Boy', x: 83, y: 145, color: '#EF4444', ring: true, path: 'M83,145 L97,340' },
                    { name: 'Plushtrap', x: 112, y: 145, color: '#22C55E', path: 'M112,145 L97,340' },
                    { name: 'Nightmare Bonnie', x: 255, y: 67, color: '#3B82F6', path: 'M255,67 L245,250 L275,315' },
                    { name: 'Nightmare', x: 325, y: 67, color: '#DC2626', ring: true, path: 'M325,67 L367,165 L367,290' },
                    { name: 'Nightmare Fredbear', x: 395, y: 67, color: '#F97316', path: 'M395,67 L490,250 L460,315' },
                    { name: 'Nightmarionette', x: 465, y: 67, color: '#F8FAFC', ring: true, path: 'M465,67 L367,165 L367,290' },
                    { name: 'Nightmare Chica', x: 550, y: 67, color: '#EAB308', path: 'M550,67 L490,250 L460,315' },
                    { name: 'Nightmare Foxy', x: 353, y: 132, color: '#B91C1C', path: 'M353,132 L367,290' },
                    { name: 'Nightmare Mangle', x: 382, y: 132, color: '#F472B6', path: 'M382,132 L367,290' },
                    { name: 'Nightmare Freddy', x: 367, y: 382, color: '#92400E', path: 'M367,382 L367,350' },
                ],
            },
        ],
    },
    {
        id: 'FNAF: Sister Location',
        title: 'FNAF: Sister Location // Circus Baby’s Entertainment & Rental',
        subtitle: 'Denah Fasilitas Bawah Tanah & 7 Kamera Pengawas Ruangan',
        floors: [
            {
                id: 'SL-L1',
                label: 'Lantai 1 (Underground Facility)',
                cameras: [
                    { code: 'CAM 01', name: 'Circus Gallery', x: 415, y: 75 },
                    { code: 'CAM 02', name: 'Ballora Gallery', x: 165, y: 295 },
                    { code: 'CAM 03', name: 'Breaker Room', x: 75, y: 285 },
                    { code: 'CAM 04', name: 'Funtime Auditorium', x: 535, y: 295 },
                    { code: 'CAM 05', name: 'Parts & Service', x: 620, y: 290 },
                    { code: 'CAM 06', name: 'Private Room', x: 487, y: 185 },
                    { code: 'CAM 07', name: 'Scooping Room', x: 487, y: 370 },
                ],
                rooms: [
                    { id: 'circus_gal', label: 'CIRCUS GALLERY', x: 265, y: 20, w: 170, h: 70 },
                    { id: 'circus_ctrl', label: 'CIRCUS CONTROL', x: 305, y: 105, w: 90, h: 55 },
                    { id: 'private_rm', label: 'PRIVATE ROOM', x: 445, y: 145, w: 85, h: 55 },
                    { id: 'breaker', label: 'BREAKER ROOM', x: 35, y: 225, w: 85, h: 75 },
                    { id: 'ballora_gal', label: 'BALLORA GALLERY', x: 140, y: 210, w: 155, h: 105 },
                    { id: 'ctrl_mod', label: 'YOU (CONTROL MODULE)', x: 310, y: 215, w: 80, h: 95, isYou: true },
                    { id: 'funtime_aud', label: 'FUNTIME AUDITORIUM', x: 405, y: 210, w: 155, h: 105 },
                    { id: 'parts_sl', label: 'PARTS & SERVICE', x: 580, y: 225, w: 85, h: 75 },
                    { id: 'scooping', label: 'SCOOPING ROOM', x: 445, y: 330, w: 85, h: 55 },
                    { id: 'elevator', label: 'ELEVATOR', x: 315, y: 375, w: 70, h: 55 },
                ],
                connectors: [
                    'M350,90 L350,105',
                    'M350,160 L350,215',
                    'M120,262 L140,262',
                    'M295,262 L310,262',
                    'M390,262 L405,262',
                    'M560,262 L580,262',
                    'M487,200 L487,210',
                    'M487,315 L487,330',
                    'M350,310 L350,375',
                ],
                entities: [
                    { name: 'Circus Baby', x: 350, y: 55, color: '#EF4444', path: 'M350,55 L350,215' },
                    { name: 'Ballora', x: 195, y: 262, color: '#3B82F6', path: 'M195,262 L310,262' },
                    { name: 'Ennard', x: 245, y: 262, color: '#E2E8F0', path: 'M245,262 L310,262 L487,172' },
                    { name: 'Funtime Foxy', x: 482, y: 262, color: '#EC4899', path: 'M482,262 L390,262' },
                    { name: 'Yenndo', x: 440, y: 245, color: '#94A3B8', path: 'M440,245 L390,262' },
                    { name: 'Funtime Freddy (+ Bon Bon)', x: 610, y: 255, color: '#A855F7', path: 'M610,255 L482,262 L390,262' },
                    { name: 'Bonnett', x: 640, y: 275, color: '#F43F5E', path: 'M640,275 L390,262' },
                ],
            },
        ],
    },
    {
        id: "Freddy Fazbear's Pizzeria Simulator",
        title: 'FNAF Pizzeria Simulator // Main Stage & Basement Labyrinth',
        subtitle: 'Denah Multi-Lantai dengan Kamera Panggung Utama & Sensor Radar Labirin',
        floors: [
            {
                id: 'FFPS-L1',
                label: 'Lantai 1 (In Main Stage)',
                cameras: [
                    { code: 'CAM 01', name: 'Left Show Zone', x: 140, y: 135 },
                    { code: 'CAM 02', name: 'Center Rockstar Stage', x: 380, y: 135 },
                    { code: 'CAM 03', name: 'Right Arcade Zone', x: 555, y: 135 },
                    { code: 'CAM 04', name: 'Dining Perimeter', x: 350, y: 315 },
                ],
                rooms: [
                    { id: 'main_hall_6', label: 'MAIN STAGE & ARCADE HALL (PASSIVE SHOWTIME)', x: 50, y: 30, w: 600, h: 390 },
                    { id: 'backstage_6', label: 'BACKSTAGE', x: 145, y: 185, w: 410, h: 25 },
                    { id: 'rock_left', label: 'FOXY STAGE', x: 165, y: 220, w: 80, h: 48 },
                    { id: 'rock_main', label: 'ROCKSTAR MAIN STAGE', x: 265, y: 220, w: 230, h: 48 },
                    { id: 'puppet_box', label: 'SECURITY PUPPET', x: 65, y: 295, w: 75, h: 55 },
                    { id: 'candy_box', label: 'CANDY CADET', x: 560, y: 315, w: 75, h: 55 },
                    { id: 'you_stage', label: 'YOU (TYCOON MANAGER)', x: 295, y: 375, w: 110, h: 35, isYou: true },
                ],
                connectors: ['M140,322 L165,322', 'M535,342 L560,342'],
                entities: [
                    { name: 'Happy Frog', x: 100, y: 75, color: '#22C55E', passive: true },
                    { name: 'Mr Hippo', x: 180, y: 75, color: '#7E22CE', passive: true },
                    { name: 'Pigpatch', x: 260, y: 75, color: '#F472B6', passive: true },
                    { name: 'NeddBear', x: 340, y: 75, color: '#D97706', passive: true },
                    { name: 'Music Man', x: 425, y: 75, color: '#6366F1', passive: true },
                    { name: 'El Chip', x: 510, y: 75, color: '#B45309', passive: true },
                    { name: 'Funtime Chica', x: 595, y: 75, color: '#F8FAFC', passive: true },
                    { name: 'Rockstar Foxy', x: 205, y: 244, color: '#DC2626', passive: true },
                    { name: 'Rockstar Chica', x: 300, y: 244, color: '#FACC15', passive: true },
                    { name: 'Rockstar Freddy', x: 355, y: 244, color: '#92400E', passive: true },
                    { name: 'Lefty', x: 410, y: 244, color: '#94A3B8', ring: true, passive: true },
                    { name: 'Rockstar Bonnie', x: 462, y: 244, color: '#60A5FA', passive: true },
                    { name: 'Security Puppet', x: 102, y: 322, color: '#CBD5E1', ring: true, passive: true },
                    { name: 'Candy Cadet', x: 597, y: 342, color: '#64748B', passive: true },
                ],
            },
            {
                id: 'FFPS-L2',
                label: 'Lantai 2 (Basement Labyrinth)',
                cameras: [
                    { code: 'SNS 01', name: 'North-West Vent Sensor', x: 160, y: 62 },
                    { code: 'SNS 02', name: 'North-East Vent Sensor', x: 540, y: 62 },
                    { code: 'SNS 03', name: 'Mid-West Vent Sensor', x: 160, y: 212 },
                    { code: 'SNS 04', name: 'Mid-East Vent Sensor', x: 540, y: 212 },
                    { code: 'SNS 05', name: 'Left Office Duct', x: 285, y: 362 },
                    { code: 'SNS 06', name: 'Right Office Duct', x: 415, y: 362 },
                ],
                rooms: [
                    { id: 'b_tl', label: 'VENT TL', x: 55, y: 35, w: 60, h: 55 },
                    { id: 'b_tc1', label: 'VENT TC1', x: 205, y: 35, w: 60, h: 55 },
                    { id: 'b_tc2', label: 'VENT TC2', x: 320, y: 35, w: 60, h: 55 },
                    { id: 'b_tc3', label: 'VENT TC3', x: 435, y: 35, w: 60, h: 55 },
                    { id: 'b_tr', label: 'VENT TR', x: 585, y: 35, w: 60, h: 55 },
                    { id: 'b_ml', label: 'VENT ML', x: 55, y: 185, w: 60, h: 55 },
                    { id: 'b_mc1', label: 'VENT MC1', x: 205, y: 185, w: 60, h: 55 },
                    { id: 'b_center', label: 'CENTRAL VENT CORE', x: 290, y: 115, w: 120, h: 195 },
                    { id: 'b_mc2', label: 'VENT MC2', x: 435, y: 185, w: 60, h: 55 },
                    { id: 'b_mr', label: 'VENT MR', x: 585, y: 185, w: 60, h: 55 },
                    { id: 'b_bl', label: 'VENT BL', x: 55, y: 335, w: 60, h: 55 },
                    { id: 'b_bc1', label: 'VENT BC1', x: 205, y: 335, w: 60, h: 55 },
                    { id: 'b_you', label: 'YOU + HELPY', x: 310, y: 335, w: 80, h: 55, isYou: true },
                    { id: 'b_bc2', label: 'VENT BC2', x: 435, y: 335, w: 60, h: 55 },
                    { id: 'b_br', label: 'VENT BR', x: 585, y: 335, w: 60, h: 55 },
                ],
                connectors: [
                    'M115,62 L205,62', 'M265,62 L320,62', 'M380,62 L435,62', 'M495,62 L585,62',
                    'M85,90 L85,185', 'M85,240 L85,335',
                    'M235,90 L235,185', 'M235,240 L235,335',
                    'M465,90 L465,185', 'M465,240 L465,335',
                    'M615,90 L615,185', 'M615,240 L615,335',
                    'M115,212 L205,212', 'M495,212 L585,212',
                    'M115,362 L205,362', 'M265,362 L310,362', 'M390,362 L435,362', 'M495,362 L585,362',
                ],
                entities: [
                    { name: 'Molten Freddy', x: 85, y: 62, color: '#E2E8F0', path: 'M85,62 L85,362 L310,362' },
                    { name: 'Scraptrap', x: 235, y: 62, color: '#4D7C0F', path: 'M235,62 L235,362 L310,362' },
                    { name: 'Scrap Baby', x: 465, y: 62, color: '#C2410C', path: 'M465,62 L465,362 L390,362' },
                    { name: 'Lefty', x: 615, y: 62, color: '#F8FAFC', ring: true, path: 'M615,62 L615,362 L390,362' },
                    { name: 'Helpy', x: 350, y: 348, color: '#C084FC', passive: true },
                ],
            },
        ],
    },
    {
        id: 'FNAF: Help Wanted',
        title: 'FNAF: Help Wanted // Fazbear Virtual Experience',
        subtitle: 'Denah Hub Ruangan VR & 4 Kamera Pemantau Sistem',
        floors: [
            {
                id: 'HW-L1',
                label: 'Lantai 1 (VR Hub Floor)',
                cameras: [
                    { code: 'VR 01', name: 'Dreadbear Hub Cam', x: 270, y: 170 },
                    { code: 'VR 02', name: 'Main Stage Cam', x: 590, y: 170 },
                    { code: 'VR 03', name: 'Prize Counter Cam', x: 235, y: 345 },
                    { code: 'VR 04', name: 'Monitor Desk Cam', x: 590, y: 345 },
                ],
                rooms: [
                    { id: 'curse_hub', label: 'CURSE OF DREADBEAR HUB', x: 80, y: 70, w: 220, h: 120 },
                    { id: 'vr_stage', label: 'MAIN VR SHOW STAGE', x: 400, y: 70, w: 220, h: 120 },
                    { id: 'prize_vr', label: 'PRIZE COUNTER', x: 80, y: 245, w: 180, h: 120 },
                    { id: 'you_vr', label: 'YOU (VR MONITOR DESK)', x: 310, y: 245, w: 310, h: 120, isYou: true },
                ],
                connectors: ['M300,130 L400,130', 'M190,190 L190,245', 'M510,190 L510,245', 'M260,305 L310,305'],
                entities: [
                    { name: 'Dreadbear', x: 190, y: 130, color: '#65A30D', path: 'M190,130 L190,305 L310,305' },
                    { name: 'Glitchtrap', x: 510, y: 130, color: '#A855F7', path: 'M510,130 L510,245' },
                ],
            },
        ],
    },
    {
        id: 'FNAF: Security Breach',
        title: 'FNAF: Security Breach // Mega Pizzaplex (3 Lantai)',
        subtitle: 'Denah Multi-Lantai dengan 12 Kamera Fazwatch Network',
        floors: [
            {
                id: 'SB-L1',
                label: 'Lantai 1 (Main Stage)',
                cameras: [
                    { code: 'FW 01', name: 'Rockstar Row West', x: 170, y: 112 },
                    { code: 'FW 02', name: 'Rockstar Row East', x: 530, y: 112 },
                    { code: 'FW 03', name: 'Superstar Daycare', x: 137, y: 268 },
                    { code: 'FW 04', name: 'Main Atrium Plaza', x: 350, y: 278 },
                    { code: 'FW 05', name: 'Roxy Raceway', x: 615, y: 190 },
                    { code: 'FW 06', name: 'Bonnie Bowl', x: 165, y: 398 },
                ],
                rooms: [
                    { id: 'rockstar_row', label: 'ROCKSTAR ROW & MAIN STAGE', x: 140, y: 35, w: 420, h: 95 },
                    { id: 'daycare', label: 'SUPERSTAR DAYCARE', x: 55, y: 170, w: 165, h: 115 },
                    { id: 'atrium', label: 'MAIN ATRIUM PLAZA', x: 250, y: 165, w: 200, h: 135 },
                    { id: 'raceway', label: 'ROXY RACEWAY & GATOR GOLF', x: 480, y: 170, w: 165, h: 115 },
                    { id: 'bonnie_bowl', label: 'BONNIE BOWL', x: 140, y: 335, w: 165, h: 80 },
                    { id: 'you_sb1', label: 'YOU (SECURITY OFFICE)', x: 395, y: 335, w: 165, h: 80, isYou: true },
                ],
                connectors: [
                    'M350,130 L350,165',
                    'M220,227 L250,227',
                    'M450,227 L480,227',
                    'M222,335 L290,300',
                    'M477,335 L410,300',
                ],
                entities: [
                    { name: 'Glamrock Freddy', x: 240, y: 82, color: '#F97316', passive: true },
                    { name: 'Glamrock Chica', x: 350, y: 82, color: '#F472B6', path: 'M350,82 L350,230 L477,335' },
                    { name: 'Roxanne Wolf', x: 562, y: 210, color: '#A855F7', path: 'M562,210 L477,335' },
                    { name: 'Montgomery Gator', x: 562, y: 255, color: '#22C55E', path: 'M562,255 L477,335' },
                    { name: 'Sun & Moon', x: 137, y: 227, color: '#FACC15', path: 'M137,227 L350,230 L477,335' },
                    { name: 'Glamrock Bonnie', x: 222, y: 375, color: '#38BDF8', passive: true },
                ],
            },
            {
                id: 'SB-L2',
                label: 'Lantai 2 (Basement)',
                cameras: [
                    { code: 'FW 07', name: 'Utilidor North', x: 350, y: 112 },
                    { code: 'FW 08', name: 'Endo Warehouse', x: 175, y: 275 },
                    { code: 'FW 09', name: 'Vanny Hideout Tunnel', x: 460, y: 275 },
                ],
                rooms: [
                    { id: 'util_north', label: 'UTILIDOR NORTH TUNNEL', x: 140, y: 55, w: 420, h: 75 },
                    { id: 'endo_ware', label: 'ENDOSKELETON WAREHOUSE', x: 80, y: 175, w: 190, h: 120 },
                    { id: 'vanny_hide', label: 'SECRET VANNY HIDEOUT', x: 430, y: 175, w: 190, h: 120 },
                    { id: 'you_sb2', label: 'YOU (BASEMENT GUARD POST)', x: 255, y: 340, w: 190, h: 75, isYou: true },
                ],
                connectors: ['M175,130 L175,175', 'M525,130 L525,175', 'M175,295 L255,375', 'M525,295 L445,375'],
                entities: [
                    { name: 'Vanny', x: 525, y: 235, color: '#F8FAFC', path: 'M525,235 L445,375' },
                ],
            },
            {
                id: 'SB-L3',
                label: 'Lantai 3 (Underground)',
                cameras: [
                    { code: 'FW 10', name: 'Sinkhole West', x: 155, y: 165 },
                    { code: 'FW 11', name: 'Sinkhole East', x: 545, y: 165 },
                    { code: 'FW 12', name: 'Recharge Chamber', x: 227, y: 345 },
                ],
                rooms: [
                    { id: 'sinkhole_ruins', label: 'OLD PIZZERIA SINKHOLE RUINS', x: 110, y: 55, w: 480, h: 135 },
                    { id: 'charging_pod', label: 'RECHARGE STATION CHAMBER', x: 140, y: 235, w: 175, h: 135 },
                    { id: 'you_sb3', label: 'YOU (UNDERGROUND TERMINAL)', x: 385, y: 235, w: 175, h: 135, isYou: true },
                ],
                connectors: ['M227,190 L227,235', 'M472,190 L472,235', 'M315,302 L385,302'],
                entities: [
                    { name: 'The Blob', x: 472, y: 122, color: '#DC2626', path: 'M472,122 L472,235' },
                    { name: 'Burntrap', x: 227, y: 302, color: '#84CC16', path: 'M227,302 L385,302' },
                ],
            },
        ],
    },
];

export default function MapSection({ animatronics }) {
    const [selectedMapId, setSelectedMapId] = useState(SERIES_MAPS[0].id);
    const [selectedFloorIndex, setSelectedFloorIndex] = useState(0);
    const [showAllPaths, setShowAllPaths] = useState(false);
    const [showCameras, setShowCameras] = useState(true);

    const currentMap = SERIES_MAPS.find((m) => m.id === selectedMapId) || SERIES_MAPS[0];
    const currentFloor = currentMap.floors[selectedFloorIndex] || currentMap.floors[0];

    useEffect(() => {
        setSelectedFloorIndex(0);
    }, [selectedMapId]);

    const isEntityUnlocked = (entityName) => {
        const cleanTarget = entityName.toLowerCase().replace(/\(\+\s*bon\s*bon\)/g, '').trim();
        return animatronics.some((a) => {
            const recorded = a.name.toLowerCase().trim();
            return (
                recorded === entityName.toLowerCase() ||
                recorded.includes(cleanTarget) ||
                cleanTarget.includes(recorded)
            );
        });
    };

    const allSeriesEntities = currentMap.floors.flatMap((f) => f.entities);
    const unlockedCount = allSeriesEntities.filter((ent) => isEntityUnlocked(ent.name)).length;
    const totalSeriesCameras = currentMap.floors.reduce(
        (acc, f) => acc + (f.cameras ? f.cameras.length : 0),
        0,
    );

    return (
        <div className="space-y-6">
            {/* Header Banner */}
            <section className="bg-[#141414] border border-[#2E2E2E] rounded-xl p-6 relative overflow-hidden shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-[#EA580C] uppercase tracking-wider font-semibold mb-1">
                            <span>TACTICAL SURVEILLANCE // MULTI-FLOOR & CCTV NODES</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#F5F5F5] font-['Chakra_Petch',sans-serif]">
                            Facility Map & Movement Paths
                        </h1>
                        <p className="text-xs sm:text-sm text-[#A3A3A3] mt-1">
                            Menampilkan denah lantai, posisi node kamera CCTV tiap seri, serta jalur pergerakan entitas yang terbuka dari Archives.
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                        <div className="px-3.5 py-2.5 rounded-lg bg-[#1F1F1F] border border-[#2E2E2E] font-mono text-right">
                            <div className="text-[10px] text-[#A3A3A3]">CCTV NODES</div>
                            <div className="text-lg font-bold text-cyan-400">
                                {totalSeriesCameras} <span className="text-[11px] font-normal text-[#A3A3A3]">CAM</span>
                            </div>
                        </div>

                        <div className="px-3.5 py-2.5 rounded-lg bg-[#1F1F1F] border border-[#2E2E2E] font-mono text-right">
                            <div className="text-[10px] text-[#A3A3A3]">ENTITIES MAPPED</div>
                            <div className="text-lg font-bold text-[#EA580C]">
                                {unlockedCount}{' '}
                                <span className="text-[11px] font-normal text-[#A3A3A3]">/ {allSeriesEntities.length}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Series Tabs */}
            <div className="flex flex-wrap items-center gap-2">
                {SERIES_MAPS.map((mapItem) => {
                    const isSelected = mapItem.id === selectedMapId;
                    const totalInSeries = mapItem.floors.reduce((acc, f) => acc + f.entities.length, 0);
                    const unlockedInSeries = mapItem.floors
                        .flatMap((f) => f.entities)
                        .filter((e) => isEntityUnlocked(e.name)).length;

                    return (
                        <button
                            key={mapItem.id}
                            type="button"
                            onClick={() => setSelectedMapId(mapItem.id)}
                            className={`px-3.5 py-2 rounded-lg text-xs font-mono uppercase transition-all cursor-pointer border flex items-center gap-2 ${isSelected
                                    ? 'bg-[#EA580C] text-white border-[#EA580C] font-bold shadow-[0_0_15px_rgba(234,88,12,0.35)]'
                                    : 'bg-[#141414] text-[#A3A3A3] border-[#2E2E2E] hover:border-[#EA580C]/60 hover:text-[#F5F5F5]'
                                }`}
                        >
                            <span>{mapItem.id}</span>
                            <span
                                className={`px-1.5 py-0.5 rounded text-[10px] ${isSelected ? 'bg-black/30 text-white' : 'bg-[#1F1F1F] text-[#A3A3A3]'
                                    }`}
                            >
                                {unlockedInSeries}/{totalInSeries}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Main Map Area + Entity Legend */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <section className="lg:col-span-2 bg-[#141414] border border-[#2E2E2E] rounded-xl p-5 shadow-xl flex flex-col justify-between">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#2E2E2E]">
                        <div>
                            <h2 className="text-base sm:text-lg font-bold uppercase text-[#F5F5F5] font-['Chakra_Petch',sans-serif]">
                                {currentMap.title}
                            </h2>
                            <p className="text-xs text-[#A3A3A3]">{currentMap.subtitle}</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            {currentMap.floors.length > 1 && (
                                <div className="inline-flex items-center rounded-lg bg-[#0A0A0A] border border-[#2E2E2E] p-1">
                                    {currentMap.floors.map((fl, idx) => (
                                        <button
                                            key={fl.id}
                                            type="button"
                                            onClick={() => setSelectedFloorIndex(idx)}
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono cursor-pointer transition-colors ${selectedFloorIndex === idx
                                                    ? 'bg-[#EA580C] text-white font-bold'
                                                    : 'text-[#A3A3A3] hover:text-[#F5F5F5]'
                                                }`}
                                        >
                                            <Layers className="w-3 h-3" />
                                            <span>{fl.label}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={() => setShowCameras((prev) => !prev)}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono cursor-pointer transition-colors ${showCameras
                                        ? 'bg-cyan-950/60 border-cyan-500/70 text-cyan-300'
                                        : 'bg-[#1F1F1F] border-[#2E2E2E] text-[#A3A3A3] hover:text-[#F5F5F5]'
                                    }`}
                            >
                                <Video className="w-3.5 h-3.5" />
                                <span>CCTV ({currentFloor.cameras?.length || 0})</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowAllPaths((prev) => !prev)}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono cursor-pointer transition-colors ${showAllPaths
                                        ? 'bg-[#EA580C]/20 border-[#EA580C] text-[#FB923C]'
                                        : 'bg-[#1F1F1F] border-[#2E2E2E] text-[#A3A3A3] hover:text-[#F5F5F5]'
                                    }`}
                            >
                                <Eye className="w-3.5 h-3.5" />
                                <span>{showAllPaths ? 'Sembunyikan Jalur' : 'Intip Jalur'}</span>
                            </button>
                        </div>
                    </div>

                    {/* Interactive SVG Blueprint */}
                    <div className="w-full bg-[#090909] border border-[#2E2E2E] rounded-lg p-3 overflow-hidden relative">
                        <div className="flex items-center justify-between mb-2">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#141414] border border-[#2E2E2E] text-[10px] font-mono text-[#FB923C]">
                                <Layers className="w-3 h-3 text-[#EA580C]" />
                                <span>{currentFloor.label.toUpperCase()}</span>
                            </div>

                            {showCameras && currentFloor.cameras && (
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-500/40 text-[10px] font-mono text-cyan-300">
                                    <Video className="w-3 h-3" />
                                    <span>{currentFloor.cameras.length} KAMERA TERPASANG DI LANTAI INI</span>
                                </div>
                            )}
                        </div>

                        <svg viewBox="0 0 700 460" className="w-full h-auto select-none">
                            <defs>
                                <pattern id="gridBlueprint" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#181818" strokeWidth="1" />
                                </pattern>
                                <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
                                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            <rect width="700" height="460" fill="url(#gridBlueprint)" />

                            {/* Ventilasi FNAF 3 */}
                            {currentFloor.vents &&
                                currentFloor.vents.map((vPath, idx) => (
                                    <path
                                        key={`vent-${idx}`}
                                        d={vPath}
                                        fill="none"
                                        stroke="#14532D"
                                        strokeWidth="12"
                                        strokeLinecap="square"
                                    />
                                ))}

                            {/* Garis Penghubung Ruangan */}
                            {currentFloor.connectors &&
                                currentFloor.connectors.map((cPath, idx) => (
                                    <path
                                        key={`conn-${idx}`}
                                        d={cPath}
                                        fill="none"
                                        stroke="#525252"
                                        strokeWidth="3"
                                    />
                                ))}

                            {/* Kotak Ruangan */}
                            {currentFloor.rooms.map((room) => (
                                <g key={room.id}>
                                    <rect
                                        x={room.x}
                                        y={room.y}
                                        width={room.w}
                                        height={room.h}
                                        rx="3"
                                        fill={room.isYou ? '#261409' : '#0E0E0E'}
                                        stroke={room.isYou ? '#EA580C' : '#E5E5E5'}
                                        strokeWidth={room.isYou ? '2.5' : '1.8'}
                                    />
                                    <text
                                        x={room.x + room.w / 2}
                                        y={room.isYou ? room.y + room.h / 2 + 4 : room.y + 14}
                                        textAnchor="middle"
                                        fill={room.isYou ? '#FB923C' : '#A3A3A3'}
                                        fontSize={room.isYou ? '10' : '8.5'}
                                        fontFamily="JetBrains Mono, monospace"
                                        fontWeight="bold"
                                    >
                                        {room.label}
                                    </text>
                                </g>
                            ))}

                            {/* Jalur Pergerakan Animatronic */}
                            {currentFloor.entities.map((ent) => {
                                if (!ent.path) return null;
                                const unlocked = isEntityUnlocked(ent.name);
                                if (!unlocked && !showAllPaths) return null;

                                return (
                                    <path
                                        key={`path-${ent.name}`}
                                        d={ent.path}
                                        fill="none"
                                        stroke={unlocked ? ent.color : '#333333'}
                                        strokeWidth={unlocked ? '3' : '1.5'}
                                        strokeDasharray={unlocked ? 'none' : '5,5'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        filter={unlocked ? 'url(#neonGlow)' : undefined}
                                        opacity={unlocked ? 0.9 : 0.45}
                                    />
                                );
                            })}

                            {/* Node Posisi Kamera CCTV */}
                            {showCameras &&
                                currentFloor.cameras &&
                                currentFloor.cameras.map((cam) => (
                                    <g key={cam.code}>
                                        <rect
                                            x={cam.x - 19}
                                            y={cam.y - 8}
                                            width="38"
                                            height="15"
                                            rx="2"
                                            fill="#083344"
                                            stroke="#22D3EE"
                                            strokeWidth="1.2"
                                        />
                                        <text
                                            x={cam.x}
                                            y={cam.y + 2.5}
                                            textAnchor="middle"
                                            fill="#67E8F9"
                                            fontSize="7"
                                            fontFamily="JetBrains Mono, monospace"
                                            fontWeight="bold"
                                        >
                                            {cam.code}
                                        </text>
                                    </g>
                                ))}

                            {/* Titik Posisi Animatronic */}
                            {currentFloor.entities.map((ent) => {
                                const unlocked = isEntityUnlocked(ent.name);

                                return (
                                    <g key={`node-${ent.name}`}>
                                        {unlocked ? (
                                            <>
                                                <circle
                                                    cx={ent.x}
                                                    cy={ent.y}
                                                    r="8.5"
                                                    fill={ent.ring ? '#090909' : ent.color}
                                                    stroke={ent.color}
                                                    strokeWidth="2.5"
                                                    filter="url(#neonGlow)"
                                                />
                                                <rect
                                                    x={ent.x - 42}
                                                    y={ent.y - 23}
                                                    width="84"
                                                    height="13"
                                                    rx="2"
                                                    fill="#0A0A0A"
                                                    fillOpacity="0.88"
                                                    stroke={ent.color}
                                                    strokeWidth="0.8"
                                                />
                                                <text
                                                    x={ent.x}
                                                    y={ent.y - 14}
                                                    textAnchor="middle"
                                                    fill="#FFFFFF"
                                                    fontSize="7.5"
                                                    fontFamily="JetBrains Mono, monospace"
                                                    fontWeight="bold"
                                                >
                                                    {ent.name.length > 15 ? `${ent.name.slice(0, 14)}…` : ent.name}
                                                </text>
                                            </>
                                        ) : (
                                            <>
                                                <circle
                                                    cx={ent.x}
                                                    cy={ent.y}
                                                    r="8"
                                                    fill="#1A1A1A"
                                                    stroke="#525252"
                                                    strokeWidth="1.5"
                                                    strokeDasharray="2,2"
                                                />
                                                <text
                                                    x={ent.x}
                                                    y={ent.y + 3}
                                                    textAnchor="middle"
                                                    fill="#A3A3A3"
                                                    fontSize="8"
                                                    fontFamily="JetBrains Mono, monospace"
                                                    fontWeight="bold"
                                                >
                                                    ?
                                                </text>
                                            </>
                                        )}
                                    </g>
                                );
                            })}
                        </svg>
                    </div>
                </section>

                {/* Right Panel: Entity Radar & Camera List */}
                <section className="bg-[#141414] border border-[#2E2E2E] rounded-xl p-5 shadow-xl flex flex-col justify-between space-y-5">
                    <div>
                        <div className="flex items-center justify-between text-xs font-mono text-[#EA580C] uppercase font-bold mb-3 pb-2 border-b border-[#2E2E2E]">
                            <span className="flex items-center gap-2">
                                <Navigation className="w-4 h-4" />
                                <span>ENTITY RADAR ({currentFloor.label})</span>
                            </span>
                            <span className="text-[#A3A3A3]">{currentFloor.entities.length} ENTITAS</span>
                        </div>

                        <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                            {currentFloor.entities.map((ent) => {
                                const unlocked = isEntityUnlocked(ent.name);

                                return (
                                    <div
                                        key={ent.name}
                                        className={`p-2.5 rounded-lg border flex items-center justify-between gap-2 transition-colors ${unlocked
                                                ? 'bg-[#1A1A1A] border-[#EA580C]/60'
                                                : 'bg-[#0D0D0D] border-[#2E2E2E] opacity-75'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            {unlocked ? (
                                                <span
                                                    className="w-3.5 h-3.5 rounded-full shrink-0 border-2"
                                                    style={{
                                                        backgroundColor: ent.ring ? '#0A0A0A' : ent.color,
                                                        borderColor: ent.color,
                                                        boxShadow: `0 0 8px ${ent.color}`,
                                                    }}
                                                />
                                            ) : (
                                                <HelpCircle className="w-4 h-4 text-[#525252] shrink-0" />
                                            )}

                                            <div className="min-w-0">
                                                <div
                                                    className={`text-xs font-bold font-['Chakra_Petch',sans-serif] uppercase truncate ${unlocked ? 'text-[#F5F5F5]' : 'text-[#737373] font-mono'
                                                        }`}
                                                >
                                                    {unlocked ? ent.name : '????'}
                                                </div>
                                                <div className="text-[10px] font-mono text-[#A3A3A3] flex items-center gap-1">
                                                    {unlocked ? (
                                                        ent.passive ? (
                                                            <span className="text-emerald-400 inline-flex items-center gap-1">
                                                                <Shield className="w-2.5 h-2.5" /> PASIF / HELPER
                                                            </span>
                                                        ) : (
                                                            <span className="text-orange-400 inline-flex items-center gap-1">
                                                                <AlertCircle className="w-2.5 h-2.5" /> JALUR TERLACAK
                                                            </span>
                                                        )
                                                    ) : (
                                                        'BELUM TERCATAT DI ARCHIVES'
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <span
                                            className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase shrink-0 ${unlocked
                                                    ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
                                                    : 'bg-[#1F1F1F] text-[#737373] border border-[#2E2E2E]'
                                                }`}
                                        >
                                            {unlocked ? 'TRACKED' : 'LOCKED'}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Daftar Kamera Lantai Aktif */}
                    {currentFloor.cameras && (
                        <div className="pt-3 border-t border-[#2E2E2E]">
                            <div className="flex items-center justify-between text-xs font-mono text-cyan-400 uppercase font-bold mb-2">
                                <span className="flex items-center gap-1.5">
                                    <Video className="w-3.5 h-3.5" />
                                    <span>DAFTAR KAMERA LANTAI</span>
                                </span>
                                <span>{currentFloor.cameras.length} UNIT</span>
                            </div>
                            <div className="grid grid-cols-2 gap-1.5 max-h-[140px] overflow-y-auto pr-1">
                                {currentFloor.cameras.map((cam) => (
                                    <div
                                        key={cam.code}
                                        className="px-2 py-1.5 rounded bg-[#0A0A0A] border border-[#2E2E2E] font-mono text-[10px] truncate"
                                    >
                                        <span className="text-cyan-400 font-bold">{cam.code}</span>{' '}
                                        <span className="text-[#A3A3A3]">• {cam.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}