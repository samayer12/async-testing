import { DataProcessor, createProcessor, createProcessorAsync } from './index';

describe('DataProcessor Async Debugging Examples', () => {
  /**
   * This test demonstrates how to debug async chained methods.
   * When debugging async code:
   * 1. The debugger will pause at await points
   * 2. You can step through async code like synchronous code
   * 3. Watch the call stack to see the async/await flow
   */
  test('Debug Example: Basic Async Chaining', async () => {
    // Set a breakpoint here to see initial state
    const initialData = [1, 2, 3];
    const processor = new DataProcessor(initialData);
    
    // Set a breakpoint here and at each await 
    const result = await processor
      .addAsync(5)       // Transforms [1,2,3] -> [6,7,8] with delay
      .then(p => p.multiplyAsync(2)) // Transforms [6,7,8] -> [12,14,16] with delay
      .then(p => p.getResultAsync()); // Returns the final result with delay
    
    // Set a breakpoint here to see the final result
    expect(result).toEqual([12, 14, 16]);
  });

  /**
   * This test demonstrates how to debug async factory functions and chained async methods.
   * Key points for debugging:
   * 1. Set breakpoints before and after await statements
   * 2. Observe how promise resolution works
   * 3. Use Step Into (F11) to navigate through the async chain
   */
  test('Debug Example: Async Factory and Complex Chaining', async () => {
    const initialData = [5, 10, 15, 20, 25];
    
    const processor = await createProcessorAsync(initialData);
    
    // Try both Step Over (F10) and Step Into (F11) to see the difference
    const result = await processor
      .addAsync(5)                // [10,15,20,25,30] with delay
      .then(p => p.multiplyAsync(2))    // [20,30,40,50,60] with delay
      .then(p => p.filterGreaterThanAsync(35)) // [40,50,60] with delay
      .then(p => {
        // Nested operations are common in async code
        // Set a breakpoint here to explore the call stack
        p.sort(false);  // [60,50,40] - synchronous operation within async chain
        return p.getResultAsync(); // Get final result with delay
      });
    
    expect(result).toEqual([60, 50, 40]);
  });

  /**
   * This test demonstrates how to debug error handling in async code.
   * Key debugging techniques:
   * 1. Set breakpoints inside catch blocks
   * 2. Observe how errors propagate through promise chains
   * 3. Use the call stack to trace where the error originated
   */
  test('Debug Example: Async Error Handling', async () => {
    const processor = await createProcessorAsync([1, 2, 3]);
    
    try {
      // This code path causes an error (uncomment to test)
      // const result = await processor
      //   .addAsync(5)
      //   .then(p => {
      //     // Type error: string passed to multiplyAsync
      //     return (p as any).multiplyAsync('not a number');
      //   })
      //   .then(p => p.getResultAsync());
      
      // Instead, use the correct approach
      const result = await processor
        .addAsync(5)
        .then(p => p.multiplyAsync(2))
        .then(p => p.getResultAsync());
      
      expect(result).toEqual([12, 14, 16]);
    } catch (error) {
      // Set a breakpoint here to see error details
      // When testing errors, uncomment the error code above and the line below
      // fail('Should not reach here when using correct types');
      console.log('Error caught:', error);
    }
  });

  /**
   * This test demonstrates how to debug timing issues in async code.
   * Debugging techniques:
   * 1. Use breakpoints at critical timing points
   * 2. Observe the sequence of operations with multiple promises
   * 3. Step through Promise.all to see how parallel operations work
   */
  test('Debug Example: Parallel Async Operations', async () => {
    const processor1 = await createProcessorAsync([1, 2, 3], 50);
    const processor2 = await createProcessorAsync([4, 5, 6], 100);
    
    // Step through to observe how Promise.all handles multiple promises
    const [result1, result2] = await Promise.all([
      // First processor operations
      processor1.addAsync(10)
        .then(p => p.multiplyAsync(2))
        .then(p => p.getResultAsync()),
      
      // Second processor operations (different transformations)
      processor2.addAsync(5)
        .then(p => p.multiplyAsync(3))
        .then(p => p.getResultAsync())
    ]);
    
    // Set a breakpoint here to see final results
    expect(result1).toEqual([22, 24, 26]); // [1,2,3] -> [11,12,13] -> [22,24,26]
    expect(result2).toEqual([27, 30, 33]); // [4,5,6] -> [9,10,11] -> [27,30,33]
  });
});
