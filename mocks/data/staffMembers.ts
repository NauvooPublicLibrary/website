import { fakePerson, registerProxy, times } from '../mockUtils';
import type { StaffPosition, Person } from '../../src/types';

registerProxy('/data/staffMembers.json', fakeStaffMemberData());

function fakeStaffMemberData() {
	const members: Person<StaffPosition>[] = [
		fakePerson<StaffPosition>('Director', 'female'),
		...times(3, _ => fakePerson<StaffPosition>('Aide'))
	];

	return members;
}