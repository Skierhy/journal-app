import PropsTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';

// se va a convertir en un high order component
export const AppTheme = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};

AppTheme.propTypes = {
	children: PropsTypes.node.isRequired,
};
