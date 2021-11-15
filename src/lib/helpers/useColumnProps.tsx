import { HTMLAttributes } from 'react';
import { Cell, CellPropGetter, FooterPropGetter, HeaderPropGetter, PluginHook } from 'react-table';

const useColumnProps: PluginHook<any> = ( hooks ) => {
	hooks.getHeaderProps.push( getHeaderProps );
	hooks.getCellProps.push( getCellProps );
	hooks.getFooterProps.push( getFooterProps );
};
useColumnProps.pluginName = 'useColumnProps';
export default useColumnProps;

const getHeaderProps: HeaderPropGetter<any> = ( props, { column } ) => [
	props,
	( typeof column.props === 'function' ? column.props?.() : column.props ) || {}
];

const getCellProps: CellPropGetter<any> = ( props, { cell } ) => [
	props,
	( typeof cell.column.props === 'function' ? cell.column.props?.( cell ) : cell.column.props ) || {}
];

const getFooterProps: FooterPropGetter<any> = ( props, { column } ) => [
	props,
	( typeof column.props === 'function' ? column.props?.() : column.props ) || {}
];

export type UseColumnPropsColumnOptions<D extends object> = Partial<{
	props: ( ( cell?: Cell<D> ) => HTMLAttributes<HTMLDivElement> ) | HTMLAttributes<HTMLDivElement>
}>;
