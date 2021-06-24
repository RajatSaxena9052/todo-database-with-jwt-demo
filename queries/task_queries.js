let connection = require("../database");

function addTask(data, user_id, callBack) {

    connection.query(
        'INSERT INTO Task(name,description,is_completed,user_id) VALUES(?,?,?,?)',
        [data.name, data.description, data.is_completed, user_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            } else {
                callBack(null, results);
            }
        }
    );

}

function removeTask(user_id, callBack) {

    connection.query(
        'DELETE t FROM Task t JOIN User u ON u.user_id = t.user_id WHERE t.user_id = ?',
        user_id,
        (error, results, fields) => {
            if (error) {
                callBack(error);
            } else {
                callBack(null, results);
            }
        }
    );

}

function viewTask(user_id, callBack) {

    if (user_id === undefined) {
        connection.query(
            'SELECT t.user_id,t.name,t.description FROM Task t JOIN User u ON t.user_id = u.user_id',
            user_id,
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                } else {
                    callBack(null, results);
                }
            }
        );
    } else {
        connection.query(
            'SELECT t.user_id,t.name,t.description FROM Task t JOIN User u ON t.user_id = u.user_id WHERE t.user_id = ?',
            user_id,
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                } else {
                    callBack(null, results);
                }
            }
        );
    }

}


function editTask(data, id, callBack) {

    connection.query(
        'UPDATE Task t JOIN User u ON t.user_id = u.user_id SET t.description = ? WHERE t.user_id = ? AND task_id = ?',
        [data.description, id, data.task_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            else {
                callBack(null, results);
            }
        }
    );

}

function isComplete(data, { user_id, task_id }, callBack) {

    connection.query('UPDATE Task SET is_completed = ? where task_id = ? AND user_id = ?',
        [data.is_completed, task_id, user_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            else {
                callBack(null, results);
            }
        })
}



module.exports = { addTask, removeTask, viewTask, editTask, isComplete };