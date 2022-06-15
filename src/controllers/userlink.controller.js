const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

const { userlinkservices } = require('../services');

const userlinks = catchAsync(async (req, res) => {
  const { userid, size, orderby } = req.body;
  const Links = await userlinkservices.userlinkss(userid, size, orderby);
  res.status(httpStatus.OK);
  return res.send({ Links });
});

const useracceptedlinks = catchAsync(async (req, res) => {
  const { userid, acceptsize } = req.body;
  const AcceptedLinks = await userlinkservices.useracceptedlinkss(userid, acceptsize);
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
  const { Linkid, UserId, username, password, notes, fileimg } = req.body;
  const response = await userlinkservices.savelinkss(Linkid, UserId, username, password, notes, fileimg);
  res.status(httpStatus.OK);
  return res.send({
    response,
  });
});

const statusupdate = catchAsync(async (req, res) => {
  const { Linkid, UserId, statusvalue } = req.body;

  const response = await userlinkservices.statusupdates(Linkid, UserId, statusvalue);
  res.status(httpStatus.OK);
  return res.send({
    response,
  });
});

const getstatusupdate = catchAsync(async (req, res) => {
  const { Linkid, UserId } = req.body;
  const response = await userlinkservices.getstatusupdates(Linkid, UserId);
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
  const { Linkid, UserId, input1, input2, linkgiverid } = req.body;
  const response = await userlinkservices.sendblogcontents(Linkid, UserId, input1, input2, linkgiverid);
  res.status(httpStatus.OK);
  return res.send({
    response,
  });
});

const publishlink = catchAsync(async (req, res) => {
  const { Linkid, UserId, orderid, souurcelink, targetlink } = req.body;
  const response = await userlinkservices.publishlinks(Linkid, UserId, orderid, souurcelink, targetlink);
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
  const { userid } = req.body;
  const Orderlinks = await userlinkservices.orderedlinks(userid);
  res.status(httpStatus.OK);
  return res.send({
    Orderlinks,
  });
});

const addlinkmonitor = catchAsync(async (req, res) => {
  const { Linkid, UserId, orderid, souurcelink, targetlink, reltag } = req.body;
  const response = await userlinkservices.addlinkmonitors(Linkid, UserId, orderid, souurcelink, targetlink, reltag);
  res.status(httpStatus.OK);
  return res.send({
    response,
  });
});

const monitorlink = catchAsync(async (req, res) => {
  const { userid } = req.body;
  const Monitorlinks = await userlinkservices.monitorlinks(userid);
  res.status(httpStatus.OK);
  return res.send({
    Monitorlinks,
  });
});

const orderids = catchAsync(async (req, res) => {
  const { UserId } = req.body;
  const Orderids = await userlinkservices.orderidss(UserId);
  res.status(httpStatus.OK);
  return res.send({
    Orderids,
  });
});

const getslandtl = catchAsync(async (req, res) => {
  const { UserId, orderid } = req.body;
  const Orderids = await userlinkservices.getslandtls(UserId, orderid);
  res.status(httpStatus.OK);
  return res.send({
    Orderids,
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

const iconindatabase = catchAsync(async (req, res) => {
  const { imagename } = req.body;
  const response = await userlinkservices.iconindatabases(imagename);
  res.status(httpStatus.OK);
  return res.send({
    response,
  });
});

const insericon = catchAsync(async (req, res) => {
  const { inserturl, imagename } = req.body;
  const response = await userlinkservices.insericons(inserturl, imagename);
  res.status(httpStatus.OK);
  return res.send({
    response,
  });
});

const getcount = catchAsync(async (req, res) => {
  const { UserId } = req.body;
  const response = await userlinkservices.getcounts(UserId);
  res.status(httpStatus.OK);
  return res.send({
    response,
  });
});

const getcountstatus = catchAsync(async (req, res) => {
  const { UserId } = req.body;
  const response = await userlinkservices.getcountstatuss(UserId);
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
  getstatusupdate,
  feedbackupdate,
  exchangeinfo,
  insertioncontent,
  sendblogcontent,
  publishlink,
  requestrework,
  reject,
  orderedlink,
  addlinkmonitor,
  monitorlink,
  orderids,
  getslandtl,
  insertlink,
  insericon,
  iconindatabase,
  getcount,
  getcountstatus,
};
