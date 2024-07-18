//get the OAuth access (Bearer) token
//from from the SAP BTP
const PostRequest = {
  url: pm.variables.get('Auth_Url'),
  method: 'POST',
  header: 'Content-Type:application/x-www-form-urlencoded',
  body: {
    mode: 'urlencoded',
    urlencoded: [
        {key: "client_id", value: pm.variables.get("client_ID")},
        {key: "client_secret", value: pm.variables.get("client_secret")},
        {key: "grant_type", value: 'client_credentials'}
    ]
  }
};

// at line 8 it could also be done like this but for SAP BTP this would fail
// SAP BTP wants it "urlencoded":
// mode: 'application/json',
//    raw: JSON.stringify(
//    {
//        "client_id": pm.environment.get('auth0_client_id'),
//        "client_secret": pm.environment.get('auth0_client_secret'),
//        grant_type:'client_credentials'
//    })

var getToken = true;

if (!pm.environment.get('accessTokenExpiration') || !pm.environment.get('OAuthAccessToken')) {
    console.log('Token or expiration date is missing')
} else if (pm.environment.get('accessTokenExpiration') <= (new Date()).getTime()) {
    console.log('Token is expired')
} else {
    getToken = false;
    console.log('Token and expiry are valid');
}

if (getToken === true) {
    pm.sendRequest(PostRequest, function (err, res) {
    console.log(err ? err : res.json());
        if (err === null) {
            console.log('Saving token and expiration time')
            var jsonResponse = res.json();
            pm.environment.set('OAuthAccessToken', jsonResponse.access_token)
    
            var expirationDate = new Date();
            expirationDate.setSeconds(expirationDate.getSeconds() + jsonResponse.expires_in);
            pm.environment.set('accessTokenExpiration', expirationDate.getTime());
            console.log('Token and expiration time saved!')
        }
    });
}