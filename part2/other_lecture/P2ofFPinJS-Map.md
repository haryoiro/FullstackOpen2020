# Map
- 例として使用するオブジェクト
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
- `Map`も`filter`と同じ高階関数
- `filter`との違い
  - `filter`はオブジェクトを破棄したオブジェクトを返す
  - `map`はオブジェクトを破棄しない
- `map`の動き
  - すべてのオブジェクトの要素に対して関数を関数を通す。
	- `name`だけ抽出したい
    	- `for`ループでの回答
      	- ```JavaScript
					let names=[]
					for (let i = 0; i < animals.length; i++) {
						names.push(animals[i].name)
					}

					console.log(names)
				```
			- `map`での回答
  			- ```JavaScript
						let names = animals.map(animal => anumal.name)
						console.log(names)
					```
			- animalを文として返したい場合でも
  			- ```JavaScript
						let names = animals.map(animal => anumal.name + ' is a ' + animal.species)
						console.log(names)
					```
  		- とするだけで良い。
