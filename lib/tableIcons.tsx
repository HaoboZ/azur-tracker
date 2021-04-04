import {
	AddBox,
	ArrowDownward,
	Check,
	ChevronLeft,
	ChevronRight,
	Clear,
	DeleteOutline,
	Edit,
	FilterList,
	FirstPage,
	LastPage,
	Remove,
	SaveAlt,
	Search,
	ViewColumn
} from '@material-ui/icons';
import React from 'react';

export default {
	Add:             React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<AddBox {...props as any} ref={ref}/> ),
	Check:           React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<Check {...props as any} ref={ref}/> ),
	Clear:           React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<Clear {...props as any} ref={ref}/> ),
	Delete:          React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<DeleteOutline {...props as any} ref={ref}/> ),
	DetailPanel:     React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<ChevronRight {...props as any} ref={ref}/> ),
	Edit:            React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<Edit {...props as any} ref={ref}/> ),
	Export:          React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<SaveAlt {...props as any} ref={ref}/> ),
	Filter:          React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<FilterList {...props as any} ref={ref}/> ),
	FirstPage:       React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<FirstPage {...props as any} ref={ref}/> ),
	LastPage:        React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<LastPage {...props as any} ref={ref}/> ),
	NextPage:        React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<ChevronRight {...props as any} ref={ref}/> ),
	PreviousPage:    React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<ChevronLeft {...props as any} ref={ref}/> ),
	ResetSearch:     React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<Clear {...props as any} ref={ref}/> ),
	Search:          React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<Search {...props as any} ref={ref}/> ),
	SortArrow:       React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<ArrowDownward {...props as any} ref={ref}/> ),
	ThirdStateCheck: React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<Remove {...props as any} ref={ref}/> ),
	ViewColumn:      React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<ViewColumn {...props as any} ref={ref}/> )
};
