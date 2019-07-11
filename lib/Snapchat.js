const fetch = require('node-fetch');
const resources = {
  Media: require('./resources/Media'),
  Organization: require('./resources/Organization')
};

function Snap({ client_id, client_secret, redirect_uri })
{
  this.options =
  {
  	credentials: {
  		client: {
  			id: client_id,
  			secret: client_secret
  		},
  		auth: {
  			tokenHost: 'https://accounts.snapchat.com',
  			tokenPath:'/login/oauth2/access_token'
  		},
  		options: {
  			authorizationMethod: 'body'
  		}
  	},
  	redirect_uri,
  	accessToken: '',
  	refreshToken: '',
  	tokenExpiration: 0,
  	accessTokenLastSet: 0,
  	baseHttpOptions: {
  		withCredentials:true,
  		credentials:'include',
  		headers : {
  			'Content-Type': 'application/json'
  		}
  	},
  	urls: {
  		authorize: `https://accounts.snapchat.com/login/oauth2/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`,
  		me: 'https://adsapi.snapchat.com/v1/me'
  	}
  };
  this.oauth2 = require('simple-oauth2').create(this.options.credentials);
  initResources.call(this, resources);
}

function initResources(resources)
{
  for(let res in resources)
  {
    const boundResource = resources[res].bind(null, this);
    this[res.toLowerCase()] = new boundResource;
  }
}

Snap.prototype.getAuthorizeUrl = function(scope)
{
  return this.options.urls.authorize + `&scope=${scope}`;
};

Snap.prototype.authorization = async function(options, callback)
{
  if(typeof options === 'function')
    throw new Error('No authorization_code or refresh_token');

  const tokenConfig = {
    code: options.authorization_code,
    redirect_uri: this.options.redirect_uri
  };

  try
  {
    const result = await this.oauth2.authorizationCode.getToken(tokenConfig);
    const tokenData = this.oauth2.accessToken.create(result).token;

    this._setAccessToken(tokenData.access_token);
    this.setRefreshToken(tokenData.refresh_token);
    this.options.accessTokenLastSet = Date.now();
    this.options.tokenExpiration = (new Date().getSeconds() + tokenData.expires_in) * 1000;

    callback(null,tokenData);
  }
  catch (error)
  {
    callback(error, null);
  }
};



Snap.prototype.me = function(callback)
{
  this.request(this.options.urls.me, { method: 'GET' }, callback);
};

Snap.prototype._setAccessToken = function(accessToken)
{
  this.options.accessToken = accessToken;
};

Snap.prototype.setRefreshToken = function(refreshToken)
{
  this.options.refreshToken = refreshToken;
};

Snap.prototype.refreshAccessToken = async function()
{
  let accessToken = this.oauth2.accessToken.create({
    refresh_token: this.options.refreshToken
  });

  try
  {
		  await accessToken.refresh().then(tokenData =>{
      this._setAccessToken(tokenData.token.access_token);
      this.options.accessTokenLastSet = Date.now();
      this.options.tokenExpiration = (new Date().getSeconds() + tokenData.token.expires_in) * 1000;
    })
      .catch(err => {
        throw new Error(err);
      });
  }
  catch (error)
  {
    throw new Error('Error refreshing access token: ', error.message);
  }
};

Snap.prototype.request = async function(url, options, callback)
{
  if (this.isTokenStale())
    await this.refreshAccessToken();

  options = Object.assign({}, this.options.baseHttpOptions, options);
  options.headers.Authorization = 'Bearer ' + this.options.accessToken;

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

Snap.prototype.isTokenStale = function()
{
  return Date.now() - (this.options.accessTokenLastSet + this.options.tokenExpiration) > this.options.tokenExpiration;
};

module.exports = Snap;
