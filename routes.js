module.exports = app => {

    require("./app/modules/accounts/accounts.routes")(app); 

    require("./app/modules/company/company.routes")(app);
};
