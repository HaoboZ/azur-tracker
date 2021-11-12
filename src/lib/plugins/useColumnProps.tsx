export function useColumnProps( hooks ) {
	hooks.getHeaderProps.push( getHeaderProps );
	hooks.getCellProps.push( getCellProps );
	hooks.getFooterProps.push( getFooterProps );
}

useColumnProps.pluginName = 'useColumnProps';

const getHeaderProps = ( props, { column } ) => {
	return [
		props,
		( typeof column.props === 'function' ? column.props?.() : column.props ) || {}
	];
};

const getCellProps = ( props, { cell } ) => [
	props,
	( typeof cell.column.props === 'function' ? cell.column.props?.( cell ) : cell.column.props ) || {}
];

const getFooterProps = ( props, { column } ) => [
	props,
	( typeof column.props === 'function' ? column.props?.() : column.props ) || {}
];
