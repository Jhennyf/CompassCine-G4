// Importações Necessárias
import 'reflect-metadata';
import express from 'express';
import 'dotenv/config';
<<<<<<< HEAD
import '../src/database/index'
=======
import movieRouter from './routes/routes';

// Models

// Controllers

// Services

// Routes


// Express
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(movieRouter)

app.listen(process.env.PORT_SERVER, () => {
    console.log(`App listening port ${process.env.PORT_SERVER}`)
});
// Importações Necessárias
import express from 'express';
import 'dotenv/config';
>>>>>>> c032d73058025d46b51e57b3302f6377cf70d42a

// Models

// Controllers

// Services

// Routes


// Express
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    return res.send("A")
})
app.use(movieRouter)

app.listen(process.env.PORT_SERVER, () => {
    console.log(`App listening port ${process.env.PORT_SERVER}`)
});