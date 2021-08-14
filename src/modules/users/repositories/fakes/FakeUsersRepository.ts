import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../../infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async findById(id: string): Promise<User | undefined> {
        const foundUser = this.users.find(user => user.id === id);
        return foundUser;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const foundUser = this.users.find(user => user.email === email);
        return foundUser;
    }

    public async create({
        name,
        email,
        password,
    }: ICreateUserDTO): Promise<User> {
        const createUser = new User();
        Object.assign(createUser, { id: uuid(), name, email, password });

        this.users.push(createUser);

        return createUser;
    }

    public async save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(
            foundUser => foundUser.id === user.id,
        );

        this.users[findIndex] = user;

        return user;
    }
}

export default UsersRepository;
