const { db } = require('../dbconfig');

const userlinkss = async (userid) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = ` select * from website_data as wd inner join (SELECT * FROM linktable where Link_Id not in (select Link_id from user_link_table where User_ID='${userid}')) as lt on lt.WebsiteId=wd.WebsiteID and wd.Link_level=1`;
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

const useracceptedlinkss = async (userid) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        // const query = `select * from website_data as wd inner join  (select WebsiteId, Link_Type,contact_method,Cost_usd,Link_category,Rel_Attribute,Google_Indexed,Content_Guidelines,Self_Publish,SPM_Instantapproval,SPM_Probability,Price_gb_usd,Price_gbcbd_usd,linkly_credits,content_type,next_steps, Price_LinkInsertion_usd,Price_LinkInsertioncbd_usd, Link_Status,Work_Required from linktable as lt inner join (select * from user_link_table where User_ID='${userid}' and Archive=1) as ult on lt.Link_Id=ult.Link_id ) as md on wd.WebsiteID=md.WebsiteId  and wd.Link_level=1`;
        const query = `select * from website_data as wd inner join  (select lt.Link_Id ,WebsiteId, Link_Type,contact_method,Cost_usd,Link_category,Rel_Attribute,Google_Indexed,Content_Guidelines,Self_Publish,SPM_Instantapproval,SPM_Probability,Price_gb_usd,Price_gbcbd_usd,linkly_credits,content_type,next_steps, Price_LinkInsertion_usd,Price_LinkInsertioncbd_usd, Link_Status,Work_Required from linktable as lt inner join (select * from user_link_table where User_ID='${userid}' and Archive=1) as ult on lt.Link_Id=ult.Link_id ) as md on wd.WebsiteID=md.WebsiteId  and wd.Link_level=1
        `;
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
        const query = `select * from website_data as wd inner join  (select lt.Link_Id,WebsiteId, Link_Type,contact_method,Cost_usd,Link_category,Rel_Attribute,Google_Indexed,Content_Guidelines,Self_Publish,SPM_Instantapproval,SPM_Probability,Price_gb_usd,Price_gbcbd_usd,linkly_credits,content_type,next_steps, Price_LinkInsertion_usd,Price_LinkInsertioncbd_usd, Link_Status,Work_Required from linktable as lt inner join (select * from user_link_table where User_ID='${userid}' and link_giver_id='${userid}' and Archive=1) as ult on lt.Link_Id=ult.Link_id ) as md on wd.WebsiteID=md.WebsiteId  and wd.Link_level=1`;
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

const savelinkss = async (userid, linkid, username, password, imageurl) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `INSERT INTO user_link_table (username,password,image_url)VALUES (${username},${password},${imageurl} where Link_id=${linkid} and User_ID=${userid})`;
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
const statusupdates = async (status, getid, getwebid) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `UPDATE user_link_table SET user_link_table.status= ? WHERE Link_id=? and User_ID=?`;
        const queryparams = [status, getwebid, getid];
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

const exchangeinfos = async (Linkid, UserId, input1, input2) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `UPDATE user_link_table SET user_link_table.exchange_url= ?, user_link_table.exchange_topics= ? WHERE Link_id=? and User_ID=?`;
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

const sendblogcontents = async (Linkid, UserId, input1, input2) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `UPDATE user_link_table SET user_link_table.link_giver_id=?, user_link_table.doc_url= ?, user_link_table.target_link= ? WHERE  Link_id=? and User_ID=?`;
        const queryparams = [UserId, input1, input2, Linkid, UserId];
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

const publishlinks = async (Linkid, UserId, input1) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `UPDATE user_link_table SET  user_link_table.source_link= ? WHERE  Link_id=? and User_ID=?`;
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

const orderedlinks = async () => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `select * from linktable as lt inner join( select ult.Link_id, ult.User_ID,ult.status, ult.feedback,ult.Notes,ult.link_giver_id,ult.exchange_url, ult.exchange_topics,ult.doc_url,ult.source_link,ult.reason_for_rework,ult.reason_for_rejection,ult.target_link,ult.order_id,ult.amout_paid from user_link_table as ult inner join linkmonitor on  ult.order_id=linkmonitor.OrderId) as md on lt.Link_Id=md.Link_id`;
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

const addlinkmonitors = async (Linkid, UserId, input1, input2, input3) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `INSERT INTO user_link_table (order_id, source_link, target_link)
        OUTPUT inserted.order_id, inserted.source_link, inserted.target_link
        INTO linkmonitor(OrderId,status)
        VALUES('${input1}','${input2}','${input3}'), ('${input1}','${input1}','PRESENT')
        GO`;
        // const query = `UPDATE user_link_table SET  user_link_table.order_id= ?,user_link_table.source_link= ?,user_link_table.target_link= ? WHERE  Link_id=? and User_ID=?`;
        const queryparams = [input1, input2, input3, Linkid, UserId];
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

const insertlinks = async (linkid, UserId, Archive) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `INSERT INTO user_link_table(Link_id,User_ID,Archive) VALUES (${linkid},'${UserId}',${Archive}) `;
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
  feedbackupdates,
  exchangeinfos,
  insertioncontents,
  sendblogcontents,
  publishlinks,
  requestreworks,
  rejects,
  orderedlinks,
  addlinkmonitors,
  insertlinks,
};
