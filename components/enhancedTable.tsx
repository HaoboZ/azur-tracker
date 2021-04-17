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
import ActionTitle from './actionTitle';

const useStyles = makeStyles( ( theme ) => ( {
	tableRows:    {
		'& tr:nth-of-type(odd),& th': {
			backgroundColor: theme.palette.action.focus
		}
	},
	minWidth:     {
		width: '1%'
	},
	selectedSort: {
		backgroundColor: `${theme.palette.secondary.main} !important`
	}
} ) );

const forwardTableBody = React.forwardRef<any>( ( { children }, ref ) => {
	const classes = useStyles();
	return <TableBody ref={ref} className={classes.tableRows}>{children}</TableBody>;
} );

export default function EnhancedTable<Item>( {
	title,
	data,
	columnHeader,
	columns,
	sortable,
	editable,
	setData,
	newData = () => ( {} as Item ),
	...props
}: {
	title?: React.ReactNode
	data: Item[]
	columnHeader: React.ReactNodeArray
	columns: ( ( item: Item, index: number ) => React.ReactNodeArray )
	sortable?: boolean
	editable?: boolean
	setData?: ( items: Item[] ) => void // required if sortable or editable is true
	newData?: () => Item | Promise<Item>  // required if editable is true
} & React.ComponentProps<typeof TableContainer> ) {
	const classes = useStyles();
	
	const tableData = data.map( ( item, index ) => <TableRow key={index}>
		{sortable && <TableCell className='sortHandle'><MenuIcon/></TableCell>}
		{columns( item, index ).map( ( cell, index ) => <TableCell key={index}>{cell}</TableCell> )}
		{editable && <TableCell>
			<IconButton onClick={() => {
				const _data = [ ...data ];
				_data.splice( index, 1 );
				setData( _data );
			}}><CloseIcon/></IconButton>
		</TableCell>}
	</TableRow> );
	
	return <>
		{title && <ActionTitle title={title}/>}
		<TableContainer component={Paper} {...props}>
			<Table size='small'>
				<TableHead className={classes.tableRows}>
					<TableRow>
						{sortable && <TableCell className={classes.minWidth}/>}
						{columnHeader.map( ( cell, index ) =>
							<TableCell key={index}>{cell}</TableCell> )}
						{editable && <TableCell className={classes.minWidth}>
							<IconButton onClick={async () => setData( [ ...data, { ...await newData() } ] )}>
								<AddIcon/>
							</IconButton>
						</TableCell>}
					</TableRow>
				</TableHead>
				{sortable ? <ReactSortable
						tag={forwardTableBody}
						list={data as any}
						setList={setData as any}
						handle='.sortHandle'
						ghostClass={classes.selectedSort}
						forceFallback
						animation={150}>
						{tableData}
					</ReactSortable>
					: <TableBody className={classes.tableRows}>
						{tableData}
					</TableBody>}
			</Table>
		</TableContainer>
	</>;
}
