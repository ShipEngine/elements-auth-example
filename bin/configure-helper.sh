#!/bin/bash

read -p "private key file name: " privateKeyFileName
read -p "token issuer: " tokenIssuer
read -p "token key id: " tokenKeyId
read -p "scope: " scope
read -p "Partner Id: " partnerId
read -p "port: " port
read -p "endpoint: " endpoint

echo "private key file name: $privateKeyFileName"
echo "token issuer: $tokenIssuer"
echo "token key id: $tokenKeyId"
echo "scope: $scope"
echo "Partner Id: $partnerId"
echo "port: $port"
echo "endpoint: $endpoint"

echo "privateKeyFileName=$privateKeyFileName" >.env-generated
echo "tokenIssuer=$tokenIssuer" >>.env-generated
echo "tokenKeyId=$tokenKeyId" >>.env-generated
echo "scope=$scope" >>.env-generated
echo "partnerId=$partnerId" >>.env-generated
echo "port=$port" >>.env-generated
echo "endpoint=$endpoint" >>.env-generated
