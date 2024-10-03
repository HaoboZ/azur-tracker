import { useTheme } from '@mui/material';
import { useMediaMatch } from 'rooks';

export default function useIsMobile() {
	const theme = useTheme();
	return useMediaMatch(`(max-width:${theme.breakpoints.values.sm - 0.05}px)`);
}
