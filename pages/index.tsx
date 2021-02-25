import Link from 'next/link';
import { Container, Row } from 'react-bootstrap';

export default function Home() {
	return <Container>
		<Row>
			<p>All data is saved client side so export to transfer</p>
		</Row>
		<Row>
			<Link href='/event' passHref>Event Tracker - calculates farming runs for any stage until
				you reach your target points</Link>
		</Row>
		<Row>
			<Link href='/research' passHref>Research Tracker - calculates number of strengthing units
				for pr ships until max</Link>
		</Row>
	</Container>;
}
