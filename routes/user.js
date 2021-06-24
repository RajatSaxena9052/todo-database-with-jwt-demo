const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const checkToken = require("../authentication");

const { signup, login, getUser, editUser } = require("../queries/user_queries")

router.post("/signup", (req, res) => {

    signup(req.body, (error, data) => {
        if (error) {
            console.log(error);
            res.status(500).json({
                message: "Database connection errror"
            });
        } else {
            res.status(200).json({
                data: data,
                message: "Database connected and user created"
            });
        }
    });

});

router.post("/login", (req, res) => {

    login(req.body, (error, data) => {
        if (error) {
            console.log(error);
            res.status(500).json({
                "message": "Database connection Error"
            });
        }
        if (data !== undefined) {

            jwt.sign({ data: data }, "secretkey", (err, token) => {

                if (error) {
                    console.log(error);
                } else {
                    res.status(200).json({
                        "message": "User logged in and jwt created",
                        token: token,
                        data: data
                    });
                }

            });

        }
        else {
            res.status(500).json({
                message: "User Doesn't exist"
            });
        }
    });

});

router.get("/", checkToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, decoded) => {
        if (err) {
            res.sendStatus(403);
        }
        else {
            getUser(undefined, (error, data) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({
                        message: "Database connection errror"
                    });
                } else {
                    res.status(200).json({
                        message: "All Users",
                        data: data
                    });
                }
            });
        }
    });
});

router.get("/:id", checkToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, decoded) => {
        if (err) {
            res.sendStatus(403);
        }
        else {
            const user_id = req.params.id;

            getUser(user_id, (error, data) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({
                        message: "Database connection errror"
                    });
                } else {

                    if (data.length === 0) {
                        res.status(400).json({
                            message: "User doesn't Exist",
                        })
                    } else {
                        res.status(200).json({
                            message: "All Users",
                            data: data
                        });
                    }
                }
            });
        }
    });
});

router.put("/:id", checkToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, decoded) => {
        if (err) {
            res.sendStatus(403);
        }
        else {
            const user_id = Number(req.params.id);

            if (decoded.data[0].user_id !== user_id) {
                res.status(403).json({
                    "message": "Cannot Update another User"
                });
            } else {
                editUser({ ...req.body, user_id }, (error, data) => {
                    if (error) {
                        console.log(error);
                        res.status(500).json({
                            message: "Database connection errror"
                        });
                    } else {
                        res.status(200).json({
                            message: "Users Updated",
                            data: data
                        });
                    }

                });
            }
        }
    });
});













module.exports = router;