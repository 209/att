FROM nginx:latest

MAINTAINER Ilya Kolevatykh "???@gmail.com"

COPY conf/nginx.conf /etc/nginx/nginx.conf

RUN apt-get update
RUN apt-get install -y apt-utils
RUN apt-get install -my wget gnupg
RUN apt-get install -y mc

RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update
RUN apt-get install -y yarn
RUN yarn global add webpack@latest -g

EXPOSE 80
