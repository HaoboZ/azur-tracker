import {
	Camera as CameraIcon,
	DirectionsBoat as DirectionsBoatIcon,
	Event as EventIcon,
	Info as InfoIcon,
	Settings as SettingsIcon,
} from '@mui/icons-material';
import type { ReactNode } from 'react';

export const items: { label: string; icon: ReactNode; href: string; hide?: boolean }[] = [
	{ label: 'Event', icon: <EventIcon />, href: '/z/event' },
	{ label: 'Research', icon: <CameraIcon />, href: '/z/research' },
	{ label: 'Fleet', icon: <DirectionsBoatIcon />, href: '/z/fleet' },
	{ label: 'Info', icon: <InfoIcon />, href: '/z/info' },
	{ label: 'Settings', icon: <SettingsIcon />, href: '/z/settings', hide: true },
];
