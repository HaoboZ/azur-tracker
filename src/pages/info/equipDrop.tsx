import { ChevronRight as ChevronRightIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { TreeItem, treeItemClasses, TreeView } from '@mui/lab';
import { Box, Button, Stack } from '@mui/material';
import { map, uniq } from 'lodash-es';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import PageSection from '../../components/page/section';
import deepFlatMap from '../../helpers/deepFlatMap';
import { rarityColors } from '../colors';
import { Equip, equipsIndex } from '../fleet/ship/equip/data';
import EquipFilter from '../fleet/ship/equip/filter';
import { stageDrops } from './data';

const equipList = uniq( deepFlatMap<number>( stageDrops ) )
	.map( ( val ) => equipsIndex[ val ] )
	.sort( ( a, b ) => a.type - b.type );

const treeKeys = map( stageDrops, ( _, level ) => level );

export default function EquipDrop() {
	const [ expanded, setExpanded ] = useState<string[]>( [] );
	const [ selected, setSelected ] = useState<string>( null );
	
	const [ equip, setEquip ] = useState<Equip>( null );
	
	useEffect( () => {
		setExpanded( equip ? treeKeys : [] );
	}, [ equip ] );
	
	return (
		<PageSection primary='Notable Equipment Drops'>
			<EquipFilter
				equipList={equipList}
				value={equip}
				setValue={setEquip}
			/>
			<Button
				variant='outlined'
				onClick={() => setExpanded( expanded.length ? [] : treeKeys )}>
				{expanded.length ? 'Collapse' : 'Expand'} All
			</Button>
			<TreeView
				defaultCollapseIcon={<ExpandMoreIcon/>}
				defaultExpandIcon={<ChevronRightIcon/>}
				expanded={expanded}
				selected={selected}
				sx={{
					[ `.${treeItemClasses.content}` ]: {
						py: 1
					}
				}}
				onNodeToggle={( e, nodeIds ) => setExpanded( nodeIds )}
				onNodeSelect={( e, nodeId ) => setSelected( nodeId )}>
				{map( stageDrops, ( value, level ) => {
					let found = false;
					
					const stages = map( value, ( value, stageMajor ) => map( value, ( value: number[], stageMinor ) => {
						if ( !( equip ? value.includes( equip.id ) : true ) ) return null;
						return (
							<Box key={`${stageMajor}${stageMinor}`} py={1} display='flex' flexDirection='row'>
								<Box display='flex' alignItems='center' width={150} pr={1}>
									{stageMajor}{stageMinor}
								</Box>
								<Stack direction='row' spacing={1}>
									{value.map( ( id ) => {
										const equip = equipsIndex[ id ];
										found = true;
										return (
											<Box key={id} width={40} height={40} onClick={() => setEquip( equip )}>
												<Image
													src={`/images/equips/${equip.image}.png`}
													alt={equip.name}
													height={128}
													width={128}
													layout='intrinsic'
													className={`color-${rarityColors[ equip.rarity ]}`}
												/>
											</Box>
										);
									} )}
								</Stack>
							</Box>
						);
					} ) );
					
					if ( !found ) return null;
					
					return (
						<TreeItem
							key={level}
							nodeId={level}
							label={level}
							TransitionProps={{ mountOnEnter: true, unmountOnExit: true }}>
							{stages}
						</TreeItem>
					);
				} )}
			</TreeView>
		</PageSection>
	);
}
