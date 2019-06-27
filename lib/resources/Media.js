function Media(snap)
{
    this.snap = snap;
    this.httpOptions = {};
    this.url = "https://adsapi.snapchat.com/v1/adaccounts";
}

Media.prototype.createMedia = function(options, callback)
{
  if(typeof options === 'function')
    throw new Error("Must pass in options");

    this.httpOptions = {
    method:'POST',
    withCredentials:true,
    credentials:'include',
    headers : {
      'Authorization': 'Bearer ' + this.snap.options.accessToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(options)
  };

  this.snap.request(this.url+`/${options.media[0].ad_account_id}/media`, this.httpOptions, callback);
};

Media.prototype.getAllMedia = function(ad_account_id, callback)
{
  if(typeof options === 'function')
    throw new Error("Must pass in options");

  this.httpOptions = {
    method:'GET',
    withCredentials:true,
    credentials:'include',
    headers : {
      'Authorization': 'Bearer ' + this.snap.options.accessToken,
      'Content-Type': 'application/json'
    }
  };

  this.snap.request(this.url +`/${ad_account_id}/media`, this.httpOptions, callback);
};

module.exports = Media;
