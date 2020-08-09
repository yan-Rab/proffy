import express, {urlencoded} from 'express';
import routes from './routes';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
app.use(cors())
app.use(express.json());
app.use(morgan('dev'))
app.use(urlencoded({extended: true}))
app.use(routes)

app.listen(3333)