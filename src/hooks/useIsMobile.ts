import { useMediaQuery, useTheme } from '@mui/material';

export default function useIsMobile() {
	const theme = useTheme();
	return useMediaQuery(`(max-width:${theme.breakpoints.values.sm - 0.05}px)`);
}
