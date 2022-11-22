
const sql = require("../../config/db.config");//  import sql..

const Accounts = function (orgType) {};

//user_account_create function..
Accounts.create = (newAccounts, result) => {

  sql.query("SELECT * FROM accounts WHERE email_id ='"+newAccounts.email_id+"' AND status !='E';", (err, res) => {

    if (err) {
      result(err, null);
      return;
    }

    else if(res.length == 0){

      sql.query("INSERT INTO accounts SET ?", newAccounts, (err, res) => {

        if (err) {
          result(err, null);
          return;
        }

        result(null, { ...newAccounts });

      });
    }

    else{
      result(err || "Email id already used..",null);
    }

  });

};


//get_all_user_data function..
Accounts.getAll = (Q, page,limit) => {

  return new Promise((resolve, reject) => {

    const startIndex = (page - 1) * limit;

		const endIndex = page * limit;

		var key_value = Q+"%";

		console.log(key_value);

    if (Q != undefined){

		var Query = "select * from accounts where ((id LIKE '"+key_value+"+') or(name LIKE '"+key_value+"') or (email_id LIKE '"+key_value+"')or (username LIKE '"+key_value+"') or (address LIKE '"+key_value+"') or ( mobile LIKE '"+key_value+"')) and status != 'E' ;"
   
  }

    else{

      var Query = "select * from accounts where status != 'E' ;"
    }

    sql.query(Query,(err,model,field)=>{
     
		if (err) throw err;

		const results = {};

		if (endIndex < model.length) {
		results.next = {
			page: page + 1,
			limit: limit};
		}

		if (startIndex > 0) {
		results.previous = {
			page: page - 1,
			limit: limit};
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
Accounts.updateById = (id, accounts, result) => {

  console.log(accounts);

  sql.query("SELECT * FROM accounts WHERE email_id ='"+accounts.email_id+"' AND status !='E';", (err, res) => {

    if (err) {
      result(err, null);
      return;
    }

    else if(res.length == 0){

  sql.query(
    "UPDATE `accounts` SET `name` = ?, `organization_name` = ?, `mobile` = ?, `email_id` = ?, `username` = ?, `pwd` = ?, `user_type` = ?, `address` = ?, `cc_email_ids` = ?, `gst_no` = ? , `status` = ? WHERE id = ?;",
    
    [accounts.name,accounts.organization_name,accounts.mobile,accounts.email_id, accounts.username,accounts.pwd,accounts.user_type,accounts.address,accounts.cc_email_ids,accounts.gst_no,accounts.status, id],
    
    (err, res) => {

      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
       
        result({ kind: "not_found" }, null); // not found Accounts with the id..
        return;
      }

      console.log("updated orgAccounts: ", { id: id, ...Accounts });

      result(null, { id: id, ...Accounts });

    }

  );

  }

  else{
    result(err || "Email id already used..",null);
  }

});

};



//find function..
Accounts.findById = (id, result) => {

  sql.query(`SELECT * FROM  accounts WHERE id =${id} and status != 'E'`, (err, res) => {

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


    result({ kind: "not_found" }, null); // not found Accounts with the id..
  });

};

//deleting function..
Accounts.remove = (id, result) => {

  sql.query("UPDATE  accounts SET status = 'E' WHERE id = ?", id, (err, res) => {

    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted  accounts with id: ", id);

    result(null, res);
  });

};

module.exports = Accounts;