import { PropTypes } from 'prop-types';
import { TurnedInNot } from '@mui/icons-material';
import {
	Grid,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import { useMemo } from 'react';

export const SideBarItem = ({ note = {} }) => {
	const newTitle = useMemo(() => {
		return note.title.length > 17
			? note.title.substring(0, 17) + '...'
			: note.title;
	}, [note]);
	return (
		<>
			<ListItem disablePadding>
				<ListItemButton>
					<ListItemIcon>
						<TurnedInNot />
					</ListItemIcon>
					<Grid container>
						<ListItemText primary={newTitle} />
						<ListItemText secondary={note.body} />
					</Grid>
				</ListItemButton>
			</ListItem>
		</>
	);
};

// props

SideBarItem.propTypes = {
	note: PropTypes.object.isRequired,
};
