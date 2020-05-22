const places = [
    { name: 'Kathmandu', coords: [27.7172, 85.3240] },
    { name: 'Lukla', coords: [27.6857, 86.7278] },
    { name: 'Phakding', coords: [27.7400, 86.7126] },
    { name: 'Namche Bazaar', coords: [27.8069, 86.7140] },
    { name: 'Tyangboche', coords: [27.8362, 86.7646] },
    { name: 'Dingboche', coords: [27.8923, 86.8314] },
    { name: 'Lobuche', coords: [27.9485, 86.8104] },
    { name: 'Gorakshep', coords: [27.9811, 86.8286] },
    { name: 'Everest Base Camp', coords: [28.0043, 86.8557] },
    { name: 'Kala Patthar', coords: [27.9833, 86.8167] },
    { name: 'Pheriche', coords: [27.8932, 86.8199] },
];

const trail = [
    [0, 1, 2],
    [2, 3],
    [3],
    [3, 4],
    [4, 5],
    [5],
    [5, 6],
    [6, 7, 8, 7],
    [7, 9, 10],
    [10, 4],
    [4, 3],
    [3, 2],
    [2, 1],
    [1, 0]
]


window.onload = () => {
    const map = L.map('the-map').setView([27.9881, 86.9250], 9);
    
    L.Icon.Default.prototype.options.iconSize = [16, 24];
    L.Icon.Default.prototype.options.iconAnchor = [8, 24];
    L.Icon.Default.prototype.options.shadowUrl = null;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    places.forEach((place, index) => {
        const days = trail.reduce((acc, indices, day) => {
            if (indices.includes(index)) {
                acc.push(day + 1);
            }
            return acc;
        }, []);

        place.days = days;
    });

    const markers = places.map(place => {
        const marker = L.marker(place.coords);
        marker.addTo(map);

        const days = place.days.join(', ');
        marker.bindTooltip(`<h4>${place.name}</h4><p>Days: ${days}</p>`, {
            className: 'map-tooltip'
        });
        return marker;
    });
    const group = L.featureGroup(markers);
    map.fitBounds(group.getBounds());

    const trailIndices = [].concat(...trail);
    const trailPoints = trailIndices.map(i => places[i].coords);

    const trailLine = L.polyline(trailPoints, {
        color: 'red',
        weight: 2,
        dashArray: '4',
    }).addTo(map);
};