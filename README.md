# OAuthAccessTokenSAP-BTP
Java Script to get OAuth access token from SAP BTP using Postman

This script helps you run a request and get the OAuth access token in one
go. This script has to be maintained in your Postman "Collection" and therefore
will run automatically when executing a request within the collection.
A more detailled explanation you can find here:
https://allenheltondev.medium.com/how-to-automate-oauth2-token-renewal-in-postman-864420d381a0

Maintain this script on your collection as a 'pre-request' script.
Maintain 'client_ID', 'client_secret', 'Auth_Url', 'grant_type' (=client_credentials)
as collection variables

In your environment define variables 'OAuthAccessToken' and 'accessTokenExpiration'
and leave them blank - these will be filled when the script runs for the first time

In your request under 'Authorization' use 'Auth Type' = 'Bearer Token' and maintain
variable {{OAuthAccessToken}} instead of an actual token

