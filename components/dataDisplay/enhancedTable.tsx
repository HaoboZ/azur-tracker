import {
	IconButton,
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@material-ui/core';
import { Add as AddIcon, Close as CloseIcon, Menu as MenuIcon } from '@material-ui/icons';
import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ActionTitle from '../actionTitle';

const useStyles = makeStyles( ( theme ) => ( {
	tableRows   : {
		'& tr:nth-of-type(odd),& th': {
			backgroundColor: theme.palette.action.focus
		}
	},
	minWidth    : {
		width: '1%'
	},
	selectedSort: {
		backgroundColor: `${theme.palette.secondary.main} !important`
	},
	slide       : {
		'&-enter'       : {
			'& > * > div': {
				overflowY: 'hidden',
				maxHeight: 0
			},
			'& > *'      : {
				paddingTop   : 0,
				paddingBottom: 0
			}
		},
		'&-enter-active': {
			'& > * > div': {
				maxHeight : `${theme.spacing( 4 )}px !important`,
				transition: 'max-height 200ms ease-in-out'
			},
			'& > *'      : {
				paddingTop   : `${theme.spacing()}px !important`,
				paddingBottom: `${theme.spacing()}px !important`,
				transition   : 'padding 200ms ease-in-out'
			}
		},
		'&-exit'        : {
			'& > * > div': {
				maxHeight: theme.spacing( 4 )
			},
			'& > *'      : {
				paddingTop   : theme.spacing(),
				paddingBottom: theme.spacing()
			}
		},
		'&-exit-active' : {
			'& > * > div': {
				overflowY : 'hidden',
				maxHeight : '0 !important',
				transition: 'max-height 200ms ease-in-out'
			},
			'& > *'      : {
				paddingTop   : '0 !important',
				paddingBottom: '0 !important',
				transition   : 'padding 200ms ease-in-out'
			}
		}
	}
} ) );

const forwardTableBody = React.forwardRef<never>( ( { children }, ref ) => {
	const classes = useStyles();
	return <TableBody ref={ref} className={classes.tableRows}>{children}</TableBody>;
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
	newData?: () => Item | Promise<Item>  // required if editable is true
} & React.ComponentProps<typeof TableContainer> ) {
	const classes = useStyles();
	
	return <>
		{title && <ActionTitle title={title}/>}
		<TableContainer component={Paper} {...props}>
			<Table size='small'>
				<TableHead className={classes.tableRows}>
					<TableRow>
						{editable && <TableCell className={classes.minWidth}/>}
						{columnHeader.map( ( cell, index ) =>
							<TableCell key={index}>{cell}</TableCell> )}
						{editable && <TableCell className={classes.minWidth}>
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
						ghostClass={classes.selectedSort}
						forceFallback
						animation={200}>
						<TransitionGroup component={null}>
							{data.map( ( item, index ) => <CSSTransition
								key={item.id || index}
								timeout={200}
								classNames={classes.slide}>
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
					: <TableBody className={classes.tableRows}>
						{data.map( ( item, index ) => <TableRow key={item.id || index}>
							{columns( item, index ).map( ( cell, index ) =>
								<TableCell key={index}>
									<div>{cell}</div>
								</TableCell> )}
						</TableRow> )}
					</TableBody>}
			</Table>
		</TableContainer>
	</>;
}
