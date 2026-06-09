const express = require("express");
const mongoose = require("mongoose");

const User = require("./models/User");
const Bug = require("./models/Bug");

const app = express();

app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/bugtracker")
.then(() => {
    console.log("MongoDB Connected");
})
.catch(err => {
    console.log(err);
});

// =======================
// LOGIN
// =======================

app.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body;

        const user = await User.findOne({
            username,
            password
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid Credentials"
            });
        }

        res.json({
            message: "Login Successful",
            role: user.role,
            username: user.username
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// =======================
// GET ALL BUGS
// =======================

app.get("/bugs", async (req, res) => {

    try {

        const bugs = await Bug.find();

        res.json(bugs);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// =======================
// CREATE BUG
// =======================

app.post("/bugs", async (req, res) => {

    try {

        const bug = new Bug({
            title: req.body.title,
            description: req.body.description,
            module: req.body.module,
            severity: req.body.severity,
            status: "Open",
            assignedTo: "",
            reportedBy: req.body.reportedBy
        });

        await bug.save();

        res.json({
            message: "Bug Created",
            bug
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// =======================
// UPDATE BUG
// =======================

app.put("/bugs/:id", async (req, res) => {

    try {

        const bug = await Bug.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(bug);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// =======================
// DELETE BUG
// =======================

app.delete("/bugs/:id", async (req, res) => {

    try {

        await Bug.findByIdAndDelete(req.params.id);

        res.json({
            message: "Bug Deleted"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// =======================
// UPDATE STATUS
// =======================

app.put("/bugs/:id/status", async (req, res) => {

    try {

        const bug = await Bug.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status
            },
            {
                new: true
            }
        );

        res.json(bug);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// =======================
// ASSIGN DEVELOPER
// =======================

app.put("/bugs/:id/assign", async (req, res) => {

    try {

        const bug = await Bug.findByIdAndUpdate(
            req.params.id,
            {
                assignedTo: req.body.assignedTo
            },
            {
                new: true
            }
        );

        res.json(bug);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});
app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});
app.get("/mybugs/:username", async (req, res) => {

    try {

        const bugs = await Bug.find({
            reportedBy: req.params.username
        });

        res.json(bugs);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});
app.get("/assignedbugs/:developer", async (req, res) => {

    const bugs = await Bug.find({
        assignedTo: req.params.developer
    });

    res.json(bugs);

});
app.listen(3000, () => {

    console.log("Server running on port 3000");

});