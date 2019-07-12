function FundingSource(snap)
{
  this.snap = snap;
  this.urls = {
    allFundingSources: 'https://adsapi.snapchat.com/v1/organizations',
    specificFundingSource: 'https://adsapi.snapchat.com/v1/fundingsources'
  };
}

FundingSource.prototype.getAllFundingSources = function(org_id, callback)
{
  if(typeof org_id === 'function')
    throw new Error('Must pass in an Organization Id');

  this.snap.request(`${this.urls.allFundingSources}/${org_id}/fundingsources`, { method: 'GET' }, callback);
};

FundingSource.prototype.getFundingSourceById = function(source_id, callback)
{
  if (typeof id === 'function')
    throw new Error('Must pass in an a Funding Source Id');

  this.snap.request(`${this.urls.specificFundingSource}/${source_id}`, { method: 'GET' }, callback);
};

module.exports = FundingSource;
