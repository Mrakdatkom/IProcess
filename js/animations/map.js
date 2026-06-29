// js/animations/map.js

// --- Import branch data ---
import branchLocations from '../branches-data.js';

export function animateMap() {
  const mapContainer = document.getElementById('branch-map');
  if (!mapContainer) {
    setTimeout(() => animateMap(), 300);
    return;
  }

  if (typeof L === 'undefined') {
    setTimeout(() => animateMap(), 300);
    return;
  }

  if (mapContainer._leaflet_id) {
    console.log('Map already initialized on this container');
    return;
  }

  try {
    // 1. Initialize the map
    const map = L.map('branch-map', {
      center: [12.8797, 121.7740],
      zoom: 6,
      zoomControl: true,
      fadeAnimation: true,
      attributionControl: true,
    });

    // 2. Add the OpenStreetMap tile layer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // ─── CUSTOM PIN ICONS ──────────────────────────────────────────────

    // Main Branch Pin (larger, with star, blue gradient)
    const mainPin = L.divIcon({
      className: 'custom-marker main-pin',
      html: `
        <div style="
          position: relative;
          width: 44px;
          height: 44px;
        ">
          <!-- Pin body -->
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 44C22 44 38 28 38 16C38 7.16344 30.8366 0 22 0C13.1634 0 6 7.16344 6 16C6 28 22 44 22 44Z" 
                  fill="url(#mainGradient)" stroke="white" stroke-width="2"/>
            <circle cx="22" cy="16" r="5" fill="white" opacity="0.9"/>
            <text x="22" y="19.5" font-family="Arial" font-size="10" font-weight="700" 
                  fill="#046bd2" text-anchor="middle">★</text>
            <defs>
              <linearGradient id="mainGradient" x1="6" y1="0" x2="38" y2="44">
                <stop offset="0%" stop-color="#046bd2"/>
                <stop offset="100%" stop-color="#0358b0"/>
              </linearGradient>
            </defs>
          </svg>
          <!-- Glow ring -->
          <div style="
            position: absolute;
            top: -4px;
            left: -4px;
            width: 52px;
            height: 52px;
            border-radius: 50%;
            background: rgba(4,107,210,0.15);
            animation: pulse-glow 2s ease-in-out infinite;
            pointer-events: none;
          "></div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 44],
      popupAnchor: [1, -42],
    });

    // Regular Branch Pin (smaller, clean blue)
    const branchPin = L.divIcon({
      className: 'custom-marker branch-pin',
      html: `
        <div style="
          position: relative;
          width: 34px;
          height: 34px;
        ">
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 34C17 34 30 21 30 12C30 4.8203 24.1797 -1 17 -1C9.8203 -1 4 4.8203 4 12C4 21 17 34 17 34Z" 
                  fill="url(#branchGradient)" stroke="white" stroke-width="1.8"/>
            <circle cx="17" cy="12" r="4" fill="white" opacity="0.85"/>
            <text x="17" y="14.5" font-family="Arial" font-size="8" font-weight="700" 
                  fill="#046bd2" text-anchor="middle">●</text>
            <defs>
              <linearGradient id="branchGradient" x1="4" y1="-1" x2="30" y2="34">
                <stop offset="0%" stop-color="#046bd2"/>
                <stop offset="100%" stop-color="#2d7ad8"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 34],
      popupAnchor: [1, -34],
    });

    // 3. Add markers for each branch
    branchLocations.forEach(branch => {
      const isMain = branch.type === 'main';
      const icon = isMain ? mainPin : branchPin;

      const marker = L.marker([branch.lat, branch.lng], { icon }).addTo(map);

      // ─── GLASS MORPHISM POPUP ──────────────────────────────────────────
      
      // Build details section conditionally
      let detailsHTML = '';
      
      if (isMain) {
        // Main branch: show all details
        detailsHTML = `
          <div style="
            display: flex;
            flex-direction: column;
            gap: 4px;
            margin-top: 4px;
          ">
            <p style="
              margin: 0;
              font-size: 0.82em;
              color: #4a5568;
              line-height: 1.4;
              display: flex;
              align-items: flex-start;
              gap: 6px;
            ">
              <span style="flex-shrink: 0;">📍</span>
              <span>${branch.address}</span>
            </p>
            <p style="
              margin: 0;
              font-size: 0.82em;
              color: #4a5568;
              display: flex;
              align-items: center;
              gap: 6px;
            ">
              <span>📞</span>
              <span>${branch.phone}</span>
            </p>
            <p style="
              margin: 0;
              font-size: 0.82em;
              color: #4a5568;
              display: flex;
              align-items: center;
              gap: 6px;
            ">
              <span>✉️</span>
              <span>${branch.email}</span>
            </p>
          </div>
        `;
      } else {
        // Regular branch: show "iProcess" name only (no details)
        detailsHTML = '';
      }

      const popupContent = `
        <div style="
          font-family: 'Lato', sans-serif;
          max-width: 280px;
          padding: 4px 0;
        ">
          <!-- Glass morphism card -->
          <div style="
            background: rgba(255, 255, 255, 0.75);
            backdrop-filter: blur(20px) saturate(1.8);
            -webkit-backdrop-filter: blur(20px) saturate(1.8);
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 
                        inset 0 1px 0 rgba(255, 255, 255, 0.4);
            padding: 18px 20px 16px 20px;
            position: relative;
            overflow: hidden;
          ">
            <!-- Subtle gradient accent -->
            <div style="
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 3px;
              background: linear-gradient(90deg, #046bd2, #60a5fa, #046bd2);
              background-size: 200% 100%;
              animation: shimmer 3s ease-in-out infinite;
            "></div>
            
            <!-- Badge -->
            <div style="
              display: inline-block;
              ${isMain ? `
                background: linear-gradient(135deg, #046bd2, #0358b0);
                color: white;
              ` : `
                background: rgba(255, 255, 255, 0.5);
                color: #4a5568;
                border: 1px solid rgba(255,255,255,0.3);
              `}
              font-size: 9px;
              font-weight: 700;
              letter-spacing: 0.08em;
              text-transform: uppercase;
              padding: 3px 12px;
              border-radius: 20px;
              margin-bottom: 8px;
              display: inline-block;
              backdrop-filter: blur(4px);
            ">
              ${isMain ? '🏢 Main Office' : '📍 Branch'}
            </div>

            <!-- Branch Name -->
            <h3 style="
              margin: 4px 0 ${isMain ? '6px' : '0'} 0;
              font-size: 1.1em;
              font-weight: 700;
              color: #1a1a2e;
              letter-spacing: -0.02em;
            ">${branch.name}</h3>

            <!-- Details (only for main branch) -->
            ${detailsHTML}
          </div>
        </div>
      `;

      // Use Leaflet's popup with custom class for glass styling
      marker.bindPopup(popupContent, {
        className: 'glass-popup',
        maxWidth: 320,
        minWidth: 240,
      });
    });

    // 4. Fit map to show all markers with padding
    const group = L.featureGroup(
      branchLocations.map(b => L.marker([b.lat, b.lng]))
    );
    map.fitBounds(group.getBounds().pad(0.15));

    setTimeout(() => {
      map.invalidateSize();
    }, 500);

    console.log(`✅ Map initialized with ${branchLocations.length} branches`);

  } catch (error) {
    console.error('Error initializing map:', error);
  }
}