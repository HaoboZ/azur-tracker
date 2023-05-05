import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET() {
	revalidatePath( 'info' );
	return NextResponse.json( 'revalidated' );
}
