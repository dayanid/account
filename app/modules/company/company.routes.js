function CompanyRoutes(app){
    
    const Company=require("./company.controller")   // import controller..

    
    app.post("/companyUser-save", Company.create);   // create a new User for Company..

 
     app.get("/companyUser-list", Company.getAll);   // list User..

     
     app.get("/companyUser/:companyUserid", Company.findById);    // get single User..


     app.put("/companyUser/:companyUserid", Company.update);   //update User..


     app.delete("/companyUser/:companyUserid", Company.delete);      // delete User..
}


module.exports =CompanyRoutes;