const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

const { userlinkservices } = require('../services');

const userlinks = catchAsync(async (req, res) => {
  const { userid } = req.body;
  const Links = await userlinkservices.userlinkss(userid);
  res.status(httpStatus.OK);
  return res.send({ Links });
});

const useracceptedlinks = catchAsync(async (req, res) => {
  const { userid } = req.body;
  const AcceptedLinks = await userlinkservices.useracceptedlinkss(userid);
  res.status(httpStatus.OK);
  return res.send({
    AcceptedLinks,
  });
});

const linkgiverlinks = catchAsync(async (req, res) => {
  const { userid } = req.body;
  const Linkgiverlinks = await userlinkservices.linkgiverlinkss(userid);
  res.status(httpStatus.OK);
  return res.send({
    Linkgiverlinks,
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
  const { Linkid, UserId, input1, input2 } = req.body;
  const response = await userlinkservices.feedbackupdates(Linkid, UserId, input1, input2);
  res.status(httpStatus.OK);
  return res.send({
    response,
  });
});

const exchangeinfo = catchAsync(async (req, res) => {
  const { Linkid, UserId, input1, input2 } = req.body;
  const response = await userlinkservices.exchangeinfos(Linkid, UserId, input1, input2);
  res.status(httpStatus.OK);
  return res.send({
    response,
  });
});

const insertioncontent = catchAsync(async (req, res) => {
  const { LinkgiverID, Linkid, UserId, input1, input2 } = req.body;
  const response = await userlinkservices.insertioncontents(LinkgiverID, Linkid, UserId, input1, input2);
  res.status(httpStatus.OK);
  return res.send({
    response,
  });
});

const sendblogcontent = catchAsync(async (req, res) => {
  const { Linkid, UserId, input1, input2 } = req.body;
  const response = await userlinkservices.sendblogcontents(Linkid, UserId, input1, input2);
  res.status(httpStatus.OK);
  return res.send({
    response,
  });
});

const publishlink = catchAsync(async (req, res) => {
  const { Linkid, UserId, input1 } = req.body;
  const response = await userlinkservices.publishlinks(Linkid, UserId, input1);
  res.status(httpStatus.OK);
  return res.send({
    response,
  });
});

const requestrework = catchAsync(async (req, res) => {
  const { Linkid, UserId, input1, input2 } = req.body;
  const response = await userlinkservices.requestreworks(Linkid, UserId, input1, input2);
  res.status(httpStatus.OK);
  return res.send({
    response,
  });
});

const reject = catchAsync(async (req, res) => {
  const { Linkid, UserId, input1, input2 } = req.body;
  const response = await userlinkservices.rejects(Linkid, UserId, input1, input2);
  res.status(httpStatus.OK);
  return res.send({
    response,
  });
});

const orderedlink = catchAsync(async (req, res) => {
  // const { Linkid, UserId, input1, input2 } = req.body;
  const Orderlinks = await userlinkservices.orderedlinks();
  res.status(httpStatus.OK);
  return res.send({
    Orderlinks,
  });
});

const addlinkmonitor = catchAsync(async (req, res) => {
  const { Linkid, UserId, input1, input2, input3, input4 } = req.body;
  const response = await userlinkservices.addlinkmonitors(Linkid, UserId, input1, input2, input3, input4);
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
  linkgiverlinks,
  linkcredentials,
  savelink,
  statusupdate,
  feedbackupdate,
  exchangeinfo,
  insertioncontent,
  sendblogcontent,
  publishlink,
  requestrework,
  reject,
  orderedlink,
  addlinkmonitor,
  insertlink,
};
