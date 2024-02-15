import Wrapper from '../layout/Wrapper';
import Country from './Country';

import { CountriesType } from '../../helpers/types';

import styles from './Countries.module.css';

type Props = {
	data: CountriesType;
};

const Countries: React.FC<Props> = (props) => {
	return (
		<section className={styles.countries}>
			<Wrapper>
				{props.data &&
					props.data.map((country) => (
						<Country
							key={country.name.official}
							flag={country.flags}
							name={country.name.common}
							population={country.population}
							region={country.region}
							capital={country.capital}
						/>
					))}
			</Wrapper>
		</section>
	);
};

export default Countries;
