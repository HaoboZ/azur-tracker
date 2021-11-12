import {
	CircleOutlined as CircleOutlinedIcon,
	Favorite as FavoriteIcon,
	FavoriteBorder as FavoriteBorderIcon,
	Star as StarIcon
} from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
import { RingIcon } from '../../lib/icons';

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
	<>
		<RingIcon fontSize='small'/>
		<FavoriteIcon fontSize='small'/>
	</>
];
