const express = require('express');
// const validate = require('../../middlewares/validate');
const userlinkcontroller = require('../../controllers/userlink.controller');
// const userlinkValidation = require('../../validations/userlink.validation');

const router = express.Router();

// for displaying user all the links according to his current level
// links will be displayed in backlink vault
router.post('/', userlinkcontroller.userlinks);
// , validate(userlinkValidation.userlink)
// for displaying accepted links
// all links will be displayed in backlink manager
router.post('/accepted', userlinkcontroller.useracceptedlinks);
// validate(userlinkValidation.accepted),
// for displaying linkgiver links
// all links will be displayed in Libk Giver Admin
router.post('/linkgiver', userlinkcontroller.linkgiverlinks);

// for  the feedback and status of saved link->Working
router.put('/status/', userlinkcontroller.linkcredentials);

// for saving the link login details
router.post('/credentials', userlinkcontroller.savelink);

// for updating the status of saved link
router.post('/update_status', userlinkcontroller.statusupdate);

// for updating the status of saved link
router.post('/get_update_status', userlinkcontroller.getstatusupdate);

// for updating the feedback of saved link
router.put('/update_feedback', userlinkcontroller.feedbackupdate);

// for updating the exchage content of saved link
router.put('/exchange_request', userlinkcontroller.exchangeinfo);

// for updating the link_insertion content of saved link
router.put('/link_insertion', userlinkcontroller.insertioncontent);

// for updating the guest blog content of saved link
router.put('/send_blog', userlinkcontroller.sendblogcontent);

// for link publish popup
router.post('/publishlink', userlinkcontroller.publishlink);

// for request re work popup
router.put('/requestrework', userlinkcontroller.requestrework);

// for reject with feeback popup
router.put('/reject', userlinkcontroller.reject);

// for adding link to monitor
router.post('/addlinkmonitor', userlinkcontroller.addlinkmonitor);

// for getting  all orderids of a user
router.post('/orderids', userlinkcontroller.orderids);

// for fetching link in monitor
router.post('/monitorlink', userlinkcontroller.monitorlink);

// for getting  link from monitor
router.post('/orderedlinks', userlinkcontroller.orderedlink);

// for getting  sourcelink and target link fo given orderid
router.post('/getslandtl', userlinkcontroller.getslandtl);

// for inserting user specific link if user click on accepted/reject
router.post('/link_status', userlinkcontroller.insertlink);
// validate(userlinkValidation.insertonclick)

// for  the feedback and status of saved link->Working
router.put('/status/', userlinkcontroller.linkcredentials);

// for hiding the link whenever user clicks on hide button
// router.put('/link-vault/linkstatushide', function (req, res) {
//   const { linkid } = req.body;
//   const query = `UPDATE user_link_table SET user_link_table.Archive=0 WHERE  user_link_table.Link_id=?`;
//   const queryparams = [linkid];
//   db.query(query, queryparams, (err, result) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

// for adding link in backlink manager when user clicks on accept button
// router.post('/acceptttt', function (req, res) {
//   const { linkid, price } = req.body;
//   const query = `UPDATE user_link_table SET user_link_table.Archive=1 WHERE  user_link_table.Link_id=?`;
//   const queryparams = [linkid];
//   if (price === 'PAID') {
//     //  stripe
//   }
//   db.query(query, queryparams, (err, result) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

// router.post('/email', function (req, res) {
//   const { email } = req.body;
//   admin
//     .auth()
//     .getUserByEmail(email)
//     .then(function (userRecord) {
//       // See the tables above for the contents of userRecord
//       // console.log('Successfully fetched user data:', userRecord.toJSON());
//       res.send(userRecord);
//     })
//     .catch(function (error) {
//       // console.log('Error fetching user data:', error);
//       res.send(error);
//     });
// });

// for entering the new links information in website_metadata
// for add new linjk button
// router.post('/link-vault/metadata', function (req, res) {
//   const MetaInfo = req.body;
//   const query = `INSERT  INTO website_data VALUES (${MetaInfo.Name},${MetaInfo.Description},${MetaInfo.Contact_Name},${MetaInfo.Email},${MetaInfo.Average_Pageviews},${MetaInfo.Traffic_Source},${MetaInfo.Email})`;
//   db.query(query, (err, result) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

module.exports = router;
