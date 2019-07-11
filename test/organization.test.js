const Snap = require('../index');
const credentials = require('../auth/keys.js');
const TEST_ORGANIZATION_ID = '581a23ce-309b-4bcd-86b2-bc9df51f78e5';
const snap = new Snap({
	client_id: credentials.CLIENT_ID,
	client_secret: credentials.CLIENT_SECRET,
	redirect_uri: credentials.REDIRECT_URI
});

snap.setRefreshToken(credentials.REFRESH_TOKEN);

it('should get all organizations', done => {
	snap.organization.getAllOrganizations(function(err, orgs)
	{
		expect(err).toBeNull();
		expect(orgs).not.toBeNull();
		done();
	});
});

it('should get an organization by id', done => {
	snap.organization.getOrganizationById(TEST_ORGANIZATION_ID, function(err, org)
	{
		expect(err).toBeNull();
		expect(org).not.toBeNull();
		done();
	});
});
