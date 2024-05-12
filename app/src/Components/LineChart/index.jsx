import { createChart } from 'lightweight-charts';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';


export default function LineChart({ data }) {
    const containerRef = useRef();
    const chartRef = useRef();
    const lineSeriesRef = useRef();

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
                lineSeriesRef.current = chartRef.current.addLineSeries();
            }

            const chartData = data.map(item => ({
                time: new Date(item.time).getTime() / 1000,
                value: item.value,
            }));

            lineSeriesRef.current.setData(chartData);

            chartRef.current.timeScale().fitContent();
        }
    }, [data]);

    return <div ref={containerRef} className="h-[500px] w-auto"></div>;
}

LineChart.propTypes = {
    data: PropTypes.array.isRequired,
}
