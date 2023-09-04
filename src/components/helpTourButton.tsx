import { Help as HelpIcon } from '@mui/icons-material';
import type { IconButtonProps } from '@mui/material';
import { IconButton } from '@mui/material';
import type { StepsProps } from 'intro.js-react';
import { Steps } from 'intro.js-react';
import 'intro.js/introjs.css';
import 'intro.js/themes/introjs-modern.css';
import { Fragment, useState } from 'react';

export default function HelpTourButton({
	buttonProps,
	...props
}: {
	buttonProps?: IconButtonProps;
} & Omit<StepsProps, 'initialStep' | 'onExit'>) {
	const [tourOpen, setTourOpen] = useState(false);

	return (
		<Fragment>
			<Steps
				enabled={tourOpen}
				initialStep={0}
				onExit={() => setTourOpen(false)}
				{...props}
				options={{
					doneLabel: 'Finish',
					...props.options,
				}}
			/>
			<IconButton
				id='help'
				aria-label='help'
				{...buttonProps}
				onClick={(e) => {
					buttonProps?.onClick?.(e);
					setTourOpen(true);
				}}>
				<HelpIcon />
			</IconButton>
		</Fragment>
	);
}
