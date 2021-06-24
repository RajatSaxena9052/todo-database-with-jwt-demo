let connection = require("../database");

function signup(data, callBack) {

    connection.query(
        'INSERT INTO User(user_name,password) VALUES(?,?)',
        [data.user_name, data.password],
        (error, results, fields) => {
            if (error) {
                callback(error);
            }
            else {
                callBack(null, results[0]);
            }
        });
}


function login(data, callBack) {

    connection.query(
        `SELECT * FROM User WHERE user_name = ? AND password = ?`,
        [data.user_name, data.password],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            } else {
                callBack(null, results);
            }
        }
    );

}

function getUser(id, callBack) {
    if (id === undefined) {
        connection.query(
            'SELECT * FROM User',
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
            `SELECT * FROM User WHERE user_id = ?`,
            id,
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                } else {
                    callBack(null, results);
                }
            }
        );
    }
};

function editUser(data, callBack) {
    connection.query(
        `UPDATE User SET user_name = ? WHERE user_id = ?`,
        [data.user_name, data.user_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            } else {
                callBack(null, results);
            }
        }
    );
};





module.exports = { signup, login, getUser, editUser };
