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
			<StarIcon key='diamondStar' htmlColor='turquoise' fontSize='xl' />,
			<StarIcon key='goldStar' htmlColor='gold' fontSize='xl' />,
			<StarIcon key='silverStar' htmlColor='silver' fontSize='xl' />,
			<StarIcon key='bronzeStar' htmlColor='chocolate' fontSize='xl' />,
			<StarIcon key='tanStar' htmlColor='tan' fontSize='xl' />,
			<CircleOutlinedIcon key='circle' fontSize='xl' />,
		][tier] || <SvgIcon key='empty' fontSize='xl' />
	);
}

export const AffinityIcons = [
	<FavoriteBorderIcon key='none' fontSize='xl' />,
	<FavoriteIcon key='love' fontSize='xl' />,
	<RingIcon key='married' fontSize='xl' />,
	<Fragment key='max'>
		<RingIcon fontSize='xl' />
		<FavoriteIcon fontSize='xl' />
	</Fragment>,
];
