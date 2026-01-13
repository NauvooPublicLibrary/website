/**
 * A standard set of contact information
 */
export type ContactInfo = {
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
