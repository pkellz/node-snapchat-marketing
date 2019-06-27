function Organization(snap)
{
  this.snap = snap;
  this.httpOptions = {};
  this.urls = {
    orgs: "https://adsapi.snapchat.com/v1/me/organizations",
    specificOrg: "https://adsapi.snapchat.com/v1/organizations"
  };
}

Organization.prototype.getAllOrganizations = function(callback)
{
  this.httpOptions = {
    method:'GET',
    withCredentials:true,
    credentials:'include',
    headers : {
      'Authorization': 'Bearer ' + this.snap.options.accessToken,
      'Content-Type': 'application/json'
    }
  }

  this.snap.request(this.urls.orgs, this.httpOptions, callback);
};

Organization.prototype.getOrganizationById = function(id, callback)
{
  if (typeof id === 'function')
    throw new Error("Must pass in an ID");

  this.httpOptions = {
    method:'GET',
    withCredentials:true,
    credentials:'include',
    headers : {
      'Authorization': 'Bearer ' + this.snap.options.accessToken,
      'Content-Type': 'application/json'
    }
  };

  this.snap.request(this.urls.specificOrg +`/${id}`, this.httpOptions, callback);
};

module.exports = Organization;
