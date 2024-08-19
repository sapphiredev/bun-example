import sapphirePrettierConfig from '@sapphire/prettier-config';

/** @type {import('prettier').Config} */
export default {
	...sapphirePrettierConfig,
	overrides: [
		...sapphirePrettierConfig.overrides,
		{
			files: ['README.md'],
			options: {
				tabWidth: 2,
				useTabs: false,
				printWidth: 120,
				proseWrap: 'always'
			}
		}
	]
};
