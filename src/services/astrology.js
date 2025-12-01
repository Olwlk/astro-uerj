
import { julian } from 'astronomia';

// Constants
export const ZODIAC = [
    { id: 1, name: "Áries", symbol: "♈", image: "🐏", element: "Fogo", lord: "Marte" },
    { id: 2, name: "Touro", symbol: "♉", image: "🐂", element: "Terra", lord: "Vênus" },
    { id: 3, name: "Gêmeos", symbol: "♊", image: "👯", element: "Ar", lord: "Mercúrio" },
    { id: 4, name: "Câncer", symbol: "♋", image: "🦀", element: "Água", lord: "Lua" },
    { id: 5, name: "Leão", symbol: "♌", image: "🦁", element: "Fogo", lord: "Sol" },
    { id: 6, name: "Virgem", symbol: "♍", image: "🌾", element: "Terra", lord: "Mercúrio" },
    { id: 7, name: "Libra", symbol: "♎", image: "⚖️", element: "Ar", lord: "Vênus" },
    { id: 8, name: "Escorpião", symbol: "♏", image: "🦂", element: "Água", lord: "Marte/Ketu" },
    { id: 9, name: "Sagitário", symbol: "♐", image: "🏹", element: "Fogo", lord: "Júpiter" },
    { id: 10, name: "Capricórnio", symbol: "♑", image: "🐐", element: "Terra", lord: "Saturno" },
    { id: 11, name: "Aquário", symbol: "♒", image: "🏺", element: "Ar", lord: "Saturno/Rahu" },
    { id: 12, name: "Peixes", symbol: "♓", image: "🐟", element: "Água", lord: "Júpiter" }
];

export const NAKSHATRAS = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha",
    "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
    "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
];

export const PLANETS = [
    { name: 'Sol', id: 'sun', icon: '⊙', color: 'text-yellow-500', karaka: 'Alma' },
    { name: 'Lua', id: 'moon', icon: '☽', color: 'text-slate-200', karaka: 'Mente' },
    { name: 'Marte', id: 'mars', icon: '♂', color: 'text-red-500', karaka: 'Energia' },
    { name: 'Mercúrio', id: 'mercury', icon: '☿', color: 'text-green-500', karaka: 'Intelecto' },
    { name: 'Júpiter', id: 'jupiter', icon: '♃', color: 'text-orange-400', karaka: 'Sabedoria' },
    { name: 'Vênus', id: 'venus', icon: '♀', color: 'text-pink-400', karaka: 'Amor' },
    { name: 'Saturno', id: 'saturn', icon: '♄', color: 'text-indigo-400', karaka: 'Disciplina' },
    { name: 'Rahu', id: 'rahu', icon: '☊', color: 'text-gray-400', karaka: 'Obsessão' },
    { name: 'Ketu', id: 'ketu', icon: '☋', color: 'text-gray-500', karaka: 'Libertação' }
];

// Helper to normalize degrees 0-360
const normalize = (deg) => {
    let d = deg % 360;
    if (d < 0) d += 360;
    return d;
};

// Calculate Ayanamsa (Lahiri)
const getLahiriAyanamsa = (jde) => {
    const J2000 = 2451545.0;
    const daysSinceJ2000 = jde - J2000;
    const yearsSinceJ2000 = daysSinceJ2000 / 365.25;
    const baseLahiri = 23.857;
    const rate = 0.013969;
    return baseLahiri + (yearsSinceJ2000 * rate);
};

// Calculate D9 (Navamsa)
const calculateD9 = (longitude) => {
    const absoluteDegrees = normalize(longitude);
    const navamsaSlice = 3.333333; // 3 deg 20 min
    const d9Index = Math.floor(absoluteDegrees / navamsaSlice) % 12;
    return d9Index + 1; // 1-12
};

// Calculate Nakshatra
const calculateNakshatra = (longitude) => {
    const nakshatraSlice = 13.333333; // 13 deg 20 min
    const index = Math.floor(longitude / nakshatraSlice);
    const remainder = longitude % nakshatraSlice;
    const pada = Math.floor(remainder / 3.333333) + 1;

    return {
        name: NAKSHATRAS[index % 27],
        pada: pada,
        id: (index % 27) + 1
    };
};

// Simplified planetary calculation (approximate)
const calculatePlanetPosition = (planetId, jde) => {
    const T = (jde - 2451545.0) / 36525;
    let L = 0;

    switch (planetId) {
        case 'sun': L = 280.46646 + 36000.76983 * T; break;
        case 'moon': L = 218.3165 + 481267.8813 * T; break;
        case 'mars': L = 355.45332 + 19140.2993 * T; break;
        case 'mercury': L = 252.25091 + 149472.6746 * T; break;
        case 'jupiter': L = 34.40438 + 3034.9057 * T; break;
        case 'venus': L = 181.97980 + 58517.8156 * T; break;
        case 'saturn': L = 49.94432 + 1222.1138 * T; break;
        case 'rahu': L = 259.1833 - 1934.136 * T; break;
        case 'ketu': L = (259.1833 - 1934.136 * T) + 180; break;
        default: L = 0;
    }
    return normalize(L);
};

export const calculateChartData = (dateStr, timeStr, system = 'tropical', location = { lat: 0, lon: 0 }) => {
    const dateObj = new Date(`${dateStr}T${timeStr}`);
    const jde = julian.DateToJD(dateObj);

    // Ayanamsa
    const ayanamsa = getLahiriAyanamsa(jde);

    // Calculate Planets
    const planetsData = PLANETS.map(planet => {
        let longitude = calculatePlanetPosition(planet.id, jde);

        // Apply Ayanamsa if Vedic
        if (system === 'vedic') {
            longitude = normalize(longitude - ayanamsa);
        }

        const signId = Math.floor(longitude / 30) + 1;
        const degree = longitude % 30;

        return {
            ...planet,
            longitude,
            degree,
            sign: ZODIAC.find(z => z.id === signId),
            d9Sign: ZODIAC.find(z => z.id === calculateD9(longitude)),
            nakshatra: planet.id === 'moon' ? calculateNakshatra(longitude) : null
        };
    });

    // Calculate Ascendant (using Sun as anchor + time diff)
    const sun = planetsData.find(p => p.id === 'sun');
    // Use Tropical Sun for time calc to get solar time
    const sunLongTropical = system === 'vedic' ? normalize(sun.longitude + ayanamsa) : sun.longitude;
    const hour = dateObj.getHours() + dateObj.getMinutes() / 60;
    // Simple Ascendant approximation: Sun rises at 6am. Asc moves 15 deg/hour.
    let ascLong = normalize(sunLongTropical + ((hour - 6) * 15));

    if (system === 'vedic') {
        ascLong = normalize(ascLong - ayanamsa);
    }

    const ascSignId = Math.floor(ascLong / 30) + 1;

    // House calculation (Whole Sign)
    const planetsWithHouses = planetsData.map(p => ({
        ...p,
        house: Math.floor(normalize(p.longitude - ascLong + (ascLong % 30)) / 30) + 1 // Whole Sign
    }));

    // Jaimini Karakas
    const charaKarakas = [...planetsWithHouses]
        .filter(p => p.id !== 'rahu' && p.id !== 'ketu')
        .sort((a, b) => b.degree - a.degree);

    return {
        ascendant: {
            sign: ZODIAC.find(z => z.id === ascSignId),
            longitude: ascLong
        },
        planets: planetsWithHouses,
        atmakaraka: charaKarakas[0],
        darakaraka: charaKarakas[charaKarakas.length - 1],
        system,
        ayanamsa: ayanamsa.toFixed(4)
    };
};
