import { Box, FormControl, Grid, InputLabel, Link, makeStyles, MenuItem, Select } from '@material-ui/core';
import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
import SVGIcon from '../../lib/icons';

import { mappedColorClasses, rarityColors, tierColors } from '../../lib/reference/colors';
import { equips, equipsIndex } from '../../lib/reference/equipRef';
import shipRef from '../../lib/reference/shipRef';
import { ship_setShip } from '../../lib/store/reducers/shipReducer';

const useStyles = makeStyles( () => mappedColorClasses as any );

export default function DetailPanel( { rowData, equipClick }: {
	rowData: typeof shipRef[string]
	equipClick: ( rowData, index ) => void
} ) {
	const dispatch = useDispatch();
	const classes = useStyles();
	
	return <Grid container spacing={2}>
		<Grid item xs={4} container spacing={2} alignItems='center'>
			<Grid item xs={12} component={Box} textAlign='center'>
				<Link
					href={rowData.link}
					target='_blank'
					variant='h6'
					color='textPrimary'>
					{rowData.name}
				</Link>
			</Grid>
			<Grid item xs={6}>
				<FormControl fullWidth>
					<InputLabel>Love</InputLabel>
					<Select
						fullWidth
						value={rowData.love}
						SelectDisplayProps={{ style: { textAlign: 'center' } }}
						onChange={( e ) => dispatch( ship_setShip( rowData.id,
							{ love: e.target.value as number } ) )}>
						<MenuItem value={0}>
							<SVGIcon name='emptyHeart'/>
						</MenuItem>
						<MenuItem value={1}>
							<SVGIcon name='heart'/>
						</MenuItem>
						<MenuItem value={2}>
							<SVGIcon name='ring'/>
						</MenuItem>
						<MenuItem value={3}>
							<SVGIcon name='ring'/>
							<SVGIcon name='heart'/>
						</MenuItem>
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={6}>
				<FormControl fullWidth>
					<InputLabel>Max Level</InputLabel>
					<Select
						fullWidth
						value={rowData.lvl}
						SelectDisplayProps={{ style: { textAlign: 'center' } }}
						onChange={( e ) => dispatch( ship_setShip( rowData.id,
							{ lvl: e.target.value as number } ) )}>
						<MenuItem value={0}>0</MenuItem>
						<MenuItem value={70}>70</MenuItem>
						<MenuItem value={80}>80</MenuItem>
						<MenuItem value={90}>90</MenuItem>
						<MenuItem value={100}>100</MenuItem>
						<MenuItem value={105}>105</MenuItem>
						<MenuItem value={110}>110</MenuItem>
						<MenuItem value={115}>115</MenuItem>
						<MenuItem value={120}>120</MenuItem>
						<MenuItem value={121}>
							<svg height={14} width={14}>
								<use xlinkHref='#star'/>
							</svg>
						</MenuItem>
					</Select>
				</FormControl>
			</Grid>
		</Grid>
		<Grid item xs={8} container spacing={1} alignItems='center' justify='center'>
			{rowData.equipped.map( ( val, index ) => {
				const equip = equipsIndex[ val[ 0 ] ] || equips[ 0 ];
				return <Grid
					key={index}
					item xs
					className={classes[ tierColors[ rowData.equipBetter?.[ index ] - 1 ] ]}
					onClick={() => equipClick( rowData, index )}>
					<Image
						src={`/images/equips/${equip.image}.png`}
						alt={equip.name}
						height={128}
						width={128}
						className={classes[ rarityColors[ equip.rarity ] ]}
					/>
				</Grid>;
			} )}
		</Grid>
	</Grid>;
}
