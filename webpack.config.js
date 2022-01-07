const glob = require( 'glob' );
const CopyPlugin = require( 'copy-webpack-plugin' );

module.exports = {
	entry       : glob.sync( './out/**/*.js' ).reduce( ( acc, file ) => {
		acc[ file.replace( /^\.\/out\//, '' ) ] = file;
		return acc;
	}, {} ),
	module      : {
		rules: [ {
			test   : /\.(js)$/,
			exclude: /node_modules/,
			use    : {
				loader : 'babel-loader',
				options: {
					presets: [ '@babel/preset-env' ]
				}
			}
		} ]
	},
	optimization: {
		minimize: false
	},
	output      : {
		filename: '[name]',
		path    : `${ __dirname }/build/mobile`
	},
	plugins     : [
		new CopyPlugin( {
			patterns: [
				{ from: 'out', to: '' }
			]
		} )
	]
};
