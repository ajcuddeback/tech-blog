const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

const sess = {
    secret: 'secret#158768156bdiue5',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(session(sess));
app.use(express.static(path.join(__dirname, 'public')));

const hbs = exphbs.create({})

app.engine('handlebars', hbs.engine);
app.set(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}`)
    });
})