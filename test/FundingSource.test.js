const Snap = require('../index');
const credentials = require('./credentials/keys.js');
const TEST_ORGANIZATION_ID = process.env.TEST_ORGANIZATION_ID;
const TEST_FUNDING_SOURCE_ID = '';
const snap = new Snap({
  client_id: credentials.CLIENT_ID,
  client_secret: credentials.CLIENT_SECRET,
  redirect_uri: credentials.REDIRECT_URI
});

snap.setRefreshToken(credentials.REFRESH_TOKEN);

describe('@FundingSource', function(){
  it('should get all funding sources', done => {
    snap.fundingsource.getAll(TEST_ORGANIZATION_ID, function(err, sources)
    {
      expect(err).toBeNull();
      expect(sources).not.toBeNull();
      done();
    });
  });

  // it('should get a funding source by Id', done => {
  //   snap.fundingsource.getById(TEST_FUNDING_SOURCE_ID, function(err, source)
  //   {
  //     console.log(source);
  //     expect(err).toBeNull();
  //     expect(source).not.toBeNull();
  //     done();
  //   });
  // });
});
