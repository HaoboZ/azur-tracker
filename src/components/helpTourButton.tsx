import { Help as HelpIcon } from '@mui/icons-material';
import { IconButton, IconButtonProps, useTheme } from '@mui/material';
import { useState } from 'react';
import Joyride, { ACTIONS, EVENTS, Props } from 'react-joyride';

export default function HelpTourButton( { buttonProps, ...props }: { buttonProps?: IconButtonProps } & Props ) {
	const theme = useTheme();
	
	const [ tourOpen, setTourOpen ] = useState( false );
	const [ stepIndex, setStepIndex ] = useState( 0 );
	
	return <>
		<Joyride
			run={tourOpen}
			stepIndex={stepIndex}
			callback={( { action, type, index, size } ) => {
				switch ( action ) {
				case ACTIONS.CLOSE:
					setTourOpen( false );
					setStepIndex( 0 );
					break;
				case ACTIONS.NEXT:
					if ( ![ EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND ].includes( type as any ) ) break;
					if ( index === size - 1 ) {
						setTourOpen( false );
						setStepIndex( 0 );
					} else {
						setStepIndex( index + 1 );
					}
					break;
				case ACTIONS.PREV:
					if ( ![ EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND ].includes( type as any ) ) break;
					setStepIndex( index - 1 );
				}
			}}
			continuous
			scrollToFirstStep
			locale={{ last: 'Finish' }}
			disableOverlayClose
			styles={{
				options: {
					arrowColor     : theme.palette.background.paper,
					backgroundColor: theme.palette.background.paper,
					overlayColor   : theme.palette.action.disabledBackground,
					primaryColor   : theme.palette.primary.main,
					textColor      : theme.palette.text.primary,
					spotlightShadow: theme.shadows[ 1 ],
					zIndex         : 1500
				}
			}}
			{...props}
		/>
		<IconButton
			{...buttonProps}
			onClick={( e ) => {
				buttonProps?.onClick?.( e );
				setTourOpen( true );
			}}><HelpIcon/></IconButton>
	</>;
}
