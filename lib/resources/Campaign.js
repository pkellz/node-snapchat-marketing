function Campaign(snap)
{
  this.snap = snap;
  this.urls = {
    allCampaigns: 'https://adsapi.snapchat.com/v1/adaccounts',
    specificCampaign: 'https://adsapi.snapchat.com/v1/campaigns'
  };
}

Campaign.prototype.create = function(ad_account_id, callback)
{
  if (typeof ad_account_id === 'function')
    throw new Error('Must pass in an a Ad Account Id');

  let camp = {'campaigns': [{'name': 'Cool Campaign', 'ad_account_id': ad_account_id, 'status': 'PAUSED', 'start_time': '2016-08-11T22:03:58.869Z'}]};

  this.snap.request(`${this.urls.allCampaigns}/${ad_account_id}/campaigns`, { method: 'POST', body:JSON.stringify(camp) }, callback);
};

Campaign.prototype.getAll = function(ad_account_id, callback)
{
  if(typeof ad_account_id === 'function')
    throw new Error('Must pass in an Ad Account Id');

  this.snap.request(`${this.urls.allCampaigns}/${ad_account_id}/campaigns`, { method: 'GET' }, callback);
};

Campaign.prototype.update = function(options, callback)
{
  if(typeof options === 'function')
    throw new Error('Must pass in options for the Campaign');

  // TODO Figure out the options logic
  this.snap.request(`${this.urls.allCampaigns}/${options.ad_account_id}/campaigns`, { method: 'PUT' }, callback);
};

Campaign.prototype.delete = function(campaign_id, callback)
{
  if (typeof campaign_id === 'function')
    throw new Error('Must pass in an a Campaign Id');

  this.snap.request(`${this.urls.specificCampaign}/${campaign_id}`, { method: 'DELETE' }, callback);
};

Campaign.prototype.getById = function(campaign_id, callback)
{
  if (typeof campaign_id === 'function')
    throw new Error('Must pass in an a Campaign Id');

  this.snap.request(`${this.urls.specificCampaign}/${campaign_id}`, { method: 'GET' }, callback);
};

module.exports = Campaign;
