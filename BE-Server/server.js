// load all the  pre-set properties
import config from './config.js';

// express is a wrserverer around http / https
// const express = require('express');
import express from 'express';  //1
import cors from 'cors';
const server = express();   //2

// this will enable cross platefrom submisison
server.use(cors());

import fileupload from 'express-fileupload';
server.use(fileupload());

import bodyParser from 'body-parser';
server.use(bodyParser.json());       // to support JSON-encoded bodies --> POST: {"name":"foo","color":"red"} 

import fs from 'fs';


//import dataSource from './uploads/readFileDb.js';    // if you do not have oracle connection available to you use json file
import dataSource from './uploads/readFromDB.js';


// Server 
server.listen(config.port, config.host, () => {
    console.info('Express listening on port', config.port);
});

server.get('/api/Topics', (req, res) => {
    dataSource.getTopicsList()   // will send a promise
        .then(result => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        })
        .catch(err => console.error(err));
});

server.get('/api/Topics/:id', (req, res) => {
    const tid = req.params.id;
    dataSource.getTopicsByID(tid).then(result => {
        res.send(result);
    }).catch(err => console.error(err));
});

server.get('/api/Questions', (req, res) => {
    dataSource.getQuestionsList()   // will send a promise
        .then(result => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        }).catch(err => console.error(err));
});

server.get('/api/Questions/:id', (req, res) => {
    const qid = req.params.id;
    dataSource.getQuestionsByID(qid)   // will send a promise
        .then(result => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        }).catch(err => console.error(err));
});


server.get('/api/QuestionsByTopicID/:id', (req, res) => {
    const tid = req.params.id;
    dataSource.getQuestionsByTopicID(tid)   // will send a promise
        .then(result => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        }).catch(err => console.error(err));
});

server.get('/api/Answers', (req, res) => {
    dataSource.getAnswersList()   // will send a promise
        .then(result => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        }).catch(err => console.error(err));
});

server.get('/api/Answers/:id', (req, res) => {
    const aid = req.params.id;
    dataSource.getAnswersByID(aid)   // will send a promise
        .then(result => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        }).catch(err => console.error(err));
});

server.get('/api/AnswersByQuestionID/:id', (req, res) => {
    const qid = req.params.id;
    dataSource.getAnswersByQuestionID(qid)   // will send a promise
        .then(result => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        }).catch(err => console.error(err));
});


server.get('/api/TestUpdate', (req, res) => {

    let item = {
        "TID": 1,
        "TopicName": "Maths",
    };
    dataSource.updateTopic(item).then(obj => {
        res.send({
            status: true,
            message: 'Completed',
            data: { 'Rows Affected': obj }
        });
    }).catch(err => { res.status(500).send(err); });
});


server.post('/api/Answer/Add', async (req, res) => {
    try {

        let item = {
            "UserID": req.body.UIQ,
            "QuestionID": req.body.QID,
            "NewAnswer": req.body.UserResponse,
        };
        dataSource.AddNewAnswer(item).then(obj => {
            res.send({
                status: true,
                message: 'Completed',
                data: { 'Rows Affected': obj }
            });
        }).catch(err => { res.status(500).send(err); });

    } catch (err) {
        res.status(500).send(err);
    }
});

server.get('/api/file/download/:name', function (req, res) {
    const _fileName = req.params.name;
    let __dirname = fs.realpathSync('.');
    let file = `${__dirname}\\uploads\\${_fileName}`;
    res.download(file);
});

// create a GET route
server.get('/backend_test', (req, res) => {
    try {
        // storeJsonToFile();
        // readJsonFromFile()
        /*let item = {
           "STAFF_ID":0,
           "FIRST_NAME":"XXX",
           "LAST_NAME":"YYYY",
           "DESIG_ID":321,
           "DESIGNATION":"Supervisor - Performing Authority",
           "EMIRATES_ID":"4201-683-1",
           "EID_EXPIRY":"07-Mar-2023",
           "FILE_NAME":"predator.jpg",
           "CREATED_BY":"New",
           "CREATION_DATE":"28-Mar-2022"
        };        
        console.log(tools.setStaffDetailByIDToFile(item));*/

        //dataSource.getDesignationList().then(obj => {
        //console.log(obj);
        //});
        console.log('Start!');
    } catch (err) {
        console.error('Whoops!');
        console.error(err);
    }
    res.send({ express: 'Server is running' });
});


function formatDate(date) {
    var mn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var d = new Date(date),
        month = '' + mn[(d.getMonth())],
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
}
