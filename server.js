const path = require('path');
const sequelize = require('./config/connection');
const expressHbs = require('express-handlebars');
const express = require('express');
const routes = require('./controllers');
const session = require('express-session');
const storeSeq = require('connect-session-sequelize')(session.Store);

const PORT = process.env.PORT || 3001;
const app = express();

const newSession = {
    secret: "Secert",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new storeSeq({ db: sequelize})
};


app.engine(".hbs", expressHbs({ extname: ".hbs" }));

app.set("view engine", ".hbs");

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session(newSession));

app.use(routes);

sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))
});
