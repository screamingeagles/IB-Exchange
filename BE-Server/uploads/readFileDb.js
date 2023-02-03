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

