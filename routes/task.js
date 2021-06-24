const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const checkToken = require("../authentication");

const { addTask, removeTask, viewTask, editTask, isComplete } = require("../queries/task_queries");




router.post("/:id", checkToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', function (err, decoded) {
        if (err) {
            res.sendStatus(403);
        }
        else {

            const user_id = Number(req.params.id);

            if (decoded.data[0].user_id !== user_id) {
                res.status(403).json({
                    "message": "Cannot Add task to another User"
                });
            }
            else {

                addTask(req.body, user_id, (error, data) => {
                    if (error) {
                        console.log(error);
                        res.status(500).json({
                            message: "Database connection errror"
                        });
                    }
                    else {
                        res.status(201).json({
                            message: "Task Added",
                            status: data
                        });
                    }
                });

            }

        }

    });

});


router.delete("/:id", checkToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, decoded) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const user_id = Number(req.params.id);

            if (decoded.data[0].user_id !== user_id) {
                res.status(403).json({
                    "message": "Cannot Remove task of another User"
                });
            }
            else {

                removeTask(user_id, (error, data) => {
                    if (error) {
                        console.log(error);
                        res.status(500).json({
                            message: "Database connection errror"
                        });
                    }
                    else {
                        res.status(200).json({
                            message: "Task deleted",
                            status: data
                        });
                    }
                });

            }

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

            viewTask(user_id, (error, data) => {
                if (error) {
                    console.log(error);

                    res.status(500).json(
                        {
                            message: "Database connection errror"
                        }
                    );
                }
                else {
                    res.status(200).json(
                        { data: data }
                    );
                }
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

            viewTask(undefined, (error, data) => {
                if (error) {
                    console.log(error);

                    res.status(500).json(
                        {
                            message: "Database connection errror"
                        }
                    );
                }
                else {
                    res.status(200).json(
                        { data: data }
                    );
                }
            });

        }
    });

});


router.patch("/:id", checkToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, decoded) => {
        if (err) {
            res.sendStatus(403);
        }
        else {
            const user_id = Number(req.params.id);

            if (decoded.data[0].user_id !== user_id) {
                res.status(403).json({
                    "message": "Cannot Edit task of another User"
                });
            } else {

                editTask(req.body, user_id, (error, data) => {

                    if (error) {
                        console.log(error);

                        res.status(500).json(
                            {
                                message: "Database connection errror"
                            }
                        );
                    }
                    else {
                        res.status(200).json({
                            message: "Task Description Updated",
                            status: data
                        });
                    }

                });
            }

        }
    });
});

router.put("/", checkToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, decoded) => {
        if (err) {
            res.sendStatus(403);
        }
        else {
            const user_id = Number(req.query.user_id);

            if (decoded.data[0].user_id !== user_id) {
                res.status(403).json({
                    "message": "Cannot Complete task of another User"
                });
            } else {
                isComplete(req.body, req.query, (error, data) => {
                    if (error) {
                        console.log(error);

                        res.status(500).json(
                            {
                                message: "Database connection errror"
                            }
                        );
                    }
                    else {
                        res.status(200).json({
                            message: "Task Description Updated",
                            status: data
                        });
                    }

                });
            }
        }
    });
})

module.exports = router;
