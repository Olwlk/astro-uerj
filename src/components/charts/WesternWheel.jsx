
import React from 'react';
import { ZODIAC } from '../../services/astrology';

const WesternWheel = ({ data }) => {
    return (
        <div className="relative w-full max-w-[400px] aspect-square mx-auto bg-slate-800 rounded-full border-4 border-slate-600 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xs text-slate-400">ASC</p>
                    <h3 className="text-xl font-bold text-white">{data.ascendant.sign.symbol}</h3>
                </div>
            </div>

            {/* Render Zodiac Ring */}
            {ZODIAC.map((sign, i) => {
                // Rotate so Ascendant is at 9 o'clock (180 deg) or standard Western placement
                // Standard: Ascendant at 9 o'clock (Left).
                // If Asc is 0 deg Aries, Aries is at 9 o'clock.
                // Rotation = SignAngle - AscLongitude + 180?
                // Let's simplify: Fix Aries at 0 (3 o'clock) - 90 (12 o'clock).
                // We want Ascendant to be at 180 degrees (Left).
                // So we rotate the whole wheel by (180 - AscLongitude).

                // Actually, let's stick to the prompt's visual logic which was simpler:
                // Fix Aries at top, rotate planets? Or rotate wheel so Asc is left?
                // Rotating wheel so Asc is left is more standard.

                const signAngle = (i * 30); // Aries = 0, Taurus = 30...
                const rotation = signAngle - data.ascendant.longitude + 180;

                // Position on circle
                const angleRad = (rotation - 90) * (Math.PI / 180); // -90 to start from top for calculation
                // But we want to place them in a circle.
                // Let's use CSS rotation for the whole ring or individual items?
                // Individual items is easier to read.

                const x = 50 + 42 * Math.cos(angleRad);
                const y = 50 + 42 * Math.sin(angleRad);

                return (
                    <div
                        key={sign.id}
                        className="absolute w-8 h-8 flex items-center justify-center text-lg"
                        style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        <span title={sign.name}>{sign.symbol}</span>
                    </div>
                );
            })}

            {/* Render Planets */}
            {data.planets.map((planet) => {
                // Planet position relative to Ascendant
                const angle = planet.longitude - data.ascendant.longitude + 180;
                const rad = (angle - 90) * (Math.PI / 180);

                return (
                    <div
                        key={planet.id}
                        className={`absolute w-6 h-6 bg-slate-900 rounded-full border border-slate-500 flex items-center justify-center text-xs font-bold ${planet.color} z-10 hover:scale-150 transition cursor-pointer`}
                        style={{
                            left: `${50 + 25 * Math.cos(rad)}%`,
                            top: `${50 + 25 * Math.sin(rad)}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                        title={`${planet.name} em ${planet.sign.name} (${planet.degree.toFixed(1)}°)`}
                    >
                        {planet.icon}
                    </div>
                );
            })}

            {/* House Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                {[0, 30, 60, 90, 120, 150].map(deg => (
                    <line
                        key={deg}
                        x1="50%" y1="50%" x2="50%" y2="0%"
                        transform={`rotate(${deg + 180} 200 200)`} // Adjust rotation if needed
                        stroke="currentColor"
                        strokeWidth="1"
                    />
                ))}
                {/* Horizontal Line (Asc-Dsc) */}
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="2" className="text-red-500 opacity-50" />
            </svg>
        </div>
    );
};

export default WesternWheel;
