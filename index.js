const fetch = require("node-fetch")
function Snap({client_id, client_secret, code, grant_type, redirect_uri, response_type})
{
    this.options =
    {
      client_id,
      client_secret,
      grant_type,
      redirect_uri,
      response_type,
      urls: {
        authorize: `https://accounts.snapchat.com/login/oauth2/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`,
        accessToken: `https://accounts.snapchat.com/login/oauth2/access_token?grant_type=${grant_type}&client_secret=${client_secret}&client_id=${client_id}`,
        me: "https://adsapi.snapchat.com/v1/me",
        organizations: "https://adsapi.snapchat.com/v1/me/organizations",
        specificOrganization: "https://adsapi.snapchat.com/v1/organizations"
      },
      httpOptions: {}
    }
}

Snap.prototype.getAuthorizeUrl = function(scope)
{
  return this.options.urls.authorize + `&scope=${scope}`
}

Snap.prototype.getAccessToken = function(code, callback)
{
  if(typeof code === 'function')
    throw new Error("Must pass in a code")

  this.httpOptions = {
    method:'POST',
    headers :{
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }

  request(this.options.urls.accessToken + `&code=${code}`, this.httpOptions, callback)
}

Snap.prototype.me = function()
{
  this.httpOptions = {
    method:'GET',
    withCredentials:true,
    credentials:'include',
    headers : {
      'Authorization': 'Bearer ' + this.options.accessToken,
      'Content-Type': 'application/json'
    }
  }

  request(this.options.urls.me, this.httpOptions, callback)
}

Snap.prototype.getAllOrganizations = function(callback)
{
  this.httpOptions = {
    method:'GET',
    withCredentials:true,
    credentials:'include',
    headers : {
      'Authorization': 'Bearer ' + this.options.accessToken,
      'Content-Type': 'application/json'
    }
  }

  request(this.options.urls.organizations, this.httpOptions, callback)
}

Snap.prototype.getOrganizationById = function(id, callback)
{
  if (typeof id === 'function')
    throw new Error("Must pass in an ID")

  this.httpOptions = {
    method:'GET',
    withCredentials:true,
    credentials:'include',
    headers : {
      'Authorization': 'Bearer ' + this.options.accessToken,
      'Content-Type': 'application/json'
    }
  }

  request(this.options.urls.specificOrganization +`/${id}`, this.httpOptions, callback)
}

Snap.prototype.setAccessToken = function(accessToken)
{
  this.options.accessToken = accessToken
}

function request(url, options, callback)
{
    fetch(url, options).then(res => res.json()).then(resData => {
      if(resData.request_status === 'SUCCESS')
        callback(null, resData)
      else
        callback(resData, null)
    })
}

module.exports = Snap
