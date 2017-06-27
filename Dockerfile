FROM node
COPY ./ /src
WORKDIR /src
VOLUME /.npm
VOLUME /src/node_modules
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN alias cnpm="npm --registry=https://registry.npm.taobao.org \
--cache=$HOME/.npm/.cache/cnpm \
--disturl=https://npm.taobao.org/dist \
--userconfig=$HOME/.cnpmrc"

RUN npm install
CMD npm start

