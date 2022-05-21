const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

const { userlinkservices } = require('../services');

const userlinks = catchAsync(async (req, res) => {
  const userid = req.params.id;
  const Links = await userlinkservices.userlinkss(userid);
  res.status(httpStatus.OK);
  return res.send({ Links });
});

const useracceptedlinks = catchAsync(async (req, res) => {
  const userid = req.params.id;
  const AcceptedLinks = await userlinkservices.useracceptedlinkss(userid);
  res.status(httpStatus.OK);
  return res.send({
    AcceptedLinks,
  });
});

const linkcredentials = catchAsync(async (req, res) => {
  const { userId, LinkId } = req.body;
  const response = await userlinkservices.linkcredentialss(userId, LinkId);
  res.status(httpStatus.OK);
  return res.send({
    response,
  });
});

const savelink = catchAsync(async (req, res) => {
  const { userid, linkid, username, password, imageurl } = req.body;
  const response = await userlinkservices.savelinkss(userid, linkid, username, password, imageurl);
  res.status(httpStatus.OK);
  return res.send({
    response,
  });
});

const statusupdate = catchAsync(async (req, res) => {
  const { status } = req.body;
  const getid = req.params.id;
  const getwebid = req.params.webid;
  const response = await userlinkservices.statusupdates(status, getid, getwebid);
  res.status(httpStatus.OK);
  return res.send({
    response,
  });
});

const feedbackupdate = catchAsync(async (req, res) => {
  const { feedback } = req.body;
  const getid = req.params.id;
  const getwebid = req.params.webid;
  const response = await userlinkservices.feedbackupdates(feedback, getid, getwebid);
  res.status(httpStatus.OK);
  return res.send({
    response,
  });
});

const insertlink = catchAsync(async (req, res) => {
  const { linkid, UserId, Archive } = req.body;
  const response = await userlinkservices.insertlinks(linkid, UserId, Archive);
  res.status(httpStatus.OK);
  return res.send({
    response,
  });
});

module.exports = {
  userlinks,
  useracceptedlinks,
  linkcredentials,
  savelink,
  statusupdate,
  feedbackupdate,
  insertlink,
};
