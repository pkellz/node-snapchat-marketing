function AdAccount(snap)
{
  this.snap = snap;
  this.urls = {
    allAdAccounts: 'https://adsapi.snapchat.com/v1/organizations',
    specificAdAccount: 'https://adsapi.snapchat.com/v1/adaccounts'
  };
}

AdAccount.prototype.getAllAdAccounts = function(org_id, callback)
{
  if(typeof org_id === 'function')
    throw new Error('Must pass in an Ad Account Id');

  this.snap.request(`${this.urls.allAdAccounts}/${org_id}/adaccounts`, { method: 'GET' }, callback);
};

AdAccount.prototype.getAdAccountById = function(ad_account_id, callback)
{
  if (typeof ad_account_id === 'function')
    throw new Error('Must pass in an a Funding Source Id');

  this.snap.request(`${this.urls.specificAdAccount}/${ad_account_id}`, { method: 'GET' }, callback);
};

AdAccount.prototype.updateSpendCap = function(source_id, callback) {};

module.exports = AdAccount;
