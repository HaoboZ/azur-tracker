import {
	Dropdown,
	ListItemContent,
	ListItemDecorator,
	Menu,
	MenuButton,
	MenuItem,
	Typography,
} from '@mui/joy';
import Image from 'next/image';
import type { ReactElement } from 'react';
import { rarityColors } from '../../../colors';
import type { EquipType } from './type';

export default function EquipTierSelector({
	equipList,
	setEquip,
}: {
	equipList: (EquipType & { tier?: ReactElement })[];
	setEquip: (id: number) => void;
}) {
	return (
		<Dropdown>
			<MenuButton fullWidth>Equipment Tier</MenuButton>
			<Menu disablePortal placement='top' sx={{ maxHeight: 400 }}>
				{equipList.map((equip) => (
					<MenuItem key={equip.id} onClick={() => setEquip(equip.id)}>
						<ListItemDecorator sx={{ mr: 1 }}>
							{equip.tier && <Typography>{equip.tier}</Typography>}
							<Image
								src={`https://azurlane.netojuu.com/images/${equip.image}`}
								alt={equip.name}
								height={48}
								width={48}
								className={`color-${rarityColors[equip.rarity]}`}
							/>
						</ListItemDecorator>
						<ListItemContent>{equip.name}</ListItemContent>
					</MenuItem>
				))}
			</Menu>
		</Dropdown>
	);
}
