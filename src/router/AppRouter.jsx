import { Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth';
import { JournalRoutes } from '../journal/';

export const AppRouter = () => {
	return (
		<>
			<Routes>
				{/* login y registro */}
				<Route path='/auth/*' element={<AuthRoutes />} />
				<Route />
				{/* journalApp */}
				<Route path='/*' element={<JournalRoutes />} />
				<Route />
			</Routes>
		</>
	);
};
