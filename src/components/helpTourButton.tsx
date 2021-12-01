import { Help as HelpIcon } from '@mui/icons-material';
import { IconButton, IconButtonProps, useTheme } from '@mui/material';
import { includes } from 'lodash';
import { useState } from 'react';
import Joyride, { ACTIONS, EVENTS, Props } from 'react-joyride';

export default function HelpTourButton( { buttonProps, ...props }: { buttonProps?: IconButtonProps } & Props ) {
	const theme = useTheme();
	
	const [ tourOpen, setTourOpen ] = useState( false );
	const [ stepIndex, setStepIndex ] = useState( 0 );
	
	return (
		<>
			<Joyride
				continuous
				scrollToFirstStep
				disableOverlayClose
				run={tourOpen}
				stepIndex={stepIndex}
				callback={( { action, type, index, size } ) => {
					switch ( action ) {
					case ACTIONS.CLOSE:
						setTourOpen( false );
						setStepIndex( 0 );
						break;
					case ACTIONS.NEXT:
						if ( !includes( [ EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND ], type ) ) break;
						if ( index === size - 1 ) {
							setTourOpen( false );
							setStepIndex( 0 );
						} else {
							setStepIndex( index + 1 );
						}
						break;
					case ACTIONS.PREV:
						if ( !includes( [ EVENTS.STEP_BEFORE, EVENTS.TARGET_NOT_FOUND ], type ) ) break;
						setStepIndex( index - 1 );
					}
				}}
				locale={{ last: 'Finish' }}
				styles={{
					options: {
						arrowColor     : theme.palette.background.paper,
						backgroundColor: theme.palette.background.paper,
						overlayColor   : theme.palette.action.disabledBackground,
						primaryColor   : theme.palette.primary.main,
						textColor      : theme.palette.text.primary,
						spotlightShadow: theme.shadows[ 1 ],
						zIndex         : theme.zIndex.tooltip
					}
				}}
				{...props}
			/>
			<IconButton
				id='help'
				{...buttonProps}
				onClick={( e ) => {
					buttonProps?.onClick?.( e );
					setTourOpen( true );
				}}>
				<HelpIcon/>
			</IconButton>
		</>
	);
}
