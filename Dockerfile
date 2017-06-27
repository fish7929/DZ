FROM node
COPY ./ /src
WORKDIR /src
VOLUME /.npm
VOLUME /src/node_modules
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org

RUN cnpm install
CMD cnpm start

