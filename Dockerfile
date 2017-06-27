FROM node
COPY ./ /src
WORKDIR /src

RUN npm install -g cnpm --registry=https://registry.npm.taobao.org

RUN cnpm install
CMD cnpm start

