const mysql = require('mysql');
const express = require('express');

require('dotenv').config();

const router = express.Router();
const validate = require('../../middlewares/validate');
const sampleValidation = require('../../validations/sample.validation');
const sampleController = require('../../controllers/sample.controller');
// const { route } = require('../../app');
// const { func } = require('joi');

// could not import db  function
const db = mysql.createConnection({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

router.get('/hello', sampleController.helloGet);
router.post('/hello', validate(sampleValidation.hello), sampleController.hello);

router.get('/testapi', function (req, res) {
  res.json('Testing Successfull');
});

// for creating the user->Working
router.post('/createuser', function (req, res) {
  const { name, email, password, Subscribtionstatus, currentlevel } = req.body;
  db.query(
    'INSERT INTO users (Name,Email,Password,Subscribtionstatus,Currentlevel) VALUES (?,?,?,?,?)',
    [name, email, password, Subscribtionstatus, currentlevel],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  );
});

// for displaying user all the links according to his current level->Working
router.get('/userlinks/:id', function (req, res) {
  const varid = req.params.id;
  // let websitelist = [];
  // let ansarray = [];
  const query = ` SELECT * FROM (SELECT * FROM website_data WHERE  website_data.Link_level=${varid} AND website_data.Status=1) AS a INNER JOIN linktable ON linktable.Link_Id=a.WebsiteID `;
  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

// for  the feedback and status of saved link->Working
router.get('/status/:id', function (req, res) {
  const Inputid = req.params.id;
  const query3 = `SELECT status,feedback FROM user_link_table WHERE  user_link_table.Link_id=${Inputid}`;
  db.query(query3, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

// for saving the link
router.post('/link-vault/credentials', function (req, res) {
  const { userid, websiteid, username, password, imageurl } = req.body;
  const query = `INSERT INTO user_link_table (Link_id,User_ID,username,password,image_url)VALUES (${websiteid}, ${userid}, ${username},${password},${imageurl})`;
  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

// for updating the status of saved link
router.put('/link-vault/update_status/:id/:webid', function (req, res) {
  const { status } = req.body;
  const getid = req.params.id;
  const getwebid = req.params.webid;
  const query = `UPDATE user_link_table SET user_link_table.status= ? WHERE Link_id=? and User_ID=?`;
  const queryparams = [status, getwebid, getid];
  db.query(query, queryparams, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// for updating the feedback of saved link
router.put('/link-vault/update_feedback/:id/:webid', function (req, res) {
  const { feedback } = req.body;

  const getid = req.params.id;
  const getwebid = req.params.webid;
  const query = `UPDATE user_link_table SET user_link_table.feedback= ? WHERE Link_id=? and User_ID=?`;
  const queryparams = [feedback, getwebid, getid];
  db.query(query, queryparams, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// for inserting user specific link if user click on accepted
router.post('/link-vault/link_status/:id', function (req, res) {
  const varid = req.params.id;
  const { number, text } = req.body;
  const query = `INSERT INTO user_link_table VALUES (${number},${varid},${text},${text},${text}, Accepted,${text},100,${text}) `;

  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// for entering the new links in website_metadata
// What about Link Level  here??
router.post('/link-vault/metadata', function (req, res) {
  const MetaInfo = req.body;
  const query = `INSERT  INTO website_data VALUES (${MetaInfo.Name},${MetaInfo.Description},${MetaInfo.Contact_Name},${MetaInfo.Email},${MetaInfo.Average_Pageviews},${MetaInfo.Traffic_Source},${MetaInfo.Email})`;
  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
