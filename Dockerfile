# pull official base image
FROM node:13.12.0-alpine
#
## set working directory
#WORKDIR /app
#
## add `/app/node_modules/.bin` to $PATH
#
#
## install app dependencies
#COPY . ./

RUN npm install react-scripts@3.4.1 -g --silent
RUN npx create-react-app app

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent --save
RUN apk add bash

#RUN npm install d3 -g --silent
#RUN npm install --save @material-ui/core
ENV PATH /app/node_modules/.bin:$PATH
## add app
COPY src/ ./src/
#
#
## start app
CMD ["npm", "start"]
#CMD ["bash"]
