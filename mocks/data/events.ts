import { faker } from '@faker-js/faker';
import { random, registerProxy, times } from '../mockUtils';
import type { EventData, EventTime, Time } from '../../src/types';

const events: EventData[] = times(
	6,
	(): EventData => {
		const startTime = faker.number.int({ min: 9, max: 11 });

		return {
			title: faker.lorem.words({ min: 1, max: 6 }),
			location: "Activity Room",
			blurb: faker.lorem.words({ min: 5, max: 15 }),
			type: random(['meeting', 'program']),
			description: faker.lorem.paragraphs({ min: 1, max: 3 }).split('\n'),
			times: times(
				random([ 1, 2, 3 ]),
				(): EventTime => ({
					// date: new Date(`${month++}-${date++}-${year++}`),
					date: faker.date.soon({ days: 30 }),
					startTime: `${startTime}AM` as unknown as Time,
					endTime: random([undefined, `${startTime + 3}PM` as unknown as Time])
				})
			)
		}
	}
);

registerProxy(
	'/data/events.json',
	events
);
