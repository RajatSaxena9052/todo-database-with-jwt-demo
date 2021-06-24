let connection = require("../database");

function viewSubTask(task_id, callBack) {

    if (task_id === undefined) {
        connection.query(
            'SELECT * FROM Subtask',
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
            'SELECT s.subtask_id,s.name,s.is_completed,s.task_id FROM Subtask s JOIN Task t ON t.task_id = s.task_id WHERE s.task_id = ?',
            task_id,
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

function addSubtask(data, callBack) {
    connection.query(
        'INSERT INTO Subtask(name,is_completed,task_id) VALUES(?,?,?)',
        [data.name, data.is_completed, data.task_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            } else {
                callBack(null, results);
            }
        }
    );

}


function removeSubtask({ user_id, task_id, subtask_id }, callBack) {

    connection.query(
        'DELETE s FROM Subtask s JOIN Task t ON t.task_id = s.task_id join User u ON u.user_id = t.user_id WHERE t.user_id = ? AND s.task_id = ? AND s.subtask_id',
        [user_id, task_id, subtask_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            } else {
                callBack(null, results);
            }
        }
    );

}

function editSubtask(data, callBack) {

    connection.query(
        'update Subtask s JOIN Task t ON t.task_id = s.task_id JOIN User u ON t.user_id = u.user_id SET s.name = ?, s.is_completed = ? WHERE u.user_id = ? AND t.task_id = ? AND s.subtask_id = ?',
        [data.name, data.is_completed, data.user_id, data.task_id, data.subtask_id],
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



module.exports = { viewSubTask, addSubtask, removeSubtask, editSubtask };