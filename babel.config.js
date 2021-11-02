module.exports = {
	presets: [ 'next/babel' ],
	plugins: [
		'lodash', [
			'babel-plugin-import', {
				libraryName            : '@mui/icons-material',
				libraryDirectory       : '',
				camel2DashComponentName: false
			},
			'icons'
		]
	]
};
