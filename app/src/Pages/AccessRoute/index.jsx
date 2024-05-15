import { useState } from "react";
import Spinner from "../../Components/Spinner";
import SelectableInput from "../../Components/SelectableInput";
import useGetData from "../../Hooks/data/useGetData";
import useDataProcessing from "../../Hooks/data/useDataProcessing";
import LineChart from "../../Components/LineChart";
import DinamicTable from "../../Components/DinamicTable";


const accessRoadTypes = [
    { id: 1, name: 'Aeropuerto' },
    { id: 2, name: 'Carretera' },
    { id: 3, name: 'Puerto' },
    { id: 4, name: 'Tren' }
]


export default function AccessRoute() {
    const [selected, setSelected] = useState(accessRoadTypes[0])
    const { dataBase, accumulatedAnnualData, isLoading, error } = useGetData(selected, 'access-road', 'access_road_type')
    const { maxDataByYear, minDataByYear, lastValidDataByYear } = useDataProcessing(dataBase, accumulatedAnnualData)

    return (
        <>
            <h1 className='font-bold text-center text-2xl' >Vías de acceso por donde llegan los turistas a España</h1>
            <p className='pt-8 font-bold text-center text-xs' >Datos desde el 10/2015 al 03/2024</p>
            <SelectableInput
                options={accessRoadTypes}
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
                    <h2 className='font-bold text-center text-xl' >Nº de turistas que llegan por {selected.name}</h2>
                    <LineChart data={dataBase} />

                    <div className="pt-16 w-full text-left grid grid-cols-1 gap-6 justify-items-center sm:grid-cols-3">
                        <DinamicTable data={lastValidDataByYear} title={`Total de turistas que llegan por ${selected.name} al año`} first_columm_title="Año" second_columm_title="Hasta el mes de" third_column_title="Nº de turistas" />
                        <DinamicTable data={maxDataByYear} title={`Mes que más turistas llegan por ${selected.name}`} first_columm_title="Año" second_columm_title="Mes" third_column_title="Nº de turistas" />
                        <DinamicTable data={minDataByYear} title={`Mes que menos turistas llegan por ${selected.name}`} first_columm_title="Año" second_columm_title="Mes" third_column_title="Nº de turistas" />
                    </div>
                </>
            )}
        </>
    );
}
