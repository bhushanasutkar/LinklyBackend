const { db } = require('../dbconfig');

const userlinkss = async (userid) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = ` select * from website_data as wd inner join (SELECT * FROM linktable where Link_Id not in (select Link_id from user_link_table where User_ID=${userid})) as lt on lt.WebsiteId=wd.WebsiteID and wd.Link_level=1`;
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
        const query = `select * from website_data as wd inner join  (select WebsiteId, Link_Type,Cost_usd,Link_category,Rel_Attribute,Google_Indexed,Content_Guidelines,Self_Publish,SPM_Instantapproval,SPM_Probability,Price_gb_usd,Price_gbcbd_usd,linkly_credits,content_type,next_steps, Price_LinkInsertion_usd,Price_LinkInsertioncbd_usd, Link_Status,Work_Required from linktable as lt inner join (select * from user_link_table where User_ID=${userid} and Archive=1) as ult on lt.Link_Id=ult.Link_id ) as md on wd.WebsiteID=md.WebsiteId  and wd.Link_level=1`;
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

const feedbackupdates = async (feedback, getid, getwebid) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `UPDATE user_link_table SET user_link_table.feedback= ? WHERE Link_id=? and User_ID=?`;
        const queryparams = [feedback, getwebid, getid];
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
        const query = `INSERT INTO user_link_table(Link_id,User_ID,Archive) VALUES (${linkid},${UserId},${Archive}) `;
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
  linkcredentialss,
  savelinkss,
  statusupdates,
  feedbackupdates,
  insertlinks,
};
