import express, {urlencoded} from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(urlencoded({extended: true}))
app.use(routes)
app.use(cors())
app.listen(3333)