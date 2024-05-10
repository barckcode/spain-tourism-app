import { createChart } from 'lightweight-charts';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';


export default function HistogramChart({ data }) {
    const containerRef = useRef();
    const chartRef = useRef();
    const histogramSeriesRef = useRef();

    useEffect(() => {
        if (data.length > 0) {
            const chartOptions = {
                layout: {
                    textColor: 'black',
                    background: {
                        type: 'solid',
                        color: '#f5f3ff'
                    }
                }
            };
            if (!chartRef.current) {
                chartRef.current = createChart(containerRef.current, chartOptions);
                histogramSeriesRef.current = chartRef.current.addHistogramSeries({ color: '#26a69a' });
            }

            histogramSeriesRef.current.setData(data);
            chartRef.current.timeScale().fitContent();
        }
    }, [data]);

    return <div ref={containerRef} className="h-[500px] w-auto"></div>;
}

HistogramChart.propTypes = {
    data: PropTypes.array.isRequired,
}
