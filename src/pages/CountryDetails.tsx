import { json, useLoaderData, LoaderFunctionArgs, useParams } from 'react-router-dom';

import { CountryDetailsData } from '../helpers/types';

import CountryDetail from '../components/details/CountryDetail';

const CountryDetailsPage: React.FC = () => {
	const data = useLoaderData() as CountryDetailsData[];
	const params = useParams();

	const countryDetailData = data.filter((data) => data.name.common === params.countryName);

	return (
		<section>
			<CountryDetail data={countryDetailData[0]} />
		</section>
	);
};

export default CountryDetailsPage;

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const response = await fetch('https://restcountries.com/v3.1/name/' + params.countryName);

	if (!response.ok) {
		throw json({ message: 'Failed to fetch data.' }, { status: 500 });
	}

	const data = await response.json();

	return data;
};
