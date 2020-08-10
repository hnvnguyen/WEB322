const mongoose = require("mongoose"); // database
const bcrypt = require("bcryptjs"); // password encryption

let Schema = mongoose.Schema;

let userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true},
    password: String,
    user: {type: Boolean, default: true}
});

let Users;

module.exports.db_init = function() {
    return new Promise((resolve, reject) => {
        let db = mongoose.createConnection("mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@senecaweb.87ae9.mongodb.net/FastServe?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
        db.on('error', (err) => {
            reject(err);
        });
        db.once('open', () => {
            Users = db.model("users", userSchema);
            resolve();
        });
    });
};

module.exports.addUser = function(data) {
    return new Promise((resolve, reject) => {
        // Check empty for string and turn to null
        for (field in data) {
            data[field] = (field == "" ? null : data[field]);
        }

        let thisUser = new Users({
            firstName: data.regisFName,
            lastName: data.regisLName,
            email: data.regisEmail,
            password: data.regisPassword
        });

        bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(thisUser.password, salt))
        .then(hash => {
            thisUser.password = hash;
            thisUser.save((perr) => {
                if (perr) {
                    console.log("Error while saving to the database.");
                    reject({rMail: "Email existed. Please login or choose another email."});
                }
                else {
                    console.log("User saved.");
                    resolve(thisUser);
                }
            });
        }).catch((err) => {
            console.log(err);
            reject({rMail: "Hashing error."});
        });        
    });
};

module.exports.checkUser = function(user) {
    return new Promise((resolve, reject) => {
        Users.findOne({email: user.loginEmail})
        .exec()
        .then((returnUser) => {
            bcrypt.compare(user.loginPassword, returnUser.password)
            .then((result) => {
                if (returnUser && result) {  
                    resolve(returnUser.toObject());
                    return;
                } else {
                    reject({lPass: "You entered wrong email or password."});
                    return;
                }
            });
        }).catch((perr) => {
            console.log("Error retrieving user.");
            reject(perr);
            return;
        })
    })
}