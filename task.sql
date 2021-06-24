CREATE DATABASE todo;

USE todo;

CREATE TABLE User(
    user_id int AUTO_INCREMENT,
    user_name VARCHAR(25) NOT NULL,
    password VARCHAR(25) NOT NULL,
    PRIMARY KEY(user_id)
);

CREATE TABLE Task(
  task_id int AUTO_INCREMENT,
  name VARCHAR(25),
  description VARCHAR(100),
  is_completed BOOLEAN,
  user_id int NOT NULL,
  PRIMARY KEY(task_id),
  FOREIGN KEY(user_id) REFERENCES User(user_id)
  ON DELETE CASCADE
);

CREATE TABLE Subtask(
    subtask_id int AUTO_INCREMENT,
    name VARCHAR(25),
    is_completed BOOLEAN,
    task_id int,
    PRIMARY KEY(subtask_id),
    FOREIGN KEY(task_id) REFERENCES Task(task_id)
    ON DELETE CASCADE
);
