import { createChart } from 'lightweight-charts';
import { useEffect, useRef, useState } from 'react';


const spain_turism_api_url = import.meta.env.VITE_SPAIN_TURISM_API


export default function Tourists() {
    const containerRef = useRef();
    const chartRef = useRef();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // Example Data:
            // [
            //     {
            //       "autonomous_community": "Madrid, Comunidad de",
            //       "time": "2015-10-01",
            //       "value": 562247
            //     },
            //     {
            //       "autonomous_community": "Madrid, Comunidad de",
            //       "time": "2015-11-01",
            //       "value": 371205
            //     },
            //     {
            //       "autonomous_community": "Madrid, Comunidad de",
            //       "time": "2015-12-01",
            //       "value": 332461
            //     },
            //     {
            //       "autonomous_community": "Madrid, Comunidad de",
            //       "time": "2016-01-01",
            //       "value": 397420
            //     }
            // ]
            const response = await fetch(`${spain_turism_api_url}/tourists?autonomous_community=madrid`);
            const jsonData = await response.json();
            setData(jsonData);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!chartRef.current && data.length > 0) {
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

            histogramSeries.setData(data);
            chartRef.current.timeScale().fitContent();
        }
    }, [data]);

    return (
        <>
            <h1>Esto es el Tourists</h1>
            <div ref={containerRef} className="h-[500px] w-full"></div>
        </>
    )
}
