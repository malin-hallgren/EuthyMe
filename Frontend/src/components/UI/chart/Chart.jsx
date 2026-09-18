import { Chart, LineElement } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useSettings } from '../../../hooks/useSettings.js';

import UserDashboardText from '../../../text-content/UserDashboardText.json';

import './Chart.css';

Chart.register(LineElement);

export default function LineChart({ chartData = [], chartOptions }) {

    const { settings } = useSettings();

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
                    color: settings?.theme === 'light' ? '#9BB194' : '#6b7280',
                },
            },
            y: {
                ...chartOptions?.scales?.y,
                min: 0,
                max: 6,
                ticks: {
                    ...chartOptions?.scales?.y?.ticks,
                    color: settings?.theme === 'light' ? '#9BB194' : '#6b7280',
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
                data: chartData.map(item => item.moodScore),
                spanGaps: false,
                pointRadius: 5,
                pointHoverRadius: 7,
                borderColor: settings?.theme.toLowerCase() === 'light' ? 'rgb(75, 192, 192)' : 'rgb(80, 146, 113)',
                backgroundColor: settings?.theme.toLowerCase() === 'light' ? 'rgba(174, 246, 246, 0.2)' : 'rgba(107, 114, 128, 0.2)',
            },
            {
                label: 'Sleep',
                data: chartData.map(item => item.sleepScore),
                spanGaps: false,
                pointRadius: 5,
                pointHoverRadius: 7,
                borderColor: settings?.theme.toLowerCase() === 'light' ? 'rgb(49, 40, 214)' : 'rgb(104, 133, 193)',
                backgroundColor: settings?.theme.toLowerCase() === 'light' ? 'rgba(112, 105, 243, 0.2)' : 'rgba(107, 114, 128, 0.2)',
                borderDash: [5, 5],
            },
            {
                label: 'Missed Meds',
                data: chartData.map(item => item.medsTaken === false ? 5.5 : null),
                showLine: false,
                pointStyle: 'triangle',
                pointRadius: 10,
                pointHoverRadius: 12,
                borderColor: settings?.theme.toLowerCase() === 'light' ? '#FFC20C' : '#C0CBBD',
                backgroundColor: settings?.theme.toLowerCase() === 'light' ? '#FFF0C4' : '#2e303a',
            }
        ],
    };

    return (
        <div className="chart-shell">
            <h2 className="chart-title">{UserDashboardText.chart_title}</h2>
            <div className="chart-area">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}