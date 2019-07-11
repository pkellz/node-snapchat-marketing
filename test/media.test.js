const Snap = require('../index');
const credentials = require('../auth/keys.js');
const TEST_ACCOUNT_ID = 'bef966c1-6666-4d88-b962-fc3e5da0e0a4';
const snap = new Snap({
	client_id: credentials.CLIENT_ID,
	client_secret: credentials.CLIENT_SECRET,
	redirect_uri: credentials.REDIRECT_URI
});

snap.setRefreshToken(credentials.REFRESH_TOKEN);

it('should create a new Media', done => {
	const newMedia = {
		media: [
			{ name:'Randoooo', type:'VIDEO', ad_account_id: TEST_ACCOUNT_ID }
		]
	};

	snap.media.createMedia(newMedia, function(err, res){
		expect(err).toBeNull();
		expect(res).not.toBeNull();
		done();
	});
});

it('should get all Media for the authenticated account', done => {
	snap.media.getAllMedia(TEST_ACCOUNT_ID, function(err,res)
	{
		expect(err).toBeNull();
		expect(res).not.toBeNull();
		done();
	});
});
