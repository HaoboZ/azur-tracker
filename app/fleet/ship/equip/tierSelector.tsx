import Dropdown from '@/components/dropdown';
import { ListItemAvatar, ListItemText, MenuItem } from '@mui/material';
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
		<Dropdown fullWidth button='Equipment Tier'>
			{(closeMenu) =>
				equipList.map((equip) => (
					<MenuItem
						key={equip.id}
						onClick={() => {
							setEquip(equip.id);
							closeMenu();
						}}>
						<ListItemAvatar sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
							{equip.tier}
							<Image
								src={`https://azurlane.netojuu.com/images/${equip.image}`}
								alt={equip.name}
								height={48}
								width={48}
								className={`color-${rarityColors[equip.rarity]}`}
								style={{ marginLeft: 4 }}
							/>
						</ListItemAvatar>
						<ListItemText>{equip.name}</ListItemText>
					</MenuItem>
				))
			}
		</Dropdown>
	);
}
