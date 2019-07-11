const Snap = require('../index');
const credentials = require('./credentials/keys.js');
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
