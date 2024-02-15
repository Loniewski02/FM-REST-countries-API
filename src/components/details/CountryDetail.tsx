import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Paragraph from '../layout/Paragraph';
import Wrapper from '../layout/Wrapper';

import { CountryDetailsData } from '../../helpers/types';

import styles from './CountryDetail.module.css';

type Props = {
	data: CountryDetailsData;
};

const CountryDetail: React.FC<Props> = ({ data }) => {
	const navigate = useNavigate();
	const [borderCountries, setBorderCountries] = useState<string[] | null>(null);
	const fet = useCallback(async () => {
		if (data.borders) {
			let codes = data.borders.toLocaleString();
			const res = await fetch(`https://restcountries.com/v3.1/alpha?codes=${codes}`);

			const data2 = await res.json();
			setBorderCountries(data2.map((dat: { name: { common: string } }) => dat.name.common));
		} else {
			setBorderCountries(null);
		}
	}, [data]);

	useEffect(() => {
		fet();
	}, [fet]);

	const nativeName = Object.values(data.name.nativeName)[0].common;
	const currencies = Object.values(data.currencies)
		.map((key) => `${key.name}(${key.symbol}) `)
		.join(', ');
	const languages = Object.values(data.languages)
		.map((key) => `${key}`)
		.join(', ');
	const tld = data.tld ? data.tld.join(' ') : 'None';

	return (
		<section className={styles.details}>
			<Wrapper>
				<button
					onClick={() => {
						navigate('..');
					}}>
					Back
				</button>
				<div className={styles.details__info}>
					<img
						src={data.flags.png}
						alt={data.flags.alt}
					/>
					<div>
						<h2>{data.name.official}</h2>
						<div className={styles.first}>
							<Paragraph name='Native Name: '>{nativeName}</Paragraph>
							<Paragraph name='Population: '>{data.population.toLocaleString('en-US')}</Paragraph>
							<Paragraph name='Region: '>{data.region}</Paragraph>
							<Paragraph name='Sub Region: '>{data.subregion}</Paragraph>
							<Paragraph name='Capital: '>{data.capital}</Paragraph>
						</div>
						<div className={styles.second}>
							<Paragraph name='Top Level Domain: '>{tld}</Paragraph>
							<Paragraph name='Currencies: '>{currencies}</Paragraph>
							<Paragraph name='Languages: '>{languages}</Paragraph>
						</div>
						<div className={styles.third}>
							<h3>Border Countries:</h3>
							{!borderCountries && <p>None</p>}
							{borderCountries &&
								borderCountries.map((border) => (
									<button
										onClick={() => {
											navigate(`/countries/${border}`);
										}}
										key={border}>
										{border}
									</button>
								))}
						</div>
					</div>
				</div>
			</Wrapper>
		</section>
	);
};

export default CountryDetail;
