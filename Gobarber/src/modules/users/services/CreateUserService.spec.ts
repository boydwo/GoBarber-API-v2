import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createAppointment = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createAppointment.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345',
    });

    expect(user).toHaveProperty('id');
  });
  it('should not be able to create a new user with same email from another', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createAppointment = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createAppointment.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345',
    });

    expect(
      createAppointment.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
