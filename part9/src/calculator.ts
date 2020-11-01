/**
 * 独自の型を追加する。
 * 
 * 乗算関数が加算と除算もできるように機能を追加しましょう。
 */
type Operation = 'multiply' | 'add' | 'divide';

type Result = number

const calculator = (a: number, b: number, op: Operation): Result => {
    switch(op) {
        case 'multiply':
            return a * b
        case 'add':
            return a + b
        case 'divide':
            if (b === 0) throw new Error('can\'t divide by 0!')
            return a / b
        default :
            throw new Error ('Operation is not multiply, add or divide!')
    }
}

try {
    console.log(calculator(10, 2, 'divide'))
} catch (e) {
    console.log ('something went wrong, error message: ', e.message)
}