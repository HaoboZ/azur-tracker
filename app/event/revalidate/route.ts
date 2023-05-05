import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET() {
	revalidatePath( 'event' );
	return NextResponse.json( 'revalidated' );
}
