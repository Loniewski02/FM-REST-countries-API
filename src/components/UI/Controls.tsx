import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Wrapper from '../layout/Wrapper';

import ArrowDown from '../../assets/ArrowDown';
import SearchIco from '../../assets/SearchIco';
import styles from './Controls.module.css';

const REGIONS = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

const staggerAnimationVariants = {
	initial: {
		opacity: 0,
		y: 30,
	},
	animate: (index: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: 0.1 * index,
		},
	}),
	exit: {
		opacity: 0,
	},
};

type Props = {
	region: string;
	onFilteredRegion: (region: string) => void;
	onFilteredCountry: (country: string) => void;
};

const Controls: React.FC<Props> = (props) => {
	const [isShown, setIsShown] = useState(false);

	const listHandler = () => {
		setIsShown((prevIsShown) => !prevIsShown);
	};

	const regionHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		props.onFilteredRegion(event.currentTarget.innerText);
		setIsShown(false);
	};

	const countryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		props.onFilteredCountry(event.target.value);
	};

	return (
		<section className={styles.controls}>
			<Wrapper>
				<div className={styles.controls__input}>
					<label htmlFor='country'>
						<SearchIco />
					</label>
					<input
						type='text'
						id='country'
						placeholder='Search for a country…'
						onChange={countryHandler}
					/>
				</div>
				<div className={styles.controls__filter}>
					<button
						className={styles['controls__filter-btn']}
						onClick={listHandler}>
						{props.region}
						<motion.div animate={{ rotate: isShown ? 180 : 0 }}>
							<ArrowDown />
						</motion.div>
					</button>
					<AnimatePresence>
						{isShown && (
							<motion.div
								className={styles['controls__filter-list']}
								initial={{ y: -30, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								exit={{ y: -30, opacity: 0 }}
								layout>
								{REGIONS.map((region, index) => (
									<motion.button
										variants={staggerAnimationVariants}
										initial='initial'
										whileInView='animate'
										exit='exit'
										custom={index}
										key={region}
										onClick={regionHandler}>
										{region}
									</motion.button>
								))}
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</Wrapper>
		</section>
	);
};

export default Controls;
