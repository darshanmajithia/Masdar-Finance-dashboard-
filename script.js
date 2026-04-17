// Masdar FP&A Dashboard Implementation
// Mock Data Generation and Charting Logic

// Design Tokens matching CSS variables
const colors = {
    primary: '#00A551',   // Green
    primaryLight: 'rgba(0, 165, 81, 0.2)',
    secondary: '#003E7E', // Blue
    secondaryLight: 'rgba(0, 62, 126, 0.2)',
    accent: '#00D2D3',    // Teal
    accentLight: 'rgba(0, 210, 211, 0.2)',
    negative: '#FF5A5F',
    gridLines: '#e2e8f0',
    textMuted: '#6b7a90'
};

// --- DATA ---

// Chart 1: Generation vs Forecast
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
const actualGen = [1800, 1850, 2100, 2050, 2300, 2500, 2650, 2580, 2400]; // GWh
const forecastGen = [1780, 1880, 2050, 2100, 2250, 2450, 2600, 2600, 2450]; // GWh

// Chart 2: Portfolio Mix by Tech
const techMixLabels = ['Solar PV', 'Onshore Wind', 'Offshore Wind', 'Green Hydrogen', 'Battery Storage'];
const techMixData = [12.5, 6.2, 4.8, 1.1, 0.8]; // GW capacity

// Chart 3: Regional EBITDA (M USD)
const regionLabels = ['Middle East', 'Europe', 'North America', 'Asia Pacific', 'Africa'];
const actualEbitda = [450, 320, 280, 190, 85];
const budgetEbitda = [420, 335, 260, 180, 95];

// Table: Key Assets
const keyAssets = [
    { name: 'Al Dhafra PV2', tech: 'Solar PV', loc: 'UAE', cap: 2000, yield: 4850, var: '+3.2%', status: 'Operational', cls: 'operational'},
    { name: 'London Array', tech: 'Offshore Wind', loc: 'UK', cap: 630, yield: 2100, var: '-1.5%', status: 'Operational', cls: 'operational'},
    { name: 'Tashkent Solar', tech: 'Solar PV', loc: 'Uzbekistan', cap: 500, yield: 1120, var: '+5.0%', status: 'Operational', cls: 'operational'},
    { name: 'NEOM Hydrogen', tech: 'Green Hydrogen', loc: 'KSA', cap: 4000, yield: '--', var: '--', status: 'Construction', cls: 'construction'},
    { name: 'Garadagh PV', tech: 'Solar PV', loc: 'Azerbaijan', cap: 230, yield: 500, var: '+2.1%', status: 'Operational', cls: 'operational'}
];

// --- INITIALIZATION ---

document.addEventListener('DOMContentLoaded', () => {
    // Global defaults for Chart.js
    Chart.defaults.font.family = "'Outfit', sans-serif";
    Chart.defaults.color = colors.textMuted;
    Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(10, 30, 63, 0.9)'; // Dark Blue
    Chart.defaults.plugins.tooltip.padding = 10;
    Chart.defaults.plugins.tooltip.cornerRadius = 8;
    
    initGenerationChart();
    initPortfolioMixChart();
    initRegionalEbitdaChart();
    populateAssetTable();
});

// --- CHART RENDERERS ---

function initGenerationChart() {
    const ctx = document.getElementById('generationChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Actual Generation (GWh)',
                    data: actualGen,
                    borderColor: colors.primary,
                    backgroundColor: colors.primaryLight,
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: colors.primary,
                    pointBorderWidth: 2,
                    pointRadius: 4
                },
                {
                    label: 'Forecast (GWh)',
                    data: forecastGen,
                    borderColor: colors.secondary,
                    borderWidth: 2,
                    borderDash: [5, 5],
                    tension: 0.4,
                    fill: false,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top', align: 'end', labels: { usePointStyle: true, boxWidth: 8 } }
            },
            scales: {
                x: { grid: { display: false } },
                y: { grid: { color: colors.gridLines, borderDash: [3, 3] }, beginAtZero: true }
            }
        }
    });
}

function initPortfolioMixChart() {
    const ctx = document.getElementById('portfolioMixChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: techMixLabels,
            datasets: [{
                data: techMixData,
                backgroundColor: [
                    colors.primary, 
                    colors.secondary, 
                    colors.accent, 
                    '#4ade80',  // lighter green
                    '#94a3b8'   // slate
                ],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            plugins: {
                legend: { position: 'right', labels: { usePointStyle: true, boxWidth: 8, padding: 20 } }
            }
        }
    });
}

function initRegionalEbitdaChart() {
    const ctx = document.getElementById('regionalEbitdaChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: regionLabels,
            datasets: [
                {
                    label: 'Actual EBITDA',
                    data: actualEbitda,
                    backgroundColor: colors.primary,
                    borderRadius: 6,
                    barPercentage: 0.6,
                    categoryPercentage: 0.8
                },
                {
                    label: 'Budget EBITDA',
                    data: budgetEbitda,
                    backgroundColor: colors.secondaryLight,
                    borderRadius: 6,
                    barPercentage: 0.6,
                    categoryPercentage: 0.8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top', align: 'end', labels: { usePointStyle: true, boxWidth: 8 } }
            },
            scales: {
                x: { grid: { display: false } },
                y: { grid: { color: colors.gridLines, borderDash: [3, 3] }, beginAtZero: true }
            }
        }
    });
}

// --- TABLE RENDERER ---

function populateAssetTable() {
    const tbody = document.getElementById('assetTableBody');
    keyAssets.forEach(asset => {
        const tr = document.createElement('tr');
        
        const varColor = asset.var.startsWith('+') ? 'style="color: var(--primary); font-weight:600;"' : 
                         (asset.var.startsWith('-') ? 'style="color: var(--negative); font-weight:600;"' : 'style="color: var(--text-muted);"');

        tr.innerHTML = `
            <td style="font-weight: 600; color: var(--secondary);">${asset.name}</td>
            <td>${asset.tech}</td>
            <td>${asset.loc}</td>
            <td>${asset.cap.toLocaleString()}</td>
            <td>${asset.yield.toLocaleString()}</td>
            <td ${varColor}>${asset.var}</td>
            <td><span class="status-badge ${asset.cls}">${asset.status}</span></td>
        `;
        tbody.appendChild(tr);
    });
}
