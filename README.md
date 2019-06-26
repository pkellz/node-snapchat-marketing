# Snapchat Marketing Node.js Wrapper
:ghost: Unoffical nodejs client for the Snapchat Marketing API

## Installation

Before you begin, you need to register your app in the [Snapchat developer dashboard](https://developers.snapchat.com/ads/). Notice that the app gets a client ID, secret, and redirect URI required for authenticating with the API.

After registering your application, you need to install this module in your Node.js project:

```sh
npm install node-snapchat-marketing
```

## Initialization

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
  grant_type: "authorization_code" || "refresh_token",
  response_type: "code"
});
```

## Authenticating

To make HTTP calls, you need to create an authenticated session with the API.

### Step One: Authorize

To obtain an OAuth 2 bearer token, you have to authorize your application with the required scope. The only scope currently available is 'snapchat-marketing-api'.

You are initially required to redirect your user to an authorization URL. You can generate the authorization URL using `snap.getAuthorizeUrl`. In case you are using [Express](http://expressjs.com/), your route definition could look as follows:

```javascript
app.get('/snap/authorize', function(req, res) {
  var url = snap.getAuthorizeUrl('snapchat-marketing-api');
  res.redirect(url);
});
```

The URL will lead to a page where your user will be required to login and approve access to his/her Snapchat account. In case that step was successful, Snap will issue an HTTP 302 redirect to the redirect_uri defined in your [Snapchat business account](https://business.snapchat.com). On that redirect, you will receive a single-use authorization code.

### Step Two: Receive redirect and get an access token

To complete the authorization you now need to receive the callback and convert the given authorization code into an OAuth access token. You can accomplish that using `snap.getAccessToken`. This method will retrieve the access_token, refresh_token, and token expiration date. `snap.setAccessToken` will store the access_token, refresh_token and token expiration date within the snap object for consecutive requests. Access tokens expire after 30 minutes.


Using Express, you could achieve that as follows:

```javascript
app.get('/snap/callback', (req,res)=>{
  snap.getAccessToken(req.query.code, function(err, token){
    console.log(token);
    snap.setAccessToken(token.access_token);
    snap.setRefreshToken(token.refresh_token);
    res.redirect('/');
  });
});
```

##### You could also copy the access token and set it in the global scope
`snap.setAccessToken('<token>');`

### Step Three: Make HTTP requests to available resources

Now that you are authenticated, you can issue requests using provided methods.

For instance, to obtain a list of all available organizations associated with your account, you can use `snap.getAllOrganizations`.

```javascript

snap.getAllOrganizations(function(err, org)
{
  if(err)
    console.log(err);
  else
    console.log(org);
});
```
## Methods

### Authorization

#### Generate Authorize URL

After getting the authorize url, the user will be redirected to the redirect url with authorization code used in the next function.

```javascript
snap.getAuthorizeUrl(scope);
```

##### Parameter

- Use 'snapchat-marketing-api' as your scope.

##### Example

```javascript
app.get('/snap/authorize', function(req, res) {
  var url = snap.getAuthorizeUrl('snapchat-marketing-api');
  res.redirect(url);
});
```

#### Get/Set Access Tokens

```javascript
snap.getAccessToken(code, callback);
snap.setAccessToken(accessToken);
snap.setAccessToken(refreshToken);
```

##### Parameter

- code - authorization code from the redirect after user is authenticated

##### Example

```javascript
app.get('/snap/callback', (req,res)=>{
  snap.getAccessToken(req.query.code, function(err, token){
    console.log(token);
    snap.setAccessToken(token.access_token);
    snap.setRefreshToken(token.refresh_token);
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

### Organizations
#### [Get all organizations](https://developers.snapchat.com/api/docs/#get-all-organizations)

```javascript
snap.getAllOrganizations(callback);
```

##### Example

```javascript
snap.getAllOrganizations(function(err, orgs){
  if(err)
    console.log(err);
  else
    console.log(orgs);
});
```

#### [Get organization by id](https://developers.snapchat.com/api/docs/#get-a-specific-organization)

```javascript
snap.getOrganizationById(id, callback);
```

##### Example

```javascript
snap.getOrganizationById('<organization_id>', function(err, org){
  if(err)
    console.log(err);
   else
    console.log(org);
});
```

### Media

#### [Create a new Media](https://developers.snapchat.com/api/docs/#create-media)

```javascript
snap.createMedia(media, callback);
```

##### Parameter

- media (object) - object with options describing type of media to create

##### Example

```javascript
const newMedia = {
    media: [
      { name:"Some new media", type:"VIDEO", ad_account_id: myAdAccountId },
    ]
  }
  
snap.createMedia(newMedia, function(err, res){
  if(err)
    console.log(err);
});
```

##### ad_account_id - your Snapchat business account id. Can be found on your [Snapchat Business Account](https://business.snapchat.com/)

#### [Get all Media associated with the authenticated account](https://developers.snapchat.com/api/docs/#get-all-media)

```javascript
snap.getAllMedia(adAccountId, callback);
```

##### Parameter

- adAccountId - your Snapchat business account id. Can be found on your [Snapchat Business Account](https://business.snapchat.com/)

##### Example

```javascript
snap.getAllMedia(adAccountId, function(err,media)
  {
    if(err)
      console.log(err);
    else
      console.log(media);
  })
```

#### Looking for more contributors!
