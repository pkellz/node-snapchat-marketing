# Snapchat Marketing Node.js Wrapper
:ghost: Unoffical Node library for the Snapchat Marketing API

### Looking for more contributors!
[Snapchat Marketing API Documentation](https://developers.snapchat.com/api/docs/)

## :wrench: Installation

Before you begin, you need to apply for access to the [Snapchat Marketing API](https://developers.snapchat.com/apply/). Once you are approved, you will be able to register a new application in the 'Business Details' section of your [Snapchat Business Account](https://business.snapchat.com/). Notice that the app gets a client ID, secret, and redirect URI required for authenticating with the API.

If you reach an error page when trying to access your Business Account, try disabling any ad-blockers you might have.

After registering your application, you need to install this module in your Node.js project:

```sh
npm install node-snapchat-marketing
```

## :arrow_forward: Initialization

In order to use this module, you have to import it in your application first:

```javascript
var snap = require('node-snapchat-marketing');
```

Next, initialize the Snap object with the keys you obtained from the [Snapchat business dashboard](https://business.snapchat.com/):

```javascript
const snap = new Snap({
  client_id: '<CLIENT_ID>',
  client_secret: '<CLIENT_SECRET>',
  redirect_uri: '<REDIRECT_URI>',
});
```

## :key: Authenticating

To make HTTP calls, you need to create an authenticated session with the API.

### Step One: Authorize

To obtain an OAuth token, you have to authorize your application with the required scope. The only scope currently available is 'snapchat-marketing-api'.

You are initially required to redirect your user to an authorization URL. You can generate the authorization URL using `snap.getAuthorizeUrl`. In case you are using [Express](http://expressjs.com/), your route definition could look as follows:

```javascript
app.get('/snap/authorize', function(req, res) {
  var url = snap.getAuthorizeUrl('snapchat-marketing-api');
  res.redirect(url);
});
```

The URL will lead to a page where your user will be required to login and approve access to his/her Snapchat account. In case that step was successful, Snap will issue a redirect to the `redirect_uri` defined in your [Snapchat business account](https://business.snapchat.com). On that redirect, you will receive a single-use authorization code via a `code` query parameter in the url.

### Step Two: Receive redirect and get an access token

To complete the authorization you now need to receive the callback and convert the given authorization code into an OAuth access token. You can accomplish that using `snap.authorization`. This method will retrieve and store the access_token, refresh_token, and token expiration date inside the Snap object. Access tokens expire after 1800 seconds (30 minutes).


In Express - If your 'redirect_uri' is https://example.com/snap/callback, your route could look like:

```javascript
app.get('/snap/callback', (req,res)=>{
  snap.authorization({ authorization_code: req.query.code }, function(err, token){
    console.log("Access token is: " + token.access_token);
    console.log("Refresh token is: " + token.refresh_token);
    console.log("Access token expires in: " + token.expires_in + " seconds");
    res.redirect('/');
  });
});
```

##### You can manually set the refresh token. As long as you set the refresh token, the Snap object will automatically handle refreshing access tokens when they expire.
```javascript
snap.setRefreshToken('<token>');
```


### Step Three: Make HTTP requests to available resources

Now that you are authenticated, you can issue requests using the provided library methods.

For instance, to obtain a list of all available organizations associated with your account, you can use `snap.organization.getAllOrganizations`.

```javascript
snap.organization.getAllOrganizations(function(err, orgs)
{
  if(err)
    console.log(err);
  else
    console.log(orgs);
});
```
## :books: Library Methods

### Authorization

#### Generate Authorize URL

After getting the authorize url, the user will be redirected to the redirect url with authorization code used in the next function.

```javascript
snap.getAuthorizeUrl(scope);
```

##### Parameter

- Currently, the only available scope is 'snapchat-marketing-api'.

##### Example

```javascript
app.get('/snap/authorize', function(req, res) {
  var url = snap.getAuthorizeUrl('snapchat-marketing-api');
  res.redirect(url);
});
```

#### Retrieve and store a new access token

```javascript
snap.authorization(options, callback);
```

##### Parameter

- options (object) - Object with attribute authorization_code OR refresh_token

##### Example

```javascript
app.get('/snap/callback', (req,res)=>{
  snap.authorization({ authorization_code : req.query.code }, function(err, token){
    console.log("Access token is: " + accessToken.access_token);
    console.log("Refresh token is: " + accessToken.access_token);
    console.log("Access token expires in: " + accessToken.expires_in + " seconds");
    res.redirect('/');
  });
});
```


### Me

#### [Get authenticated user](https://developers.snapchat.com/api/docs/#user)

```javascript
snap.me(callback);
```

##### Example

```javascript
snap.me(function(err, user){
  if(err)
    console.log(err);
  else
    console.log(user);
})
```

### Organization
#### [Get all organizations](https://developers.snapchat.com/api/docs/#get-all-organizations)

```javascript
snap.organization.getAllOrganizations(options, callback);
```

##### Parameter

- options (object)
- Available options - 'withAdAccounts': boolean

##### Example

```javascript
snap.organization.getAllOrganizations({ withAdAccounts: true }, function(err, orgs){
  if(err)
    console.log(err);
  else
    console.log(orgs);
});
```

#### [Get organization by id](https://developers.snapchat.com/api/docs/#get-a-specific-organization)

```javascript
snap.organization.getOrganizationById(id, callback);
```

##### Example

```javascript
snap.organization.getOrganizationById('<organization_id>', function(err, org){
  if(err)
    console.log(err);
   else
    console.log(org);
});
```

### Media

#### [Create a new Media](https://developers.snapchat.com/api/docs/#create-media)

```javascript
snap.media.createMedia(media, callback);
```

##### Parameter

- media (object) - JS object with options describing type of media to create

##### Example

```javascript
const newMedia = {
    media: [
      { name:"Some new media", type:"VIDEO", ad_account_id: myAdAccountId },
    ]
  }

snap.media.createMedia(newMedia, function(err, res){
  if(err)
    console.log(err);
});
```

##### ad_account_id - your Snapchat business account id. Can be found on your [Snapchat Business Account](https://business.snapchat.com/)

#### [Get all Media associated with the authenticated account](https://developers.snapchat.com/api/docs/#get-all-media)

```javascript
snap.media.getAllMedia(adAccountId, callback);
```

##### Parameter

- adAccountId - your Snapchat business account id. Can be found on your [Snapchat Business Account](https://business.snapchat.com/)

##### Example

```javascript
snap.media.getAllMedia(adAccountId, function(err,media)
  {
    if(err)
      console.log(err);
    else
      console.log(media);
  })
```
