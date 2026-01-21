import { faker } from '@faker-js/faker';

import type { ProxyOptions } from 'vite';
import type { SexType } from '@faker-js/faker';
import type { Person } from '../src/types.ts';

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

/**
 * Creates a fake person
 *
 * @param position The person's position
 * @param sex The person's sex. Randomized if omitted
 *
 * @returns The fake person
 */
export function fakePerson<T extends string>(
	position: T,
	sex?: SexType
): Person<T> {
	sex ??= random(['female', 'male']);

	const person: Person<T> = {
		firstName: faker.person.firstName(sex),
		lastName: faker.person.lastName(),
		position,
		image: faker.image.personPortrait({ sex, size: 512 }),
		biography: times(3, _ => faker.word.words({
			count: {
				min: 10,
				max: 25
			}
		}))
	};

	person.contact = {
		email: faker.internet.email({
			firstName: person.firstName,
			lastName: person.lastName
		}),
		phone: faker.phone.number({ style: 'national' }),
		address: {
			address1: faker.location.streetAddress(),
			city: faker.location.city(),
			state: faker.location.state({ abbreviated: true })
		}
	}

	return person;
}
