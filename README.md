Hi,

I'm using mysql relational database I'm utilizing the relation to create a One-To-One ( 1:1 ) relationship.

Build image
- docker build -t node-api:v1 .

create network
- docker network create node-api-network

Start MYSQL:
- docker run \
--rm \
-d \
--name mysql_server \
-e MYSQL_DATABASE='povio' \
-e MYSQL_PASSWORD='adminadmin' \
-e MYSQL_ROOT_PASSWORD='adminadmin' \
--network node-api-network \
mysql:latest 

Start node-api
docker run \
--rm \
--name node-app \
--network node-api-network \
-p 3000:3000 \
-v $(pwd):/app \
node-api:v1 

start using
docker-compose up
