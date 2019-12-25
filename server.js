const express = require("express");
const knex = require("knex");
const cors = require("cors");
const bodyParser = require("body-parser");
const sourceCoverage = require("./controllers/source-coverage");

/*     host: "127.0.0.1",
    port: "3002",
    user: "postgres",
    password: "omri1990",
    database: "coverage" */

const app = express();
app.use(bodyParser.json());
app.use(cors());
const db = knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
  ssl: true
});

app.get("/", (req, res) => sourceCoverage.getAllCoverageRecords(req, res, db));

app.post("/addRecord", (req, res) =>
  sourceCoverage.addCoverageRecord(req, res, db)
);
app.post("/deleteRecord", (req, res) =>
  sourceCoverage.deleteCoverageRecord(req, res, db)
);

app.get("/checkEmailDomain", (req, res) => {
  sourceCoverage.checkExistingDomainEmail(req, res, db);
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("server listen..."));
