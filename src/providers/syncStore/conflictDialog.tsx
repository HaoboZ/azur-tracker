import {
	Card,
	CardContent,
	DialogContent,
	DialogTitle,
	Link,
	Modal,
	ModalDialog,
	Stack,
	Typography,
} from '@mui/joy';
import { useState } from 'react';
import { useStore } from 'react-redux';
import type { RootState } from '../../store';
import { useAppDispatch } from '../../store/hooks';
import loadStore from './loadStore';
import saveStore from './saveStore';

export default function ConflictDialog({ problems }) {
	const store = useStore<RootState>();
	const dispatch = useAppDispatch();

	const [open, setOpen] = useState(true);

	return (
		<Modal open={open}>
			<ModalDialog>
				<DialogTitle>Conflicts detected. Choose the version to keep.</DialogTitle>
				<DialogContent>
					<Stack direction='row' spacing={1}>
						<Card>
							<Link
								overlay
								onClick={async () => {
									await saveStore(store);
									setOpen(false);
								}}>
								<CardContent>
									<Typography>Local (Recent)</Typography>
									last saved {new Date(problems.local).toLocaleString()}
								</CardContent>
							</Link>
						</Card>
						<Card>
							<Link
								overlay
								onClick={async () => {
									await loadStore(dispatch);
									setOpen(false);
								}}>
								<CardContent>
									<Typography>Server</Typography>
									last saved {new Date(problems.server).toLocaleString()}
								</CardContent>
							</Link>
						</Card>
					</Stack>
				</DialogContent>
			</ModalDialog>
		</Modal>
	);
}
