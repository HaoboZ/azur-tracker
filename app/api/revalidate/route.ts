import { revalidatePath } from 'next/cache';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST( request: NextRequest ) {
	const secret = request.nextUrl.searchParams.get( 'secret' );
	if ( secret !== process.env.NEXT_PUBLIC_ADMIN_ID ) {
		return NextResponse.json( { message: 'Invalid secret' }, { status: 401 } );
	}
	
	revalidatePath( '/event' );
	revalidatePath( '/research' );
	revalidatePath( '/fleet' );
	revalidatePath( '/info' );
	revalidatePath( '/tier' );
	revalidatePath( '/tier/[type]' );
	
	return NextResponse.json( { revalidated: true, now: Date.now() } );
}
