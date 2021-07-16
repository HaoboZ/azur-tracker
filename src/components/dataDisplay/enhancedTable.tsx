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
	TableRow
} from '@material-ui/core';
import { Add as AddIcon, Close as CloseIcon, Menu as MenuIcon } from '@material-ui/icons';
import { nanoid } from 'nanoid';
import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ActionTitle from '../actionTitle';

const forwardTableBody = React.forwardRef<never>( ( { children }, ref ) => {
	return <TableBody ref={ref} className={`${sid}-tableRows`}>{children}</TableBody>;
} );

const sid = nanoid( 8 );

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
	return <Box sx={{
		[ `& .${sid}-tableRows tr:nth-of-type(odd),& th` ]: { bgcolor: 'action.disabledBackground' },
		[ `& .${sid}-minWidth` ]                          : { width: '1%' },
		[ `& .${sid}-slide` ]                             : {
			'&-enter'       : { opacity: 0 },
			'&-enter-active': { opacity: 1, transition: 'all 200ms ease-in-out' },
			'&-exit'        : { opacity: 1 },
			'&-exit-active' : { opacity: 0, transition: 'all 200ms ease-in-out' }
		}
	}}>
		{title && <ActionTitle title={title}/>}
		<TableContainer component={Paper} {...props}>
			<Table size='small'>
				<TableHead className={`${sid}-tableRows`}>
					<TableRow>
						{editable && <TableCell className={`${sid}-minWidth`}/>}
						{columnHeader.map( ( cell, index ) =>
							<TableCell key={index}>{cell}</TableCell> )}
						{editable && <TableCell className={`${sid}-minWidth`}>
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
						handle={`.${sid}-sortHandle`}
						ghostClass='selectedSort'
						forceFallback
						animation={200}>
						<TransitionGroup component={null} appear>
							{data.map( ( item, index ) => <CSSTransition
								key={item.id || index}
								timeout={200}
								classNames={`${sid}-slide`}>
								<TableRow>
									<TableCell className={`${sid}-sortHandle`}>
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
					: <TableBody className={`${sid}-tableRows`}>
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
