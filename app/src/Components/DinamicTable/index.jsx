import PropTypes from 'prop-types';


export default function DinamicTables({ data, title }) {
    const dataByYear = data.reduce((acc, item) => {
        const year = new Date(item.time).getFullYear();
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(item);
        return acc;
    }, {});

    const touristsByYear = Object.entries(dataByYear).map(([, data]) => {
        const touristsMonth = data.reduce((current, item) => {
            if (!current || parseFloat(item.value) > parseFloat(current.value)) {
                return item;
            }
            return current;
        }, null);
        return touristsMonth;
    });

    const maxTourists = Math.max(...touristsByYear.map(item => parseFloat(item.value)));
    const minTourists = Math.min(...touristsByYear.map(item => parseFloat(item.value)));

    return (
        <table className="w-full sm:w-2/4 bg-indigo-100 my-8">
            <caption className="text-xl font-bold p-4">{title}</caption>
            <thead>
                <tr>
                    <th className="p-2 bg-indigo-600 text-indigo-100">Año</th>
                    <th className="p-2 bg-indigo-600 text-indigo-100">Mes</th>
                    <th className="p-2 bg-indigo-600 text-right text-indigo-100">Nº de turistas</th>
                </tr>
            </thead>
            <tbody>
                {touristsByYear.map((item) => {
                    const value = parseFloat(item.value);
                    let colorClass = '';
                    if (value === maxTourists) {
                        colorClass = 'text-green-600';
                    } else if (value === minTourists) {
                        colorClass = 'text-red-500';
                    }
                    return (
                        <tr key={item.time} className="odd:bg-indigo-200">
                            <td className="p-2">{new Date(item.time).getFullYear()}</td>
                            <td className="p-2">{new Date(item.time).toLocaleString('es-ES', { month: 'long' })}</td>
                            <td className={`p-2 text-right font-bold ${colorClass}`}>{value.toLocaleString('es-ES')}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

DinamicTables.propTypes = {
    data: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
};
