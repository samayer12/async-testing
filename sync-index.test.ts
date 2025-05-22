import { DataProcessor, createProcessor, createProcessorAsync } from './index';

describe('DataProcessor Sync Debugging Examples', () => {
  test('Debug Example: Basic Chaining', () => {
    const initialData = [1, 2, 3];
    const processor = new DataProcessor(initialData);
    
    const result = processor
      .add(5)         // Transforms [1,2,3] -> [6,7,8]
      .multiply(2)    // Transforms [6,7,8] -> [12,14,16]
      .getResult();   // Returns the final result
    
    expect(result).toEqual([12, 14, 16]);
  });

  /**
   * Use Step Into (F11) to see how each method is executed in sequence.
   */
  test('Debug Example: Complex Chaining', () => {
    const initialData = [5, 10, 15, 20, 25];
    
    // Then use Step Into (F11) to follow execution into each method
    const result = createProcessor(initialData)
      .add(5)               // [10,15,20,25,30]
      .multiply(2)          // [20,30,40,50,60]
      .filterGreaterThan(35) // [40,50,60]
      .sort(false)          // [60,50,40]
      .getResult();
    
    expect(result).toEqual([60, 50, 40]);
  });

  /**
   * This test demonstrates how to debug errors in chained calls.
   * We'll deliberately cause a type error to see how debugging helps identify issues.
   */
  test('Debug Example: Error Handling', () => {
    const processor = createProcessor([1, 2, 3]);
    
    // Uncomment the line below to see an error during debugging
    // This will cause a type error that you can catch with the debugger
    // const result = processor
    //   .add(5)
    //   .multiply('not a number' as any) // Type error: string passed to multiply
    //   .getResult();
    
    // Instead, use the correct type
    const result = processor
      .add(5)
      .multiply(2)
      .getResult();
    
    expect(result).toEqual([12, 14, 16]);
  });

  /**
   * This test demonstrates how to use conditional breakpoints.
   * Right-click on the breakpoint and add a condition like 'item > 15'
   */
  test('Debug Example: Conditional Breakpoints', () => {
    const data = [5, 10, 15, 20, 25];
    const processor = createProcessor(data);
    
    // Set a breakpoint on the filter line and make it conditional with 'item > 15'
    const result = processor
      .add(5)               // [10,15,20,25,30]
      .filterGreaterThan(15) // [20,25,30]
      .getResult();
    
    expect(result).toEqual([20, 25, 30]);
  });
});
