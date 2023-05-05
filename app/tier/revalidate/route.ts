import { NextResponse, revalidatePath } from 'next/server';

export async function GET() {
	revalidatePath( 'tier' );
	return NextResponse.json( 'revalidated' );
}
