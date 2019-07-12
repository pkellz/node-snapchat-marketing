function Media(snap)
{
  this.snap = snap;
  this.urls = {
    getMedia: 'https://adsapi.snapchat.com/v1/adaccounts',
    uploadMedia: 'https://adsapi.snapchat.com/v1/media'
  };
}

Media.prototype.createMedia = function(options, callback)
{
  if(typeof options === 'function')
    throw new Error('Must pass in options');

  this.snap.request(`${this.urls.getMedia}/${options.media[0].ad_account_id}/media`, { method: 'POST', body: JSON.stringify(options) }, callback);
};

Media.prototype.getAllMedia = function(ad_account_id, callback)
{
  if(typeof options === 'function')
    throw new Error('Must pass in options');

  this.snap.request(`${this.urls.getMedia}/${ad_account_id}/media`, { method: 'GET' }, callback);
};

// Media.prototype.uploadVideo = function(options, callback)
// {
//   if(typeof options === 'function')
//     throw new Error("Must pass in options")
//
//   if(!options.hasOwnProperty("media_id"))
//     throw new Error("Must pass in a media_id")
//
//     console.log(`${this.urls.uploadMedia}/${options.media_id}/upload`);
//   this.snap.request(`${this.urls.uploadMedia}/${options.media_id}/upload`, { method: "POST", headers: { "Content-Type": "multipart/form-data" },body: options.data }, callback);
// }

module.exports = Media;
