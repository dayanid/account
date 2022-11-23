const sql = require("../../config/db.config");

const Company = function (orgType) {};

//user_account_create function..
Company.create = (newCompany, result) => {

  sql.query("SELECT * FROM companies WHERE email_id ='"+newCompany.email_id+"' AND status !='E';", (err, res) => {

    if (err) { result(err, null);

      return;
    }

    else if(res.length == 0){
      sql.query("INSERT INTO companies SET ?", newCompany, (err, res) => {

        if (err) {  result(err, null);
          return;
        }

        result(null, { ...newCompany });
      });
    }

    else{
      result(err || "Email id already used..",null);
    }

  });

};


//get_all_user_data function..
Company.getAll = (Q, page,limit) => {

  return new Promise((resolve, reject) => {

    const startIndex = (page - 1) * limit;

		const endIndex = page * limit;

		var key_value = Q+"%";

		console.log(key_value);

    if (Q != undefined){
		var Query = "select * from companies where ((account_id LIKE '"+key_value+"+') or(company_name LIKE '"+key_value+"') or (email_id LIKE '"+key_value+"')or (branch LIKE '"+key_value+"') or (spoc_name LIKE '"+key_value+"') or ( mobile LIKE '"+key_value+"') ) and status !='E' "
    }

    else{
      var Query = "select * from companies where status !=  'E';"
    }

    sql.query(Query,(err,model,field)=>{
     
		if (err) throw err;

		const results = {};

		if (endIndex < model.length) {
		results.next = { page: page + 1, limit: limit};
		}

		if (startIndex > 0) {
		results.previous = { page: page - 1, limit: limit};
		}	

		results.results = model.slice(startIndex, endIndex);

    if (page == NaN && page == NaN)
    {
    var data = JSON.parse(JSON.stringify(results));
    }

    else{
    var data = JSON.parse(JSON.stringify(model));
    }

    resolve(data);		
		})

  });

};




//Update function..
Company.updateById = (id, Company, result) => {

  //console.log(Company);



  sql.query("SELECT * FROM companies WHERE email_id ='"+Company.email_id+"' AND status !='E'  AND id !="+id+";", (err, res) => {

    if (err) {
      result(err, null);
      return;
    }

    else if(res.length == 0){

  sql.query(
    "UPDATE `companies` SET `account_id` = ?, `company_name` = ?, `mobile` = ?, `email_id` = ?, `branch` = ?, `website_link` = ?, `spoc_name` = ?, `spoc_mobile` = ?,`spoc_email` = ? , `cc_email_ids` = ?, `gst_no` = ? , `status` = ? WHERE id = ? and status !='E';",
   
    [Company.account_id, Company.company_name, Company.mobile, Company.email_id, Company.branch, Company.website_link, Company.spoc_name, Company.spoc_mobile, Company.spoc_email, Company.cc_email_ids, Company.gst_no, Company.status, id],
   
    (err, res) => {
      
      if (err) {
        console.log("error: ", err);

        result(null, err);

        return;
      }

      if (res.affectedRows == 0) {
       
        result({ kind: "not_found" }, null);  // not found Company with the id

        return;
      }

      console.log("updated orgCompany: ", { id: id, ...Company });

      result(null, { id: id, ...Company });
    }

  );

    }
    
  });
};



//find function..
Company.findById = (id, result) => {

  sql.query(`SELECT * FROM  companies WHERE id =${id} and status != 'E'`, (err, res) => {

    if (err) {

      console.log("error: ", err);

      result(err, null);

      return;
    }

    if (res.length) {

      console.log("found customer: ", res[0]);

      result(null, res[0]);

      return;
    }

  
    result({ kind: "not_found" }, null);   // not found..
  });
};



//deleting function..
Company.remove = (id, result) => {

  sql.query("UPDATE  companies SET status = 'E' WHERE id = ?", id, (err, res) => {

    if (err) {

      console.log("error: ", err);

      result(null, err);

      return;
    }

    if (res.affectedRows == 0) {

      
      result({ kind: "not_found" }, null); // not found Customer with the id..

      return;

    }

    console.log("deleted  Company with id: ", id);

    result(null, res);

  });

};

module.exports = Company;
