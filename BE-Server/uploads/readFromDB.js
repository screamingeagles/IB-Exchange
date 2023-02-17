//import oracledb from 'oracledb'; // In packages.json we have {"type": "module"}
import ADODB from 'node-adodb'; // reading access data base

export default {
    getNewConnection: async function () {
        var conn = ADODB.open('Driver={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=./uploads/IBExchange.accdb');
        return conn;
    },

    getTopicsList: async function () {
        var result = [];
        var connection = null;
        try {
            connection = await this.getNewConnection();

            // qry for database
            let sql = "SELECT * FROM [Topics]";

            // Query the DB
            await connection.query(sql)
                .then(data => {

                    data.forEach(element => {
                        let elm = {
                            TID: element.TID,
                            TopicName: element.TopicName,
                            TopicIcons: element.TopicIcons
                        };
                        result.push(elm); //console.log(element);
                    });

                }).catch(error => {
                    console.error(error);
                });
            /*            
            TimeSpan duration = DateTime.Parse("20:33").Subtract(DateTime.Parse("05:24"));
            TimeSpan halfHrs = new TimeSpan(duration.Ticks/2);
            DateTime half = DateTime.Parse("05:24").Add( halfHrs);
            Console.WriteLine( half.ToString(@"hh\:mm"));                      
            */
        } catch (err) {
            console.error(err.message);
        } finally {
            if (connection) {
                try {
                    // Always close connections
                    await connection.State && connection.Close();
                } catch (err) {
                    console.error(err.message);
                }
                return result;
            }
        }
    },

    getTopicsByID: async function (param) {
        var result = [];
        var connection = null;
        try {
            connection = await this.getNewConnection();

            // qry for database
            let sql = "SELECT * FROM [Topics] WHERE TID=" + param;


            // Query the DB
            await connection.query(sql)
                .then(data => {

                    data.forEach(element => {
                        let elm = {
                            TID: element.TID,
                            TopicName: element.TopicName
                        };
                        result.push(elm); //console.log(element);
                    });

                }).catch(error => {
                    console.error(error);
                });
        } catch (err) {
            console.error(err.message);
        } finally {
            if (connection) {
                try {
                    // Always close connections
                    await connection.State && connection.Close();
                } catch (err) {
                    console.error(err.message);
                }
                return result;
            }
        }
    },

    getQuestionsList: async function () {
        var result = [];
        var connection = null;
        try {
            connection = await this.getNewConnection();

            // qry for database
            let sql = "SELECT Questions.QID, Questions.Question, Questions.QuestionDescription, Topics.TID, " +
                "Topics.TopicName, Users.UID, Users.UserName, Answers.AID, Answers.AnswerText " +
                "FROM " +
                "((Questions INNER JOIN Topics ON Questions.TID = Topics.TID) INNER JOIN " +
                "Users ON Questions.UID = Users.UID) INNER JOIN " +
                "Answers ON(Questions.QID = Answers.QID) AND (Users.UID = Answers.UID)";

            // Query the DB
            await connection.query(sql)
                .then(data => {
                    data.forEach(element => {
                        let elm = {
                            QID: element.QID,
                            Question: element.Question,
                            QuestionDescription: element.QuestionDescription,
                            TID: element.TID,
                            TopicName: element.TopicName,
                            UID: element.UID,
                            UserName: element.UserName,
                            AID: element.AID,
                            AnswerText: element.AnswerText
                        };
                        result.push(elm);
                    });

                }).catch(error => {
                    console.error(error);
                });
        } catch (err) {
            console.error(err.message);
        } finally {
            if (connection) {
                try {
                    // Always close connections
                    await connection.State && connection.Close();
                } catch (err) {
                    console.error(err.message);
                }
                return result;
            }
        }
    },

    getQuestionsByID: async function (param) {
        var result = [];
        var connection = null;
        try {
            connection = await this.getNewConnection();

            // qry for database
            let sql = "SELECT Questions.QID, Questions.Question, Questions.QuestionDescription, Topics.TID, " +
                "Topics.TopicName, Users.UID, Users.UserName " +
                "FROM " +
                "((Questions INNER JOIN Topics ON Questions.TID = Topics.TID) INNER JOIN " +
                "Users ON Questions.UID = Users.UID) Where Questions.QID=" + param;


            // Query the DB
            await connection.query(sql)
                .then(data => {

                    // iterate over data and create result
                    data.forEach(element => {
                        let elm = {
                            QID: element.QID,
                            Question: element.Question,
                            QuestionDescription: element.QuestionDescription,
                            TID: element.TID,
                            TopicName: element.TopicName,
                            UID: element.UID,
                            UserName: element.UserName,
                            AID: element.AID,
                            AnswerText: element.AnswerText
                        };
                        result.push(elm);
                    });
                }).catch(error => {
                    console.error(error);
                });
        } catch (err) {
            console.error(err.message);
        } finally {
            if (connection) {
                try {
                    // Always close connections
                    await connection.State && connection.Close();
                } catch (err) {
                    console.error(err.message);
                }
                return result;
            }
        }
    },

    getQuestionsByTopicID: async function (param) {
        var result = [];
        var connection = null;
        try {
            connection = await this.getNewConnection();

            // qry for database
            let sql = "SELECT Topics.TID , Topics.TopicName, Questions.QID, Questions.Question, Questions.QuestionDescription, Questions.QuestionDescription, " +
                "Questions.CorrectAnswer, Users.UID, Users.UserName FROM " +
                "(Topics INNER JOIN Questions ON Topics.TID = Questions.TID) INNER JOIN Users ON Questions.UID = Users.UID " +
                "Where Topics.TID=" + param;

            // Query the DB
            await connection.query(sql)
                .then(data => {

                    // iterate over data and create result
                    data.forEach(element => {
                        let elm = {
                            QID: element.QID,
                            Question: element.Question,
                            QuestionDescription: element.QuestionDescription,

                            TID: element.TID,
                            TopicName: element.TopicName,

                            UID: element.UID,
                            UserName: element.UserName,
                        };
                        result.push(elm);
                    });
                }).catch(error => {
                    console.error(error);
                });
        } catch (err) {
            console.error(err.message);
        } finally {
            if (connection) {
                try {
                    // Always close connections
                    await connection.State && connection.Close();
                } catch (err) {
                    console.error(err.message);
                }
                return result;
            }
        }
    },

    getAnswersByQuestionID: async function (param) {
        var result = [];
        var connection = null;
        try {
            connection = await this.getNewConnection();

            // qry for database
            let sql = "SELECT Users.UID, Users.UserName,  Answers.QID, Answers.AID, Answers.AnswerText, " +
                "Questions.CorrectAnswer, Answers.AnswerDate " +
                "FROM " +
                "(Users INNER JOIN Answers ON Users.UID = Answers.UID) INNER JOIN " +
                "Questions ON Answers.QID = Questions.QID " +
                "WHERE Answers.QID=" + param;

            // Query the DB
            await connection.query(sql)
                .then(data => {

                    // iterate over data and create result
                    data.forEach(element => {
                        let elm = {
                            UID: element.UID,
                            UserName: element.UserName,

                            QID: element.QID,
                            CorrectAnswer: element.CorrectAnswer,

                            AID: element.AID,
                            AnswerDate: new Date(element.AnswerDate).toString().replace(" GMT+0400 (Gulf Standard Time)", ""),
                            AnswerText: element.AnswerText
                        };
                        result.push(elm);
                    });
                }).catch(error => {
                    console.error(error);
                });
        } catch (err) {
            console.error(err.message);
        } finally {
            if (connection) {
                try {
                    // Always close connections
                    await connection.State && connection.Close();
                } catch (err) {
                    console.error(err.message);
                }
                return result;
            }
        }
    },

    getAnswersList: async function () {
        var result = [];
        var connection = null;
        try {
            connection = await this.getNewConnection();

            // qry for database
            let sql = "SELECT Answers.AID, Answers.AnswerText, Questions.QID, Questions.Question, Questions.CorrectAnswer, " +
                "Questions.QuestionDescription, Topics.TID, Topics.TopicName, Users.UID, Users.UserName " +
                "FROM " +
                "((Answers INNER JOIN Questions ON Answers.QID = Questions.QID) INNER JOIN " +
                "Topics ON Questions.TID = Topics.TID) INNER JOIN " +
                "Users ON Answers.UID = Users.UID";

            // Query the DB
            await connection.query(sql)
                .then(data => {
                    data.forEach(element => {
                        let elm = {
                            TID: element.TID,
                            TopicName: element.TopicName,

                            QID: element.QID,
                            Question: element.Question,
                            CorrectAnswer: element.CorrectAnswer,
                            QuestionDescription: element.QuestionDescription,

                            UID: element.UID,
                            UserName: element.UserName,

                            AID: element.AID,
                            AnswerText: element.AnswerText,
                        };
                        result.push(elm);
                    });

                }).catch(error => {
                    console.error(error);
                });
        } catch (err) {
            console.error(err.message);
        } finally {
            if (connection) {
                try {
                    // Always close connections
                    await connection.State && connection.Close();
                } catch (err) {
                    console.error(err.message);
                }
                return result;
            }
        }
    },

    getAnswersByID: async function (param) {
        var result = [];
        var connection = null;
        try {
            connection = await this.getNewConnection();

            // qry for database
            let sql = "SELECT Answers.AID, Answers.AnswerText, Questions.QID, Questions.Question, Questions.CorrectAnswer," +
                "Questions.QuestionDescription, Topics.TID, Topics.TopicName, Users.UID, Users.UserName " +
                "FROM " +
                "((Answers INNER JOIN Questions ON Answers.QID = Questions.QID) INNER JOIN " +
                "Topics ON Questions.TID = Topics.TID) INNER JOIN " +
                "Users ON Answers.UID = Users.UID WHERE Answers.AID=" + param;

            // Query the DB
            await connection.query(sql)
                .then(data => {
                    data.forEach(element => {
                        let elm = {
                            TID: element.TID,
                            TopicName: element.TopicName,

                            QID: element.QID,
                            Question: element.Question,
                            CorrectAnswer: element.CorrectAnswer,
                            QuestionDescription: element.QuestionDescription,

                            UID: element.UID,
                            UserName: element.UserName,

                            AID: element.AID,
                            AnswerText: element.AnswerText,
                        };
                        result.push(elm);
                    });

                }).catch(error => {
                    console.error(error);
                });
        } catch (err) {
            console.error(err.message);
        } finally {
            if (connection) {
                try {
                    // Always close connections
                    await connection.State && connection.Close();
                } catch (err) {
                    console.error(err.message);
                }
                return result;
            }
        }
    },

    AddNewAnswer: async function (param) {
        var result = 0;
        var connection = null;
        try {
            connection = await this.getNewConnection();
            let sql = `INSERT INTO [Answers] (QID, UID, AnswerText, AnswerDate) Values(${param.QuestionID}, ${param.UserID}, '${param.NewAnswer}', NOW())`;
            await connection.execute(sql);
            result = 1;
        } catch (err) {
            result = -1;
        } finally {
            if (connection) {
                try {
                    // Always close connections
                    await connection.State && connection.Close();
                } catch (err) {
                    result = -1;
                }
                return result;
            }
        }
    },

    AddNewQuestion: async function (param) {
        var result = 0;
        var connection = null;
        try {
            connection = await this.getNewConnection();

            let sql = `INSERT INTO [Questions] (UID, TID, CorrectAnswer, Question, QuestionDescription) Values(${param.UserID}, ${param.TopicID}, 1, '${param.Title}', '${param.DetailText}')`;

            await connection.execute(sql);
            result = 1;
        } catch (err) {
            result = -1;
        } finally {
            if (connection) {
                try {
                    // Always close connections
                    await connection.State && connection.Close();
                } catch (err) {
                    result = -1;
                }
                return result;
            }
        }
    },

    formatDate: function (date) {
        var mn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        var d = new Date(date),
            month = '' + mn[(d.getMonth())],
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('-');
    }
};

