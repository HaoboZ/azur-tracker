module.exports = {
	env          : {
		browser: true,
		es2021 : true,
		node   : true
	},
	extends      : [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended'
	],
	parser       : '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: { jsx: true },
		ecmaVersion : 12,
		sourceType  : 'module'
	},
	plugins      : [
		'react',
		'@typescript-eslint'
	],
	rules        : {
		'indent'                                           : [ 'warn', 'tab', { VariableDeclarator: 'first' } ],
		'quotes'                                           : [ 'warn', 'single' ],
		'semi'                                             : [ 'warn', 'always' ],
		'no-mixed-spaces-and-tabs'                         : [ 'warn', 'smart-tabs' ],
		'object-curly-spacing'                             : [ 'warn', 'always' ],
		'array-bracket-spacing'                            : [ 'warn', 'always' ],
		'key-spacing'                                      : [ 'off', { align: 'colon' } ],
		'react/display-name'                               : 'off',
		'react/prop-types'                                 : [ 0 ],
		'react/no-unescaped-entities'                      : 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-empty-interface'            : [ 'warn', { allowSingleExtends: true } ]
	},
	overrides    : [
		{
			files: [ '*.js' ],
			rules: {
				'@typescript-eslint/no-var-requires': 'off'
			}
		}
	]
};
