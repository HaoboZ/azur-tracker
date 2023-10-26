'use client';
import { Dialog } from '@capacitor/dialog';
import { Fade, Paper, Typography } from '@mui/material';
import { getDatabase, ref } from 'firebase/database';
import objectHash from 'object-hash';
import { useState } from 'react';
import { useObjectVal } from 'react-firebase-hooks/database';
import { pick } from 'remeda';
import {
	useAsyncEffect,
	useDebouncedValue,
	useDidUpdate,
	useTimeoutWhen,
	useWindowEventListener,
} from 'rooks';
import { useAuth } from '../../providers/auth';
import type { RootState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { mainActions } from '../../store/reducers/mainReducer';
import firebaseClientApp from '../client';
import getData from './getData';
import setData from './setData';

const db = getDatabase(firebaseClientApp);

export default function StoreSync({ keys }: { keys: (keyof Omit<RootState, 'main'>)[] }) {
	const user = useAuth();

	if (!user?.emailVerified) return null;

	return <Internal keys={keys} />;
}

function Internal({ keys }: { keys: (keyof Omit<RootState, 'main'>)[] }) {
	const dispatch = useAppDispatch();
	const { main, ...state } = useAppSelector((state) => state);
	const data = pick(state, keys);
	const user = useAuth();
	const [serverTimestamp, serverLoading] = useObjectVal<string>(
		ref(db, `users/${user.uid}/timestamp`),
	);
	const [hash] = useDebouncedValue(objectHash(data), 500);

	const [saving, setSaving] = useState(0);
	const [saved, setSaved] = useState(false);
	const [loading, setLoading] = useState(0);

	useWindowEventListener('beforeunload', (e: BeforeUnloadEvent) => {
		if (!saving) return;
		e.returnValue = 'Currently saving, are you sure you want to leave?';
	});

	useDidUpdate(() => {
		if (loading) return;
		setSaving((save) => save + 1);
		dispatch(mainActions.setTimestamp());
	}, [hash]);

	// save
	useAsyncEffect(async () => {
		if (serverLoading || !main.autoSync || loading || main.timestamp <= main.lastTimestamp) {
			return setSaving((save) => Math.max(save - 1, 0));
		}
		if (serverTimestamp !== main.lastTimestamp) {
			const { value } = await Dialog.confirm({
				title: 'Conflicts Found',
				message: 'Override cloud data?',
			});
			if (!value) return setSaving((save) => Math.max(save - 1, 0));
		}
		await setData(keys);
		setSaving((save) => Math.max(save - 1, 0));
		setSaved(true);
	}, [serverLoading, main.timestamp]);

	// load
	useAsyncEffect(async () => {
		if (
			serverLoading ||
			!main.autoSync ||
			saving ||
			!serverTimestamp ||
			serverTimestamp <= main.lastTimestamp
		)
			return;
		setLoading((load) => load + 1);
		if (main.timestamp !== main.lastTimestamp) {
			const { value } = await Dialog.confirm({
				title: 'Conflicts Found',
				message: 'Override local data?',
			});
			if (!value) return setLoading((load) => Math.max(load - 1, 0));
		}
		await getData(keys);
		setLoading((load) => Math.max(load - 1, 0));
	}, [serverLoading, serverTimestamp]);

	useTimeoutWhen(() => setSaved(false), 2000, saved);

	if (!saved) return null;

	return (
		<Fade mountOnEnter unmountOnExit in>
			<Paper
				sx={{
					px: 1,
					opacity: 0.5,
					position: 'fixed',
					zIndex: 'tooltip',
					bottom: 'calc(env(safe-area-inset-bottom) + 10px)',
					right: 'calc(env(safe-area-inset-right) + 10px)',
				}}>
				<Typography>Saved</Typography>
			</Paper>
		</Fade>
	);
}
