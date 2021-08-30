import { Box, Menu, MenuItem, Typography } from '@material-ui/core';
import Image from 'next/image';
import React from 'react';

import { rarityColors, useMappedColorClasses } from '../../data/colors';
import { equips } from '../../data/equipData';

export default function EquipTierSelector( { anchorEl, closeAnchor, equipList, setEquip }: {
	anchorEl: HTMLElement,
	closeAnchor: () => void,
	equipList: ( typeof equips[number] & { tier?: number } )[],
	setEquip: ( id: number ) => void
} ) {
	const colorClasses = useMappedColorClasses();
	
	return <Menu
		anchorEl={anchorEl}
		keepMounted
		open={Boolean( anchorEl )}
		onClose={closeAnchor}
		PaperProps={{ sx: { maxHeight: 400, width: 300 } }}>
		{equipList.map( equip => <MenuItem
			key={equip.id}
			sx={{ whiteSpace: 'normal' }}
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
					className={colorClasses[ rarityColors[ equip.rarity ] ]}
				/>
			</Box>
			<Typography>{equip.name}</Typography>
		</MenuItem> )}
	</Menu>;
}
