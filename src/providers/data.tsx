import { createContext, useContext } from 'react';

const DataContext = createContext<any>( null );
DataContext.displayName = 'Data';

export default function DataProvider( { children, data } ) {
	return (
		<DataContext.Provider value={data}>
			{children}
		</DataContext.Provider>
	);
}

export function useData<T>() {
	return useContext( DataContext ) as T;
}

export function withData( Component ) {
	return ( props ) => (
		<DataContext.Consumer>
			{( data ) => <Component data={data} {...props}/>}
		</DataContext.Consumer>
	);
}
