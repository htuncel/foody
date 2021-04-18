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

### notes

- Application includes all the requirements. User can search for ingredients and can see last 10 queries.
- User can click the history to repat the search.
- Search results are cached in localStorage.
- Api keys are not exposed using local variables and Nextjs api page.
- Dockerfile is included.
- Used Typescript.
- I did not have the time to include any tests.
