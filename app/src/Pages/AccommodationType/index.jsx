import { useState } from "react";
import Spinner from "../../Components/Spinner";
import SelectableInput from "../../Components/SelectableInput";
import useGetData from "../../Hooks/data/useGetData";
import useDataProcessing from "../../Hooks/data/useDataProcessing";
import LineChart from "../../Components/LineChart";
import DinamicTable from "../../Components/DinamicTable";


const accommodationTypes = [
    { id: 1, name: 'Hotelero' },
    { id: 2, name: 'Vivienda en alquiler' },
    { id: 3, name: 'Resto de mercado' },
    { id: 4, name: 'Vivienda en propiedad' },
    { id: 5, name: 'Vivienda de familiares o amigos' },
    { id: 6, name: 'Resto de no mercado' },
]


export default function AccommodationType() {
    const [selected, setSelected] = useState(accommodationTypes[0])
    const { dataBase, accumulatedAnnualData, isLoading, error } = useGetData(selected, 'accommodation-type', 'accommodation_type_name')
    const { maxDataByYear, minDataByYear, lastValidDataByYear } = useDataProcessing(dataBase, accumulatedAnnualData)

    return (
        <>
            <h1 className='font-bold text-center text-2xl' >Nº de turistas por tipo de alojamiento en España</h1>
            <p className='pt-8 font-bold text-center text-xs' >Datos desde el 10/2015 al 03/2024</p>
            <SelectableInput
                options={accommodationTypes}
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
                    <h2 className='font-bold text-center text-xl' >Nº de turistas que eligen este tipo de alojamiento</h2>
                    <LineChart data={dataBase} />
                    <div className="pt-16 w-full text-left grid grid-cols-1 gap-6 justify-items-center sm:grid-cols-3">
                        <DinamicTable data={lastValidDataByYear} title={`Total de turistas por año que eligen este tipo de alojamiento`} first_columm_title="Año" second_columm_title="Hasta el mes de" third_column_title="Nº de turistas" />
                        <DinamicTable data={maxDataByYear} title={`Mes que más turistas eligen este tipo de alojamiento`} first_columm_title="Año" second_columm_title="Mes" third_column_title="Nº de turistas" />
                        <DinamicTable data={minDataByYear} title={`Mes que menos turistas eligen este tipo de alojamiento`} first_columm_title="Año" second_columm_title="Mes" third_column_title="Nº de turistas" />
                    </div>
                </>
            )}
        </>
    );
}
