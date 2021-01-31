const express = require('express');
const sequelize = require('sequelize');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}`)
    });
})