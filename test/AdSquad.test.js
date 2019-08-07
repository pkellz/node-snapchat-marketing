const Snap = require('../index');
const credentials = require('./credentials/keys.js');
const TEST_ORGANIZATION_ID = '';
const TEST_ACCOUNT_ID = '';
const TEST_CAMPAIGN_ID = '';
const snap = new Snap({
  client_id: credentials.CLIENT_ID,
  client_secret: credentials.CLIENT_SECRET,
  redirect_uri: credentials.REDIRECT_URI
});

snap.setRefreshToken(credentials.REFRESH_TOKEN);

describe('@AdSquad', function()
{
  it('should get all Ad Squads (By Campaign)', done => {
    snap.adsquad.getAll(TEST_CAMPAIGN_ID, function(err, squads)
    {
      console.log(squads);
      expect(err).toBeNull();
      expect(squads).not.toBeNull();
      done();
    });
  });

  it('should get all Ad Squads (By Ad Account)', done => {
    snap.adsquad.getAllByAccountId(TEST_ACCOUNT_ID, function(err, squads)
    {
      console.log(squads);
      expect(err).toBeNull();
      expect(squads).not.toBeNull();
      done();
    });
  });
});
