import { useState } from 'react';
import SelectableInput from '../../Components/SelectableInput';
import HistogramChart from "../../Components/HistogramChart"
import LineChart from '../../Components/LineChart';
import DinamicTable from '../../Components/DinamicTable';
import useTouristData from '../../hooks/data/useTouristData';
import useTouristDataProcessing from '../../hooks/data/useTouristDataProcessing';


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
    const {histogramChartData, lineChartData, isLoading, error} = useTouristData(selected)
    const { maxTouristsByYear, minTouristsByYear } = useTouristDataProcessing(histogramChartData);

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
            {isLoading ? (
                <p>Cargando datos...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <>
                    <h2 className='font-bold text-center text-xl' >Nº total de turistas al año</h2>
                    <HistogramChart data={histogramChartData} />

                    <div className="pt-16 w-full text-left grid grid-cols-1 gap-6 justify-items-center sm:grid-cols-2">
                        <DinamicTable data={maxTouristsByYear} title="Mes con más turistas por año" />
                        <DinamicTable data={minTouristsByYear} title="Mes con menos turistas por año" />
                    </div>

                    <h2 className='pt-16 font-bold text-center text-xl' >Tasa de variación anual</h2>
                    <LineChart data={lineChartData} />
                </>
            )}
        </>
    )
}
