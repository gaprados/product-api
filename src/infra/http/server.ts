import cors from 'cors';
import express from 'express';
import { checkJwt } from '../../app/middlewares/checkJwt';
import { CreateSessionService } from '../../app/services/create-session-service';
import { CreateUserService } from '../../app/services/create-user-service';
import { GetUserById } from '../../app/services/get-user-by-id-service';
import { InMemoryUsersRepository } from '../../domain/repositories/in-memory-repository';
import { DBUsersRepositoy } from '../../domain/repositories/mysql-users-repository';

const app = express();

app.use(cors())
app.use(express.json());

const inMemoryUsersRepositoy = new InMemoryUsersRepository();
const usersRepository = new DBUsersRepositoy();
const createUserService = new CreateUserService(inMemoryUsersRepositoy);
const createSessionService = new CreateSessionService(inMemoryUsersRepositoy);
const GetUserByIdService = new GetUserById(inMemoryUsersRepositoy);

app.post('/sessions', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await createSessionService.execute({ email, password });

    return res.json(user);
  } catch (err) {
    if (err instanceof Error)
      return res.status(400).json({ error: err.message });
  }
})

app.post('/users', async (req, res) => {
  try {
    const { name, email, password, confirmation_password } = req.body;

    const user = await createUserService.execute({ name, email, password, confirmation_password });

    return res.json(user);
  } catch (err) {

    if (err instanceof Error)
      return res.status(400).json({ error: err.message });
  }
})

app.get('/me', checkJwt, async (req, res) => {
  const user = await GetUserByIdService.execute(req.userId)

  return res.json(user)
})

app.listen(3333, () => console.log('Server is running'));