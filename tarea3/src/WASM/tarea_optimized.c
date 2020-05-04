#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <time.h>
//#include <emscripten.h>

typedef struct Node {
   int val;
   struct Node * next;
} Node_t;

typedef struct LL {
   struct Node * head;
   struct Node * tail;
   int size;
} LL_t;

typedef struct Results {
   int num;
   LL_t * incumbent;
} Results_t;


Node_t * init_node(int val) {
   Node_t * new_node = malloc(sizeof(Node_t));
   new_node->val = val;
   new_node->next = NULL;
   return new_node;
}

LL_t * init_ll() {
   LL_t * ll = malloc(sizeof(LL_t));
   ll->head = NULL;
   ll->tail = NULL;
   ll->size = 0;
   return ll;
}

void add_element(int a, LL_t * ll) {
   Node_t * new_node = init_node(a);
   if (ll->head == NULL){
      ll->head = new_node;
      ll-> tail = new_node;
   }
   else {
      ll->tail->next = new_node; 
      ll->tail = new_node;
   }
   ll->size++;
}

void destroy_list(LL_t * ll) {
   Node_t * current = ll->head;
   while (current != NULL) {
      Node_t * next = current -> next;
      free(current);
      current = next;
   }
   free(ll);
}

_Bool check_presence(int a, LL_t * ll) {
   Node_t * current = ll->head;
   while (current != NULL) { 
      if (current->val == a) {return 1;}
      Node_t * next = current -> next;
      current = next;
   }
   return 0;
}

Results_t * set_initial_results(int num) {
   Results_t * initial_results = malloc(sizeof(Results_t));
   initial_results->incumbent = init_ll();
   add_element(num * num, initial_results->incumbent);
   return initial_results;
}

LL_t * get_current_results(LL_t * solution) {
   LL_t * current_results = init_ll();
   Node_t * num_1 = solution->head;
   while (num_1 != NULL)
   {
      Node_t * num_2 = solution->head;
      while (num_2 != NULL)
      {
         add_element(num_1->val + num_2->val, current_results);
         add_element(num_1->val * num_2->val, current_results);
         num_2 = num_2->next;
      }
      num_1 = num_1->next;
   }
   return current_results;
}

void print_list(LL_t * ll) {
   Node_t * current = ll->head;
   printf("[");
   while (current->next != NULL) {
      printf("%i, ", current->val);
      current = current->next;
   }
   printf("%i]\n", current->val);
}

void destroy_results(Results_t * initial_results) {
   destroy_list(initial_results->incumbent);
   free(initial_results);
}

_Bool in_current_results(int num1, int num2, LL_t * current_results) {
   if (check_presence(num1 + num1, current_results)) {return 1;}
   if (check_presence(num1 * num1, current_results)) {return 1;}
   if (check_presence(num1 + num2, current_results)) {return 1;}
   if (check_presence(num1 * num2, current_results)) {return 1;}
   return 0;
}

int max_value(LL_t * ll) {
   Node_t * current = ll->head;
   int maximum = 0;
   while (current != NULL) { 
      if (current->val > maximum){maximum = current->val;}
      Node_t * next = current -> next;
      current = next;
   }
   return maximum;
}

LL_t * copy_ll(LL_t * coppied) {
   LL_t * copy = init_ll();
   Node_t * current = coppied->head;
   while(current != NULL) {
      add_element(current->val, copy);
      current = current->next;
   }
   return copy;
}

int next_valid_number(LL_t * solution, int possible) {
   LL_t * current_results = get_current_results(solution);
   while (1) {
      _Bool can_add = 1;
      Node_t * number = solution->head;
      while (number != NULL) {
         if (in_current_results(possible, number->val, current_results)) {
            can_add = 0;
            break;
         }
         number = number->next;
      }
      if (can_add) {
         destroy_list(current_results);
         return possible;
      }
      possible++;
   }
}

void optimized_recursive_call(int n, LL_t * solution, Results_t * result) {
   if (solution->size == n) {
      if (max_value(solution) < max_value(result->incumbent)) {
         destroy_list(result->incumbent);
         result->incumbent = copy_ll(solution);
      }
      print_list(solution);
      destroy_list(solution);
      return;
   }
   int num = next_valid_number(solution, max_value(solution) + 1);
   while (num < max_value(result->incumbent)) {
      LL_t * solution_copy = copy_ll(solution);
      add_element(num, solution_copy);
      optimized_recursive_call(n, solution_copy, result);
      num = next_valid_number(solution, num + 1);
   }
   destroy_list(solution);
   return;
}

void fast_recursive_call(int n, LL_t * solution, Results_t * result) {
   if (solution->size == n) {
      print_list(solution);
      destroy_list(solution);
      return;
   }
   int num = next_valid_number(solution, max_value(solution) + 1);
   LL_t * solution_copy = copy_ll(solution);
   add_element(num, solution_copy);
   fast_recursive_call(n, solution_copy, result);
   destroy_list(solution);
   return;
}

void optimized_solution(int * n_list) {
   for (int n = 0; n < 4; n++) {
      printf("Results for %u:\n", n_list[n]);
      Results_t * results = set_initial_results(n_list[n]);
      LL_t * solution = init_ll();
      add_element(1, solution);
      optimized_recursive_call(n_list[n], solution, results);
      int i = 3;
      while (i < max_value(results->incumbent)) {
         LL_t * new_solution = init_ll();
         add_element(i, new_solution);
         optimized_recursive_call(n_list[n], new_solution, results);
         i++;
      };
      printf("Incumbent: ");
      print_list(results->incumbent);
      puts("");
      destroy_results(results);
   }
}

void fast_solution(int * n_list) {
   for (int n = 0; n < 4; n++) {
      printf("Results for %u:\n", n_list[n]);
      Results_t * results = set_initial_results(n_list[n]);
      LL_t * solution = init_ll();
      add_element(1, solution);
      fast_recursive_call(n_list[n], solution, results);
      destroy_results(results);
   }
}

//EMSCRIPTEN_KEEPALIVE
int main() {

   clock_t t;
   t = clock(); 
   int n_list[4] = {5, 11, 23, 47};
   //int n_list[4] = {2, 3, 4, 5};


   optimized_solution(n_list);
   //fast_solution(n_list);

   t = clock() - t; 
   double time_taken = ((double)t)/CLOCKS_PER_SEC; // in seconds 
  
   printf("Time taken in seconds: %f\n", time_taken); 
   return 0;
}