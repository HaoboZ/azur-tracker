import { NextResponse, revalidatePath } from 'next/server';

export async function GET() {
	revalidatePath( 'info' );
	return NextResponse.json( 'revalidated' );
}
