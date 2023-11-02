import type { CardActionAreaProps } from '@mui/material';
import { CardActionArea } from '@mui/material';
import useAsyncLoading from './useAsyncLoading';

export default function AsyncCardActionArea({ onClick, sx, ...props }: CardActionAreaProps) {
	const [loading, onClickLoading] = useAsyncLoading();

	return (
		<CardActionArea
			disabled={loading}
			sx={loading ? { color: 'gray', ...sx } : sx}
			onClick={onClickLoading(onClick)}
			{...props}
		/>
	);
}
