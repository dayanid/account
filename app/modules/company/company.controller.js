const Company = require("./Company.model");
const Joi = require("joi");

//joi validation..
const Schema = Joi.object({

  account_id: Joi.string().required(),

  company_name: Joi.string().required(),

  branch: Joi.string().required(),

  websit_link: Joi.string(),

 spoc_name: Joi.string().required(),

  email_id: Joi.string().email().required(),

  spoc_email: Joi.string().email().required(),

  cc_email_ids: Joi.string().email().required(),

  mobile: Joi.string().max(10).pattern(/^[0-9]+$/).required(),

  spoc_mobile: Joi.string().max(10).pattern(/^[0-9]+$/).required()
 
}).options({ abortEarly: false });



// create_new_company_user plan..
exports.create = function (req, res) {

  //console.log(req.body);
  const { error, value } = Schema.validate(req.body);

  if (error === undefined) {

    Company.create(req.body, (error, value) => {

      if (error) {

        res.status(500).send({
          status: false,
          alert: "Failed..!",
          message:
            error || "Some error occurred while creating the  Company.",
        });

      } 
      
      else
        res.send({
          status: true,
          alert: "",
          message: "User create success",
        });

    });

  } 
  
  else {

    res.status(500).send({
      status: false,
      alert: "Failed..!",
      message:
        error.message || "Some error occurred while creating the  Company.",
    });

  }

};



// getAll list..
exports.getAll = async function (req, res) {

  try {

    const Q = req.query.q;  //get Filter key..

		const page = parseInt(req.query.page); //get page 

		const limit = parseInt(req.query.limit); // get limits

    const userDetails = await Company.getAll(Q, page,limit);

    res.send({status: true,
       alert: "", 
       message: "User list success.... ",
      data: userDetails
    }
    
  );
  } 
  
  catch (error) {

    res.status(500).send({
      status: false ,
      alert: "Failed..!" ,
      message: error || "Some error occurred while creating the  AdminUsers." 
    });

  }

};



// get single plan detail..
exports.findById = function (req, res) {

  Company.findById(req.params.companyUserid, (error, value) => {

    if (error) {

      res.status(500).send({status: false, alert: "Failed..!",message: error || "Some error occurred in  Company."

      });
    }
    
    else
      res.send({status: true,alert: "",message: "User details success",data: value,});

  });

};


// update a plan..
exports.update = function (req, res) {

  Company.updateById(req.params.companyUserid, { ...req.body },

    (error, value) => {

      if (error) {

        res.status(500).send({
          status: false,
          alert: "Failed..!",
          message:
            error || "Some error occurred while creating the  Company.",
        });

      }
      
      else
        res.send({
          status: true,
          alert: "",
          message: "User update success",
        });
    }

  );

};


//  delete a plan..
exports.delete = function (req, res) {

  Company.remove(req.params.companyUserid, (error, value) => {

    if (error) {

      res.status(500).send({
        status: false,
        alert: "Failed..!",
        message: error || "Some error occurred while deleting Company."
      });

    } 
    
    else
      res.send({
        status: true,
        alert: "",
        message: "User delete success",
      });

  });

};
