# 高階関数

## 関数型プログラミング

- なぜ関数型プログラミング？
  - 関数型を使えば...
  - バグが少なくなる
    - Less Bug
  - コードが理解しやすくなる
    - Easier to reason about
  - より短い時間でかける
    - Less time

- 高階関数について
  - 関数型言語では関数は値
    - 基本的な関数
      - ```JavaScript
          function triple(x) {
            return x * 3
          }
        ```
    - 関数型言語でしかできない記法
      - ```JavaScript
          let triple = function(x) {
            return x * 3
          }
        ```
    - 変数に関数を値として代入する

  - 高階関数の使い所
    - 関数の合成Composition
      - 引数に関数を渡せるということは、さまざまな関数をくみあわせて大きな関数をつくることができる。
    - 例のために下のオブジェクトを定義する。
      - ```JavaScript
          let animals = [
            { name: 'Fluffykins',	species: 'rabbit'},
            { name: 'Carro',		species: 'dog'	},
            { name: 'Hamilton',		species: 'dog'	},
            { name: 'Harold',		species: 'fish'	},
            { name: 'Ursula', 		species: 'cat'	},
            { name: 'Jimmy', 		species: 'fish'	},
          ]
        ```

    - `dog`のみとりだす
      - `for`を使用した回答
        - ```JavaScript
          let dog = []
          for (let i = 0;i < anumals.length; i++) {
            if (animals[i].species === 'dog')
              dogs.push(animals[i])
          }
          ```
      - `filter`を使用した回答
        - ```JavaScript
            let dogs = animals.filter(anumal => animal.species === 'dog')
          ```

    - `for`を使用したコードより`filter`を使用したコードのほうが短い
    - これには構文が短い殻だけではなく、含まれるロジックも少なくなっているためより読みやすくなるという利点も含まれる。
    - `filter`の例をみると、コールバック関数によって関数が合成されているのがわかる。
    - これを2つに分けてみよう。
      - ```JavaScript
          const isDog = animal => animal.species === 'dog'
          const dogs = animals.filter(isDog)
        ```
    - こうしてわけた関数は他の場所でも再利用することができる。
    - `reject`という`filter`とは逆の動きをする関数を使ってみる。
      - ```JavaScript
          const otherAnimals = animals.reject(isDog)
        ```
    - 高階関数はコードやロジックを少なくできるだけではなく、同じコードを複数の場所で再利用する事ができる様になる。