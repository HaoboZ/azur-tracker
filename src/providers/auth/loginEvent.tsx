'use client';
import useEventListener from '../../hooks/useEventListener';
import { useEvents } from '../events';
import { useModal } from '../modal';
import LoginModal from './loginModal';

export default function LoginEvent() {
	const events = useEvents();
	const { showModal } = useModal();

	useEventListener(events, 'showAuth', () => showModal(LoginModal, { id: 'login' }));

	return null;
}
