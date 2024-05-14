import { useEffect, useState } from 'react';
import SelectableInput from '../../Components/SelectableInput';
import HistogramChart from "../../Components/HistogramChart"
import LineChart from '../../Components/LineChart';
import DinamicTable from '../../Components/DinamicTable';


const spain_turism_api_url = import.meta.env.VITE_SPAIN_TURISM_API

const communities = [
    { id: 1, name: 'Madrid' },
    { id: 2, name: 'Cataluña' },
    { id: 3, name: 'Canarias' },
    { id: 4, name: 'Andalucía' },
    { id: 5, name: 'Balears' },
    { id: 6, name: 'Comunitat Valenciana' },
    { id: 7, name: 'Otras Comunidades Autónomas' },
]

export default function Tourists() {
    const [selected, setSelected] = useState(communities[0])
    const [query, setQuery] = useState('')
    const [data, setData] = useState([]);
    const [lineChartData, setLineChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (selected) {
                const response = await fetch(`${spain_turism_api_url}/tourists?autonomous_community=${decodeURIComponent(selected.name)}`);
                if (response.ok) {
                    const jsonData = await response.json();
                    setData(jsonData);
                } else {
                    console.error('Error fetching data:', response.status, response.statusText);
                }
            }
        };

        fetchData();
    }, [selected]);

    useEffect(() => {
        const fetchLineChartData = async () => {
            if (selected) {
                const response = await fetch(`${spain_turism_api_url}/tourists?autonomous_community=${decodeURIComponent(selected.name)}&data_type=variaci%C3%B3n%20anual`);
                if (response.ok) {
                    const jsonData = await response.json();
                    setLineChartData(jsonData);
                } else {
                    console.error('Error fetching line chart data:', response.status, response.statusText);
                }
            }
        };

        fetchLineChartData();
    }, [selected]);

    const dataByYear = data.reduce((acc, item) => {
        const year = new Date(item.time).getFullYear();
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(item);
        return acc;
    }, {});

    const maxTouristsByYear = Object.entries(dataByYear).map(([, data]) => {
        const maxTouristsMonth = data.reduce((max, item) => {
            if (!max || parseFloat(item.value) > parseFloat(max.value)) {
                return item;
            }
            return max;
        }, null);
        return maxTouristsMonth;
    });

    const minTouristsByYear = Object.entries(dataByYear).map(([, data]) => {
        const minTouristsMonth = data.reduce((min, item) => {
            if (!min || parseFloat(item.value) < parseFloat(min.value)) {
                return item;
            }
            return min;
        }, null);
        return minTouristsMonth;
    });

    return (
        <>
            <h1 className='font-bold text-center text-2xl' >Comunidades Autónomas con más afluencia de turistas</h1>
            <p className='pt-8 font-bold text-center text-xs' >Datos desde el 10/2015 al 03/2024</p>
            <SelectableInput
                communities={communities}
                selected={selected}
                setSelected={setSelected}
                query={query}
                setQuery={setQuery}
            />
            <h2 className='font-bold text-center text-xl' >Nº total de turistas al año</h2>
            <HistogramChart data={data} />

            <div className="pt-16 w-full text-left grid grid-cols-1 gap-6 justify-items-center sm:grid-cols-2">
                <DinamicTable data={maxTouristsByYear} title="Mes con más turistas por año" />
                <DinamicTable data={minTouristsByYear} title="Mes con menos turistas por año" />
            </div>

            <h2 className='pt-16 font-bold text-center text-xl' >Tasa de variación anual</h2>
            <LineChart data={lineChartData} />
        </>
    )
}
