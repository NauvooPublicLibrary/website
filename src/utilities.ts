import type { Time } from '@/types.ts';

const invalidTime = 'You must provide a valid time';

/**
 * Parses a time string in various formats and returns its object representation
 *
 * @param time The time to parse
 */
export function parseTime(time: string): Time {
	if (!time) {
		throw new Error(invalidTime);
	}

	let isPm = false;
	if (time.endsWith('PM')) {
		isPm = true;
		time = time.substring(0, time.length - 2);
	} else if (time.endsWith('AM')) {
		time = time.substring(0, time.length - 2);
	}

	time = time.replace(/\s/g, '');

	if (!time) {
		throw new Error(invalidTime);
	}

	const parts = time.split(':');
	if (parts.length > 3) {
		throw new Error(invalidTime);
	}

	const hours = parts[0]!;
	const minutes = parts.length > 1 ? parts[1]! : 0;
	const seconds = parts.length === 3 ? parts[2]! : 0;

	return {
		h: parseHours(hours, isPm),
		m: parseSubHours(minutes),
		s: parseSubHours(seconds)
	};
}

/**
 * Parses the hours component of a time string
 *
 * @param time The string version of the hours component
 * @param isPm Whether the time represents a 12-hour postmeridiem time
 *
 * @returns The hours component as a number
 */
function parseHours(
	time: string,
	isPm: boolean
): number {
	if (!time) {
		throw new Error(invalidTime);
	}

	let h = parseInt(time, 10);
	if (isPm && h < 12) {
		h += 12;
	} else if (h === 0) {
		h = 12;
	}

	if (isNaN(h) || h < 0 || h > 23) {
		throw new Error(invalidTime);
	}

	return h;
}

/**
 * Parses the non-hours component of a time string
 *
 * @param time The string or numeric version of the non-hours comopnent
 *
 * @returns The non-hours component as a number
 */
function parseSubHours(time: string|number): number {
	if (typeof time === 'number') {
		return time;
	}

	const t = parseInt(time, 10);
	if (isNaN(t) || t < 0 || t > 59) {
		throw new Error(invalidTime);
	}

	return t;
}

const cache: Record<string, any> = {};

/**
 * Reads a JSON file and returns its data as the given type
 *
 * The utility automatically prepends the storage directory and .json file extension, so supply only the extensionless name of the file.
 *
 * @param filename The name of the JSON file to read
 *
 * @returns The parsed data
 */
export async function readJson<T>(filename: string): Promise<T> {
	if (cache[filename]) {
		return cache[filename] as T;
	}

	const response = await fetch(`/data/${filename}.json`);
	const result = await response.json() as T;
	cache[filename] = result;

	return result;
}
