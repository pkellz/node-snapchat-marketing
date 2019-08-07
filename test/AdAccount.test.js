const Snap = require('../index');
const credentials = require('./credentials/keys.js');
const TEST_ORGANIZATION_ID = '';
const TEST_ACCOUNT_ID = '';
const snap = new Snap({
  client_id: credentials.CLIENT_ID,
  client_secret: credentials.CLIENT_SECRET,
  redirect_uri: credentials.REDIRECT_URI
});

snap.setRefreshToken(credentials.REFRESH_TOKEN);

describe('@AdAccount', function()
{
  it('should get all Ad Accounts', done => {
    snap.adaccount.getAll(TEST_ORGANIZATION_ID, function(err, accounts)
    {
      console.log(accounts);
      expect(err).toBeNull();
      expect(accounts).not.toBeNull();
      done();
    });
  });

  it('should get an Ad Account by Id', done => {
    snap.adaccount.getById(TEST_ACCOUNT_ID, function(err, account)
    {
      console.log(account);
      expect(err).toBeNull();
      expect(account).not.toBeNull();
      done();
    });
  });
});
