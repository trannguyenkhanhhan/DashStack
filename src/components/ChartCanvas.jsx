import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChartCanvas = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#E2E8F0',
          font: {
            size: 14,
          }
        }
      },
      tooltip: {
        backgroundColor: '#0F172A',
        titleColor: '#CBD5E1',
        bodyColor: '#CBD5E1',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 10,
        callbacks: {
          title: function(tooltipItems) {
            return `Day: ${tooltipItems[0].label}`;
          },
          label: function(tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.formattedValue}%`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#94A3B8' },
      },
      y: {
        grid: { color: '#334155' },
        ticks: {
          color: '#94A3B8',
        },
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  return (
    <div className="h-80">
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartCanvas;