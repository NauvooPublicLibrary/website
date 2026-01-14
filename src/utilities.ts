import type { EventData, EventTime, EventType, Time } from '@/types.ts';

/**
 * Converts a numeric day of the week to a string representation
 *
 * @param day The day number to retrieve
 */
export function mapDayNumberToName(day: number): string {
	const days = [
		'Sun',
		'Mon',
		'Tue',
		'Wed',
		'Thu',
		'Fri',
		'Sat'
	];

	return days[day]!;
}

/**
 * Converts a numeric month of the year to a string representation
 *
 * @param month The month number to retrieve
 *
 * @returns The short month name
 */
export function mapMonthNumberToName(month: number): string {
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	return months[month]!;
}

/**
 * Formats a date for human readers
 *
 * @param date The date to format
 * @param omitYear Whether to omit the 4-digit year from the date
 *
 * @returns The formatted date
 */
export function formatDate(date: Date, omitYear?: boolean): string {
	const shortDate = `${mapMonthNumberToName(date.getMonth())} ${date.getDate()}`;

	omitYear ??= new Date().getFullYear() === date.getFullYear();

	return omitYear ? shortDate : `${shortDate}, ${date.getFullYear()}`;
}

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
 * Reads the library's events from configuration
 */
export async function getEvents(): Promise<EventData[]> {
	const rawEvents = await readJson<Record<string, any>[]>('events');
	const events: EventData[] = [];

	for (const rawEvent of rawEvents) {
		let eventTimes: EventTime[] = [];

		for (const time of rawEvent['times'] as Record<string, string>[]) {
			const eventTime = extractEventTimeFromJson(time);
			eventTimes.push(eventTime);
		}

		const event: EventData = {
			title: rawEvent['title'] as string,
			location: rawEvent['location'] as string,
			type: rawEvent['type'] as EventType,
			blurb: rawEvent['blurb'] as string,
			description: rawEvent['description'] as string[],
			times: eventTimes
		};

		events.push(event);
	}

	return events.sort((event1, event2) => {
		const event1Time = event1.times[0]!;
		const event2Time = event2.times[0]!;

		// First sort on date...
		if (event1Time.date! > event2Time.date!) {
			return 1;
		} else if (event1Time.date! < event2Time.date!) {
			return -1;
		}

		// ...then sort on hours...
		if (event1Time.startTime.h > event2Time.startTime.h) {
			return 1;
		} else if (event1Time.startTime.h < event2Time.startTime.h) {
			return -1;
		}

		// ...then sort on minutes...
		if (event1Time.startTime.m > event2Time.startTime.m) {
			return 1;
		} else if (event1Time.startTime.m < event2Time.startTime.m) {
			return -1;
		}

		// ...then finally sort on the event name
		return event1.title.localeCompare(event2.title);
	});
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
