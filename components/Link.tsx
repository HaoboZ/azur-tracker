import { Link as MuiLink, LinkProps } from '@material-ui/core';
import NextLink from 'next/link';
import React from 'react';

export default function Link( { children, href, ...props }: LinkProps ) {
	return <NextLink href={href} passHref>
		<MuiLink
			color='inherit'
			underline='hover'
			{...props}>
			{children}
		</MuiLink>
	</NextLink>;
}
