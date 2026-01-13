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
