import { useState } from 'react';
import { useLoaderData, json } from 'react-router-dom';

import Controls from '../components/UI/Controls';
import Countries from '../components/countries/Countries';

import { CountriesType } from '../helpers/types';

const CountriesPage: React.FC = () => {
	const [filteredRegion, setFilteredRegion] = useState('All');
	const [filteredCountry, setFilteredCountry] = useState('');
	const data = useLoaderData() as CountriesType;

	const filteredRegionHandler = (region: string) => {
		setFilteredRegion(region);
	};

	const filteredCountryHandler = (country: string) => {
		setFilteredCountry(country);
	};

	const filteredCountries = data.filter((country) => {
		const countryName = country.name.common.toLowerCase();
		const filteredCountryLower = filteredCountry.toLowerCase();

		const matchesName = filteredCountry === '' || countryName.includes(filteredCountryLower);
		const matchesRegion = filteredRegion === '' || filteredRegion === 'All' || country.region === filteredRegion;

		return matchesName && matchesRegion;
	});

	return (
		<>
			<Controls
				onFilteredRegion={filteredRegionHandler}
				onFilteredCountry={filteredCountryHandler}
				region={filteredRegion}
			/>
			<Countries data={filteredCountries} />
		</>
	);
};

export default CountriesPage;

export const loader = async () => {
	const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital');

	if (!response.ok) {
		throw json({ message: 'Failed to fetch data.' }, { status: 500 });
	}

	const data = await response.json();

	return data;
};
