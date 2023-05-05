import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET() {
	revalidatePath( 'research' );
	return NextResponse.json( 'revalidated' );
}
