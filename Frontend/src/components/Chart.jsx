import {Chart, LineElement} from 'chart.js/auto';
import {Line} from 'react-chartjs-2';
import './Chart.css';

Chart.register(LineElement);

export default function LineChart({ chartData = [], chartOptions }) {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        ...chartOptions,
        scales: {
            ...chartOptions?.scales,
            x: {
                ...chartOptions?.scales?.x,
                ticks: {
                    ...chartOptions?.scales?.x?.ticks,
                    color: '#54654E',
                },
            },
            y: {
                ...chartOptions?.scales?.y,
                min: 0,
                max: 6,
                ticks: {
                    ...chartOptions?.scales?.y?.ticks,
                    color: '#54654E',
                },
            },
        },
        plugins: {
            ...chartOptions?.plugins,
            legend: {
                ...chartOptions?.plugins?.legend,
                position: 'top',
                align: 'center',
                usePointStyle: true,
                labels: {
                    ...chartOptions?.plugins?.legend?.labels,
                    padding: 20,
                    boxWidth: 40,
                    boxHeight: 20,
                },
            },
            tooltip: {
                ...chartOptions?.plugins?.tooltip,
                callbacks: {
                    label: context => {
                        if (context.dataset.label === 'Missed Meds') {
                            return context.raw === 5.5 ? 'Medication not taken' : 'Medication taken';
                        }
                    }
                }
            }
        },
    };

    const data = {
        labels: chartData.map(item => item.date),
        datasets: [
            {
                label: 'Mood',
                data: chartData.map(item => item.moodScore === -1 ? null : item.moodScore),
                spanGaps: false,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
                label: 'Sleep',
                data: chartData.map(item => item.sleepScore === -1 ? null : item.sleepScore),
                spanGaps: false,
                borderColor: 'rgb(49, 40, 214)',
                backgroundColor: 'rgba(129, 197, 245, 0.2)',
                borderDash: [5, 5],
            },
            {
                label: 'Missed Meds',
                data: chartData.map(item => item.medsTaken === false ? 5.5 : null),
                showLine: false,
                pointStyle: 'triangle',
                pointRadius: 10,
                pointHoverRadius: 12,
                borderColor: '#FFC20C',
                backgroundColor: '#FFF0C4',
            }
        ],
    };

    return (
        <div className="chart-shell">
            <h2 className="chart-title">Your 7 Day Summary</h2>
            <div className="chart-area">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}