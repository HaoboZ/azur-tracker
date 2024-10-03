import { Box } from '@mui/material';
import type { ReactNode } from 'react';
import BottomBar from './bottomBar';
import TitleBar from './titleBar';

export default function Navigation({ children }: { children: ReactNode }) {
	return (
		<Box>
			<Box
				sx={{
					display: { xs: 'block', sm: 'none' },
					position: 'fixed',
					top: 0,
					zIndex: 'appBar',
					width: '100%',
					height: 'env(safe-area-inset-top)',
					bgcolor: 'primary.main',
				}}
			/>
			<TitleBar />
			<Box
				sx={{
					minHeight: { xs: '100vh', sm: 0 },
					pt: 'env(safe-area-inset-top)',
					pl: 'env(safe-area-inset-left)',
					pr: 'env(safe-area-inset-right)',
					pb: {
						xs: 'calc(min(env(safe-area-inset-bottom), 16px) + 60px)',
						sm: 'min(env(safe-area-inset-bottom), 16px)',
					},
				}}>
				{children}
			</Box>
			<BottomBar />
		</Box>
	);
}
