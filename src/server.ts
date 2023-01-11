import express from 'express';
import { CreateUserService } from './app/services/create-user-service';
import { UserRepository } from './domain/repositories/array-users-repository';

const app = express();

app.use(express.json());

const usersRepository = new UserRepository();
const createUserService = new CreateUserService(usersRepository);

app.get('/', (_, res) => {
  return res.json({ message: 'Hello World' });
})

app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await createUserService.execute({ name, email, password });

    return res.json(user);
  } catch (err) {

    if (err instanceof Error)
      return res.status(400).json({ error: err.message });
  }
})

app.listen(3333, () => console.log('Server is running'));