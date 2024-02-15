import styles from './Error.module.css';

type Props = {
	title: string;
	message: string;
};

const Error: React.FC<Props> = (props) => {
	return (
		<div className={styles.error}>
			<h1>{props.title}</h1>
			<p>{props.message}</p>
		</div>
	);
};

export default Error;
