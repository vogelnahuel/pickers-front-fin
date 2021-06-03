FROM node:lts-slim

RUN mkdir -p /usr/src/app

COPY . /usr/src/app/.

WORKDIR /usr/src/app

RUN npm i --prefix /usr/src/app

CMD npm intall './pickit-components-1.0.34.tgz'

CMD npm run start:$PICKIT_ENV