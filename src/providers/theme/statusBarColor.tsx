import { StatusBar, Style } from '@capacitor/status-bar';
import { useColorScheme } from '@mui/material';
import { useEffect } from 'react';

export default function StatusBarColor() {
	const { mode } = useColorScheme();

	useEffect(() => {
		StatusBar.setStyle({ style: mode === 'dark' ? Style.Dark : Style.Light }).catch(() => null);
	}, [mode]);

	return null;
}
