// DOM
const results_div = document.getElementById("results");

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
      const solution_span = document.createElement("span");
      var set_values = '';
      for (item of solution.values())
        set_values += item + ' ';
      solution_span.textContent = `Set: {${set_values}}\n`;
      results_div.appendChild(solution_span);
      results_div.appendChild(document.createElement("br"));
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
      const solution_span = document.createElement("span");
      var set_values = '';
      for (item of solution.values())
        set_values += item + ' ';
      solution_span.textContent = `Set: {${set_values}}`;
      results_div.appendChild(solution_span);
      results_div.appendChild(document.createElement("br"));
      return;
    }
  
    let num = nextValidNumber(solution, Math.max(...solution) + 1);
    fastRecursiveCall(n, new Set([...solution, num]));
    return;
}
  
  // Main


const optimizedSolution = (n_list) => {

    n_list.forEach(n => {
        results_div.appendChild(document.createElement("br"));
        const solution_span = document.createElement("span");
        solution_span.textContent = `Results for: ${n}\n`;
        results_div.appendChild(solution_span);
        results_div.appendChild(document.createElement("br"));
        console.log("Results for: " + n);
        result.solutions = [];
        result.incumbent = new Set([n * n]);
        optimizedRecursiveCall(n, new Set([1]));
        
        let i = 3;
        while (i < Math.max(...result.incumbent)) {optimizedRecursiveCall(n, new Set([i++]))};
        
        console.log("Incumbent: ", result.incumbent);
    });
}

const fastSolution = (n_list) => {
  n_list.forEach(n => {
      results_div.appendChild(document.createElement("br"));
      const solution_span = document.createElement("span");
      solution_span.textContent = `Results for: ${n}\n`;
      results_div.appendChild(solution_span);
      results_div.appendChild(document.createElement("br"));
      console.log("Results for: ", n);
      result.solutions = [];
      result.incumbent = new Set([n * n]);
      fastRecursiveCall(n, new Set([1]));
  });
}

const start = new Date().getTime();
const n_list = [5, 11, 23, 47];
const result = {};
//optimizedSolution(n_list);
fastSolution(n_list);
const end = new Date().getTime();

results_div.appendChild(document.createElement("br"));
const time_span = document.createElement("span");
time_span.textContent = `Time taken in seconds: ${(end - start) / 1000}\n`;
results_div.appendChild(time_span);
console.log("Execution time in seconds:", (end - start) / 1000);