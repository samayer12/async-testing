/**
 * DataProcessor class - demonstrates chained function calls
 * This class processes data through a series of transformations
 */
export class DataProcessor {
  private data: number[];

  constructor(initialData: number[] = []) {
    this.data = [...initialData];
  }

  /**
   * Add a value to each element in the data array
   * @param value The value to add
   * @returns The DataProcessor instance for chaining
   */
  add(value: number): DataProcessor {
    this.data = this.data.map(item => item + value);
    return this;
  }

  /**
   * Async version of add - simulates a network or I/O delay
   * @param value The value to add
   * @param delayMs Optional delay in milliseconds (default: 100)
   * @returns Promise resolving to the DataProcessor instance for chaining
   */
  async addAsync(value: number, delayMs: number = 100): Promise<DataProcessor> {
    // Simulate some async operation
    await new Promise(resolve => setTimeout(resolve, delayMs));
    this.data = this.data.map(item => item + value);
    return this;
  }

  /**
   * Multiply each element in the data array by a value
   * @param value The multiplier
   * @returns The DataProcessor instance for chaining
   */
  multiply(value: number): DataProcessor {
    this.data = this.data.map(item => item * value);
    return this;
  }

  /**
   * Async version of multiply - simulates a network or I/O delay
   * @param value The multiplier
   * @param delayMs Optional delay in milliseconds (default: 100)
   * @returns Promise resolving to the DataProcessor instance for chaining
   */
  async multiplyAsync(value: number, delayMs: number = 100): Promise<DataProcessor> {
    // Simulate some async operation
    await new Promise(resolve => setTimeout(resolve, delayMs));
    this.data = this.data.map(item => item * value);
    return this;
  }

  /**
   * Filter elements greater than a threshold
   * @param threshold The threshold value
   * @returns The DataProcessor instance for chaining
   */
  filterGreaterThan(threshold: number): DataProcessor {
    this.data = this.data.filter(item => item > threshold);
    return this;
  }

  /**
   * Async version of filterGreaterThan - simulates a network or I/O delay
   * @param threshold The threshold value
   * @param delayMs Optional delay in milliseconds (default: 100)
   * @returns Promise resolving to the DataProcessor instance for chaining
   */
  async filterGreaterThanAsync(threshold: number, delayMs: number = 100): Promise<DataProcessor> {
    // Simulate some async operation
    await new Promise(resolve => setTimeout(resolve, delayMs));
    this.data = this.data.filter(item => item > threshold);
    return this;
  }

  /**
   * Sort the data array in ascending or descending order
   * @param ascending Whether to sort in ascending order (default: true)
   * @returns The DataProcessor instance for chaining
   */
  sort(ascending: boolean = true): DataProcessor {
    this.data.sort((a, b) => ascending ? a - b : b - a);
    return this;
  }

  /**
   * Get the processed data
   * @returns The processed data array
   */
  getResult(): number[] {
    return [...this.data];
  }

  /**
   * Async version of getResult - simulates a network or I/O delay
   * @param delayMs Optional delay in milliseconds (default: 100)
   * @returns Promise resolving to the processed data array
   */
  async getResultAsync(delayMs: number = 100): Promise<number[]> {
    // Simulate some async operation
    await new Promise(resolve => setTimeout(resolve, delayMs));
    return [...this.data];
  }
}

/**
 * Convenience function to create a new DataProcessor instance
 * @param initialData Initial data array
 * @returns A new DataProcessor instance
 */
export function createProcessor(initialData: number[] = []): DataProcessor {
  return new DataProcessor(initialData);
}

/**
 * Async convenience function to create a new DataProcessor instance
 * Simulates fetching data from a remote source
 * @param initialData Initial data array
 * @param delayMs Optional delay in milliseconds (default: 200)
 * @returns Promise resolving to a new DataProcessor instance
 */
export async function createProcessorAsync(
  initialData: number[] = [], 
  delayMs: number = 200
): Promise<DataProcessor> {
  // Simulate fetching data from a server
  await new Promise(resolve => setTimeout(resolve, delayMs));
  return new DataProcessor(initialData);
}