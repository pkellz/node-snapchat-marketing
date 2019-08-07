function AdSquad(snap)
{
  this.snap = snap;
  this.urls = {
    allAdSquadsCampaign: 'https://adsapi.snapchat.com/v1/campaigns',
    allAdSquadsAdAccount: 'https://adsapi.snapchat.com/v1/adaccounts',
    specificAdSquad: 'https://adsapi.snapchat.com/v1/adsquads'
  };
}

AdSquad.prototype.create = function(campaign_id, callback)
{
  if(typeof campaign_id === 'function')
    throw new Error('Must pass in an Campaign Id');

  let squad = {'adsquads': [{'campaign_id': campaign_id, 'name': 'Ad Squad 1', 'type': 'SNAP_ADS', 'placement': 'SNAP_ADS', 'optimization_goal': 'IMPRESSIONS', 'bid_micro': 1000000, 'daily_budget_micro': 1000000000, 'billing_event': 'IMPRESSION', 'targeting': {'geos': [{'country_code': 'us'}]}, 'start_time': '2016-08-11T22:03:58.869Z' }]};

  this.snap.request(`${this.urls.allAdSquadsCampaign}/${campaign_id}/adsquads`, { method: 'POST', body:JSON.stringify(squad) }, callback);
};

AdSquad.prototype.update = function(campaign_id, callback)
{
  if(typeof campaign_id === 'function')
    throw new Error('Must pass in an Campaign Id');

  let squad = {'adsquads': [{'campaign_id': campaign_id, 'name': 'Ad Squad 1', 'type': 'SNAP_ADS', 'placement': 'SNAP_ADS', 'optimization_goal': 'IMPRESSIONS', 'bid_micro': 1000000, 'daily_budget_micro': 1000000000, 'billing_event': 'IMPRESSION', 'targeting': {'geos': [{'country_code': 'us'}]}, 'start_time': '2016-08-11T22:03:58.869Z' }]};

  this.snap.request(`${this.urls.allAdSquadsCampaign}/${campaign_id}/adsquads`, { method: 'PUT', body:JSON.stringify(squad) }, callback);
};

AdSquad.prototype.getAll = function(campaign_id, callback)
{
  if(typeof campaign_id === 'function')
    throw new Error('Must pass in an Campaign Id');

  this.snap.request(`${this.urls.allAdSquadsCampaign}/${campaign_id}/adsquads`, { method: 'GET' }, callback);
};

AdSquad.prototype.getAllByAccountId = function(ad_account_id, callback)
{
  if(typeof ad_account_id === 'function')
    throw new Error('Must pass in an Ad Account Id');

  this.snap.request(`${this.urls.allAdSquadsAdAccount}/${ad_account_id}/adsquads`, { method: 'GET' }, callback);
};

AdSquad.prototype.getById = function(ad_squad_id, callback)
{
  if (typeof ad_squad_id === 'function')
    throw new Error('Must pass in an Ad Squad Id');

  this.snap.request(`${this.urls.specificAdSquad}/${ad_squad_id}`, { method: 'GET' }, callback);
};

AdSquad.prototype.delete = function(ad_squad_id, callback)
{
  if (typeof ad_squad_id === 'function')
    throw new Error('Must pass in an Ad Squad Id');

  this.snap.request(`${this.urls.specificAdSquad}/${ad_squad_id}`, { method: 'DELETE' }, callback);
};

module.exports = AdSquad;
