import type { EventTime, Time } from '@/types.ts';

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

/**
 * Converts a time object to a machine-readable time format
 *
 * @param time The time to convert
 *
 * @returns The machine-readable time as a string
 */
export function convertToMachineFormatTime(time: Time): string {
	return `${padWithLeadingZero(time.h, 10)}:${padWithLeadingZero(time.m, 10)}:${padWithLeadingZero(time.s, 10)}`;
}

/**
 * Converts a given time object to its shortest possible complete representation
 *
 * @param time The time to convert
 *
 * @returns The formatted short time
 */
export function convertToHumanFormatTime(time: Time): string {
	const isPm = time.h >= 12;
	let hours = time.h;
	const minutes = time.m;
	const seconds = time.s;

	if (hours === 0) {
		hours = 12;
	} else if (hours > 12) {
		hours -= 12;
	}

	let t = hours.toString();

	if (minutes > 0) {
		t = `${t}:${padWithLeadingZero(minutes, 10)}`;
	}

	if (seconds > 0) {
		t = `${t}:${padWithLeadingZero(seconds, 10)}`;
	}

	return t + (isPm ? 'PM' : 'AM');
}

/**
 * Pads a number with a leading zero if it is less than a given value
 *
 * @param input The input number
 * @param minimum The minimum value at which the number needs no padding
 *
 * @returns The string number with leading zeroes if applicable
 */
export function padWithLeadingZero(
	input: number,
	minimum: number
): string {
	return input < minimum ? `0${input}` : input.toString();
}

/**
 * Reads the library's hours from configuration
 */
export async function getLibraryHours(): Promise<(EventTime|null)[]> {
	const rawSchedule = await readJson<Record<string, string>[]>('libraryHours');
	const schedule: (EventTime|null)[] = [];

	for (let day of rawSchedule) {
		// Closed days will be missing the startTime field
		if (!day['startTime']) {
			schedule.push(null);
			continue;
		}

		schedule.push(extractEventTimeFromJson(day));
	}

	return schedule;
}

/**
 * Reads JSON input and returns an EventTime
 *
 * @param input The JSON input to read
 */
export function extractEventTimeFromJson(input: Record<string, string>): EventTime {
	const time: EventTime = {
		startTime: parseTime(input['startTime']!)
	};

	if (input['endTime']) {
		time.endTime = parseTime(input['endTime']!);
	}

	if (input['date']) {
		time.date = new Date(input['date']);
	}

	return time;
}
