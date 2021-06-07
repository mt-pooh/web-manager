# web-manager
ファイル入稿ツール

## 構成
- definitions
- openapi
- client
- server

### definitions
入稿するファイルの項目定義が入る
TypeScriptの型定義からJSON Schemaを生成している。[typescript-json-schema](https://github.com/YousefED/typescript-json-schema)を使用。

### openapi
client-server間のAPI定義
OpenAPIのschemaからTypeScriptの型生成は[openapi-typescript](https://github.com/drwpow/openapi-typescript)を使用

### client
クライアント部分
Next + Reactで構成

### server
clientから入稿されたファイルを処理する
Node.js(Express)，excelのvalidationには[Ajv](https://ajv.js.org/)を使用

## 使用法
- Node.jsとyarnのinstallが事前に必要です
```
npm install -g yarn
```

- 入稿するファイルの定義を書く
```
cd definitions
vi src/type.ts # 型定義を作成
yarn schema # 型定義からjson schema生成，client, serverに配布
```
- ブラウザから入稿


## TODO
- ファイル入稿のログを残すようにする
- Docker化
- testを書く
- デザインをよくする
  - ブラウザで入稿のexcelファイルの項目がわかるようにする
- 画面に表示するエラーメッセージを整える
- 複数シートがあるexcelファイルの入稿の対応
- 画像とかも入稿できるようにするといいかも
- OpenAPIの定義をちゃんとする

