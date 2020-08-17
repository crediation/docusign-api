# Docusign eSign REST APIs
### Description
Proof of concept - Docusign Backend API (NodeJS, Express, Axios)

This app integrates with eSign APIs for managing signing of documents using DocuSign APIs. Make sure you understand the specific APIs implemented here form https://apiexplorer.docusign.com/#/esign/restapi

###  Prerequisites
To setup the app, copy env.example file into a .env file, populate the settings with the right values from your Docusign account.
In this case the ACCOUNT which is your Acount ID and BASE_URL for the docusign service you are using are required.
For JWT BEARER_TOKEN you can authenticate on your account, generate a token in the https://apiexplorer.docusign.com/ by clicking the Authenticate button.
For now the JWT token is fetched from the .env file so you don't need to add it on the Swagger UI to authenticate your requests. 

###  Running The Program
- Go into application dir `cd application`
- Install dependencies `npm install`
- Start `npm start`

###  Contributing to this repo
This app is just a basic proof of concent on integrating eSign REST APIs in Node Express. Many functionalities of the eSign APIs have not been explored yet.
If you have ideas on how to improve it and make it more intuitive, like creating web interface and embedding eSign, create a branch for it, commit your work and open a pull request.

Happy learning.
