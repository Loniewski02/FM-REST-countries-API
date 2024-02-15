import { useRouteError } from 'react-router-dom';
import Error from '../components/UI/Error';

const ErrorPage: React.FC = () => {
	const error = useRouteError() as { status: number; data: { message: string } };

	let title = 'An error occurred';
	let message = 'Something went wrong';

	if (error.status === 500) {
		message = error.data.message;
	}

	if (error.status === 404) {
		title = 'Not Found!';
		message = 'Could not find resource or page.';
	}

	return (
		<Error
			title={title}
			message={message}
		/>
	);
};

export default ErrorPage;
