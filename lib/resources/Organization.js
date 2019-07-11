function Organization(snap)
{
	this.snap = snap;
	this.urls = {
		orgs: 'https://adsapi.snapchat.com/v1/me/organizations',
		specificOrg: 'https://adsapi.snapchat.com/v1/organizations'
	};
}

Organization.prototype.getAllOrganizations = function(options, callback)
{
	let organizationsUrl = this.urls.orgs;

	if(typeof options === 'function')
		callback = options;
	else if(options.hasOwnProperty('withAdAccounts'))
		organizationsUrl += '?with_ad_accounts?true';

	this.snap.request(organizationsUrl, { method: 'GET' }, callback);
};

Organization.prototype.getOrganizationById = function(id, callback)
{
	if (typeof id === 'function')
		throw new Error('Must pass in an ID');

	this.snap.request(`${this.urls.specificOrg}/${id}`, { method: 'GET' }, callback);
};

module.exports = Organization;
