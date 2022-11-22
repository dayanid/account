function AccountsRoutes(app){
    // import controller
    const Accounts=require("./accounts.controller")

    // create a new User for accounts
    app.post("/accountUser-save", Accounts.create);

    // list User 
     app.get("/accountUser-list", Accounts.getAll);

    // get single User
     app.get("/accountUser/:accountUserid", Accounts.findById);

    //update User
     app.put("/accountUser/:accountUserid", Accounts.update);

    // delete User
     app.delete("/adminUser/:accountUserid", Accounts.delete);
}


module.exports =AccountsRoutes;