import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        showProfile = new ShowProfileService(fakeUsersRepository);
    });

    it('should be able to show the profile', async () => {
        const user = await fakeUsersRepository.create({
            email: 'eder@email.com',
            name: 'jalapão',
            password: 'password',
        });

        const profile = await showProfile.execute({
            user_id: user.id,
        });

        expect(profile.name).toBe('jalapão');
        expect(profile.email).toBe('eder@email.com');
    });

    it('should not be able to show the profile from non-existing user', async () => {
        await expect(
            showProfile.execute({
                user_id: 'non-id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
