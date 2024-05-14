import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


const spain_turism_api_url = import.meta.env.VITE_SPAIN_TURISM_API;


export default function useTouristData(selectedCommunity) {
    const [histogramChartData, setData] = useState([]);
    const [lineChartData, setLineChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!selectedCommunity) return;

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`${spain_turism_api_url}/tourists?autonomous_community=${encodeURIComponent(selectedCommunity.name)}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchLineChartData = async () => {
            try {
                const response = await fetch(`${spain_turism_api_url}/tourists?autonomous_community=${encodeURIComponent(selectedCommunity.name)}&data_type=variaci%C3%B3n%20anual`);
                if (!response.ok) throw new Error('Network response was not ok');
                const jsonData = await response.json();
                setLineChartData(jsonData);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
        fetchLineChartData();
    }, [selectedCommunity]);

    return { histogramChartData, lineChartData, isLoading, error };
}

useTouristData.propTypes = {
    selectedCommunity: PropTypes.object,
};
