FROM node:8.8
RUN apt-get update
RUN apt-get install -y vim nano rubygems ruby-dev ruby`ruby -e 'puts RUBY_VERSION[/\d+\.\d+/]'`-dev build-essential
RUN npm install -g yarn
RUN gem install sass scss_lint
RUN yarn global add typescript@2.5.3 \
                 tslint@5.8.0 \
                 protractor@5.2.0 \
                 webdriver-manager@12.0.6 \
                 webpack@3.8.1 \
                 webpack-dev-server@2.9.3 \
                 karma-cli@1.0.1 \
                 karma-chrome-launcher@2.2.0 \
                 rimraf@2.6.2 \
                 phantomjs-prebuilt@2.1.15 \
                 @angular/cli@1.4.9

# Rebuild node-sass comparative with current node version
RUN npm rebuild node-sass --force
WORKDIR /workspace
# ADD package.json .
# ADD yarn.lock .

RUN yarn install

EXPOSE 8888