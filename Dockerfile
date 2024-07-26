# Fetching the latest node image on alpine linux
FROM node:20-alpine

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /app

# Installing dependencies
COPY ./package*.json .

RUN npm install

# Copying all the files in our project
COPY . .

EXPOSE 80

# Starting our application
CMD [ "npm", "run", "dev" ]
