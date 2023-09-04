import {
	Camera as CameraIcon,
	DirectionsBoat as DirectionsBoatIcon,
	Event as EventIcon,
	Info as InfoIcon,
	Settings as SettingsIcon,
} from '@mui/icons-material';
import type { ReactNode } from 'react';

export const items: {
	label: string;
	icon: ReactNode;
	href: string;
	store?: string;
	hide?: boolean;
}[] = [
	{
		label: 'Event',
		icon: <EventIcon />,
		href: '/event',
		store: 'event',
	},
	{
		label: 'Research',
		icon: <CameraIcon />,
		href: '/research',
		store: 'research',
	},
	{
		label: 'Fleet',
		icon: <DirectionsBoatIcon />,
		href: '/fleet',
		store: 'fleet',
	},
	{
		label: 'Info',
		icon: <InfoIcon />,
		href: '/info',
	},
	{
		label: 'Settings',
		icon: <SettingsIcon />,
		href: '/settings',
		hide: true,
	},
];
