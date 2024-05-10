import { createChart } from 'lightweight-charts';
import { useEffect, useRef } from 'react';


export default function Tourists() {
    const containerRef = useRef();
    const chartRef = useRef();

    useEffect(() => {
        if (!chartRef.current) {
            const chartOptions = {
                layout: {
                    textColor: 'black',
                    background: {
                        type: 'solid',
                        color: 'white'
                    }
                }
            };
            chartRef.current = createChart(containerRef.current, chartOptions);
            const histogramSeries = chartRef.current.addHistogramSeries({ color: '#26a69a' });

            const data = [
                { value: 1, time: 1642425322 },
                { value: 8, time: 1642511722 },
                { value: 10, time: 1642598122 },
                { value: 20, time: 1642684522 },
                { value: 3, time: 1642770922, color: 'red' },
                { value: 43, time: 1642857322 },
                { value: 41, time: 1642943722, color: 'red' },
                { value: 43, time: 1643030122 },
                { value: 56, time: 1643116522 },
                { value: 46, time: 1643202922, color: 'red' }
            ];

            histogramSeries.setData(data);
            chartRef.current.timeScale().fitContent();
        }
    }, []);

    return (
        <>
            <h1>Esto es el Tourists</h1>
            <div ref={containerRef} className="h-[500px] w-full"></div>
        </>
    )
}
