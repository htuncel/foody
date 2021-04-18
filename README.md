# How to run

Update the .env files to include your own spoonacular API key.

## Run yarn command to download the dependencies

`yarn`

# Without Docker

run `yarn dev` command to run it in local development mode

# With Docker

Map the port you want the application to run from Dockerfile. Defaults to port: 3000

## build the image

`docker build --pull --rm -f "Dockerfile" -t foody:latest "."`

## run the image in container

`docker run --rm -d -p 3000:3000/tcp foody:latest`
