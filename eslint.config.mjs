export default {
	env: {
		browser: true,
		es2021: true,
		jest: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'next/core-web-vitals',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		project: './tsconfig.json',
		ecmaFeatures: { jsx: true },
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint'],
	rules: {
		// suggestions
		'dot-notation': 'off', // typescript
		'eqeqeq': 'warn',
		'no-empty': ['warn', { allowEmptyCatch: true }],
		'no-useless-computed-key': ['warn', { enforceForClassMembers: true }],
		'no-var': 'warn',
		// react
		'react/display-name': 'off',
		'react/function-component-definition': [
			'warn',
			{ namedComponents: 'function-declaration', unnamedComponents: 'arrow-function' },
		],
		'react/no-unescaped-entities': 'off',
		'react/prop-types': 'off',
		'react/jsx-boolean-value': 'warn',
		'react/jsx-curly-brace-presence': 'warn',
		'react/jsx-fragments': ['warn', 'element'],
		'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
		'react/jsx-sort-props': [
			'warn',
			{
				callbacksLast: true,
				shorthandFirst: true,
				noSortAlphabetically: true,
				reservedFirst: true,
			},
		],
		// typescript types
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/consistent-type-exports': [
			'warn',
			{ fixMixedExportsWithInlineTypeSpecifier: true },
		],
		'@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
		'@typescript-eslint/no-empty-interface': ['warn', { allowSingleExtends: true }],
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
		// typescript extensions
		'@typescript-eslint/dot-notation': 'warn',
		// others
		'import/no-anonymous-default-export': 'off',
		'react-hooks/exhaustive-deps': 'off',
	},
};
