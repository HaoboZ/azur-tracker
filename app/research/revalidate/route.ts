import { NextResponse, revalidatePath } from 'next/server';

export async function GET() {
	revalidatePath( 'research' );
	return NextResponse.json( 'revalidated' );
}
