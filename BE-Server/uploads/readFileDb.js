import fs from 'fs';

export default {

    getTopicsList: async function () {
        try {
            var rs = fs.readFileSync('./uploads/myDb.json', 'utf8');    // run it Syncronusly 
            var data = JSON.parse(rs);                                  //now it an object                                    
            return data.Topics;
        }
        catch (err) {
            return err;
        }
    },

    getQuestionsList: async function () {
        try {
            var rs = fs.readFileSync('./uploads/myDb.json', 'utf8');    // run it Syncronusly 
            var data = JSON.parse(rs);                                  //now it an object                        
            return data.Questions;
        }
        catch (err) {
            return err;
        }
    },

    getAnswersList: async function () {
        try {
            var rs = fs.readFileSync('./uploads/myDb.json', 'utf8');    // run it Syncronusly 
            var data = JSON.parse(rs);                                  //now it an object            
            return data.Answers;
        }
        catch (err) {
            return err;
        }
    },

    getQuestionByID: async function (param) {
        try {
            var rs = fs.readFileSync('./uploads/myDb.json', 'utf8');    // run it Syncronusly 
            var data = JSON.parse(rs);                                  //now it an object                 

            const result = data.Questions.filter(item => {
                return item.QID == param;           // first get object meeting the criterea
            });

            console.log("Here checking default");
            this.getTopicsList()
                .then(result => {
                    console.log(result);
                }).catch(err => console.error(err));
            /*
           
            */
            //var s = module.default.getTopicByID(result.TID);
            //result.push(getTopicByID(result.TID));
            //result.push(getUserByID(result.UID));
            return result;
        }
        catch (err) {
            console.log(err);
            return err;
        }
    },


    getTopicByID: function (param) {
        try {
            var rs = fs.readFileSync('./uploads/myDb.json', 'utf8');    // run it Syncronusly 
            var data = JSON.parse(rs);                                  //now it an object                 

            return data.Topics.filter(item => {
                return item.TID == param;           // first get object meeting the criterea
            }).map(function (obj) {
                return obj.TopicName;               // get name from object
            });
        }
        catch (err) {
            return err;
        }
    },

    getUserByID: async function (param) {
        try {
            var rs = fs.readFileSync('./uploads/myDb.json', 'utf8');    // run it Syncronusly 
            var data = JSON.parse(rs);                                  //now it an object                 

            return data.Users.filter(item => {
                return item.UID == param;           // first get object meeting the criterea
            }).map(function (obj) {
                return obj.UserName;               // get name from object
            });
        }
        catch (err) {
            return err;
        }
    },


    storeJsonToFile: async function () {
        var obj = {
            table: [],
            designation: []
        };
        console.log("... will wait ...");
        obj.table = await getStaffList().then(data => { return data; }).catch(err => console.log(err));
        obj.designation = await getDesignationList().then(data => { return data; }).catch(err => console.log(err));

        var json = JSON.stringify(obj);
        fs.writeFile('./uploads/myDb.json', json, 'utf8', function () { /*console.log("---------- Done Saving Db ------------");*/ });
    },
    getStaffList: async function () {
        try {
            var rs = fs.readFileSync('./uploads/myDb.json', 'utf8');    // run it Syncronusly 
            var data = JSON.parse(rs);                          //now it an object            
            return data.table;
        }
        catch (err) {
            return err;
        }
    },
    getStaffDetail: async function (param) {
        try {
            var rs = fs.readFileSync('./uploads/myDb.json', 'utf8');    // run it Syncronusly 
            var data = JSON.parse(rs);                          //now it an object            
            return data.table.filter(item => {
                return item.STAFF_ID == param;
            });
        }
        catch (err) {
            return err;
        }
    },
    getDesignationList: async function () {
        try {
            var rs = fs.readFileSync('./uploads/myDb.json', 'utf8');    // run it Syncronusly 
            var data = JSON.parse(rs);                          //now it an object            
            return data.designation.filter(item => {
                return item.ID < 300;
            });
        }
        catch (err) {
            return err;
        }
    },
    getMaxStaffID: async function () {
        try {
            var rs = fs.readFileSync('./uploads/myDb.json', 'utf8');    // run it Syncronusly 
            var data = JSON.parse(rs);

            // clone the original array to preserve
            var clone = data.table.slice(0);

            // sort descending
            clone.sort(function (x, y) {
                if (x.STAFF_ID == y.STAFF_ID) return 0;
                else if (parseInt(x.STAFF_ID) < parseInt(y.STAFF_ID)) return 1;
                else return -1;
            });
            var temp = clone.slice(0, 1 || 1)
            return temp[0].STAFF_ID + 1;
        }
        catch (err) {
            return err;
        }
    },
    setStaffDetailByIDToFile: function (param) {
        try {
            var rs = fs.readFileSync('./uploads/myDb.json', 'utf8');    // run it Syncronusly 
            var data = JSON.parse(rs);                          //now it an object            

            if (param.STAFF_ID === 0) {
                // Add new Staff
                param.STAFF_ID = this.getMaxIDofStaffFromFile();
                data.table.push(param);
            }
            else {
                // update Staff
                data.table.forEach(emp => {
                    if (emp.STAFF_ID == param.STAFF_ID) {
                        emp.FIRST_NAME = param.FIRST_NAME;
                        emp.LAST_NAME = param.LAST_NAME;
                        emp.DESIG_ID = param.DESIG_ID;
                        emp.DESIGNATION = param.DESIGNATION;
                        emp.EMIRATES_ID = param.EMIRATES_ID;
                        emp.EID_EXPIRY = param.EID_EXPIRY;
                        emp.FILE_NAME = param.FILE_NAME;
                        emp.CREATED_BY = param.CREATED_BY;
                        emp.CREATION_DATE = param.CREATION_DATE;
                    }
                });
            }
            var json = JSON.stringify(data);
            fs.writeFile('./uploads/myDb.json', json, 'utf8', function () { console.log("---------- Done Saving Db ------------"); });
            return true;
        }
        catch (err) {
            return err;
        }
    },
    equijoin: function (xs, ys, primary, foreign, sel) {
        const ix = xs.reduce((ix, row) => // loop through m items
            ix.set(row[primary], row),    // populate index for primary table
            new Map);                         // create an index for primary table

        return ys.map(row =>              // loop through n items
            sel(ix.get(row[foreign]),     // get corresponding row from primary
                row));                        // select only the columns you need
    }

    //getTopicsList: getTopicsList;
};

/*
  getMaxStaffID: async function () {
        var result = 0;
        var connection = null;
        try {
            connection = await this.getNewConnection();
            let sql = `SELECT MAX (STAFF_ID) + 1 AS MAX_STAFF FROM T_STAFF`;

            let binds = {};

            // For a complete list of options see the documentation.
            let options = {
                outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
                // extendedMetaData: true,               // get extra metadata
                // prefetchRows:     100,                // internal buffer allocation size for tuning
                // fetchArraySize:   100                 // internal buffer allocation size for tuning
            };

            let rs = await connection.execute(sql, binds, options);

            rs.rows.forEach(element => {
                result = element.MAX_STAFF;
            });
        } catch (err) {
            console.error(err.message);
        } finally {
            if (connection) {
                try {
                    // Always close connections
                    await connection.close();
                } catch (err) {
                }
                return result;
            }
        }
    },
    getStaffList: async function () {
        var result = [];
        var connection = null;
        try {
            connection = await this.getNewConnection();
            console.log('connected to database');

            let sql = `SELECT S.STAFF_ID, S.FIRST_NAME, S.LAST_NAME, S.DESIGNATION_ID, 
                    D.DESIGNATION, S.EMIRATES_ID, S.EID_EXPIRY, S.MODIFIED_BY AS FILE_NAME, S.CREATED_BY, S.CREATION_DATE
                        FROM T_STAFF S INNER JOIN T_DESIGNATION D ON  S.DESIGNATION_ID = D.DESIGNATION_ID        
                            ORDER By S.STAFF_ID DESC FETCH FIRST 5 ROWS ONLY `;

            let binds = {};

            // For a complete list of options see the documentation.
            let options = {
                outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
                // extendedMetaData: true,               // get extra metadata
                // prefetchRows:     100,                // internal buffer allocation size for tuning
                // fetchArraySize:   100                 // internal buffer allocation size for tuning
            };

            let rs = await connection.execute(sql, binds, options);


            //console.dir(rs.rows, { depth: null });        
            rs.rows.forEach(element => {
                let elm = {
                    STAFF_ID: element.STAFF_ID,
                    FIRST_NAME: element.FIRST_NAME,
                    LAST_NAME: element.LAST_NAME,
                    DESIG_ID: element.DESIGNATION_ID,
                    DESIGNATION: element.DESIGNATION,
                    EMIRATES_ID: element.EMIRATES_ID,
                    EID_EXPIRY: this.formatDate(element.EID_EXPIRY),
                    FILE_NAME: element.FILE_NAME,
                    CREATED_BY: element.CREATED_BY,
                    CREATION_DATE: this.formatDate(element.CREATION_DATE)
                };
                result.push(elm); //console.log(element);
            });
        } catch (err) {
            console.error(err.message);
        } finally {
            if (connection) {
                try {
                    // Always close connections
                    await connection.close();
                    console.log('close connection success');
                } catch (err) {
                    console.error(err.message);
                }
                console.log('returning value');
                return result;
            }
        }
    },
    getStaffDetail: async function (param) {
        var result = [];
        var connection = null;
        try {
            connection = await this.getNewConnection();
            let sql = `SELECT STAFF_ID, COMPANY_ID, FIRST_NAME, LAST_NAME, DESIGNATION_ID, CREATED_BY, MODIFIED_BY, EMIRATES_ID, EID_EXPIRY FROM T_STAFF WHERE STAFF_ID=${param}`;

            let binds = {};

            // For a complete list of options see the documentation.
            let options = {
                outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
                // extendedMetaData: true,               // get extra metadata
                // prefetchRows:     100,                // internal buffer allocation size for tuning
                // fetchArraySize:   100                 // internal buffer allocation size for tuning
            };

            let rs = await connection.execute(sql, binds, options);

            rs.rows.forEach(element => {
                result.push(element); //console.log(element);
            });
        } catch (err) {
            console.error(err.message);
        } finally {
            if (connection) {
                try {
                    // Always close connections
                    await connection.close();
                } catch (err) {
                }
                return result;
            }
        }
    },
    addNewStaff: async function (param) {
        var result = 0;
        var connection = null;
        try {
            connection = await this.getNewConnection();
            let sql = `INSERT INTO T_STAFF (STAFF_ID, COMPANY_ID, FIRST_NAME, LAST_NAME, DESIGNATION_ID, CREATED_BY, MODIFIED_BY, EMIRATES_ID, EID_EXPIRY) 
                        VALUES(${param.StaffId}, 113,'${param.FirstName}','${param.LastName}',${param.DesignationId},'topmost','${param.FileName}','${param.EmiratesId}','${param.EIDExpiry}')`;
            console.log(sql);
            let binds = {};

            // For a complete list of options see the documentation.
            let options = {
                autoCommit: true,
                outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
                // extendedMetaData: true,               // get extra metadata
                // prefetchRows:     100,                // internal buffer allocation size for tuning
                // fetchArraySize:   100                 // internal buffer allocation size for tuning
            };

            let rs = await connection.execute(sql, binds, options);
            result = rs.rowsAffected;
        } catch (err) {
            result = -1;
        } finally {
            if (connection) {
                try {
                    // Always close connections
                    await connection.close();
                } catch (err) {
                    result = -1;
                }
                return result;
            }
        }
    },
    updateStaff: async function (param) {
        var result = 0;
        var connection = null;
        try {
            connection = await this.getNewConnection();
            let sql = `UPDATE T_STAFF SET FIRST_NAME='${param.FirstName}',
                        LAST_NAME='${param.LastName}', DESIGNATION_ID=${param.DesignationId}, 
                        MODIFIED_BY='${param.FileName}', EMIRATES_ID='${param.EmiratesId}',
                        EID_EXPIRY='${param.EIDExpiry}' WHERE STAFF_ID=${param.StaffId}`;
            console.log(sql);
            let binds = {};

            // For a complete list of options see the documentation.
            let options = {
                autoCommit: true,
                outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
            };

            let rs = await connection.execute(sql, binds, options);
            result = rs.rowsAffected;
        } catch (err) {
            result = -1;
        } finally {
            if (connection) {
                try {
                    // Always close connections
                    await connection.close();
                } catch (err) {
                    result = -1;
                }
                return result;
            }
        }
    },
*/