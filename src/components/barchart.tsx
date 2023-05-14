import { Chart, PieController, ArcElement, BarController } from 'chart.js';
import { useRef, useEffect } from 'react';

Chart.register(BarController, ArcElement);

const BarChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        let myChart: any = null;

        if (chartRef.current) {
            if (myChart) {
                myChart.destroy();
            }

            myChart = new Chart(chartRef.current, {
                type: 'bar',
                data: {
                    labels: ["January", "February", "March", "April", "May"],
                    datasets: [{
                        label: "My Data",
                        data: [10, 20, 30, 40, 50]
                    }]
                },
                options: {
                    scales: {
                        // y: [{
                        //     ticks: {
                        //         type: 'category'
                        //     }
                        // }]
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

export default BarChart;