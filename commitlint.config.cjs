module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [
			2,
			'always',
			[
				'feat', // New feature
				'fix', // Bug fix
				'docs', // Documentation changes
				'style', // Code style changes (formatting, etc.)
				'refactor', // Code refactoring
				'perf', // Performance improvements
				'test', // Adding or updating tests
				'chore', // Maintenance tasks
				'build', // Build system changes
				'ci', // CI configuration changes
				'revert', // Reverting changes
			],
		],
		'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],
		'subject-empty': [2, 'never'],
		'subject-full-stop': [2, 'never', '.'],
		'type-empty': [2, 'never'],
		'scope-empty': [2, 'never'],
		'scope-case': [2, 'always', 'lower-case'],
	},
}
