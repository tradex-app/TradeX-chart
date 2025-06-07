/**
 * @jest-environment jsdom
 */

import Range from '../../src/components/Range'; // Adjust the import path as needed

describe('TradeX-Chart Range Class', () => {
  let range;
  let mockData;
  let mockOptions;

  // Setup mock data and options before each test
  beforeEach(() => {
    // Mock time-series data (timestamp, open, high, low, close, volume)
    mockData = [];
    const now = Date.now();
    const minute = 60 * 1000;
    
    // Generate 100 data points
    for (let i = 0; i < 100; i++) {
      mockData.push([
        now + i * minute, // timestamp
        100 + Math.random() * 10, // open
        100 + Math.random() * 20, // high
        100 - Math.random() * 10, // low
        100 + Math.random() * 10, // close
        1000 + Math.random() * 1000 // volume
      ]);
    }
    
    // Mock options
    mockOptions = {
      minRange: 10, // Minimum number of candles to display
      maxRange: 1000, // Maximum number of candles to display
      initialRange: [0, 50], // Initial range indices
      padding: 0.1, // Padding percentage for price range
      allowZoom: true,
      allowPan: true
    };
    
    // Create a new Range instance
    range = new Range(mockData, mockOptions);
  });

  // Test constructor and initialization
  describe('Constructor and Initialization', () => {
    test('should initialize with default options if none provided', () => {
      const defaultRange = new Range(mockData);
      expect(defaultRange).toBeDefined();
      expect(defaultRange.getVisibleData().length).toBeGreaterThan(0);
    });
    
    test('should initialize with provided options', () => {
      expect(range).toBeDefined();
      expect(range.getVisibleData().length).toBe(51); // 0 to 50 inclusive
    });
    
    test('should throw error if data is not an array', () => {
      expect(() => new Range(null)).toThrow();
      expect(() => new Range('not an array')).toThrow();
      expect(() => new Range({})).toThrow();
    });
    
    test('should handle empty data array', () => {
      const emptyRange = new Range([]);
      expect(emptyRange).toBeDefined();
      expect(emptyRange.getVisibleData().length).toBe(0);
    });
  });

  // Test range setting and getting
  describe('Range Setting and Getting', () => {
    test('should set and get range correctly', () => {
      range.setRange([10, 30]);
      const currentRange = range.getRange();
      expect(currentRange[0]).toBe(10);
      expect(currentRange[1]).toBe(30);
      expect(range.getVisibleData().length).toBe(21); // 10 to 30 inclusive
    });
    
    test('should enforce minimum range', () => {
      range.setRange([10, 15]); // Range of 5, but minimum is 10
      const currentRange = range.getRange();
      expect(currentRange[1] - currentRange[0]).toBeGreaterThanOrEqual(mockOptions.minRange - 1);
    });
    
    test('should enforce maximum range', () => {
      range.setRange([0, 1500]); // Range exceeds max
      const currentRange = range.getRange();
      expect(currentRange[1] - currentRange[0]).toBeLessThanOrEqual(mockOptions.maxRange - 1);
    });
    
    test('should clamp range to data boundaries', () => {
      range.setRange([-10, 150]); // Out of bounds
      const currentRange = range.getRange();
      expect(currentRange[0]).toBeGreaterThanOrEqual(0);
      expect(currentRange[1]).toBeLessThanOrEqual(mockData.length - 1);
    });
    
    test('should handle invalid range values', () => {
      const originalRange = range.getRange();
      range.setRange('invalid');
      expect(range.getRange()).toEqual(originalRange); // Should not change
      
      range.setRange([50, 20]); // End before start
      const fixedRange = range.getRange();
      expect(fixedRange[0]).toBeLessThan(fixedRange[1]); // Should fix order
    });
  });

  // Test zooming functionality
  describe('Zooming', () => {
    test('should zoom in correctly', () => {
      const initialRange = range.getRange();
      const initialLength = initialRange[1] - initialRange[0];
      
      range.zoomAt(0.5, 0.5); // Zoom in by 50% at center
      
      const newRange = range.getRange();
      const newLength = newRange[1] - newRange[0];
      
      expect(newLength).toBeLessThan(initialLength);
    });
    
    test('should zoom out correctly', () => {
      // First zoom in to have room to zoom out
      range.setRange([20, 40]);
      const initialRange = range.getRange();
      const initialLength = initialRange[1] - initialRange[0];
      
      range.zoomAt(-0.5, 0.5); // Zoom out by 50% at center
      
      const newRange = range.getRange();
      const newLength = newRange[1] - newRange[0];
      
      expect(newLength).toBeGreaterThan(initialLength);
    });
    
    test('should respect minimum zoom level', () => {
      range.setRange([0, mockOptions.minRange + 5]);
      const initialRange = range.getRange();
      
      range.zoomAt(0.9, 0.5); // Try to zoom in a lot
      
      const newRange = range.getRange();
      expect(newRange[1] - newRange[0]).toBeGreaterThanOrEqual(mockOptions.minRange - 1);
    });
    
    test('should respect maximum zoom level', () => {
      range.setRange([0, mockData.length - 1]); // Full range
      const initialRange = range.getRange();
      
      range.zoomAt(-0.9, 0.5); // Try to zoom out a lot
      
      const newRange = range.getRange();
      expect(newRange[1] - newRange[0]).toBeLessThanOrEqual(mockOptions.maxRange - 1);
    });
    
    test('should zoom at specified position', () => {
      range.setRange([0, 50]);
      
      // Zoom at 25% from left (should preserve this point)
      const zoomPoint = 12.5; // 25% of range 0-50
      range.zoomAt(0.5, 0.25);
      
      const newRange = range.getRange();
      
      // The zoom point should remain at approximately the same relative position
      const newZoomPoint = newRange[0] + (newRange[1] - newRange[0]) * 0.25;
      expect(Math.abs(newZoomPoint - zoomPoint)).toBeLessThan(2); // Allow small rounding differences
    });
    
    test('should not zoom if zooming is disabled', () => {
      const noZoomOptions = { ...mockOptions, allowZoom: false };
      const noZoomRange = new Range(mockData, noZoomOptions);
      
      const initialRange = noZoomRange.getRange();
      noZoomRange.zoomAt(0.5, 0.5);
      
      expect(noZoomRange.getRange()).toEqual(initialRange);
    });
  });

  // Test panning functionality
  describe('Panning', () => {
    test('should pan left correctly', () => {
      range.setRange([20, 40]);
      const initialRange = range.getRange();
      
      range.pan(-5); // Pan left by 5 units
      
      const newRange = range.getRange();
      expect(newRange[0]).toBe(initialRange[0] - 5);
      expect(newRange[1]).toBe(initialRange[1] - 5);
    });
    
    test('should pan right correctly', () => {
      range.setRange([20, 40]);
      const initialRange = range.getRange();
      
      range.pan(5); // Pan right by 5 units
      
      const newRange = range.getRange();
      expect(newRange[0]).toBe(initialRange[0] + 5);
      expect(newRange[1]).toBe(initialRange[1] + 5);
    });
    
    test('should not pan beyond left data boundary', () => {
      range.setRange([0, 20]);
      
      range.pan(-10); // Try to pan left beyond boundary
      
      const newRange = range.getRange();
      expect(newRange[0]).toBe(0); // Should stop at left boundary
    });
    
    test('should not pan beyond right data boundary', () => {
      range.setRange([mockData.length - 21, mockData.length - 1]);
      
      range.pan(10); // Try to pan right beyond boundary
      
      const newRange = range.getRange();
      expect(newRange[1]).toBe(mockData.length - 1); // Should stop at right boundary
    });
    
    test('should not pan if panning is disabled', () => {
      const noPanOptions = { ...mockOptions, allowPan: false };
      const noPanRange = new Range(mockData, noPanOptions);
      
      const initialRange = noPanRange.getRange();
      noPanRange.pan(10);
      
      expect(noPanRange.getRange()).toEqual(initialRange);
    });
    
    test('should maintain range width when panning', () => {
      range.setRange([20, 40]);
      const initialWidth = range.getRange()[1] - range.getRange()[0];
      
      range.pan(15);
      
      const newWidth = range.getRange()[1] - range.getRange()[0];
      expect(newWidth).toBe(initialWidth);
    });
  });

  // Test data access methods
  describe('Data Access', () => {
    test('should get visible data correctly', () => {
      range.setRange([10, 30]);
      const visibleData = range.getVisibleData();
      
      expect(visibleData.length).toBe(21); // 10 to 30 inclusive
      expect(visibleData[0]).toEqual(mockData[10]);
      expect(visibleData[visibleData.length - 1]).toEqual(mockData[30]);
    });
    
    test('should get visible indices correctly', () => {
      range.setRange([10, 30]);
      const visibleIndices = range.getVisibleIndices();
      
      expect(visibleIndices[0]).toBe(10);
      expect(visibleIndices[1]).toBe(30);
    });
    
    test('should calculate visible price range correctly', () => {
      range.setRange([10, 30]);
      const priceRange = range.getVisiblePriceRange();
      
      // Find min and max in the visible data
      let min = Infinity;
      let max = -Infinity;
      
      for (let i = 10; i <= 30; i++) {
        min = Math.min(min, mockData[i][3]); // Low price
        max = Math.max(max, mockData[i][2]); // High price
      }
      
      // Check with padding
      const padding = (max - min) * mockOptions.padding;
      expect(priceRange[0]).toBeLessThanOrEqual(min - padding);
      expect(priceRange[1]).toBeGreaterThanOrEqual(max + padding);
    });
    
    test('should handle data updates', () => {
      // Initial setup
      range.setRange([10, 30]);
      const initialVisibleData = range.getVisibleData();
      
      // Update the data
      const newData = [...mockData];
      newData[15] = [
        newData[15][0],
        200, // New open
        210, // New high
        190, // New low
        205, // New close
        2000 // New volume
      ];
      
      range.updateData(newData);
      const updatedVisibleData = range.getVisibleData();
      
      // Check that the data was updated
      expect(updatedVisibleData[5]).toEqual(newData[15]); // Index 15 is at position 5 in visible data
      expect(updatedVisibleData[5]).not.toEqual(initialVisibleData[5]);
    });
  });

  // Test utility methods
  describe('Utility Methods', () => {
    test('should convert screen position to data index', () => {
      range.setRange([10, 30]);
      
      // Test various positions
      expect(range.screenToIndex(0)).toBe(10); // Left edge
      expect(range.screenToIndex(1)).toBe(30); // Right edge
      expect(range.screenToIndex(0.5)).toBe(20); // Middle
    });
    
    test('should convert data index to screen position', () => {
      range.setRange([10, 30]);
      
      // Test various indices
      expect(range.indexToScreen(10)).toBe(0); // Left edge
      expect(range.indexToScreen(30)).toBe(1); // Right edge
      expect(range.indexToScreen(20)).toBe(0.5); // Middle
    });
    
    test('should handle out of bounds conversions', () => {
      range.setRange([10, 30]);
      
      // Out of bounds screen positions
      expect(range.screenToIndex(-0.5)).toBe(10); // Before left edge
      expect(range.screenToIndex(1.5)).toBe(30); // After right edge
      
      // Out of bounds indices
      expect(range.indexToScreen(5)).toBeLessThan(0); // Before visible range
      expect(range.indexToScreen(35)).toBeGreaterThan(1); // After visible range
    });
    
    test('should reset to initial range', () => {
      range.setRange([25, 45]); // Change from initial
      range.resetRange();
      
      const resetRange = range.getRange();
      expect(resetRange[0]).toBe(mockOptions.initialRange[0]);
      expect(resetRange[1]).toBe(mockOptions.initialRange[1]);
    });
    
    test('should check if index is visible', () => {
      range.setRange([10, 30]);
      
      expect(range.isIndexVisible(15)).toBe(true);
      expect(range.isIndexVisible(5)).toBe(false);
      expect(range.isIndexVisible(35)).toBe(false);
    });
  });

  // Test event handling
  describe('Event Handling', () => {
    test('should trigger callback on range change', () => {
      const mockCallback = jest.fn();
      range.onRangeChange(mockCallback);
      
      range.setRange([15, 35]);
      
      expect(mockCallback).toHaveBeenCalledWith([15, 35]);
    });
    
    test('should trigger callback on zoom', () => {
      const mockCallback = jest.fn();
      range.onZoom(mockCallback);
      range.zoomAt(0.5, 0.5);
      
      expect(mockCallback).toHaveBeenCalled();
      expect(mockCallback.mock.calls[0][0]).toBeGreaterThan(0); // Zoom factor
      expect(mockCallback.mock.calls[0][1]).toBe(0.5); // Zoom center
    });
    
    test('should trigger callback on pan', () => {
      const mockCallback = jest.fn();
      range.onPan(mockCallback);
      
      range.pan(10);
      
      expect(mockCallback).toHaveBeenCalledWith(10);
    });
    
    test('should remove event listeners', () => {
      const mockCallback = jest.fn();
      const removeListener = range.onRangeChange(mockCallback);
      
      removeListener(); // Remove the listener
      range.setRange([15, 35]);
      
      expect(mockCallback).not.toHaveBeenCalled();
    });
    
    test('should chain multiple callbacks', () => {
      const mockCallback1 = jest.fn();
      const mockCallback2 = jest.fn();
      
      range.onRangeChange(mockCallback1);
      range.onRangeChange(mockCallback2);
      
      range.setRange([15, 35]);
      
      expect(mockCallback1).toHaveBeenCalledWith([15, 35]);
      expect(mockCallback2).toHaveBeenCalledWith([15, 35]);
    });
  });

  // Test performance optimizations
  describe('Performance Optimizations', () => {
    test('should cache visible data', () => {
      // Mock the internal getVisibleDataUncached method
      const originalMethod = range.getVisibleDataUncached;
      range.getVisibleDataUncached = jest.fn().mockImplementation(originalMethod);
      
      // Set range to trigger cache invalidation
      range.setRange([10, 30]);
      
      // First call should use uncached method
      range.getVisibleData();
      expect(range.getVisibleDataUncached).toHaveBeenCalledTimes(1);
      
      // Second call should use cache
      range.getVisibleData();
      expect(range.getVisibleDataUncached).toHaveBeenCalledTimes(1); // Still 1
      
      // Change range to invalidate cache
      range.setRange([15, 35]);
      
      // Should use uncached method again
      range.getVisibleData();
      expect(range.getVisibleDataUncached).toHaveBeenCalledTimes(2);
      
      // Restore original method
      range.getVisibleDataUncached = originalMethod;
    });
    
    test('should cache price range calculations', () => {
      // Mock the internal calculateVisiblePriceRange method
      const originalMethod = range.calculateVisiblePriceRange;
      range.calculateVisiblePriceRange = jest.fn().mockImplementation(originalMethod);
      
      // Set range to trigger cache invalidation
      range.setRange([10, 30]);
      
      // First call should calculate
      range.getVisiblePriceRange();
      expect(range.calculateVisiblePriceRange).toHaveBeenCalledTimes(1);
      
      // Second call should use cache
      range.getVisiblePriceRange();
      expect(range.calculateVisiblePriceRange).toHaveBeenCalledTimes(1); // Still 1
      
      // Change range to invalidate cache
      range.setRange([15, 35]);
      
      // Should calculate again
      range.getVisiblePriceRange();
      expect(range.calculateVisiblePriceRange).toHaveBeenCalledTimes(2);
      
      // Restore original method
      range.calculateVisiblePriceRange = originalMethod;
    });
  });

  // Test edge cases and error handling
  describe('Edge Cases and Error Handling', () => {
    test('should handle single data point', () => {
      const singleDataPoint = [mockData[0]];
      const singleRange = new Range(singleDataPoint);
      
      expect(singleRange.getVisibleData().length).toBe(1);
      expect(singleRange.getRange()[0]).toBe(0);
      expect(singleRange.getRange()[1]).toBe(0);
      
      // Zooming and panning should be no-ops
      singleRange.zoomAt(0.5, 0.5);
      singleRange.pan(10);
      
      expect(singleRange.getRange()[0]).toBe(0);
      expect(singleRange.getRange()[1]).toBe(0);
    });
    
    test('should handle data with missing values', () => {
      const dataWithNull = [...mockData];
      dataWithNull[15] = [
        dataWithNull[15][0], // Keep timestamp
        null, // null open
        150, // high
        null, // null low
        140, // close
        1000 // volume
      ];
      
      const nullRange = new Range(dataWithNull);
      nullRange.setRange([10, 20]);
      
      const priceRange = nullRange.getVisiblePriceRange();
      expect(priceRange[0]).not.toBeNull();
      expect(priceRange[1]).not.toBeNull();
    });
    
    test('should handle range exactly at data boundaries', () => {
      range.setRange([0, mockData.length - 1]);
      
      // Try to pan beyond boundaries
      range.pan(10);
      range.pan(-10);
      
      const finalRange = range.getRange();
      expect(finalRange[0]).toBe(0);
      expect(finalRange[1]).toBe(mockData.length - 1);
    });
    
    test('should handle very small ranges', () => {
      // Set to minimum range
      range.setRange([10, 10 + mockOptions.minRange - 1]);
      
      // Try to zoom in further
      range.zoomAt(0.5, 0.5);
      
      const finalRange = range.getRange();
      expect(finalRange[1] - finalRange[0]).toBe(mockOptions.minRange - 1);
    });
    
    test('should handle very large ranges', () => {
      // Set to maximum range
      range.setRange([0, mockOptions.maxRange - 1]);
      
      // Try to zoom out further
      range.zoomAt(-0.5, 0.5);
      
      const finalRange = range.getRange();
      expect(finalRange[1] - finalRange[0]).toBe(mockOptions.maxRange - 1);
    });
  });

  // Test integration with time-based data
  describe('Time-Based Data Integration', () => {
    test('should find index for timestamp', () => {
      // Get a timestamp from the middle of the data
      const targetTimestamp = mockData[50][0];
      
      const index = range.findIndexForTimestamp(targetTimestamp);
      expect(index).toBe(50);
    });
    
    test('should handle timestamp before data range', () => {
      const earlyTimestamp = mockData[0][0] - 60000; // 1 minute before first point
      
      const index = range.findIndexForTimestamp(earlyTimestamp);
      expect(index).toBe(0); // Should return first index
    });
    
    test('should handle timestamp after data range', () => {
      const lateTimestamp = mockData[mockData.length - 1][0] + 60000; // 1 minute after last point
      
      const index = range.findIndexForTimestamp(lateTimestamp);
      expect(index).toBe(mockData.length - 1); // Should return last index
    });
    
    test('should handle timestamp between data points', () => {
      // Timestamp halfway between points 50 and 51
      const betweenTimestamp = (mockData[50][0] + mockData[51][0]) / 2;
      
      const index = range.findIndexForTimestamp(betweenTimestamp);
      expect(index).toBe(50); // Should return the earlier index
    });
    
    test('should set range by timestamps', () => {
      const startTimestamp = mockData[20][0];
      const endTimestamp = mockData[40][0];
      
      range.setRangeByTime(startTimestamp, endTimestamp);
      
      const newRange = range.getRange();
      expect(newRange[0]).toBe(20);
      expect(newRange[1]).toBe(40);
    });
    
    test('should get visible time range', () => {
      range.setRange([20, 40]);
      
      const timeRange = range.getVisibleTimeRange();
      expect(timeRange[0]).toBe(mockData[20][0]);
      expect(timeRange[1]).toBe(mockData[40][0]);
    });
  });

  // Test serialization and state management
  describe('Serialization and State Management', () => {
    test('should serialize state', () => {
      range.setRange([20, 40]);
      
      const state = range.getState();
      expect(state).toHaveProperty('range');
      expect(state.range[0]).toBe(20);
      expect(state.range[1]).toBe(40);
    });
    
    test('should restore from state', () => {
      const state = {
        range: [25, 45],
        options: { padding: 0.2 }
      };
      
      range.setState(state);
      
      const newRange = range.getRange();
      expect(newRange[0]).toBe(25);
      expect(newRange[1]).toBe(45);
      
      // Should also update options
      const priceRange = range.getVisiblePriceRange();
      // Verify padding was applied (would need to check internal implementation)
    });
    
    test('should handle invalid state', () => {
      const originalRange = range.getRange();
      
      range.setState(null);
      range.setState({});
      range.setState({ range: 'invalid' });
      
      expect(range.getRange()).toEqual(originalRange);
    });
  });

  // Test cleanup and memory management
  describe('Cleanup and Memory Management', () => {
    test('should clean up resources', () => {
      // Mock any internal methods that need cleanup
      range.cleanup();
      
      // Verify that event listeners are removed
      const mockCallback = jest.fn();
      const removeListener = range.onRangeChange(mockCallback);
      
      removeListener(); // This should work even after cleanup
      range.setRange([15, 35]);
      
      expect(mockCallback).not.toHaveBeenCalled();
    });
    
    test('should handle data replacement', () => {
      // Initial setup
      range.setRange([10, 30]);
      
      // Create completely new data
      const newData = [];
      const now = Date.now();
      const minute = 60 * 1000;
      
      for (let i = 0; i < 50; i++) {
        newData.push([
          now + i * minute,
          200 + Math.random() * 10,
          200 + Math.random() * 20,
          200 - Math.random() * 10,
          200 + Math.random() * 10,
          2000 + Math.random() * 1000
        ]);
      }
      
      // Replace data and reset range
      range.replaceData(newData);
      
      // Range should be reset to default
      const newRange = range.getRange();
      expect(newRange[0]).toBe(mockOptions.initialRange[0]);
      expect(newRange[1]).toBe(mockOptions.initialRange[1]);
      
      // Visible data should be from new dataset
      const visibleData = range.getVisibleData();
      expect(visibleData[0][1]).toBeGreaterThan(150); // New data has values around 200
    });
  });
});
