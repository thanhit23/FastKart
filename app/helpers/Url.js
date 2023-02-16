const readParamsFromUrl = url => {
  let result = [];
  url.replace(/[?&]+([^-&]+)=([^&]*)/gi, (_, key, value) => {
    result[key] = value;
  })
  return result;
}

const readParams = (url, name) => {
  const param = readParamsFromUrl(url);

  return param[name];
}

module.exports = {
  readParamsFromUrl,
  readParams,
}
