const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes)

const PORT = process.env.PORT || 3001;

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}`)
    });
})