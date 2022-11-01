import {
	CircleOutlined as CircleOutlinedIcon,
	Favorite as FavoriteIcon,
	FavoriteBorder as FavoriteBorderIcon,
	Star as StarIcon
} from '@mui/icons-material';
import type { SvgIconProps } from '@mui/material';
import { SvgIcon } from '@mui/material';
import { Fragment } from 'react';

function RingIcon( props: SvgIconProps ) {
	return (
		<SvgIcon {...props}>
			<path
				d='M12,10L8,4.4L9.6,2H14.4L16,4.4L12,10M15.5,6.8L14.3,8.5C16.5,9.4 18,11.5 18,14A6,6 0 0,1 12,20A6,6 0 0,1 6,14C6,11.5 7.5,9.4 9.7,8.5L8.5,6.8C5.8,8.1 4,10.8 4,14A8,8 0 0,0 12,22A8,8 0 0,0 20,14C20,10.8 18.2,8.1 15.5,6.8Z'
			/>
		</SvgIcon>
	);
}

export function TierIcon( { tier } ) {
	return [
		undefined,
		<StarIcon key='diamondStar' fontSize='small' htmlColor='turquoise'/>,
		<StarIcon key='goldStar' fontSize='small' htmlColor='gold'/>,
		<StarIcon key='silverStar' fontSize='small' htmlColor='silver'/>,
		<StarIcon key='bronzeStar' fontSize='small' htmlColor='chocolate'/>,
		<StarIcon key='tanStar' fontSize='small' htmlColor='tan'/>,
		<CircleOutlinedIcon key='circle' fontSize='small'/>
	][ tier ] || <SvgIcon key='empty' fontSize='small'/>;
}

export const AffinityIcons = [
	<FavoriteBorderIcon key='none' fontSize='small'/>,
	<FavoriteIcon key='love' fontSize='small'/>,
	<RingIcon key='married' fontSize='small'/>,
	<Fragment key='max'>
		<RingIcon fontSize='small'/>
		<FavoriteIcon fontSize='small'/>
	</Fragment>
];
