FROM node:14.14.0-buster

# 環境変数の設定
# コンテナ内で使用される
ENV PORT 3000

# コンテナ内で仕様するディレクトリを作成
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# 依存関係のインストール
COPY package*.json yarn.lock /usr/src/app/
RUN npm install --no-progress && npm cache verify --no-progress && \

# すべてのコードをローカルからコンテナ内にコピー
COPY . /usr/src/app

EXPOSE 3000

CMD ["npm", "start"]