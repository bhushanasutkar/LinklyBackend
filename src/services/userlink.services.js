const { db } = require('../dbconfig');
// const query = ` select * from website_data as wd inner join (SELECT * FROM linktable where Link_Id not in (select Link_id from user_link_table where User_ID='${userid}')) as lt on lt.WebsiteId=wd.WebsiteID and wd.Link_level=1  LIMIT ${size} OFFSET ${
//   size - 10
// }`;
const userlinkss = async (userid, size, sortby) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = ` select * from website_data as wd inner join (SELECT * FROM linktable where Link_Id not in (select Link_id from user_link_table where User_ID='${userid}')) as lt on lt.WebsiteId=wd.WebsiteID and wd.Link_level=1  order by ${sortby}`;
        db.query(query, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (err) {
        reject(err);
      }
    })();
  });
};

const useracceptedlinkss = async (userid, acceptsize) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        // const query = `select * from website_data as wd inner join  (select WebsiteId, Link_Type,contact_method,Cost_usd,Link_category,Rel_Attribute,Google_Indexed,Content_Guidelines,Self_Publish,SPM_Instantapproval,SPM_Probability,Price_gb_usd,Price_gbcbd_usd,linkly_credits,content_type,next_steps, Price_LinkInsertion_usd,Price_LinkInsertioncbd_usd, Link_Status,Work_Required from linktable as lt inner join (select * from user_link_table where User_ID='${userid}' and Archive=1) as ult on lt.Link_Id=ult.Link_id ) as md on wd.WebsiteID=md.WebsiteId  and wd.Link_level=1`;
        const query = `select * from website_data as wd inner join  (select lt.Link_Id ,WebsiteId, Link_Type,contact_method,Cost_usd,Link_category,Rel_Attribute,Google_Indexed,Content_Guidelines,Self_Publish,SPM_Instantapproval,SPM_Probability,Price_gb_usd,Price_gbcbd_usd,linkly_credits,content_type,next_steps, Price_LinkInsertion_usd,Price_LinkInsertioncbd_usd,registration_link, Link_Status,Work_Required,order_id,status from linktable as lt inner join (select * from user_link_table where User_ID='${userid}' and Archive=1) as ult on lt.Link_Id=ult.Link_id ) as md on wd.WebsiteID=md.WebsiteId  and wd.Link_level=1  ORDER By order_id desc LIMIT ${acceptsize}`;
        // console.log(query);
        db.query(query, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (err) {
        reject(err);
      }
    })();
  });
};

const linkgiverlinkss = async (userid) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `select * from website_data as wd inner join  (select lt.Link_Id,WebsiteId, Link_Type,contact_method,Cost_usd,Link_category,Rel_Attribute,Google_Indexed,Content_Guidelines,Self_Publish,SPM_Instantapproval,SPM_Probability,Price_gb_usd,Price_gbcbd_usd,linkly_credits,content_type,next_steps, Price_LinkInsertion_usd,Price_LinkInsertioncbd_usd, Link_Status,Work_Required,status,order_id,link_giver_id,link_added_on,target_link,source_link from linktable as lt inner join (select * from user_link_table where link_giver_id='${userid}' and Archive=1 ) as ult on lt.Link_Id=ult.Link_id ) as md on wd.WebsiteID=md.WebsiteId  and wd.Link_level=1`;
        // and status!='Link Created'
        // console.log(query);
        db.query(query, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (err) {
        reject(err);
      }
    })();
  });
};

const linkcredentialss = async (userId, LinkId) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `SELECT status,feedback FROM user_link_table WHERE  user_link_table.Link_id=${LinkId} and user_link_table.User_ID=${userId} `;
        db.query(query, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (err) {
        reject(err);
      }
    })();
  });
};

const savelinkss = async (Linkid, UserId, username, password, notes, fileimg) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `UPDATE user_link_table set username=?, password=?, image_url=?,Notes=?  where Link_id=? and User_ID=?`;
        // VALUES(${username},${password},'${fileimg}',${notes})
        const queryparams = [username, password, fileimg, notes, Linkid, UserId];
        db.query(query, queryparams, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (err) {
        reject(err);
      }
    })();
  });
};
const statusupdates = async (Linkid, UserId, statusvalue) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `UPDATE user_link_table SET user_link_table.status= ? WHERE Link_id=? and User_ID=?`;
        const queryparams = [statusvalue, Linkid, UserId];
        db.query(query, queryparams, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (err) {
        reject(err);
      }
    })();
  });
};

const getstatusupdates = async (Linkid, UserId) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `SELECT  user_link_table.status from user_link_table WHERE Link_id=? and User_ID=?`;
        const queryparams = [Linkid, UserId];
        db.query(query, queryparams, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (err) {
        reject(err);
      }
    })();
  });
};

const feedbackupdates = async (Linkid, UserId, input1, input2) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `UPDATE user_link_table SET user_link_table.feedback= ?, user_link_table.Feedback_detail= ? WHERE Link_id=? and User_ID=?`;
        const queryparams = [input2, input1, Linkid, UserId];
        db.query(query, queryparams, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (err) {
        reject(err);
      }
    })();
  });
};

const exchangeinfos = async (Linkid, UserId, input1, input2, linkgiverid) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `UPDATE user_link_table SET  user_link_table.link_giver_id=?, user_link_table.exchange_url= ?, user_link_table.exchange_topics= ? WHERE Link_id=? and User_ID=?`;
        const queryparams = [linkgiverid, input1, input2, Linkid, UserId];
        // console.log(query);
        // console.log(linkgiverid,input1,input2)
        db.query(query, queryparams, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (err) {
        reject(err);
      }
    })();
  });
};

const acceptrequests = async (Linkid, UserId, input1, linkgiverid) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `UPDATE user_link_table SET  user_link_table.status='Link Exchange Approved', user_link_table.exchange_topics='${input1}' WHERE Link_id=${Linkid} and User_ID='${UserId}' and  PrimaryID>0; INSERT INTO user_link_table (Link_id,User_ID,link_giver_id,Archive,status) VALUES(${Linkid},'${linkgiverid}','${UserId}',1,'Link Exchange Approved')`;
        // const queryparams = [input1, Linkid, UserId, UserId];
        db.query(query, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (err) {
        reject(err);
      }
    })();
  });
};

const rejectrequests = async (Linkid, UserId, input1) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `UPDATE user_link_table SET  user_link_table.status='Link Exchange Rejected', user_link_table.exchange_topics='${input1}' WHERE Link_id=${Linkid} and User_ID='${UserId}' and  PrimaryID>0`;
        db.query(query, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (err) {
        reject(err);
      }
    })();
  });
};

const insertioncontents = async (LinkgiverID, Linkid, UserId, input1, input2) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `UPDATE user_link_table SET  user_link_table.link_giver_id=?,  user_link_table.doc_url= ?, user_link_table.target_link= ? WHERE Link_id=? and User_ID=?`;
        const queryparams = [LinkgiverID, input1, input2, Linkid, UserId];
        db.query(query, queryparams, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (err) {
        reject(err);
      }
    })();
  });
};

const sendblogcontents = async (Linkid, UserId, input1, input2, linkgiverid) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `UPDATE user_link_table SET user_link_table.link_giver_id=?, user_link_table.doc_url= ?, user_link_table.target_link= ? WHERE  Link_id=? and User_ID=?`;
        const queryparams = [linkgiverid, input1, input2, Linkid, UserId];
        db.query(query, queryparams, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (err) {
        reject(err);
      }
    })();
  });
};

const sendemails = async (Linkid, UserId, input1) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `UPDATE user_link_table SET  user_link_table.email_info= ? WHERE  Link_id=? and User_ID=?`;
        const queryparams = [input1, Linkid, UserId];
        db.query(query, queryparams, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (err) {
        reject(err);
      }
    })();
  });
};

const publishlinks = async (Linkid, UserId, orderid, souurcelink, targetlink) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `INSERT INTO linkmonitor (OrderId, linkmonitor.status) VALUES ('${orderid}', 'Present'); UPDATE user_link_table SET source_link='${souurcelink}',target_link='${targetlink}' WHERE order_id = '${orderid}' AND user_link_table.PrimaryID <> 0 `;
        db.query(query, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (err) {
        reject(err);
      }
    })();
  });
};

const monitorlinks = async (UserId) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `select * from user_link_table as ul join linkmonitor on ul.order_id=linkmonitor.OrderId where ul.User_ID='${UserId}'`;
        db.query(query, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (err) {
        reject(err);
      }
    })();
  });
};

const orderidss = async (UserId) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `select user_link_table.order_id,user_link_table.link_added_on, website_data.Name from user_link_table   inner join website_data on website_data.WebsiteID=user_link_table.Link_id where user_link_table.User_ID='${UserId}' and  user_link_table.order_id IS NOT NULL`;
        db.query(query, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (err) {
        reject(err);
      }
    })();
  });
};

const getslandtls = async (UserId, orderid) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `select source_link,target_link  from user_link_table  where User_ID='${UserId}' and order_id='${orderid}'`;
        db.query(query, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (err) {
        reject(err);
      }
    })();
  });
};

const requestreworks = async (Linkid, UserId, input1, input2) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `UPDATE user_link_table SET  user_link_table.reuest_rework= ?,user_link_table.Notes= ? WHERE  Link_id=? and User_ID=?`;
        const queryparams = [input1, input2, Linkid, UserId];
        db.query(query, queryparams, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (err) {
        reject(err);
      }
    })();
  });
};

const rejects = async (Linkid, UserId, input1, input2) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `UPDATE user_link_table SET  user_link_table.reuest_rework= ?,user_link_table.detailed_reason= ? WHERE  Link_id=? and User_ID=?`;
        const queryparams = [input1, input2, Linkid, UserId];
        db.query(query, queryparams, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (err) {
        reject(err);
      }
    })();
  });
};

const orderedlinks = async (userid) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `SELECT * FROM linktable AS lt  JOIN user_link_table ON lt.Link_Id=user_link_table.Link_id WHERE user_link_table.User_ID='${userid}' AND user_link_table.order_id IS NOT NULL`;
        db.query(query, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (err) {
        reject(err);
      }
    })();
  });
};

const addlinkmonitors = async (Linkid, UserId, orderid, souurcelink, targetlink) => {
  const date = new Date(); // some mock date
  const d = new Date(date);
  const addedon = d.toDateString();

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `INSERT INTO linkmonitor (OrderId, linkmonitor.status) VALUES (${orderid},'Not Checked'); UPDATE user_link_table SET source_link='${souurcelink}',target_link='${targetlink}',link_added_on='${addedon}' WHERE order_id=${orderid} AND user_link_table.PrimaryID <> 0`;
        db.query(query, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (err) {
        reject(err);
      }
    })();
  });
};
// const query = `UPDATE user_link_table SET  user_link_table.order_id= ?,user_link_table.source_link= ?,user_link_table.target_link= ? WHERE  Link_id=? and User_ID=?`;
// const queryparams = [Linkid,UserId, orderid,souurcelink,targetlink,reltag];
const insertlinks = async (linkid, UserId, Archive) => {
  // const today = new Date();
  // const dateString = today.toISOString();
  const date = new Date(); // some mock date
  const d = new Date(date);
  const addedon = d.toDateString();
  const milliseconds = date.getTime();

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `INSERT INTO user_link_table(Link_id,User_ID,Archive,order_id,link_added_on) VALUES (${linkid},'${UserId}',${Archive},'${milliseconds}','${addedon}')`;
        db.query(query, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (err) {
        reject(err);
      }
    })();
  });
};

const iconindatabases = async (imagename) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `SELECT Icon FROM website_data WHERE website_data.Name='${imagename}'`;
        db.query(query, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (err) {
        reject(err);
      }
    })();
  });
};

const insericons = async (inserturl, imagename) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `UPDATE website_data SET Icon = '${inserturl}' WHERE website_data.Name='${imagename}' AND website_data.WebsiteID>0; `;
        db.query(query, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (err) {
        reject(err);
      }
    })();
  });
};

const getcounts = async (UserId) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `SELECT
        SUM(IF(status = 'In progress' , 1, 0)) AS Inprogress1,
        SUM(IF(status = 'Link Accepted (by Link Taker)', 1, 0)) AS Inprogress2,
        SUM(IF(status = 'Re-work', 1, 0)) AS Rework,
        SUM(IF(status = 'Link Created', 1, 0)) AS LinkCreated,
        SUM(IF(status = 'Re-Submitted after Re-work - Waiting for Approval (from Link Giver)', 1, 0)) AS Submitted1,
        SUM(IF(status = 'Submitted - Waiting for Approval (from Link Giver)', 1, 0)) AS Submitted2
        FROM user_link_table where User_ID='${UserId}'`;
        //  console.log(query);
        db.query(query, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (err) {
        reject(err);
      }
    })();
  });
};

const getcountstatuss = async (UserId) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `select status,count(*) as total from (select * from linkmonitor where OrderId in (select order_id from user_link_table where User_ID='${UserId}') group by OrderId order by checked_on desc) as test group by status;`;
        //  console.log(query);
        db.query(query, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (err) {
        reject(err);
      }
    })();
  });
};

module.exports = {
  userlinkss,
  useracceptedlinkss,
  linkgiverlinkss,
  linkcredentialss,
  savelinkss,
  statusupdates,
  getstatusupdates,
  feedbackupdates,
  exchangeinfos,
  acceptrequests,
  rejectrequests,
  insertioncontents,
  sendblogcontents,
  sendemails,
  publishlinks,
  requestreworks,
  rejects,
  orderedlinks,
  addlinkmonitors,
  monitorlinks,
  orderidss,
  getslandtls,
  insertlinks,
  iconindatabases,
  insericons,
  getcounts,
  getcountstatuss,
};
