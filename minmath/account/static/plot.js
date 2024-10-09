async function fetchData() {
    const response = await fetch("../api/recent-games/");
    const data = await response.json();
    return data;
}

async function renderChart() {
    const style = getComputedStyle(document.body);
    const accentColor = style.getPropertyValue("--accent");
    const textColor = style.getPropertyValue("--txt");
    const sheetColor = style.getPropertyValue("--sheet");
    const { labels, scores, times } = await fetchData();
    const context = document.getElementById("recent-games-plot").getContext("2d");
    const gameChart = new Chart(context, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Score",
                data: scores,
                borderColor: "black",
                backgroundColor: accentColor,
                pointRadius: 3,
                datalabels: {
                    anchor: "end",
                    align: "end",
                    formatter: (value, context) => {
                        const t = times[context.dataIndex];
                        return `${t}s`;
                    },
                    color: textColor,
                },
            }]
        },
        options: {
            responsive: true,
            layout: {
                padding: {
                    top: 24,
                    bottom: 24,
                    left: 24,
                    right: 24,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false,
                        color: "gray",
                    },
                    ticks: {
                        color: "gray",
                    },
                },
                x: {
                    grid: {
                        display: false,
                        color: "gray",
                    },
                    ticks: {
                        color: "gray",
                    },
                }
            },
            plugins: {
                datalabels: {
                    display: true,
                },
                legend: {
                    display: false,
                },
                tooltip: {
                    displayColors: false,
                    callbacks: {
                        label: (tooltipItem) => {
                            const t = times[tooltipItem.dataIndex];
                            const s = scores[tooltipItem.dataIndex];
                            return `${s} in ${t}s`;
                        },
                    }
                },
            },
        },
        plugins: [ChartDataLabels],
    });
}

renderChart();