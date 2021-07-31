module.exports = {
	presets: [ 'next/babel' ],
	plugins: [ 'lodash', [
		'babel-plugin-import',
		{
			libraryName            : '@material-ui/icons',
			libraryDirectory       : '',
			camel2DashComponentName: false
		},
		'icons'
	] ]
};
