/**
 * A standard set of contact information
 */
export type ContactInformation = {
	/**
	 * The person's email address, if public
	 */
	email?: string;

	/**
	 * The person's phone number, if public
	 */
	phone?: string;

	/**
	 * The person's fax number, if public
	 */
	fax?: string;

	/**
	 * The person's address, if public
	 */
	address?: Address;
}

/**
 * A geographical and (optional) mailing address
 */
export type Address = {
	/**
	 * The address line 1
	 */
	address1: string;

	/**
	 * The address line 2
	 */
	address2?: string;

	/**
	 * The address PO Box
	 */
	poBox?: string;

	/**
	 * The address city
	 */
	city: string;

	/**
	 * The address state
	 */
	state: string;
}

/**
 * The complete data for an event
 */
export type EventData = {
	/**
	 * The title or headline for the event
	 */
	title: string;

	/**
	 * The location of the event
	 */
	location: string;

	/**
	 * The type of the event
	 */
	type: EventType;

	/**
	 * The time of the event
	 */
	times: EventTime[];

	/**
	 * A short description of the event
	 */
	blurb: string;

	/**
	 * A detailed description of the event
	 */
	description: string[];
}

/**
 * The start and end time for an event
 */
export type EventTime = {
	/**
	 * The time the event starts
	 */
	startTime: Time;

	/**
	 * The time the event ends
	 */
	endTime?: Time;

	/**
	 * The day of the event
	 */
	date?: Date;
}

/**
 * Types of events hosted by the library
 */
export type EventType =
	| 'meeting'
	| 'program'

/**
 * A 24-hour formatted time
 */
export type Time = {
	/**
	 * The hour component
	 */
	h: number;

	/**
	 * The minute component
	 */
	m: number;

	/**
	 * The second component
	 */
	s: number;
}

/**
 * HTML heading levels
 */
export type HeadingLevel =
	| '1' | 1
	| '2' | 2
	| '3' | 3
	| '4' | 4
	| '5' | 5
	| '6' | 6

export type ThemeColor =
	| 'primary'
	| 'secondary'
	| 'success'
	| 'info'
	| 'warning'
	| 'danger'
	| 'light'
	| 'dark'
