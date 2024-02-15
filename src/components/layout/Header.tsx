import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import Wrapper from './Wrapper';

import styles from './Header.module.css';

const Header: React.FC = () => {
	const [isDark, setIsDark] = useState<boolean>(document.body.classList.contains('dark-theme'));

	useEffect(() => {
		setIsDark(document.body.classList.contains('dark-theme'));
	}, []);

	const themeHandler = () => {
		document.body.classList.toggle('dark-theme');
		document.body.classList.toggle('light-theme');
		setIsDark((prevIsDark) => !prevIsDark);
	};

	return (
		<header className={styles.header}>
			<Wrapper>
				<h2>Where in the world?</h2>
				<button
					onClick={() => {
						themeHandler();
					}}
					aria-label='color sheme toggler'>
					<motion.span animate={{ x: isDark ? '100%' : 0 }} />
				</button>
			</Wrapper>
		</header>
	);
};

export default Header;
