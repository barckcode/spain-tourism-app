import { useState } from 'react';
import Spinner from '../../Components/Spinner';
import SelectableInput from '../../Components/SelectableInput';
import HistogramChart from "../../Components/HistogramChart"
import LineChart from '../../Components/LineChart';
import DinamicTable from '../../Components/DinamicTable';
import useGetData from '../../Hooks/data/useGetData';
import useDataProcessing from '../../Hooks/data/useDataProcessing';


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
    const {dataBase, annualVariationData, accumulatedAnnualData, isLoading, error} = useGetData(selected, 'tourists', 'autonomous_community')
    const { maxDataByYear, minDataByYear, lastValidDataByYear } = useDataProcessing(dataBase, accumulatedAnnualData);

    return (
        <>
            <h1 className='font-bold text-center text-2xl' >Comunidades Autónomas con más afluencia de turistas</h1>
            <p className='pt-8 font-bold text-center text-xs' >Datos desde el 10/2015 al 03/2024</p>
            <SelectableInput
                options={communities}
                selected={selected}
                setSelected={setSelected}
            />
            {isLoading ? (
                <div className='flex justify-center items-center h-full'>
                    <Spinner />
                </div>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <>
                    <h2 className='font-bold text-center text-xl' >Nº de turistas al año</h2>
                    <HistogramChart data={dataBase} />

                    <div className="pt-16 w-full text-left grid grid-cols-1 gap-6 justify-items-center sm:grid-cols-3">
                        <DinamicTable data={lastValidDataByYear} title="Total de turistas por año" first_columm_title="Año" second_columm_title="Hasta el mes de" third_column_title="Nº de turistas" />
                        <DinamicTable data={maxDataByYear} title="Mes con más turistas por año" first_columm_title="Año" second_columm_title="Mes" third_column_title="Nº de turistas" />
                        <DinamicTable data={minDataByYear} title="Mes con menos turistas por año" first_columm_title="Año" second_columm_title="Mes" third_column_title="Nº de turistas" />
                    </div>

                    <h2 className='pt-16 font-bold text-center text-xl' >Tasa de variación anual</h2>
                    <LineChart data={annualVariationData} />
                </>
            )}
        </>
    )
}
