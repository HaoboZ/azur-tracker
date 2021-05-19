module.exports = {
	env          : {
		browser: true,
		es2021 : true,
		node   : true,
		jest   : true
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
		// stylistic issues
		'array-bracket-spacing'   : [ 'warn', 'always' ],
		'comma-dangle'            : 'off',
		'indent'                  : [ 'warn', 'tab', { VariableDeclarator: 'first' } ],
		'key-spacing'             : [ 'off', { align: 'colon' } ],
		'no-mixed-spaces-and-tabs': [ 'warn', 'smart-tabs' ],
		'object-curly-spacing'    : 'off',
		'quotes'                  : [ 'warn', 'single' ],
		'semi'                    : 'off',
		// react
		'react/display-name'                 : 'off',
		'react/function-component-definition': [ 'warn', {
			namedComponents  : 'function-declaration',
			unnamedComponents: 'arrow-function'
		} ],
		'react/no-unescaped-entities'        : 'off',
		'react/prop-types'                   : 'off',
		'react/jsx-closing-bracket-location' : [ 'warn', {
			selfClosing: 'line-aligned',
			nonEmpty   : 'after-props'
		} ],
		'react/jsx-curly-brace-presence'     : [ 'warn', 'never' ],
		'react/jsx-curly-newline'            : [ 'warn', 'consistent' ],
		'react/jsx-curly-spacing'            : [ 'warn', 'never' ],
		'react/jsx-equals-spacing'           : [ 'warn', 'never' ],
		'react/jsx-first-prop-new-line'      : [ 'warn', 'multiline-multiprop' ],
		'react/jsx-indent'                   : [ 'warn', 'tab', { indentLogicalExpressions: true } ],
		'react/jsx-tag-spacing'              : [ 'warn', {
			'closingSlash'     : 'never',
			'beforeSelfClosing': 'never',
			'afterOpening'     : 'never',
			'beforeClosing'    : 'never'
		} ],
		// typescript
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/member-delimiter-style'        : [ 'warn', {
			multiline : {
				delimiter  : 'comma',
				requireLast: false
			},
			singleline: {
				delimiter  : 'comma',
				requireLast: false
			}
		} ],
		'@typescript-eslint/no-empty-interface'            : [ 'warn', { allowSingleExtends: true } ],
		'@typescript-eslint/no-explicit-any'               : 'off',
		'@typescript-eslint/comma-dangle'                  : [ 'warn', 'never' ],
		'@typescript-eslint/object-curly-spacing'          : [ 'warn', 'always' ],
		'@typescript-eslint/semi'                          : [ 'warn', 'always' ]
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
