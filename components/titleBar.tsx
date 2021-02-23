import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

import PortingModal from './portingModal';

export default function TitleBar() {
	const router = useRouter();
	
	const [ portingModal, setPortingModal ] = React.useState( false ),
	      [ portingType, setPortingType ]   = React.useState( 0 );
	
	return <Navbar bg='light' expand='md'>
		<Link href='/' passHref><Navbar.Brand href='/'>Azur Lane Tracker</Navbar.Brand></Link>
		<Navbar.Toggle aria-controls='navbar-nav'/>
		<Navbar.Collapse id='navbar-nav'>
			<Nav className='mr-auto' activeKey={ router.pathname }>
				{/*<Link href='/ships' passHref><Nav.Link>Ships</Nav.Link></Link>*/ }
				{/*<Link href='/equipment' passHref><Nav.Link>Equipment</Nav.Link></Link>*/ }
				<Link href='/event' passHref><Nav.Link>Event</Nav.Link></Link>
				<Link href='/research' passHref><Nav.Link>Research</Nav.Link></Link>
				<NavDropdown title='More' id='navbar-more'>
					<NavDropdown.Item onClick={ () => {
						setPortingType( 0 );
						setPortingModal( true );
					} }>Export</NavDropdown.Item>
					<NavDropdown.Item onClick={ () => {
						setPortingType( 1 );
						setPortingModal( true );
					} }>Import</NavDropdown.Item>
					<PortingModal
						status={ portingModal } type={ portingType }
						closeModal={ () => setPortingModal( false ) }/>
				</NavDropdown>
			</Nav>
		</Navbar.Collapse>
	</Navbar>;
}
