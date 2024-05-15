import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


const spain_turism_api_url = import.meta.env.VITE_SPAIN_TURISM_API;


export default function useGetData(selectedQuery, endpoint, baseQuery) {
    const [dataBase, setDataBase] = useState([]);
    const [annualVariationData, setAnnualVariationDataData] = useState([]);
    const [accumulatedAnnualData, setAccumulatedAnnualData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!selectedQuery) return;

        const fetchDataBase = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`${spain_turism_api_url}/${endpoint}?${baseQuery}=${encodeURIComponent(selectedQuery.name)}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const jsonData = await response.json();
                setDataBase(jsonData);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchAnnualVariationData = async () => {
            try {
                const response = await fetch(`${spain_turism_api_url}/${endpoint}?${baseQuery}=${encodeURIComponent(selectedQuery.name)}&data_type=variación%20anual`);
                if (!response.ok) throw new Error('Network response was not ok');
                const jsonData = await response.json();
                setAnnualVariationDataData(jsonData);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchAccumulatedAnnualData = async () => {
            try {
                const response = await fetch(`${spain_turism_api_url}/${endpoint}?${baseQuery}=${encodeURIComponent(selectedQuery.name)}&data_type=acumulado`);
                if (!response.ok) throw new Error('Network response was not ok');
                const jsonData = await response.json();
                setAccumulatedAnnualData(jsonData);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDataBase();
        fetchAnnualVariationData();
        fetchAccumulatedAnnualData();
    }, [selectedQuery, endpoint, baseQuery]);

    return { dataBase, annualVariationData, accumulatedAnnualData, isLoading, error };
}

useGetData.propTypes = {
    selectedQuery: PropTypes.object,
    endpoint: PropTypes.string,
    baseQuery: PropTypes.string
};
