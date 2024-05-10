import { useEffect, useState } from 'react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import HistogramChart from "../../Components/HistogramChart"


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
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('')
    const [selected, setSelected] = useState(communities[0])

    const filteredCommunities =
    query === ''
        ? communities
        : communities.filter((community) => {
                return community.name.toLowerCase().includes(query.toLowerCase())
            })

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

    return (
        <>
            <h1 className='font-bold text-center' >Nº total de turistas de las comunidades autónomas con más afluencia de turistas</h1>
            <div className="mx-auto h-52 w-52 pt-20">
                <Combobox value={selected} onChange={(value) => setSelected(value)}>
                    <div className="relative">
                        <ComboboxInput
                            className={clsx(
                            'w-full rounded-lg border-none bg-black/5 py-1.5 pr-8 pl-3 text-sm/6 text-black',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                            )}
                            displayValue={(community) => community?.name}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                            <ChevronDownIcon className="size-4 fill-black/60 group-data-[hover]:fill-black" />
                        </ComboboxButton>
                    </div>
                    <Transition
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <ComboboxOptions
                            anchor="bottom"
                            className="w-[var(--input-width)] rounded-xl border border-black/5 bg-black/5 p-1 [--anchor-gap:var(--spacing-1)] empty:hidden overflow-auto h-20"
                        >
                            {filteredCommunities.map((community) => (
                            <ComboboxOption
                                key={community.id}
                                value={community}
                                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-black/10"
                            >
                                <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" />
                                <div className="text-sm/6 text-black">{community.name}</div>
                            </ComboboxOption>
                            ))}
                        </ComboboxOptions>
                    </Transition>
                </Combobox>
            </div>
            <HistogramChart data={data} />
            <h6 className='pt-8 font-bold text-center text-sm' >Datos: 10/2015 - 03/2024</h6>
        </>
    )
}
