import { NextResponse, revalidatePath } from 'next/server';

export async function GET() {
	revalidatePath( 'event' );
	return NextResponse.json( 'revalidated' );
}
