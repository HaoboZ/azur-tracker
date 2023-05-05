import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET() {
	revalidatePath( 'tier' );
	return NextResponse.json( 'revalidated' );
}
