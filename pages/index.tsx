import Link from 'next/link';
import { Container, Row } from 'react-bootstrap';

export default function Home() {
	return <Container>
		<Row>
			All data is saved client side so export to transfer
		</Row>
		<Row>
			<Link href='/event' passHref>Event Tracker</Link>
			- calculates farming runs for any stage until you reach your target points
		</Row>
		<Row>
			<Link href='/research' passHref>Research Tracker</Link>
			- calculates number of strengthing units for pr ships until max
		</Row>
	</Container>;
}
