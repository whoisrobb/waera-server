import express from 'express';
import path from 'path';
import cors from 'cors';
import userRoutes from './user-routes/user';
import userBoardRoutes from './user-routes/board';
import userCardRoutes from './user-routes/card';
import userListRoutes from './user-routes/list';

/* CONFIGURATIONS */
const app = express();
app.use(express.json());
app.use(cors())
app.use('/files', express.static(path.join(__dirname, 'files')));


/* ROUTES */
app.use('/user', userRoutes);
app.use('/user', userBoardRoutes);
app.use('/user', userCardRoutes);
app.use('/user', userListRoutes);


app.get('/', (req, res) => {
    res.json({ greeting: 'Wsgood' })
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})