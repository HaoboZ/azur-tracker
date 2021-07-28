import {
	Box,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableContainerProps,
	TableHead,
	TableRow,
	useTheme
} from '@material-ui/core';
import { Add as AddIcon, Close as CloseIcon, Menu as MenuIcon } from '@material-ui/icons';
import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ActionTitle from '../actionTitle';

const forwardTableBody = React.forwardRef<never>( ( { children }, ref ) => {
	return <TableBody ref={ref} className='tableRows'>{children}</TableBody>;
} );

export default function EnhancedTable<Item extends { id?: string }>( {
	title,
	data,
	columnHeader,
	columns,
	editable,
	setData,
	newData = () => ( {} as Item ),
	...props
}: {
	title?: React.ReactNode,
	data: Item[],
	columnHeader: React.ReactNodeArray,
	columns: ( item: Item, index: number ) => React.ReactNodeArray,
	editable?: boolean,
	setData?: ( items: Item[] ) => void, // required if editable is true
	newData?: () => Item | Promise<Item> // required if editable is true
} & TableContainerProps ) {
	const theme = useTheme();
	
	return <Box sx={{
		'& .tableRows tr:nth-of-type(odd),& th': { bgcolor: 'action.disabledBackground' },
		'& .minWidth'                          : { width: '1%' },
		'& .slide'                             : {
			'&-enter'       : { opacity: 0 },
			'&-enter-active': {
				opacity   : 1,
				transition: ( theme ) => theme.transitions.create( 'opacity' )
			},
			'&-exit'        : { opacity: 1 },
			'&-exit-active' : {
				opacity   : 0,
				transition: ( theme ) => theme.transitions.create( 'opacity' )
			}
		}
	}}>
		{title && <ActionTitle title={title}/>}
		<TableContainer component={Paper} {...props}>
			<Table size='small'>
				<TableHead className='tableRows'>
					<TableRow>
						{editable && <TableCell className='minWidth'/>}
						{columnHeader.map( ( cell, index ) =>
							<TableCell key={index}>{cell}</TableCell> )}
						{editable && <TableCell className='minWidth'>
							<IconButton onClick={async () => setData( [ ...data, { ...await newData() } ] )}>
								<AddIcon/>
							</IconButton>
						</TableCell>}
					</TableRow>
				</TableHead>
				{editable
					? data.length ? <ReactSortable
						tag={forwardTableBody}
						list={data as any}
						setList={setData as any}
						handle='.sortHandle'
						ghostClass='selectedSort'
						forceFallback
						animation={theme.transitions.duration.shorter}>
						<TransitionGroup component={null}>
							{data.map( ( item, index ) => <CSSTransition
								key={item.id || index}
								timeout={theme.transitions.duration.standard}
								classNames='slide'>
								<TableRow>
									<TableCell className='sortHandle'>
										<div><MenuIcon/></div>
									</TableCell>
									{columns( item, index ).map( ( cell, index ) =>
										<TableCell key={index}>
											<div>{cell}</div>
										</TableCell> )}
									<TableCell>
										<div>
											<IconButton onClick={() => {
												const _data = [ ...data ];
												_data.splice( index, 1 );
												setData( _data );
											}}>
												<CloseIcon/>
											</IconButton>
										</div>
									</TableCell>
								</TableRow>
							</CSSTransition> )}
						</TransitionGroup>
					</ReactSortable> : undefined
					: <TableBody className='tableRows'>
						{data.map( ( item, index ) => <TableRow key={item.id || index}>
							{columns( item, index ).map( ( cell, index ) =>
								<TableCell key={index}>
									<div>{cell}</div>
								</TableCell> )}
						</TableRow> )}
					</TableBody>}
			</Table>
		</TableContainer>
	</Box>;
}
