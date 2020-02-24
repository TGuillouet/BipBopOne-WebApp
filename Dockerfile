FROM node:12

RUN apt-get update && \
    curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 1.22.0

WORKDIR /usr/src/app

COPY package.json .
RUN yarn

EXPOSE 3000
COPY . .
CMD ["yarn", "start"]
