import { Outlet, useNavigation } from 'react-router-dom';

import LoadingIndicator from '../components/UI/LoadingIndicator';
import Header from '../components/layout/Header';

const RootLayout = () => {
	const navigation = useNavigation();

	return (
		<>
			{navigation.state === 'loading' && <LoadingIndicator />}
			<Header />
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default RootLayout;
