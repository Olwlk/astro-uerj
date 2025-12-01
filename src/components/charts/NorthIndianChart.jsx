
import React from 'react';

const NorthIndianChart = ({ data, title }) => {
    // North Indian Style: Houses are fixed.
    // Top Diamond = House 1. Number inside = Sign ID.

    const houses = [
        { id: 1, x: 50, y: 25, labelX: 50, labelY: 15 }, // House 1 (Top Center)
        { id: 2, x: 20, y: 10, labelX: 25, labelY: 5 },  // House 2
        { id: 3, x: 10, y: 20, labelX: 5, labelY: 25 },  // House 3
        { id: 4, x: 25, y: 50, labelX: 15, labelY: 50 }, // House 4 (Left Center)
        { id: 5, x: 10, y: 80, labelX: 5, labelY: 75 },  // House 5
        { id: 6, x: 20, y: 90, labelX: 25, labelY: 95 }, // House 6
        { id: 7, x: 50, y: 75, labelX: 50, labelY: 85 }, // House 7 (Bottom Center)
        { id: 8, x: 80, y: 90, labelX: 75, labelY: 95 }, // House 8
        { id: 9, x: 90, y: 80, labelX: 95, labelY: 75 }, // House 9
        { id: 10, x: 75, y: 50, labelX: 85, labelY: 50 }, // House 10 (Right Center)
        { id: 11, x: 90, y: 20, labelX: 95, labelY: 25 }, // House 11
        { id: 12, x: 80, y: 10, labelX: 75, labelY: 5 }   // House 12
    ];

    const ascendantSignId = data.ascendant.sign.id;

    const getContentForHouse = (houseNum) => {
        // Calculate Sign in House
        // If Asc (House 1) is Sign X, House 2 is Sign X+1...
        const currentSignId = ((ascendantSignId + houseNum - 2) % 12) + 1;

        // Find planets in this sign (since in Vedic/Whole Sign, House = Sign relative to Asc)
        // Note: data.planets already have 'house' calculated relative to Asc.
        // So we can just filter by house number.
        const planetsInHouse = data.planets.filter(p => p.house === houseNum);

        return {
            signId: currentSignId,
            planets: planetsInHouse
        };
    };

    return (
        <div className="relative w-full max-w-[400px] aspect-square mx-auto bg-white rounded-lg shadow-lg border-2 border-orange-200 overflow-hidden">
            <div className="absolute top-2 left-2 text-xs font-bold text-orange-800 bg-orange-100 px-2 py-1 rounded">{title}</div>
            <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Diamond Lines */}
                <rect x="0" y="0" width="100" height="100" fill="none" stroke="#f97316" strokeWidth="0.5" />
                <line x1="0" y1="0" x2="100" y2="100" stroke="#f97316" strokeWidth="0.5" />
                <line x1="100" y1="0" x2="0" y2="100" stroke="#f97316" strokeWidth="0.5" />
                <line x1="50" y1="0" x2="0" y2="50" stroke="#f97316" strokeWidth="0.5" />
                <line x1="0" y1="50" x2="50" y2="100" stroke="#f97316" strokeWidth="0.5" />
                <line x1="50" y1="100" x2="100" y2="50" stroke="#f97316" strokeWidth="0.5" />
                <line x1="100" y1="50" x2="50" y2="0" stroke="#f97316" strokeWidth="0.5" />

                {/* House Content */}
                {houses.map(house => {
                    const content = getContentForHouse(house.id);
                    return (
                        <g key={house.id}>
                            {/* Sign Number */}
                            <text x={house.labelX} y={house.labelY} textAnchor="middle" dominantBaseline="middle" fontSize="4" fill="#94a3b8" fontWeight="bold">
                                {content.signId}
                            </text>
                            {/* Planets */}
                            <foreignObject x={house.x - 10} y={house.y - 10} width="20" height="20">
                                <div className="flex flex-wrap justify-center items-center h-full gap-0.5">
                                    {content.planets.map(p => (
                                        <span key={p.id} className="text-[5px] font-bold text-black" title={p.name}>
                                            {p.icon}
                                        </span>
                                    ))}
                                    {house.id === 1 && <span className="text-[5px] text-red-600 font-bold">Asc</span>}
                                </div>
                            </foreignObject>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};

export default NorthIndianChart;
