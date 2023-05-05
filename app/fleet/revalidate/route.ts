import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET() {
	revalidatePath( 'fleet' );
	return NextResponse.json( 'revalidated' );
}
