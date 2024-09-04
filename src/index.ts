// Importações Necessárias
import express from 'express';
import 'dotenv/config';
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
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    return res.send("A")
})
app.use(movieRouter)

app.listen(process.env.PORT_SERVER, () => {
    console.log(`App listening port ${process.env.PORT_SERVER}`)
});

// Importações Necessárias

import express from 'express';
import 'dotenv/config';

// Models

// Controllers

// Services

// Routes


// Express
