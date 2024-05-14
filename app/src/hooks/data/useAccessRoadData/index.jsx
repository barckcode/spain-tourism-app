import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


const spain_turism_api_url = import.meta.env.VITE_SPAIN_TURISM_API;


export default function useAccessRoadData(selectedAccessRoad) {
    const [dataBase, setDataBase] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDataBase = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const response = await fetch(`${spain_turism_api_url}/access-road?access_road_type=${encodeURIComponent(selectedAccessRoad.name)}`)
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const jsonData = await response.json()
                setDataBase(jsonData)
            } catch (error) {
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchDataBase()
    }, [selectedAccessRoad])


    return { dataBase, isLoading, error }
}

useAccessRoadData.propTypes = {
    selectedAccessRoad: PropTypes.object.isRequired
}
