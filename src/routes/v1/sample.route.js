const mysql = require('mysql');
const express = require('express');

require('dotenv').config();

const router = express.Router();
const validate = require('../../middlewares/validate');
const sampleValidation = require('../../validations/sample.validation');
const sampleController = require('../../controllers/sample.controller');
// const { route } = require('../../app');
// const { func } = require('joi');

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

// for user login
router.post('/login', function (req, res) {
  const { email, password } = req.body;
  let success = false;
  const query = `SELECT UserId, Name, Email FROM users WHERE Email='${email}' and Password='${password}' `;
  db.query(query, (err, result) => {
    if (err) {
      res.json(err);
    } else if (result.length === 0) {
      success = false;
      res.json({ success, result });
    } else {
      success = true;

      res.json({ success, result });
    }
  });
});

// for displaying user all the links according to his current level
// links will be displayed in backlink vault
router.get('/userlinks/:id', function (req, res) {
  const userid = req.params.id;
  const query = ` select * from website_data as wd inner join (SELECT * FROM linktable where Link_Id not in (select Link_id from user_link_table where User_ID=${userid})) as lt on lt.WebsiteId=wd.WebsiteID and wd.Link_level=1`;
  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      // console.log(result);
      res.send(result);
    }
  });
});

// for displaying accepted links
// all links will be displayed in backlink manager
router.get('/userlinks/accepted/:id', function (req, res) {
  const userid = req.params.id;
  const query = `select * from website_data as wd inner join  (select WebsiteId, Link_Type,Cost_usd,Link_category,Rel_Attribute,Google_Indexed,Content_Guidelines,Self_Publish,SPM_Instantapproval,SPM_Probability,Price_gb_usd,Price_gbcbd_usd,Price_LinkInsertion_usd,Price_LinkInsertioncbd_usd, Link_Status,Work_Required from linktable as lt inner join (select * from user_link_table where User_ID=${userid} and Archive=1) as ult on lt.Link_Id=ult.Link_id ) as md on wd.WebsiteID=md.WebsiteId  and wd.Link_level=1 `;
  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// for  the feedback and status of saved link->Working
router.put('/status/', function (req, res) {
  const { userId, LinkId } = req.body;
  const query3 = `SELECT status,feedback FROM user_link_table WHERE  user_link_table.Link_id=${LinkId} and user_link_table.User_ID=${userId} `;
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
  const { userid, linkid, username, password, imageurl } = req.body;
  const query = `INSERT INTO user_link_table (username,password,image_url)VALUES (${username},${password},${imageurl} where Link_id=${linkid} and User_ID=${userid})`;
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

// for inserting user specific link if user click on accepted/reject
router.post('/link-vault/link_status', function (req, res) {
  const { linkid, UserId, Archive } = req.body;
  const query = `INSERT INTO user_link_table(Link_id,User_ID,Archive) VALUES (${linkid},${UserId},${Archive}) `;

  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// for entering the new links information in website_metadata
// for add new linjk button
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

// for hiding the link whenever user clicks on hide button
// No need for now
router.put('/link-vault/linkstatushide', function (req, res) {
  const { linkid } = req.body;
  const query = `UPDATE user_link_table SET user_link_table.Archive=0 WHERE  user_link_table.Link_id=?`;
  const queryparams = [linkid];
  db.query(query, queryparams, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// for adding link in backlink manager when user clicks on accept button
// No need for now
router.put('/link-vault/linkstatusaccept', function (req, res) {
  const { linkid, price } = req.body;
  const query = `UPDATE user_link_table SET user_link_table.Archive=1 WHERE  user_link_table.Link_id=?`;
  const queryparams = [linkid];
  if (price === 'PAID') {
    //  stripe
  }
  db.query(query, queryparams, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
