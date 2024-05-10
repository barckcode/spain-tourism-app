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
                        color: '#f5f3ff'
                    }
                }
            };
            chartRef.current = createChart(containerRef.current, chartOptions);
            const histogramSeries = chartRef.current.addHistogramSeries({ color: '#26a69a' });

            const data = [
                {
                    "autonomous_community": "Madrid, Comunidad de",
                    "year": 2024,
                    "month": 3,
                    "total": 711554
                },
                {
                    "autonomous_community": "Madrid, Comunidad de",
                    "year": 2024,
                    "month": 2,
                    "total": 585156
                },
                {
                    "autonomous_community": "Madrid, Comunidad de",
                    "year": 2024,
                    "month": 1,
                    "total": 609325
                },
                {
                    "autonomous_community": "Madrid, Comunidad de",
                    "year": 2023,
                    "month": 12,
                    "total": 605809
                },
                {
                    "autonomous_community": "Madrid, Comunidad de",
                    "year": 2023,
                    "month": 11,
                    "total": 673552
                },
                {
                    "autonomous_community": "Madrid, Comunidad de",
                    "year": 2023,
                    "month": 10,
                    "total": 822942
                }
            ]

            const formattedData = data
                .map(item => ({
                    time: { year: item.year, month: item.month - 1, day: 1 },
                    value: item.total
                }))
                .sort((a, b) => {
                    const dateA = new Date(a.time.year, a.time.month, a.time.day);
                    const dateB = new Date(b.time.year, b.time.month, b.time.day);
                    return dateA - dateB;
                }
            );

            histogramSeries.setData(formattedData);
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
