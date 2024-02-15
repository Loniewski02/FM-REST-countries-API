import { Link, useNavigate } from 'react-router-dom';

import Paragraph from '../layout/Paragraph';

import styles from './Country.module.css';

type Props = {
	flag: { alt: string; png: string; svg: string };
	name: string;
	population: number;
	region: string;
	capital: string;
};

const Country: React.FC<Props> = (props) => {
	const navigate = useNavigate();

	if (props.population >= 1000)
		return (
			<div className={styles.country}>
				<div className={styles.country__imgs}>
					<img
						onClick={() => {
							navigate(props.name);
						}}
						className={styles['country__imgs-img']}
						src={props.flag.svg}
						alt={props.flag.alt}
					/>
					<img
						className={styles['country__imgs-blur']}
						src={props.flag.svg}
						alt={props.flag.alt}
					/>
				</div>
				<div className={styles.country__info}>
					<h3>
						<Link to={props.name}>{props.name}</Link>
					</h3>
					<Paragraph name='Population: '>{props.population.toLocaleString('en-US')}</Paragraph>
					<Paragraph name='Region: '>{props.region}</Paragraph>
					<Paragraph name='Capital: '>{props.capital}</Paragraph>
				</div>
			</div>
		);
};

export default Country;
