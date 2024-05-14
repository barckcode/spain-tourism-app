// import { useEffect, useState } from 'react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import PropTypes from 'prop-types';


export default function SelectableInput({ communities, selected, setSelected, query, setQuery }) {
    // const [query, setQuery] = useState('')
    const filteredCommunities = query === ''
        ? communities
        : communities.filter((community) => community.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="mx-auto h-52 w-52 pt-20">
            <Combobox value={selected} onChange={setSelected}>
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
    );
}

SelectableInput.propTypes = {
    communities: PropTypes.array.isRequired,
    selected: PropTypes.object,
    setSelected: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
    setQuery: PropTypes.func.isRequired,
};
