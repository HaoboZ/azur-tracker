import { Box, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core';
import Image from 'next/image';
import React from 'react';

import { rarityColors } from '../../lib/reference/colors';
import { equips } from '../../lib/reference/equipRef';

const useStyles = makeStyles( () => ( {
	menu: {
		maxHeight: 400,
		width:     300
	},
	wrap: { whiteSpace: 'normal' }
} ) );

export default function EquipSelector( { anchorEl, closeAnchor, colors, equipList, setEquip }: {
	anchorEl: HTMLElement
	closeAnchor: () => void
	colors: Record<string, string>
	equipList: ( typeof equips[number] & { tier?: number } )[]
	setEquip: ( id: number ) => void
} ) {
	const classes = useStyles();
	
	return <Menu
		anchorEl={anchorEl}
		keepMounted
		open={!!anchorEl}
		onClose={closeAnchor}
		PaperProps={{ className: classes.menu }}>
		{equipList.map( ( equip ) => <MenuItem
			key={equip.id}
			classes={{ root: classes.wrap }}
			onClick={() => {
				setEquip( equip.id );
				closeAnchor();
			}}>
			{equip.tier && <Typography>{equip.tier}</Typography>}
			<Box px={1}>
				<Image
					src={`/images/equips/${equip.image}.png`}
					alt={equip.name}
					layout='fixed'
					height={50}
					width={50}
					className={colors[ rarityColors[ equip.rarity ] ]}
				/>
			</Box>
			<Typography>{equip.name}</Typography>
		</MenuItem> )}
	</Menu>;
}
