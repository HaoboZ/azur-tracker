import { rarityColors } from '@/app/colors';
import { Box, Menu, MenuItem, Typography } from '@mui/material';
import type { ReactElement } from 'react';
import type { EquipType } from './type';

export default function EquipTierSelector( { anchorEl, closeAnchor, equipList, setEquip }: {
	anchorEl: HTMLElement,
	closeAnchor: () => void,
	equipList: ( EquipType & { tier?: ReactElement } )[],
	setEquip: ( id: number ) => void
} ) {
	return (
		<Menu
			keepMounted
			anchorEl={anchorEl}
			open={Boolean( anchorEl )}
			PaperProps={{ sx: { maxHeight: 400, width: 300 } }}
			onClose={closeAnchor}>
			{equipList.map( ( equip ) => (
				<MenuItem
					key={equip.id}
					sx={{ whiteSpace: 'normal' }}
					onClick={() => {
						setEquip( equip.id );
						closeAnchor();
					}}>
					{equip.tier && <Typography>{equip.tier}</Typography>}
					<Box px={1}>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={`https://azurlane.netojuu.com/images/${equip.image}`}
							alt={equip.name}
							height={50}
							width={50}
							className={`color-${rarityColors[ equip.rarity ]}`}
						/>
					</Box>
					<Typography>{equip.name}</Typography>
				</MenuItem>
			) )}
		</Menu>
	);
}
