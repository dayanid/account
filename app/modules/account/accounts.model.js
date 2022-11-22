//  import sql
const sql = require("../../config/db.config");

const Accounts = function (orgType) {};

//user_account_create function..
Accounts.create = (newAccounts, result) => {
  sql.query("INSERT INTO accounts SET ?", newAccounts, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { ...newAccounts });
  });
};

//get_all_user_data function..
Accounts.getAll = (Q, page,limit) => {
  return new Promise((resolve, reject) => {
    const startIndex = (page - 1) * limit;
		const endIndex = page * limit;
		var key_value = Q+"%";
		console.log(key_value);
		var Query = "select * from accounts where (id LIKE '"+key_value+"+') or(name LIKE '"+key_value+"') or (email_id LIKE '"+key_value+"')or (username LIKE '"+key_value+"') or (address LIKE '"+key_value+"') or ( mobile LIKE '"+key_value+"') "
		connection.query(Query,(err,model,field)=>{
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
    resolve(results);
		next();			
		})
    
  });
};




//Update function..
Accounts.updateById = (id, Accounts, result) => {
  sql.query(
    "UPDATE  accounts SET username = ? WHERE id = ?",
    [Accounts.username, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Accounts with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated orgAccounts: ", { id: id, ...Accounts });
      result(null, { id: id, ...Accounts });
    }
  );
};



//find function..
Accounts.findById = (id, result) => {
  sql.query(`SELECT * FROM  accounts WHERE id =${id}`, (err, res) => {
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

    // not found
    result({ kind: "not_found" }, null);
  });
};

//deleting function..
Accounts.remove = (id, result) => {
  sql.query("DELETE FROM  accounts WHERE id = ?", id, (err, res) => {
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
