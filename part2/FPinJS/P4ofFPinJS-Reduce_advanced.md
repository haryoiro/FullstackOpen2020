# Reduce Advanced

`Reduce`は2つの引数と処理を開始するインデックスを指定することで使用でき、基本的な操作として、配列のすべての要素を足し合わせるなどの操作をできることがわかりました。
```JavaScript
let amountAll = item.reduce((sum, order) => {
  return sum + order.amount
}, 0)
```


```tsv
mark johansson  waffle iron 80  2
mark johansson  blender 200 1
mark johansson  knife 10  4
Nikita Smith  waffle iron 80  1
Nikita Smith  knife 10  2
Nikita Smith  pot 20  3
```
今回は`Reduce`を使用してこのTSVファイルをJSON形式のオブジェクトに変換してみます。