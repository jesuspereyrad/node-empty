# BASE NODE PROJECT WITH WATSON

This is my base node project architecture to work with watson assistant and facebook messenger.

## Structure

* [src](/src)
  * [controller](/src/controller)
  * [helpers](/src/helpers)
  * [models](/src/models)
  * [routes](/src/routes)
  * [services](/src/services)
  * [tests](/src/test)
  * [utilities](/src/utilities)
  * [watson (services)](/src/watson)
  * [facebook (services)](/src/facebook)
  
## INSTALL

Download the project.
Go to the folder in vs code or any other ide
Create a .env from the .env.copy
`npm install` and then `npm start`

### Running inside docker

Build the docker image with `docker build . -t node-empty` and run with `docker run -it --rm -p 8080:8080 node-empty`

## Architecture

This is a mircoservice application system, were we try to decouple every module in a way that services dont know each other in the core service, but every new service have a connector file that sets the way microservices can interact. This project connect (watson assistant, facebook messenger and an orchestrator in nodejs) by configurations file. I have another project that is connecting each application by sending and receiving request, I will update this readme with the links of the monorepo later.

## Structure of Orchestrator

I decided to use an architecture MCS (Model-Controller-Services) for the api in nodeJS. Each folder has a readme explaining his functionality in the project.
