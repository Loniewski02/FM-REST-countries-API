import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';

import RootLayout from './pages/Root';
import CountriesPage, { loader } from './pages/Countries';
import CountryDetailsPage, { loader as detailLoader } from './pages/CountryDetails';
import CountriesRoot from './pages/CountriesRoot';
import { useEffect } from 'react';
import ErrorPage from './pages/Error';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Navigate to='countries' /> },
			{
				path: 'countries',
				element: <CountriesRoot />,
				children: [
					{ index: true, element: <CountriesPage />, loader: loader },
					{
						path: ':countryName',
						element: <CountryDetailsPage />,
						loader: detailLoader,
					},
				],
			},
		],
	},
]);

const App: React.FC = () => {
	useEffect(() => {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.body.classList.add('dark-theme');
		} else {
			document.body.classList.add('light-theme');
		}
	}, []);

	return <RouterProvider router={router} />;
};

export default App;
