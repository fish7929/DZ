1. npm install
如提示node-sass错误，通过淘宝的npm镜像安装node-sass
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install node-sass --save-dev
2. 开发环境 npm run start
3. 生产环境 npm run release

4. 打包是注意 如打包到微信或APP请在app/static/css/_variables.scss中切换$toolbarHeight和$topHeight