import type { TabsProps } from '@mui/material';
import { Box, Tab, Tabs, useTheme } from '@mui/material';
import type { ComponentType, CSSProperties, ReactNode } from 'react';
import { Fragment, useEffect, useState } from 'react';
import type { SwipeableViewsProps } from 'react-swipeable-views';
import SwipeableViews from 'react-swipeable-views';
import type { WithBindKeyboardProps, WithVirtualizeProps } from 'react-swipeable-views-utils';
import { bindKeyboard, virtualize } from 'react-swipeable-views-utils';
import useControlled from '../hooks/useControlled';

type SwipeableTabViewsProps = {
	tab?: number,
	setTab?: ( index: number ) => void,
	renderTabs: ReactNode[],
	renderContent: ( index: number ) => ReactNode
} & TabsProps;

const EnhancedSwipeableViews = bindKeyboard( virtualize( SwipeableViews ) ) as ComponentType<SwipeableViewsProps & WithVirtualizeProps & WithBindKeyboardProps>;

export default function SwipeableTabViews( {
	tab = 0,
	setTab,
	renderTabs,
	renderContent,
	...props
}: SwipeableTabViewsProps ) {
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
