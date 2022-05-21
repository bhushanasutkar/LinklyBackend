/* eslint-disable prettier/prettier */
const express = require('express');
const { db } = require('../../dbconfig');
const userlinkcontroller = require('../../controllers/userlink.controller');

const router = express.Router();

// for displaying user all the links according to his current level
// links will be displayed in backlink vault
router.get('/:id', userlinkcontroller.userlinks);

// for displaying accepted links
// all links will be displayed in backlink manager
router.get('/accepted/:id', userlinkcontroller.useracceptedlinks);

// for  the feedback and status of saved link->Working
router.put('/status/', userlinkcontroller.linkcredentials);

// for saving the link
router.post('/link-vault/credentials', userlinkcontroller.savelink);

// for updating the status of saved link
router.put('/link-vault/update_status/:id/:webid', userlinkcontroller.statusupdate);

// for updating the feedback of saved link
router.put('/link-vault/update_feedback/:id/:webid', userlinkcontroller.feedbackupdate);

// for inserting user specific link if user click on accepted/reject
router.post('/link_status', userlinkcontroller.insertlink);

// for hiding the link whenever user clicks on hide button
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

module.exports = router;

