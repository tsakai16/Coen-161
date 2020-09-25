import * as variables from './variables.js';

const { 
  num1, num2, num3, num4,
  str1, str2, str3, str4 
} = variables;

// What does this statement log and why?
// 2.01...1.0 + 1.01...
//console.log(num1 + num2);

// What does this statement log and why?
// type error... num1 is const
//console.log(num1 += num2);

// What does this statement log and why?
// NaN... num4 not defined
//console.log(num3 + num4);

// What does this statement log and why?
// syntax error: redeclaration of const num4, num4 is declared as const cant redefine
//let num4 = 0;
//console.log(num3 + num4);

// What does this statement log and why?
// hello world... concats them w/ space
//console.log(str1, str3);

// What does this statement log and why?
// hello there world undefined... str4 not defined
console.log(str1, str2, str3, str4);
