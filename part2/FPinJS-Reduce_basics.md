# Reduce
- ```JavaScript
	let orders = [
		{ amount: 250 },
		{ amount: 400 },
		{ amount: 100 },
		{ amount: 325 }
	]
	```
- すべての値を合計した値を出力する
 - `for`の回答
  - ```JavaScript
		let totalAmount = 0
		for (let i = 0; i < orders.length; i++) {
			totalAmount += orders[i].amount
		}
		```
 - `Reduce`の回答
  - ```JavaScript
			let totalAmount = orders.reduce((sum, order) => {
				sum + order.amount
			}, 0)
		```
	- `Reduce`ではコールバック関数に引数を2つとり、自身の第二引数には処理の出発点を記述する。
	- ここでは0から処理するため第二引数に0をとる。