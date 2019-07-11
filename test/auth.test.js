const Snap = require('../index');
const credentials = require('../auth/keys.js');
const TEST_ACCOUNT_ID = 'bef966c1-6666-4d88-b962-fc3e5da0e0a4';
const snap = new Snap({
	client_id: credentials.CLIENT_ID,
	client_secret: credentials.CLIENT_SECRET,
	redirect_uri: credentials.REDIRECT_URI
});

snap.setRefreshToken(credentials.REFRESH_TOKEN);

it('should refresh expired access tokens', async done => {
	snap._setAccessToken('');
	await snap.refreshAccessToken().then(()=>{
		expect(snap.accessToken).not.toBe('');
		done();
	});
});
