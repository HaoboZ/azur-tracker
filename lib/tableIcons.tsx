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
		<AddBox {...props} ref={ref}/> ),
	Check:           React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<Check {...props} ref={ref}/> ),
	Clear:           React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<Clear {...props} ref={ref}/> ),
	Delete:          React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<DeleteOutline {...props} ref={ref}/> ),
	DetailPanel:     React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<ChevronRight {...props} ref={ref}/> ),
	Edit:            React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<Edit {...props} ref={ref}/> ),
	Export:          React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<SaveAlt {...props} ref={ref}/> ),
	Filter:          React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<FilterList {...props} ref={ref}/> ),
	FirstPage:       React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<FirstPage {...props} ref={ref}/> ),
	LastPage:        React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<LastPage {...props} ref={ref}/> ),
	NextPage:        React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<ChevronRight {...props} ref={ref}/> ),
	PreviousPage:    React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<ChevronLeft {...props} ref={ref}/> ),
	ResetSearch:     React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<Clear {...props} ref={ref}/> ),
	Search:          React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<Search {...props} ref={ref}/> ),
	SortArrow:       React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<ArrowDownward {...props} ref={ref}/> ),
	ThirdStateCheck: React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<Remove {...props} ref={ref}/> ),
	ViewColumn:      React.forwardRef<SVGSVGElement>( ( props, ref ) =>
		<ViewColumn {...props} ref={ref}/> )
};
