import {
	CircleOutlined as CircleOutlinedIcon,
	Favorite as FavoriteIcon,
	FavoriteBorder as FavoriteBorderIcon,
	Star as StarIcon,
} from '@mui/icons-material';
import type { SvgIconProps } from '@mui/joy';
import { SvgIcon } from '@mui/joy';
import { Fragment } from 'react';

function RingIcon(props: SvgIconProps) {
	return (
		<SvgIcon {...props}>
			<path d='M12,10L8,4.4L9.6,2H14.4L16,4.4L12,10M15.5,6.8L14.3,8.5C16.5,9.4 18,11.5 18,14A6,6 0 0,1 12,20A6,6 0 0,1 6,14C6,11.5 7.5,9.4 9.7,8.5L8.5,6.8C5.8,8.1 4,10.8 4,14A8,8 0 0,0 12,22A8,8 0 0,0 20,14C20,10.8 18.2,8.1 15.5,6.8Z' />
		</SvgIcon>
	);
}

export function TierIcon({ tier }) {
	return (
		[
			undefined,
			<StarIcon key='diamondStar' htmlColor='turquoise' sx={{ fontSize: 'inherit' }} />,
			<StarIcon key='goldStar' htmlColor='gold' sx={{ fontSize: 'inherit' }} />,
			<StarIcon key='silverStar' htmlColor='silver' sx={{ fontSize: 'inherit' }} />,
			<StarIcon key='bronzeStar' htmlColor='chocolate' sx={{ fontSize: 'inherit' }} />,
			<StarIcon key='tanStar' htmlColor='tan' sx={{ fontSize: 'inherit' }} />,
			<CircleOutlinedIcon key='circle' sx={{ fontSize: 'inherit' }} />,
		][tier] || <SvgIcon key='empty' sx={{ fontSize: 'inherit' }} />
	);
}

export const AffinityIcons = [
	<FavoriteBorderIcon key='none' sx={{ fontSize: 'inherit' }} />,
	<FavoriteIcon key='love' sx={{ fontSize: 'inherit' }} />,
	<RingIcon key='married' sx={{ fontSize: 'inherit' }} />,
	<Fragment key='max'>
		<RingIcon sx={{ fontSize: 'inherit' }} />
		<FavoriteIcon sx={{ fontSize: 'inherit' }} />
	</Fragment>,
];
