import { renderGraphiQL } from '@graphql-yoga/common';

const defaultQuery = `query Redwood {
  redwood {
    version
  }
}
`;

export async function get() {
	return {
		status: 200,
		headers: {
			'Content-Type': 'text/html'
		},
		body: renderGraphiQL({
			endpoint: import.meta.env.VITE_REDWOOD_API_ENDPOINT,
			defaultQuery
		})
	};
}
