import { Box } from '@mui/material';
import type { ReactNode } from 'react';
import BottomBar from './bottomBar';
import TitleBar from './titleBar';

export default function Navigation({ children }: { children: ReactNode }) {
	return (
		<Box>
			<Box
				position='fixed'
				top={0}
				zIndex='appBar'
				width='100%'
				height='env(safe-area-inset-top)'
				bgcolor='primary.main'
				sx={{ display: { xs: 'block', sm: 'none' } }}
			/>
			<TitleBar />
			<Box
				minHeight={{ xs: '100vh', sm: 0 }}
				pt='env(safe-area-inset-top)'
				pl='env(safe-area-inset-left)'
				pr='env(safe-area-inset-right)'
				pb={{
					xs: 'calc(env(safe-area-inset-bottom) + 56px)',
					sm: 'env(safe-area-inset-bottom)',
				}}>
				{children}
			</Box>
			<BottomBar />
		</Box>
	);
}
