import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


export default function useTouristDataProcessing(histogramData) {
    const [maxTouristsByYear, setMaxTouristsByYear] = useState([]);
    const [minTouristsByYear, setMinTouristsByYear] = useState([]);

    useEffect(() => {
        const processData = () => {
            const dataByYear = histogramData.reduce((acc, item) => {
                const year = new Date(item.time).getFullYear();
                if (!acc[year]) {
                    acc[year] = [];
                }
                acc[year].push(item);
                return acc;
            }, {});

            const maxData = Object.entries(dataByYear).map(([, data]) => {
                return data.reduce((max, item) => !max || parseFloat(item.value) > parseFloat(max.value) ? item : max, null);
            });

            const minData = Object.entries(dataByYear).map(([, data]) => {
                return data.reduce((min, item) => !min || parseFloat(item.value) < parseFloat(min.value) ? item : min, null);
            });

            setMaxTouristsByYear(maxData);
            setMinTouristsByYear(minData);
        };

        if (histogramData.length > 0) {
            processData();
        }
    }, [histogramData]);

    return { maxTouristsByYear, minTouristsByYear };
}

useTouristDataProcessing.propTypes = {
    histogramData: PropTypes.array.isRequired,
};
