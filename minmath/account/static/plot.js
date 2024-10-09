async function fetchData() {
    const response = await fetch("../api/recent-games/");
    const data = await response.json();
    return data;
}

async function renderChart() {
    const { labels, scores, times } = await fetchData();
    const ctx = document.getElementById("recent-games-plot").getContext("2d");
    const gameChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Score",
                data: scores,
                borderColor: "black",
                backgroundColor: "white",
                pointRadius: 3,
                datalabels: {
                    anchor: "end",
                    align: "end",
                    formatter: (value, context) => {
                        const t = times[context.dataIndex];
                        return `${t}s`;
                    },
                    color: "white",
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