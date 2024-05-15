import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


export default function useDataProcessing(dataBase, accumulatedAnnualData) {
    const [maxDataByYear, setMaxDataByYear] = useState([]);
    const [minDataByYear, setMinDataByYear] = useState([]);
    const [lastValidDataByYear, setLastValidDataByYear] = useState([]);

    useEffect(() => {
        const processData = () => {
            const dataByYear = dataBase.reduce((acc, item) => {
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

            setMaxDataByYear(maxData);
            setMinDataByYear(minData);
        };

        if (dataBase.length > 0) {
            processData();
        }
    }, [dataBase]);

    useEffect(() => {
        const processAccumulatedData = () => {
            const dataByYear = {};

            accumulatedAnnualData.forEach(item => {
                const year = new Date(item.time).getFullYear();
                if (item.value !== null && (!dataByYear[year] || new Date(item.time) > new Date(dataByYear[year].time))) {
                    dataByYear[year] = item;
                }
            });

            setLastValidDataByYear(Object.values(dataByYear));
        };

        if (accumulatedAnnualData.length > 0) {
            processAccumulatedData();
        }
    }, [accumulatedAnnualData]);

    return { maxDataByYear, minDataByYear, lastValidDataByYear };
}

useDataProcessing.propTypes = {
    dataBase: PropTypes.array.isRequired,
    accumulatedAnnualData: PropTypes.array.isRequired,
};
