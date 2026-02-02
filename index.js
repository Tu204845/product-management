const express = require('express');
const methodOverride = require("method-override")
const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');

require('dotenv').config();
const database = require('./config/database')

const systemConfig = require('./config/system')

const routeAdmin = require('./routes/admin/index.route');
const route = require('./routes/client/index.route');

database.connect();

const app = express();

// app.use("/admin", express.static("public/admin"));

const port = process.env.PORT;
app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");


app.use(cookieParser("JAJSDKNASCANC"));
app.use(session({
    secret: "JAJSDKNASCANC",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.use(flash());
app.locals.prefixAdmin = systemConfig.prefixAdmin;



app.use(express.static(`${__dirname}/public`));

// Router
routeAdmin(app);
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});