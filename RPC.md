# [RPC API Endpoints](https://www.zeeve.io/docs/api-endpoint.html)

## Overview

RPC (Remote Procedure Call) API endpoints are specific URLs or network addresses that allow clients to interact with a remote server using the RPC protocol. These endpoints provide a way for clients to invoke procedures or functions on the server and receive the results.

The actual endpoints for an RPC API can vary depending on the specific implementation or framework being used. However, here are some common examples of RPC API endpoints:

/rpc or /rpc/endpoint: This is a generic endpoint that represents the main entry point for the RPC API. Clients typically send their requests to this endpoint.



## Setup Instructions

### Account Creation / Login

Please create an account if not created yet

[Follow Setup Instructions](./Account.md)

if you've a account do login

![2023-05-18-13-36-01](https://github.com/Zeeve-App/sample-dapps/assets/98962374/d4c9d5ab-e370-410d-8d2e-83160835f14d)

### Buy Developer Subscription

Click on the API Endpoint under Buy Services from the left pane and you will be redirected to the purchase page.

![img](https://www.zeeve.io/docs/assets/img/apiEndpointMarketplace.b4101506.png)

Click on the Supported Protocols button on top right and you will be able to see the protocols and their network types that Zeeve (opens new window)offers for creating API endpoints.

![img](https://www.zeeve.io/docs/assets/img/apiEndpointSupportedProtocols.68c1fd24.png)

Go with default selected free Developer Plan offering  

1. 10 Million API Units

2.  RPC Endpoints

3. 25 Requests / sec

4. Blockchain Data

5. Community Support

![2023-05-18-13-37-56](https://github.com/Zeeve-App/sample-dapps/assets/98962374/90181427-6272-4999-8d7f-1460f1c4fedc)

You will be redirected to the payment page to complete your purchase. Fill the card details and click Subscribe.

![2023-05-18-13-43-46](https://github.com/Zeeve-App/sample-dapps/assets/98962374/c01b005b-97be-4d72-9a99-2e13ac04461c)

After successful payment you will be redirected to success page which ensures successful purchase of your subscription.

![img](https://www.zeeve.io/docs/assets/img/apiEndpointPaymentSuccessPage.8f07d7f5.png)

> NOTE: Developer Plan is a free plan and can only be purchased once


## Create an endpoint

This page has detailed steps on how to

1. Create an endpoint
2. Modify an endpoint
   . Change name
   . Update security
3. Delete an endpoint


NOTE: Purchase a subscription plan before proceeding.

This section will provide you detailed steps for creating an API endpoint.

Visit the API Endpoints page by clicking on API Endpoints under Manage Services from the left side pane.

![img](https://www.zeeve.io/docs/assets/img/apiEndpointsPage.ec7f7bb8.png)

Click on Add Endpoint card or the button on top right corner. You will be able to see all the subscriptions you bought for the API endpoints.

![2023-05-18-13-45-26](https://github.com/Zeeve-App/sample-dapps/assets/98962374/a4dcde01-040d-4fd4-b01e-d86276c3a0f7)

NOTE: These cards can be different based on your purchased subscriptions.

NOTE: The card will not be visible if the API Units or the Endpoint quota for that subscription has been exhausted.

Click on the card to choose the subscription in which you want add the endpoint. This will redirect you to the endpoint setup page.

Endpoint Info

This step configures the basic and blockchain protocol settings for the endpoint.

![2023-05-18-13-46-06](https://github.com/Zeeve-App/sample-dapps/assets/98962374/a43ab07e-c085-4efa-b3ff-046a14fe8fc8)

Endpoint Name: The name of your endpoint.
Workspace: The workspace in which the endpoint will be added.
Protocol: The blockchain protocol for which the endpoint is created.
Network Type: The network type of the selected blockchain protocol.
Proceed further by clicking on the Next Step button after providing all the details.


Security Configuration

NOTE: Adding security to the endpoint is optional.

This step configures the security settings for the endpoint. An option to add a JWT in your API call to make your endpoint more secure.

![2023-05-18-13-47-04](https://github.com/Zeeve-App/sample-dapps/assets/98962374/7039ff30-511b-404a-97be-3df046c733f1)

Require JWT: Enable this checkbox if you want to add a JWT security option.
Public Key Name: The name associated to the public key.
Public Key: The public key of a assymetric key-pair. Only keys generated using RSA and ECDSA algorithms are allowed.
On clicking the Submit button a pop-up window will open which ensures the successful creation of your endpoint.


![2023-05-18-13-47-47](https://github.com/Zeeve-App/sample-dapps/assets/98962374/a0a4f450-870e-4c09-9c09-9f6e25e08fac)

On clicking the Continue button you will be redirected to the page where you can see the endpoint you created.

## Modify Endpoint
This section will guide you on how you can modify an endpoint's

Name
Security
Visit the endpoint detail page of your endpoint (Manage Services > API Endpoints > Your Endpoint).

Click on the Edit icon in the top right corner.

![Screenshot from 2023-05-19 15-57-33](https://github.com/Zeeve-App/sample-dapps/assets/98962374/8cb988a0-4a7e-4f47-9151-40e20757645c)

Change Endpoint Name

After clicking the Edit icon the endpoint name field will become editable. Update the name as required.

Then click the Save button beside the input field to save the name.

A pop-up will confirm the successful updation of the endpoint name.

Modify Endpoint Security

After clicking the Edit icon the security section will become editable.

Toggle the security toggle as per the requirement to turn on or off the JWT security option.

Then click the Save button below to save the update in security.

A pop-up will confirm the successful updation of the endpoint security.

## Delete Endpoint
Visit the endpoint detail page of your endpoint (Manage Services > API Endpoints > Your Endpoint).

Click on the Delete icon in the top right corner.

![Screenshot from 2023-05-19 15-57-50](https://github.com/Zeeve-App/sample-dapps/assets/98962374/6b2339e9-5ebe-438e-8dbe-2ca03119a5d8)


A confirmation window will open, click on the Yes button to delete the endpoint.

![Screenshot from 2023-05-19 15-58-04](https://github.com/Zeeve-App/sample-dapps/assets/98962374/14b3c605-6700-4c52-aa5f-4f945a137faa)
