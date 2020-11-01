/**
 * Caluculate BMI
 * 
 * ボディマス指数とは、体重と身長の関係から算出される、
 * 人の肥満度を表す体格指数である。
 * 
 * 体重をw[kg]、身長をh[m]のBMI
 * BMI = w / h^2
 * 
 * 例えば身長160cm, 体重50kgの場合
 * BMI = 50 / 1.6^2 = 50 / 2.56 ≒ 19.5
 * 
 * となる。単位はkg/m^2
 * 
 * > 参照 > Wikipedia | ボディマス指数 
 * > URL: https://ja.wikipedia.org/wiki/%E3%83%9C%E3%83%87%E3%82%A3%E3%83%9E%E3%82%B9%E6%8C%87%E6%95%B0
 * 
 * BMIの判定基準はWHOのものを使用する
 */

interface BmiValues {
    height: number;
    weight: number;
}

interface BmiJson {
    height: number;
    weight: number;
    bmi: string;
}

const parseArgs = (args: Array<string>): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments')
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3]),
        }
    } else {
        throw new Error('Provided values ware not Number')
    }
}

const centimeterToMeter = (cm: number): number => {
    return cm / 100
}

const bmiScore = (h: number, w: number): number => {
    const meter = centimeterToMeter(h)
    return w / Math.pow(meter, 2)
}

const bmiCategories = (score: number): string => {
    if (score < 16) return 'Very severely underweight'
    else if (score > 16 && score < 17) return 'Severely underweight'
    else if (score > 17 && score < 18.5) return 'Underweight'
    else if (score > 18.5 && score < 25) return 'Normal (healthy weight)'
    else if (score > 25 && score < 30) return 'Overweight'
    else if (score > 30 && score < 35) return 'Obese Class I (Moderately obese)'
    else if (score > 35 && score < 40) return 'Obese Class II (Severely obese)'
    else if (score > 40) return 'Obese Class III (Very severely obese)'
    else return 'This score is not intended'
}

export const bmiToJson = (height: number, weight: number): BmiJson => {
    const score = bmiScore(height, weight)
    const categ = bmiCategories(score)
    return {
        weight,
        height,
        bmi: categ,
    }
}

try {
    const { height, weight } = parseArgs(process.argv)
    const score = bmiScore(height, weight)
    console.log(bmiCategories(score))
    
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message)
}
