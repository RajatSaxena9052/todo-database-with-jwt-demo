const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const checkToken = require("../authentication");

const { viewSubTask, addSubtask, removeSubtask, editSubtask } = require("../queries/subtask_queries");

router.get("/", checkToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, decoded) => {
        if (err) {
            res.sendStatus(403);
        }
        else {

            viewSubTask(undefined, (error, data) => {
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

router.get("/:id", checkToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, decoded) => {
        if (err) {
            res.sendStatus(403);
        }
        else {
            const task_id = req.params.id;

            viewSubTask(task_id, (error, data) => {
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

router.delete("/", checkToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, decoded) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const task_id = Number(req.query.task_id);
            const user_id = Number(req.query.user_id);
            const subtask_id = Number(req.query.subtask_id);

            console.log(decoded.data[0].user_id ,user_id)

            if (decoded.data[0].user_id !== user_id) {
                res.status(403).json({
                    "message": "Cannot Remove Subtask of another User"
                });
            }
            else {
                const data = { user_id, task_id, subtask_id };

                removeSubtask(data, (error, data) => {
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

router.post("/:id", checkToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', function (err, decoded) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            const task_id = Number(req.params.id);

            addSubtask({ ...req.body, task_id, }, (error, data) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({
                        message: "Database connection errror"
                    });
                }
                else {
                    res.status(201).json({
                        message: "SubTask Added",
                        status: data
                    });
                }
            });

        }

    });

});


router.patch("/", checkToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, decoded) => {
        if (err) {
            res.sendStatus(403);
        }
        else {
            const task_id = Number(req.query.task_id);
            const user_id = Number(req.query.user_id);
            const subtask_id = Number(req.query.subtask_id);

            if (decoded.data[0].user_id !== user_id) {
                res.status(403).json({
                    "message": "Cannot Edit Subtask of another User"
                });
            } else {

                editSubtask({ ...req.body, task_id, user_id, subtask_id }, (error, data) => {

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
                            message: "SubTask Updated",
                            status: data
                        });
                    }

                });
            }

        }
    });
});


module.exports = router;