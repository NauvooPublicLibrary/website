import type { ProxyOptions } from 'vite';

const proxies: Record<string, ProxyOptions> = {};

/**
 * Creates a server proxy configuration object for mocking data
 *
 * @param key The path for the proxy to create
 * @param data The data to return from the proxy
 */
export function registerProxy(
	key: string,
	data: any
) {
	proxies[key] = {
		bypass(_, response, _1) {
			response!.setHeader('Content-Type', 'application/json');
			response!.end(JSON.stringify(data));
			return false;
		}
	};
}

/**
 * Retrieves the registered proxies
 */
export function getProxies(): Record<string, ProxyOptions> {
	return proxies;
}

/**
 * Selects a random item from an array
 *
 * @param options The available values
 *
 * @returns The selected random item
 */
export function random<T>(options: T[]): T {
	const index = Math.floor(Math.random() * options.length);
	return options[index];
}

/**
 * Execute a function a specific number of times
 *
 * @param t The number of times to execute a function
 * @param cb The function to execute
 *
 * @returns The results of each function call as an array
 */
export function times(
	t: number,
	cb: (value: any, index: number, array: any[]) => any
): any[] {
	return Array(t)
		.fill(0)
		.map((value, index, array) => cb(value, index, array));
}
