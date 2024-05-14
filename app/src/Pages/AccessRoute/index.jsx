import { useState } from "react";
import Spinner from "../../Components/Spinner";
import SelectableInput from "../../Components/SelectableInput";
import useAccessRoadData from "../../Hooks/data/useAccessRoadData";
import LineChart from "../../Components/LineChart";


const accessRoadTypes = [
    { id: 1, name: 'Aeropuerto' },
    { id: 2, name: 'Carretera' },
    { id: 3, name: 'Puerto' },
    { id: 4, name: 'Tren' }
]


export default function AccessRoute() {
    const [selected, setSelected] = useState(accessRoadTypes[0])
    const { dataBase, isLoading, error } = useAccessRoadData(selected)


    return (
        <>
            <h1 className='font-bold text-center text-2xl' >Vías de acceso por donde llegan los turistas</h1>
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
                </>
            )}
        </>
    );
}
