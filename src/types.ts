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
 * A linked resource
 */
export type Resource = {
	/**
	 * The display text of the resource
	 */
	text: string;

	/**
	 * The link to the resource
	 */
	url: string;
}

/**
 * The information for a person
 */
export type Person<T extends string> = {
	/**
	 * The person's first name
	 */
	firstName?: string;

	/**
	 * The person's last name
	 */
	lastName?: string;

	/**
	 * The person's position within the library
	 */
	position: T;

	/**
	 * The person's biography. Each entry represents a paragraph
	 */
	biography?: string[];

	/**
	 * The person's image URL, if public
	 */
	image?: string;

	/**
	 * The person's contact information, if public
	 */
	contact?: ContactInformation;
}

/**
 * The available positions on the library board
 */
export type BoardPosition =
	| 'President'
	| 'Vice-President'
	| 'Secretary'
	| 'Treasurer'
	| 'Member'

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

/**
 * Bootstrap-supported gap sizes
 */
export type GapSize =
	| '0'
	| '1'
	| '2'
	| '3'
	| '4'
	| '5'

/**
 * Bootstrap-supported column sizes
 */
export type ColumnSize =
	| '1'
	| '2'
	| '3'
	| '4'
	| '5'
	| '6'
	| '7'
	| '8'
	| '9'
	| '10'
	| '11'
	| '12'

export type ThemeColor =
	| 'primary'
	| 'secondary'
	| 'success'
	| 'info'
	| 'warning'
	| 'danger'
	| 'light'
	| 'dark'
