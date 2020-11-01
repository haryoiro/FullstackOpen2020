/**
 * calculateExercises
 * 
 * 毎日平均何時間運動したかを計算する。
 * 戻り地には以下の値を含んだオブジェクトが必要。
 * - the number of days
 *  - 日数
 * - the number of training days
 *  - トレーニング日数
 * - the original target value
 *  - もとの目標値
 * - the calculated avarage time 
 *  - 平均時間
 * - boolean value describing if the target was reached
 *  - 目標に達したかを示す真偽値
 * - a rating betewwn the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
 *  - 時間がどれだけうまく満たされているかを示す1~3の数値。
 * - a text value explaining the rating
 *  - 評価を説明するテキスト
 * 
 * 毎日の運動時間は配列で与えられます。
 * [3, 0, 2, 4.5, 0, 3, 1]
 * 
 * Result interfaceを作成する必要があります。
 * 
 * 戻り値は次のような形式になります。
 * { 
 *   periodLength: 7,
 *   trainingDays: 5,
 *   success: false,
 *   rating: 2,
 *   ratingDescription: 'not too bad but could be better',
 *   target: 2,
 *   average: 1.9285714285714286
 * }
 */

const initValue = [2, 3, 0, 2, 4.5, 0, 3, 1]

interface ExResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parseExersisesArgs = (args: Array<string>): Array<number> => {
    if (args.length < 4) throw new Error('Not enough arguments')
    const ars = args
        .splice(2)
        .map(d => {
            if(!isNaN(Number(d))) return Number(d)
            else throw new Error('Provided values ware not number')
        })

    try {
        return ars
    } catch (e) {
        throw new Error(e.message)
    }
}

const exerciseRating = (target: number, average: number): number => {
    const result = (average - target)
    if (result > 0) {
        return 3
    } else if (result < 0 && result > - (target / 2)) {
        return 2
    } else if (result < (target / 2)) {
        return 1
    } else {
        throw new Error(`undeclared ratings ${result}`)
    }
}

const exerciseRatingDescription = (rating: number): string => {
    switch(rating) {
        case 3:
            return 'good: keep it up'
        case 2:
            return 'not too bad but could be better'
        case 1:
            return 'need more efforts'
        default:
            throw new Error('Error.... You\'re Provided rating is not found. Please check input values')
    }
}

const caluculateExersises = (ars: Array<number>): ExResult => {
    const target = ars[0]
    const days = ars.splice(1)
    const trainingDays = days.filter(d => d !== 0)
    const average = days.reduce((a, c) => Number(a) + Number(c)) / Number(days.length)
    const success = (average - target) > 0
    const rating = exerciseRating(target, average)
    const ratingDescription = exerciseRatingDescription(rating)

    return {
        periodLength: days.length,
        trainingDays: trainingDays.length,
        success,
        rating,
        ratingDescription,
        target,
        average,
    }
}


try {
    const days = parseExersisesArgs(process.argv)
    console.log(days)
    console.log(caluculateExersises(days))
} catch (e) {
    console.log('Error, something bad happend. message: ', e.message)
}
