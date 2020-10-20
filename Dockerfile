# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH


# install app dependencies
COPY . ./
#COPY package.json ./
#COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm install d3 -g --silent
RUN npm install --save @material-ui/core
ENV PATH /app/node_modules/.bin:$PATH
# add app


# start app
CMD ["npm", "start"]
