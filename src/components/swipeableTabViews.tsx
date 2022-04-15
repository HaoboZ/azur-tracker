import { Box, Tab, Tabs, TabsProps, useTheme } from '@mui/material';
import { ComponentType, CSSProperties, Fragment, ReactNode, useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard, virtualize } from 'react-swipeable-views-utils';
import useControlled from '../hooks/useControlled';

type SwipeableViewsProps = {
	tab?: number,
	setTab?: ( index: number ) => void,
	renderTabs: ReactNode[],
	renderContent: ( index: number ) => ReactNode
} & TabsProps;

const EnhancedSwipeableViews = bindKeyboard( virtualize( SwipeableViews ) ) as ComponentType<SwipeableViewsProps>;

export default function SwipeableTabViews( {
	tab = 0,
	setTab,
	renderTabs,
	renderContent,
	...props
}: SwipeableViewsProps ) {
	const theme = useTheme();
	
	const [ tabValue, setTabValue ] = useControlled( tab, setTab );
	const [ swipeFix, setSwipeFix ] = useState<CSSProperties>();
	
	useEffect( () => {
		setTimeout( () => setSwipeFix( {
			transition: theme.transitions.create( 'transform' )
		} ), 500 );
	}, [] );
	
	return (
		<Box>
			<Tabs
				selectionFollowsFocus
				value={tabValue}
				onChange={( e, index ) => setTabValue( +index )}
				{...props}>
				{renderTabs.map( ( label, index ) => <Tab key={index} label={label}/> )}
			</Tabs>
			<EnhancedSwipeableViews
				index={tabValue}
				slideCount={renderTabs.length}
				slideRenderer={( { index } ) => (
					<Fragment key={index}>
						{renderContent( index )}
					</Fragment>
				)}
				containerStyle={swipeFix}
				onChangeIndex={( index ) => setTabValue( index )}
			/>
		</Box>
	);
}
