const Accounts = require("./accounts.model");
const Joi = require("joi");

//joi validation..
const Schema = Joi.object({
  username: Joi.string().required(),
  organization_name: Joi.string().required(),
  address: Joi.string().required(),
  name: Joi.string().required(),
  user_type: Joi.number().integer().required(),
  email_id: Joi.string().email().required(),
  cc_email_ids: Joi.string().email().required(),
  mobile: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
  pwd: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(4),
}).options({ abortEarly: false });

// create_new_account_user plan..
exports.create = function (req, res) {
  const { error, value } = Schema.validate(req.body);

  if (error === undefined) {
    Accounts.create(req.body, (error, value) => {
      if (error) {
        res.status(500).send({
          status: false,
          alert: "Failed..!",
          message:
            error || "Some error occurred while creating the  Accounts.",
        });
      } else
        res.send({
          status: true,
          alert: "",
          message: "User create success",
        });
    });
  } else {
    res.status(500).send({
      status: false,
      alert: "Failed..!",
      message:
        error.message || "Some error occurred while creating the  Accounts.",
    });
  }
};

// getAll list
exports.getAll = async function (req, res) {
  try {
    let where = [];
    // Start Limit & Page
    const Q = req.query.q;
		const page = parseInt(req.query.page);
		const limit = parseInt(req.query.limit);
    const userDetails = await Accounts.getAll(Q, page,limit);
    res.send({
      status: true,
      alert: "",
      message: "User list success.... ",
      data: userDetails,
      allCount:userDetails.length,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      alert: "Failed..!",
      message: error || "Some error occurred while creating the  AdminUsers.",
    });
  }
};

// get single plan detail
exports.findById = function (req, res) {
  Accounts.findById(req.params.accountUserid, (error, value) => {
    if (error) {
      res.status(500).send({status: false, alert: "Failed..!",message: error || "Some error occurred in  Accounts.",
      });
    } else
      res.send({status: true,alert: "",message: "User details success",data: value,});
  });
};
// update a plan
exports.update = function (req, res) {
  Accounts.updateById(req.params.accountUserid,
    { ...req.body },
    (error, value) => {
      if (error) {
        res.status(500).send({
          status: false,
          alert: "Failed..!",
          message:
            error || "Some error occurred while creating the  Accounts.",
        });
      } else
        res.send({
          status: true,
          alert: "",
          message: "User update success",
        });
    }
  );
};
//  delete a plan
exports.delete = function (req, res) {
  Accounts.remove(req.params.accountUserid, (error, value) => {
    if (error) {
      res.status(500).send({
        status: false,
        alert: "Failed..!",
        message: error || "Some error occurred while deleting Accounts.",
      });
    } else
      res.send({
        status: true,
        alert: "",
        message: "User delete success",
      });
  });
};
