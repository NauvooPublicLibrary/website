import { fakePerson, registerProxy, times } from '../mockUtils';
import type { BoardPosition, Person } from '../../src/types';

registerProxy('/data/boardMembers.json', fakeBoardMemberData());

function fakeBoardMemberData() {
	const members: Person<BoardPosition>[] = [
		fakePerson<BoardPosition>('President', 'female'),
		fakePerson<BoardPosition>('Vice-President', 'male'),
		fakePerson<BoardPosition>('Secretary', 'female'),
		fakePerson<BoardPosition>('Treasurer', 'male'),
		...times(5, _ => fakePerson('Member'))
	];

	return members;
}