const getAllCoverageRecords = (req, res, db) => {
  db.select("*")
    .from("source_coverage_request")
    .then(rows => res.status(200).send(rows))
    .catch(err => res.status(400).send(err));
};

const addCoverageRecord = (req, res, db) => {
  const { email, domain, sourceType, sourceCountry, reason } = req.body;

  db("source_coverage_request")
    .insert({
      email,
      domain,
      source_type: sourceType,
      source_country: sourceCountry,
      reason
    })
    .then(() => res.status(201).send("Created Successfully"))
    .catch(err => res.status(400).send(err));
};

const deleteCoverageRecord = (req, res, db) => {
  const { email, domain } = req.body;
  db("source_coverage_request")
    .where({
      email,
      domain
    })
    .del()
    .then(() => getAllCoverageRecords(req, res, db))
    .catch(err => res.status(400).send(err));
};

const checkExistingDomainEmail = (req, res, db) => {
  const { email, domain } = req.query;
  db("source_coverage_request")
    .where({
      email,
      domain
    })
    .then(rows => {
      if (rows.length > 0) {
        return res.status(200).json("found");
      } else {
        return res.status(200).json("not found");
      }
    })
    .catch(err => res.status(400).send(err));
};

module.exports = {
  getAllCoverageRecords,
  addCoverageRecord,
  deleteCoverageRecord,
  checkExistingDomainEmail
};
