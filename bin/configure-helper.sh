#!/bin/bash

read -p "private key file name: " privateKeyFileName
read -p "private key as a string: " privateKey
read -p "token issuer: " platformTokenIssuer
read -p "token key id: " platformTokenKeyId
read -p "scope: " scope
read -p "Partner Id: " partnerId
read -p "port: " port
read -p "endpoint: " tokenEndpoint

echo "private key file name: $privateKeyFileName"
echo "private key as a string: $privateKey"
echo "token issuer: $platformTokenIssuer"
echo "token key id: $platformTokenKeyId"
echo "scope: $scope"
echo "Partner Id: $partnerId"
echo "port: $port"
echo "endpoint: $tokenEndpoint"

echo "PRIVATE_KEY_FILENAME=$privateKeyFileName" >.env.generated
echo "PLATFORM_TOKEN_ISSUER=$platformTokenIssuer" >>.env.generated
echo "PLATFORM_TOKEN_KEY_ID=$platformTokenKeyId" >>.env.generated
echo "SCOPE=$scope" >>.env.generated
echo "SHIPENGINE_PARTNER_ID=$partnerId" >>.env.generated
echo "PORT=$port" >>.env.generated
echo "TOKEN_ENDPOINT=$tokenEndpoint" >>.env.generated
echo "PRIVATE_KEY=$privateKey" >>.env.generated
