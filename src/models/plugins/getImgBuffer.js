const { Buffer } = require('buffer');
const axios = require('axios').default;

const getImgBuffer = async (url) => {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const base64 = Buffer.from(response.data, 'base64');
  return {
    buffer: base64,
    contentType: response.headers['content-type'],
  };
};

module.exports = {
  getImgBuffer,
};
