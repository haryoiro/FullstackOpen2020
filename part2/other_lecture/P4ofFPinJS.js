const fs = require('fs')

const o2 = fs.readFileSync('./P4.tsv', 'utf8')
  .trim()
  .split('\n')
  .map(line => line.split('\t'))
  .reduce((customers, line) => {
    // 同じものがあったら上書き、なかったらそこに殻の配列を代入
    customers[line[0]] = customers[line[0]] || []
    customers[line[0]].push({
      name: line[1],
      price: line[2],
      quantity: line[3]
    })
    return customers
  }, {})


console.log('output', o2)