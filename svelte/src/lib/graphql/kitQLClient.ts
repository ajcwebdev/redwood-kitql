import { KitQLClient } from '@kitql/client';

export const kitQLClient = new KitQLClient({
	url: import.meta.env.VITE_REDWOOD_API_ENDPOINT,
	headersContentType: 'application/json',
	logType: ['client', 'server', 'operationAndvariables'],
});