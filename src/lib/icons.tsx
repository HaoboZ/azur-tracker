import React from 'react';

export default function SVGIcon( { name, ...props }: { name?: string } & React.SVGProps<SVGSVGElement> ) {
	return <svg height={14} width={14} {...props}>
		<use href={`#${name}`}/>
	</svg>;
}

export function Icons() {
	return <svg width='0' height='0' style={{ display: 'none' }}>
		<symbol xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' viewBox='0 0 24 24' id='emptyHeart'>
			<path d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z'/>
			♡
		</symbol>
		<symbol xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 511.626 511.627' id='heart'>
			<path d='M475.366 71.951c-24.175-23.606-57.575-35.404-100.215-35.404-11.8 0-23.843 2.046-36.117 6.136-12.279 4.093-23.702 9.615-34.256 16.562-10.568 6.945-19.65 13.467-27.269 19.556a263.828 263.828 0 00-21.696 19.414 264.184 264.184 0 00-21.698-19.414c-7.616-6.089-16.702-12.607-27.268-19.556-10.564-6.95-21.985-12.468-34.261-16.562-12.275-4.089-24.316-6.136-36.116-6.136-42.637 0-76.039 11.801-100.211 35.404C12.087 95.552 0 128.288 0 170.162c0 12.753 2.24 25.889 6.711 39.398 4.471 13.514 9.566 25.031 15.275 34.546 5.708 9.514 12.181 18.796 19.414 27.837 7.233 9.042 12.519 15.27 15.846 18.699 3.33 3.422 5.948 5.899 7.851 7.419L243.25 469.937c3.427 3.429 7.614 5.144 12.562 5.144s9.138-1.715 12.563-5.137l177.87-171.307c43.588-43.583 65.38-86.41 65.38-128.475.001-41.874-12.088-74.61-36.259-98.211z'/>
			♥
		</symbol>
		<symbol xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='10 10 80 80' id='ring'>
			<path d='M64 33.874l5.004-12.544c.168-.42.126-.887-.09-1.278l.009-.005-5.769-10.401H36.5L30.457 20.02l.005.003a1.494 1.494 0 00-.07 1.383l5.749 12.396C26.569 38.815 20.02 48.841 20.02 60.374c0 16.531 13.449 29.98 29.98 29.98s29.98-13.449 29.98-29.98c.001-11.477-6.485-21.463-15.98-26.5zm-2.723-1.272a29.684 29.684 0 00-5.852-1.708l3.056-8.62h6.916l-4.12 10.328zm-13.879-2.089l-2.925-8.239h10.826l-2.915 8.223a30.29 30.29 0 00-2.383-.103 29.858 29.858 0 00-2.603.119zm6.555-17.868l1.572 6.629H44.247l1.575-6.629h8.131zm11.111 6.629h-6.456l-1.572-6.629h4.352l3.676 6.629zm-26.839-6.629h4.512l-1.574 6.629h-6.8l3.862-6.629zm-4.123 9.629h7.187l3.073 8.658a29.783 29.783 0 00-5.496 1.613l-4.764-10.271zM50 87.354c-14.877 0-26.98-12.104-26.98-26.98 0-14.876 12.103-26.98 26.98-26.98s26.98 12.104 26.98 26.98S64.877 87.354 50 87.354z'/>
			<path d='M50.004 38.42c-12.11 0-21.962 9.849-21.962 21.954 0 12.11 9.852 21.962 21.962 21.962 12.108 0 21.958-9.852 21.958-21.962 0-12.106-9.85-21.954-21.958-21.954zm0 40.916c-10.456 0-18.962-8.506-18.962-18.962 0-10.451 8.506-18.954 18.962-18.954 10.454 0 18.958 8.503 18.958 18.954 0 10.456-8.504 18.962-18.958 18.962z'/>
			💍
		</symbol>
		<symbol xmlns='http://www.w3.org/2000/svg' fill='currentColor' strokeWidth='3' stroke='#000' viewBox='-40 -40 80 80' id='star'>
			<path d='M0 20l23.511 12.361-4.49-26.181 19.021-18.541-26.286-3.819L0-40l-11.756 23.82-26.286 3.819L-19.021 6.18l-4.49 26.181L0 20'/>
			★
		</symbol>
		<symbol xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' id='circle'>
			<circle cx='50' cy='50' r='40' stroke='currentColor' fill='none' strokeWidth='8'/>
			🞅
		</symbol>
		<symbol xmlns='http://www.w3.org/2000/svg' fill='currentColor' strokeWidth='3' stroke='#000' viewBox='-40 -40 80 80' id='8star'>
			<path d='M0 25l15.307 11.955 2.371-19.277 19.277-2.371L25 0l11.955-15.307-19.277-2.371-2.371-19.277L0-25l-15.307-11.955-2.371 19.277-19.277 2.371L-25 0l-11.955 15.307 19.277 2.371 2.371 19.277z'/>
			✷
		</symbol>
	</svg>;
}

export function TierIcon( { tier } ) {
	return [
		<SVGIcon key='empty'/>,
		<SVGIcon key='8star' name='8star' color='gold'/>,
		<SVGIcon key='star' name='star' color='gold'/>,
		<SVGIcon key='star' name='star' color='silver'/>,
		<SVGIcon key='star' name='star' color='chocolate'/>,
		<SVGIcon key='star' name='star' color='black'/>,
		<SVGIcon key='circle' name='circle'/>
	][ tier ] || null;
}