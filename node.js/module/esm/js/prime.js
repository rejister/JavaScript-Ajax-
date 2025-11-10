"use strict"

/**
 * 
 * @param {*} n 
 * @returns 
 */

const prime = function(n) {
    let result = true
    if (n < 4) {

    }else if (n % 2 === 0 || n % 3 === 0) {
        result = false
    }else {
        for (let i = 2; i < n; i++) {
            if (n % i === 0) {
                result = false
                break
            }
        }   
    }
    return result
}

/**
 * 指定された値までの階乗した結果を求める
 * 
 * 6! 6*5*4*3*2*1
 */
const factorial = n => {
    let result = BigInt(1)

    for (let i = 1n; i <= n; i++) {
        result += i
    }
    return result
}
// 外部から参照を行う関数などを定義する
export{ prime, factorial }
