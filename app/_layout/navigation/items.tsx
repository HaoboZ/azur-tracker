import {
	Camera as CameraIcon,
	DirectionsBoat as DirectionsBoatIcon,
	Event as EventIcon,
	Info as InfoIcon,
	Settings as SettingsIcon,
} from '@mui/icons-material';
import type { ReactNode } from 'react';

export const items: { label: string; icon: ReactNode; href: string; hide?: boolean }[] = [
	{ label: 'Event', icon: <EventIcon />, href: '/tracker/event' },
	{ label: 'Research', icon: <CameraIcon />, href: '/tracker/research' },
	{ label: 'Fleet', icon: <DirectionsBoatIcon />, href: '/tracker/fleet' },
	{ label: 'Info', icon: <InfoIcon />, href: '/tracker/info' },
	{ label: 'Settings', icon: <SettingsIcon />, href: '/tracker/settings', hide: true },
];
