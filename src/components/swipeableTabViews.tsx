import { Box, Tab, Tabs, TabsProps, useTheme } from '@mui/material';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard, virtualize } from 'react-swipeable-views-utils';

import useControlledState from '../lib/hooks/useControlledState';

const EnhancedSwipeableViews = bindKeyboard( virtualize( SwipeableViews ) );

export default function SwipeableTabViews( { tab = 0, setTab, renderTabs, renderContent, ...props }: {
	tab?: number,
	setTab?: ( index: number ) => void,
	renderTabs: React.ReactNodeArray,
	renderContent: ( index: number ) => React.ReactNode
} & TabsProps ) {
	const theme = useTheme();
	
	const [ tabValue, setTabValue ] = useControlledState( tab, setTab );
	const [ swipeFix, setSwipeFix ] = React.useState<React.CSSProperties>();
	
	React.useEffect( () => {
		setTimeout( () => setSwipeFix( {
			transition: theme.transitions.create( 'transform' )
		} ), 500 );
	}, [] );
	
	return <Box>
		<Tabs
			selectionFollowsFocus
			value={tabValue}
			onChange={( e, index ) => setTabValue( +index )}
			{...props}>
			{renderTabs.map( ( label, index ) => <Tab key={index} label={label}/> )}
		</Tabs>
		<EnhancedSwipeableViews
			index={tabValue}
			onChangeIndex={( index ) => setTabValue( index )}
			slideCount={renderTabs.length}
			slideRenderer={( { index } ) => <React.Fragment key={index}>
				{renderContent( index )}
			</React.Fragment>}
			containerStyle={swipeFix}
		/>
	</Box>;
}
