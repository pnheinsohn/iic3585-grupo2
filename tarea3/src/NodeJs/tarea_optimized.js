// Functions
const getCurrentResults = solution => {
    let current_results = new Set();
    for (num1 of solution) {
      for (num2 of solution) {
        current_results.add(num1 + num2);
        current_results.add(num1 * num2);
      };
    };
    return current_results;
}
  
const inCurrentResults = (num1, num2, current_results) => {
    // Check if a result of a self operation is in current_results
    if (current_results.has(num1 + num1)) {return true};
    if (current_results.has(num1 * num1)) {return true};
    // Check if a result of an operation with other number in the solution
    // is in current_results
    if (current_results.has(num1 + num2)) {return true};
    if (current_results.has(num1 * num2)) {return true};
    return false;
}
  
const nextValidNumber = (solution, possible) => {
    const current_results = getCurrentResults(solution);
    while (true) {
      let can_add = true;
      for (number of solution) {
        if (inCurrentResults(possible, number, current_results)) {
          can_add = false
          break;
        }
      }
      if (can_add) {return possible};
      possible++;
    } 
}

const optimizedRecursiveCall = (n, solution) => {
    if (solution.size === n) {
      if (Math.max(...solution) < Math.max(...result.incumbent)) {
        result.incumbent = solution;
      }
      result.solutions.push(solution);
      console.log(solution);
      return;
    }
  
    let num = nextValidNumber(solution, Math.max(...solution) + 1);
    while (num < Math.max(...result.incumbent)) {
        optimizedRecursiveCall(n, new Set([...solution, num]));
      num = nextValidNumber(solution, num + 1);
    }
    return;
}

const fastRecursiveCall = (n, solution) => {
    if (solution.size === n) {
      result.solutions.push(solution);
      console.log(solution);
      return;
    }
    let num = nextValidNumber(solution, Math.max(...solution) + 1);
    fastRecursiveCall(n, new Set([...solution, num]));
    return;
}
  
const optimizedSolution = (n_list) => {
  n_list.forEach(n => {
      console.log("Results for:", n);
      result.solutions = [];
      result.incumbent = new Set([n * n]);
      optimizedRecursiveCall(n, new Set([1]));
      
      let i = 3;
      while (i < Math.max(...result.incumbent)) {optimizedRecursiveCall(n, new Set([i++]))};
      console.log("Incumbent:", result.incumbent);
  });
}

const fastSolution = (n_list) => {
    n_list.forEach(n => {
        console.log("Results for: " + n);
        result.solutions = [];
        result.incumbent = new Set([n * n]);
        fastRecursiveCall(n, new Set([1]));
    });
}

// Main
const start = new Date().getTime();
const n_list = [5, 11, 23, 47];
const result = {};
optimizedSolution(n_list);
//fastSolution(n_list);
const end = new Date().getTime();

console.log("Execution time:", (end - start) / 1000, "seconds");
