import { ReactNode } from 'react';

import styles from './Paragraph.module.css';

type Props = {
	children: ReactNode;
	name: string;
};

const Paragraph: React.FC<Props> = (props) => {
	return (
		<p className={styles.p}>
			{props.name}
			<span>{props.children}</span>
		</p>
	);
};

export default Paragraph;
