import adapter from '@sveltejs/adapter-netlify'
import watchAndRun from '@kitql/vite-plugin-watch-and-run';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),

		vite: {
			plugins: [
				watchAndRun([
					{
						watch: '**/*.(gql|graphql)',
						run: 'npm run gen'
					}
				])
			]
		}
	}
};

export default config;
