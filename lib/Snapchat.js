const fetch = require("node-fetch");
const resources = {
  Media: require('./resources/Media'),
  Organization: require('./resources/Organization')
};

function Snap({client_id, client_secret, code, redirect_uri, response_type})
{
  this.options =
  {
    client_id,
    client_secret,
    redirect_uri,
    response_type,
    accessToken: "",
    refreshToken: "",
    tokenExpiration: 0,
    accessTokenLastSet: 0,
    urls: {
      authorize: `https://accounts.snapchat.com/login/oauth2/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`,
      accessToken: `https://accounts.snapchat.com/login/oauth2/access_token?client_secret=${client_secret}&client_id=${client_id}`,
      me: "https://adsapi.snapchat.com/v1/me"
    },
  };

  this.httpOptions = {};
  this.initResources(resources);
};

Snap.prototype.initResources = function(resources)
{
  for(let res in resources)
  {
    const boundResource = resources[res].bind(null, this);
    this[res.toLowerCase()] = new boundResource;
  }
};

Snap.prototype.getAuthorizeUrl = function(scope)
{
  return this.options.urls.authorize + `&scope=${scope}`;
};

Snap.prototype.authorization = function(options, callback)
{
  if(typeof options === 'function')
    throw new Error("No authorization_code or refresh_token");

  let grantType = '';
  let code = '';

  if(options.hasOwnProperty('authorization_code'))
  {
    grantType = 'authorization_code';
    code = options.authorization_code;
  }
  else if(options.hasOwnProperty('refresh_token'))
  {
    grantType = 'refresh_token';
    code = options.refresh_token;
  }
  else
    throw new Error("No authorization_code or refresh_token");

  this.httpOptions = {
    method:'POST',
    headers :{
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  };

  this.oauthRequest(this.options.urls.accessToken + `&code=${code}&grant_type=${grantType}`, this.httpOptions, callback);
};

Snap.prototype.me = function(callback)
{
  this.httpOptions = {
    method:'GET',
    withCredentials:true,
    credentials:'include',
    headers : {
      'Authorization': 'Bearer ' + this.options.accessToken,
      'Content-Type': 'application/json'
    }
  };

  this.request(this.options.urls.me, this.httpOptions, callback);
};

Snap.prototype.setAccessToken = function(accessToken)
{
  this.options.accessToken = accessToken;
};

Snap.prototype.setRefreshToken = function(refreshToken)
{
  this.options.refreshToken = refreshToken;
};

Snap.prototype.refreshAccessToken = function()
{
  this.authorization({ refresh_token: this.options.refreshToken }, null);
}

Snap.prototype.request = async function(url, options, callback)
{
  if (!this.options.accessToken)
    throw new Error("Access Token Not Set");

  if (this.isTokenStale())
    await this.refreshAccessToken()

  fetch(url, options).then(res => res.json()).then(resData => {
    if(resData.request_status === 'SUCCESS')
      callback(null, resData);
    else
      callback(resData, null);
  })
  .catch(err => {
    callback(err, null);
  });
};

Snap.prototype.oauthRequest = function(url, options, callback)
{
  fetch(url, options).then(res => res.json()).then(tokenData => {
    if(tokenData.access_token)
    {
      this.setAccessToken(tokenData.access_token);
      this.options.accessTokenLastSet = Date.now();
      this.options.tokenExpiration = (new Date().getSeconds() + tokenData.expires_in) * 1000;

      if(tokenData.refresh_token)
        this.setRefreshToken(tokenData.refresh_token);

      callback && callback(null, tokenData);
    }
    else
      callback && callback(tokenData, null);
  })
  .catch(err => {
    callback && callback(err, null);
  });
}

Snap.prototype.isTokenStale = function()
{
  return Date.now() - (this.options.accessTokenLastSet + this.options.tokenExpiration) > this.options.tokenExpiration
};

module.exports = Snap;
