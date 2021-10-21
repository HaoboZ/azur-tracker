import { Dispatch, SetStateAction, useState } from 'react';

export default function useControlledState<S>( initialState?: S ): [ S, Dispatch<SetStateAction<S>> ];
export default function useControlledState<S>( state: S, setState: Dispatch<SetStateAction<S>> ): [ S, Dispatch<SetStateAction<S>> ];
export default function useControlledState<S>( state?: S, setState?: Dispatch<SetStateAction<S>> ) {
	const states = useState( state );
	return setState ? [ state, setState ] : states;
}
