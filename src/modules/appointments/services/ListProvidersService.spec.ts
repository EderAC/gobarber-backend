import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvider: ListProvidersService;

describe('ListProviders', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        listProvider = new ListProvidersService(fakeUsersRepository);
    });

    it('should be able to list the providers', async () => {
        const user1 = await fakeUsersRepository.create({
            email: 'eder1@email.com',
            name: 'jalapão1',
            password: 'password',
        });

        const user2 = await fakeUsersRepository.create({
            email: 'eder2@email.com',
            name: 'jalapão2',
            password: 'password',
        });

        const loggedUser = await fakeUsersRepository.create({
            email: 'eder@email.com',
            name: 'jalapão',
            password: 'password',
        });

        const providers = await listProvider.execute({
            user_id: loggedUser.id,
        });

        expect(providers).toEqual([user1, user2]);
    });
});
