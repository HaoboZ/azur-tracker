import { ChevronRight as ChevronRightIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { TreeItem, treeItemClasses, TreeView } from '@mui/lab';
import { Box, Button, Stack } from '@mui/material';
import { forEach, map, mapValues, pickBy, uniq } from 'lodash-es';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import PageSection from '../../components/page/section';
import deepFlatMap from '../../helpers/deepFlatMap';
import { rarityColors } from '../colors';
import { Equip, equipsIndex } from '../fleet/ship/equip/data';
import EquipFilter from '../fleet/ship/equip/filter';
import { stageDrops } from './data';

const equipList = uniq( deepFlatMap<number>( stageDrops ) )
	.map( ( val ) => equipsIndex[ val ] )
	.sort( ( a, b ) => a.id - b.id )
	.sort( ( a, b ) => a.type - b.type );

const treeKeys = map( stageDrops, ( _, level ) => level );

export default function EquipDrop() {
	const [ expanded, setExpanded ] = useState<string[]>( [] );
	const [ selected, setSelected ] = useState<string>( null );
	
	const [ equip, setEquip ] = useState<Equip>( null );
	
	useEffect( () => {
		setExpanded( equip ? treeKeys : [] );
	}, [ equip ] );
	
	const stages = useMemo( () => pickBy( mapValues( stageDrops, ( value ) => {
		const stages: Record<string, number[]> = {};
		forEach( value, ( value, stageMajor ) => forEach( value, ( value, stageMinor ) => {
			if ( equip ? value.includes( equip.id ) : true )
				stages[ `${stageMajor}${stageMinor}` ] = value;
		} ) );
		return Object.keys( stages ).length ? stages : null;
	} ) ), [ equip ] );
	
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
					[ `.${treeItemClasses.content}` ]: { py: 1 },
					'img:hover'                      : { cursor: 'pointer' }
				}}
				onNodeToggle={( e, nodeIds ) => setExpanded( nodeIds )}
				onNodeSelect={( e, nodeId ) => setSelected( nodeId )}>
				{map( stages, ( value, level ) => (
					<TreeItem
						key={level}
						nodeId={level}
						label={level}
						TransitionProps={{ mountOnEnter: true, unmountOnExit: true }}>
						{map( value, ( value, stage ) => (
							<Box key={stage} py={1} display='flex' flexDirection='row'>
								<Box display='flex' alignItems='center' width={150} pr={1}>
									{stage}
								</Box>
								<Stack direction='row' spacing={1}>
									{value.map( ( id ) => {
										const equip = equipsIndex[ id ];
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
						) )}
					</TreeItem>
				) )}
			</TreeView>
		</PageSection>
	);
}
