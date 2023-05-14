import { Chart, PieController, ArcElement } from 'chart.js';
import { useRef, useEffect } from 'react';
Chart.register(PieController, ArcElement);

const PieChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        let myChart: any = null;

        if (chartRef.current) {
            if (myChart) {
                myChart.destroy();
            }

            myChart = new Chart(chartRef.current, {
                type: 'pie',
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May'],
                    datasets: [{
                        label: 'Payments by month',
                        data: [12, 19, 3, 5, 2],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.8)',
                            'rgba(54, 162, 235, 0.8)',
                            'rgba(255, 206, 86, 0.8)',
                            'rgba(75, 192, 192, 0.8)',
                            'rgba(153, 102, 255, 0.8)'
                        ]
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            position: 'right'
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context: any) {
                                    const label = context.label || '';

                                    if (label) {
                                        const value = context.parsed || 0;
                                        const formattedValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

                                        return `${label}: ${formattedValue}`;
                                    }

                                    return '';
                                }
                            }
                        }
                    }
                }
            });
        }

        return () => {
            if (myChart) {
                myChart.destroy();
            }
        }
    }, []);

    return (
        <div style={{ height: '30%' }}>
            <canvas ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
        </div>
    );
};

export default PieChart;
