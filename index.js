const fetch = require("node-fetch")
function Snap({client_id, client_secret, code, grant_type, redirect_uri, response_type})
{
    this.client_id = client_id
    this.client_secret = client_secret
    this.grant_type = grant_type
    this.redirect_uri = redirect_uri
    this.response_type = response_type
}

Snap.prototype.setAccessToken = function(accessToken)
{
  this.accessToken = accessToken
}

Snap.prototype.getAuthorizeUrl = function(scope)
{
  console.log(this);
  let url = "https://accounts.snapchat.com/login/oauth2/authorize?"
  url += `client_id=${this.client_id}&`
  url += `redirect_uri=${this.redirect_uri}&`
  url += `response_type=${this.response_type}&`
  url += `scope=${scope}`
  return url
}

Snap.prototype.getAccessToken = function(code)
{
  return new Promise((resolve, reject) => {
    const fetchAccessTokenUrl = `https://accounts.snapchat.com/login/oauth2/access_token?grant_type=${this.grant_type}&client_secret=${this.client_secret}&client_id=${this.client_id}&code=${code}`
    fetch(fetchAccessTokenUrl,{
      method:'POST',
      headers :{
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer',
    })
    .then(res => res.json())
    .then(token => {
      this.accessToken = token.access_token
      resolve(token)
    })
    .catch(err => {
      reject(err)
    })
  })
}

Snap.prototype.me = function()
{
  return new Promise((resolve, reject)=>{
    fetch('https://adsapi.snapchat.com/v1/me',{
      method:'GET',
      withCredentials:true,
      credentials:'include',
      headers : {
        'Authorization': 'Bearer ' + this.accessToken,
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(user => {
      resolve(user)
    })
    .catch(err => {
      reject(err)
    })
  })
}

Snap.prototype.getAllOrganizations = function(options)
{
  let getAllOrganizationsUrl = "https://adsapi.snapchat.com/v1/me/organizations"
  if(options.withAdAccounts)
    getAllOrganizationsUrl += "?with_ad_accounts?true"
  return new Promise((resolve, reject)=>{
    fetch(getAllOrganizationsUrl,{
      method:'GET',
      withCredentials:true,
      credentials:'include',
      headers : {
        'Authorization': 'Bearer ' + this.accessToken,
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(orgs => {
      resolve(orgs)
    })
    .catch(err => {
      reject(err)
    })
  })
}

Snap.prototype.getOrganizationById = function(id)
{
  return new Promise((resolve, reject)=>{
    fetch(`https://adsapi.snapchat.com/v1/organizations/${id}`,{
      method:'GET',
      withCredentials:true,
      credentials:'include',
      headers : {
        'Authorization': 'Bearer ' + this.accessToken,
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(orgs => {
      resolve(orgs)
    })
    .catch(err => {
      reject(err)
    })
  })
}

module.exports = Snap
