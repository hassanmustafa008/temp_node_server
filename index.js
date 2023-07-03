const express = require("express");
var request = require("request");
// const bodyParser = require("body-parser");
// const session = require("express-session");
// const cors = require("cors");
// const models = require("./models");
// var config = require("./config/config");
// const passport = require("passport");
// const helmet = require("helmet");
// const { archiveLogs } = require("./services/logs");
/* Make all variables from our .env file available in our process */
// require("dotenv").config();
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./api-docs/swagger.json");
// const swaggerOptions = require("./api-docs/options");
// const interceptor = require("./utils/interceptor").requestInterceptor;

/* Init express */
const app = express();

// app.use(cors());

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json({ limit: "50mb" }));
// require("./config/passport");
// app.use(
//     session({
//         secret: "anything",
//         resave: false,
//         saveUninitialized: false,
//         cookie: { secure: false },
//     })
// );
// app.use(passport.initialize());
// app.use(passport.session());
// passport.serializeUser((user, done) => {
//     console.log("user");
//     done(null, user);
// });

// passport.deserializeUser((user, done) => {
//     done(null, user);
// });

// app.use(
//     helmet({
//         frameguard: false,
//     })
// );

// app.use(function (req, res, next) {
//     res.setHeader("Content-Security-Policy", "script-src 'self'");
//     return next();
// });
// save logs data to file every sunday and delete it from table
// archiveLogs();

// app.use(
//     "/docs",
//     swaggerUi.serve,
//     swaggerUi.setup(swaggerDocument, swaggerOptions)
// );

/**Using request/response interceptor */

// app.use(interceptor);

/* Here we define the api routes */
// app.use(require("./routes"));

// app.all("/*", function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });
const port = 8080;
const address = process.env.SERVER_ADDRESS || "127.0.0.1";
// require("./config/routes")(app, passport);

// const httpsOptions = {
//   key: fs.readFileSync("./security/cert.key"),
//   cert: fs.readFileSync("./security/cert.pem"),
// };
//require("./routes/api/auth")(app, passport);

/* Create everything automatically with sequelize ORM */
// models.sequelize.sync().then(function () {
app.listen(port, () => {
    console.log(`Server running on http://${address}:${port}`)
    let params = {
        output_format: "json",
        client_no: "90000063",
        auth_key: "VyVgykWuhx5VSaSG3Sr3S4FMcwu567gh",
        "type": "",
        "rest_call": "get_all_reason_codes_m"
    };
    var clientServerOptions = {
        uri: "https://admintools.prod.cph.ariasystems.net/AdminTools.php/Dispatcher",
        json: true,
        body: params,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    };
    // console.log(additionalParams.rest_call + " request", clientServerOptions)
    request(clientServerOptions, function (error, response) {
        // console.log(additionalParams.rest_call + " response", response.body);
        console.log(JSON.stringify(response));
    });
}
);
//   https.createServer(httpsOptions, app).listen(port, () => {
//     console.log("server running at " + port);
//   });
// });

module.exports = app;