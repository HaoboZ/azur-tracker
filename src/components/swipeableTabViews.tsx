import { Box, Tab, Tabs, TabsProps, useTheme } from '@mui/material';
import { CSSProperties, Fragment, ReactNode, useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard, virtualize } from 'react-swipeable-views-utils';
import useControlledState from '../hooks/useControlledState';

const EnhancedSwipeableViews = bindKeyboard( virtualize( SwipeableViews ) );

export default function SwipeableTabViews( { tab = 0, setTab, renderTabs, renderContent, ...props }: {
	tab?: number,
	setTab?: ( index: number ) => void,
	renderTabs: ReactNode[],
	renderContent: ( index: number ) => ReactNode
} & TabsProps ) {
	const theme = useTheme();
	
	const [ tabValue, setTabValue ] = useControlledState( tab, setTab );
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
