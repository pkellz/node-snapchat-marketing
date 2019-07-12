const Snap = require('../index');
const credentials = require('./credentials/keys.js');
const TEST_ACCOUNT_ID = '';
const TEST_CAMPAIGN_ID = '';
const snap = new Snap({
  client_id: credentials.CLIENT_ID,
  client_secret: credentials.CLIENT_SECRET,
  redirect_uri: credentials.REDIRECT_URI
});

snap.setRefreshToken(credentials.REFRESH_TOKEN);

// TODO - Update Campaign
describe('@Campaign', function(){
  it('should create a new Campaign', done => {
    snap.campaign.createCampaign(TEST_ACCOUNT_ID, function(err, campaign){
      console.log(campaign);
      expect(err).toBeNull();
      expect(campaign).not.toBeNull();
      done();
    });
  });

  it('should delete a specific Campaign by Id', done => {
    snap.campaign.deleteCampaign(TEST_CAMPAIGN_ID, function(err, campaigns){
      console.log(campaigns);
      expect(err).toBeNull();
      expect(campaigns).not.toBeNull();
      done();
    });
  });

  it('should get all Campaigns from an Ad Account Id', done => {
    snap.campaign.getAllCampaigns(TEST_ACCOUNT_ID, function(err, campaigns){
      console.log(campaigns.campaigns[0]);
      expect(err).toBeNull();
      expect(campaigns).not.toBeNull();
      done();
    });
  });

  it('should get a specific Campaign by Id', done => {
    snap.campaign.getCampaignById(TEST_CAMPAIGN_ID, function(err, campaign){
      console.log(campaign);
      expect(err).toBeNull();
      expect(campaign).not.toBeNull();
      done();
    });
  });
});
