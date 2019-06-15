FROM node
RUN mkdir /code
COPY package.json /code/
WORKDIR /code
RUN npm install --no-optional --no-package-lock
