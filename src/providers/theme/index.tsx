import { CssBaseline, Experimental_CssVarsProvider, getInitColorSchemeScript } from '@mui/material';
import type { ReactNode } from 'react';
import NextAppDirEmotionCacheProvider from './emotionCache';
import StatusBarColor from './statusBarColor';
import theme from './theme';

export default function ThemeRegistry({ children }: { children: ReactNode }) {
	return (
		<NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
			{getInitColorSchemeScript({ defaultMode: 'system' })}
			<Experimental_CssVarsProvider theme={theme} defaultMode='system'>
				<CssBaseline />
				<StatusBarColor />
				{children}
			</Experimental_CssVarsProvider>
		</NextAppDirEmotionCacheProvider>
	);
}