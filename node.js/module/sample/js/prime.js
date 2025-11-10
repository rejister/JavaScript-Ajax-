"use strict"

// 1 ~ 100の中で素数を求めるプログラム
// その数以外で割ることがでいない自然数
/**
 * 
 * @param {*} n 
 * @returns 
 */

module.exports = function(n) {
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