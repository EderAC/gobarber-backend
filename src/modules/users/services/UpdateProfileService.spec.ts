import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfile = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('should be able to update the profile', async () => {
        const user = await fakeUsersRepository.create({
            email: 'eder@email.com',
            name: 'jalapão',
            password: 'password',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'chinana',
            email: 'edernew@email.com',
        });

        expect(updatedUser.name).toBe('chinana');
        expect(updatedUser.email).toBe('edernew@email.com');
    });

    it('should not be able to show the profile from non-existing user', async () => {
        await expect(
            updateProfile.execute({
                user_id: 'non-id',
                name: 'Test',
                email: 'test@test.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to change to another user email', async () => {
        await fakeUsersRepository.create({
            email: 'eder@email.com',
            name: 'jalapão',
            password: 'password',
        });

        const user = await fakeUsersRepository.create({
            email: 'teste@email.com',
            name: 'Testão',
            password: 'password',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'chinana',
                email: 'eder@email.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            email: 'eder@email.com',
            name: 'jalapão',
            password: 'password',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'chinana',
            email: 'edernew@email.com',
            old_password: 'password',
            password: 'newPassword',
        });

        expect(updatedUser.password).toBe('newPassword');
    });

    it('should not be able to update the password without old password', async () => {
        const user = await fakeUsersRepository.create({
            email: 'eder@email.com',
            name: 'jalapão',
            password: 'password',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'chinana',
                email: 'edernew@email.com',
                password: 'newPassword',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password with wrong old password', async () => {
        const user = await fakeUsersRepository.create({
            email: 'eder@email.com',
            name: 'jalapão',
            password: 'password',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'chinana',
                email: 'edernew@email.com',
                old_password: 'wrongOldPasswrod',
                password: 'newPassword',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
