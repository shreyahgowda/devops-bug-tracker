const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect("mongodb://localhost:27017/bugtracker")
.then(async () => {

    await User.deleteMany({});

    await User.insertMany([
        {
            username: "admin",
            password: "admin123",
            role: "admin"
        },
        {
            username: "employee",
            password: "employee123",
            role: "employee"
        },
        {
            username: "developer",
            password: "developer123",
            role: "developer"
        }
    ]);

    console.log("Users Added");

    mongoose.connection.close();

})
.catch(err => console.log(err));