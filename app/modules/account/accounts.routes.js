function AccountsRoutes(app){

    const Accounts=require("./accounts.controller")    // import controller..

  
    app.post("/accountUser-save", Accounts.create);  // create a new User for accounts..


     app.get("/accountUser-list", Accounts.getAll);    // list User..


     app.get("/accountUser/:accountUserid", Accounts.findById);    // get single User..


     app.put("/accountUser/:accountUserid", Accounts.update);    //update User..


     app.delete("/accountUser/:accountUserid", Accounts.delete);    // delete User..
}


module.exports =AccountsRoutes;