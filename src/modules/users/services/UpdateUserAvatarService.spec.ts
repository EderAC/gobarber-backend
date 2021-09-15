import FakeStorageProvider from '@shared/Container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;
describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeStorageProvider = new FakeStorageProvider();

        updateUserAvatar = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        );
    });

    it('should be able to update user avatar', async () => {
        const user = await fakeUsersRepository.create({
            email: 'eder@email.com',
            name: 'jalapão',
            password: 'password',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'nice fotinha',
        });

        expect(user.avatar).toBe('nice fotinha');
    });

    it('should not be able to update user avatar without user ', async () => {
        await expect(
            updateUserAvatar.execute({
                user_id: '123',
                avatarFilename: 'nice fotinha',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should change user avatar if already theres one', async () => {
        // * spy allows spy if a function were executed
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const user = await fakeUsersRepository.create({
            email: 'eder@email.com',
            name: 'jalapão',
            password: 'password',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'bad fotinha',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'nice fotinha',
        });

        expect(deleteFile).toHaveBeenCalledWith('bad fotinha');

        expect(user.avatar).toBe('nice fotinha');
    });
});
