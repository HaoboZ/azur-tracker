import { NextResponse, revalidatePath } from 'next/server';

export async function GET() {
	revalidatePath( 'fleet' );
	return NextResponse.json( 'revalidated' );
}
