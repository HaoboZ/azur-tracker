export default function getTier( equippableData, equipTierData, ship: { equipType: string[] }, equip: number[][] ) {
	equip?.forEach( ( eq, i ) => {
		if ( !eq ) return;
		if ( !eq[ 0 ] ) {
			eq[ 2 ] = 0;
			return;
		}
		if ( eq[ 1 ] ) {
			eq[ 2 ] = 1;
			return;
		}
		const tier = equipTierData[ equippableData[ ship.equipType[ i ] ]?.tier ];
		eq[ 2 ] = tier && eq[ 0 ] in tier ? tier[ eq[ 0 ] ][ 0 ] + 1 : 6;
	} );
}
