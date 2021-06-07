// File die als eerste wordt geroepen zodat we gelijk connecten met de server.

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;
const port = process.env.PORT;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection succesful");
    app.listen(port, () => {
      console.log(`App running on ${port}`);
    });
  })
  .catch((e) => {
    // Hier doorverwijzing geven naar een pagina die zegt dat onze database down is.
    console.log(e.message);
  });
