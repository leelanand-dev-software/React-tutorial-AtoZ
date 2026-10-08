// Episode 1 : Execution Context
//1. Everything in JS happens inside the execution context.Imagine a sealed - off container inside which JS runs.It is an abstract concept that hold info about the env.within the current code is being executed.Execution Context

//2. In the container the first component is memory component and the 2nd one is code component

//3. Memory component has all the variables and functions in key value pairs.It is also called Variable environment.

//4. Code component is the place where code is executed one line at a time.It is also called the Thread of Execution.

//5. JS is a synchronous, single - threaded language

//6. Synchronous: - In a specific synchronous order.
//     Single - threaded: - One command at a time.


console.log(this.a); // window object is the global object in the browser environment
