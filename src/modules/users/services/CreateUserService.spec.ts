import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();

        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const user = await createUser.execute({
            email: 'eder@email.com',
            name: 'jalapão',
            password: 'password',
        });

        expect(user).toHaveProperty('id');
        expect(user.email).toBe('eder@email.com');
    });

    it('should not be able to create two users with the same email', async () => {
        const fakeUsersRepository = new FakeUsersRepository();

        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const email = 'eder@email.com';

        await createUser.execute({
            email,
            name: 'jalapão',
            password: 'password',
        });

        expect(
            createUser.execute({
                email,
                name: 'jalapão',
                password: 'password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
