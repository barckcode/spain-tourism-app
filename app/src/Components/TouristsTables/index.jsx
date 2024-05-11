import PropTypes from 'prop-types';
import DinamicTable from '../DinamicTable'


export default function TouristsTables({ data }) {

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

    return(
        <div className="pt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <DinamicTable data={maxTouristsByYear} title="Número de turistas" />
            <DinamicTable data={minTouristsByYear} title="Número de turistas" />
        </div>
    )
}

TouristsTables.propTypes = {
    data: PropTypes.data.isRequired,
}
