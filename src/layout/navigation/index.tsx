'use client';
import { Box } from '@mui/material';
import useWideMedia from '../../hooks/useWideMedia';
import BottomBar from './bottomBar';
import TitleBar from './titleBar';

export default function Navigation({ children }) {
	const wide = useWideMedia();

	return (
		<Box>
			{wide ? (
				<TitleBar />
			) : (
				<Box
					position='fixed'
					top={0}
					zIndex='appBar'
					width='100%'
					height='env(safe-area-inset-top)'
					bgcolor='primary.main'
				/>
			)}
			<Box
				// minHeight='100vh'
				pt='env(safe-area-inset-top)'
				pl='env(safe-area-inset-left)'
				pr='env(safe-area-inset-right)'
				pb={wide ? 'env(safe-area-inset-bottom)' : 'calc(env(safe-area-inset-bottom) + 56px)'}>
				{children}
			</Box>
			{!wide && <BottomBar />}
		</Box>
	);
}
