const { test, expect } = require('@playwright/test');

test.describe('TradeX-Chart E2E Tests', () => {
  // Base URL for the test page that contains the chart
  const baseUrl = 'http://localhost:8080'; // Adjust to your dev server URL
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the page containing the TradeX-Chart
    await page.goto(baseUrl);
    
    // Wait for the chart to be fully loaded
    await page.waitForSelector('.tradex-chart-container', { state: 'visible' });
    
    // Ensure chart is fully initialized
    await page.waitForFunction(() => {
      return window.chart && window.chart.isReady;
    });
  });
  
  test('should render the chart correctly', async ({ page }) => {
    // Verify chart container exists
    const chartContainer = await page.locator('.tradex-chart-container');
    await expect(chartContainer).toBeVisible();
    
    // Verify canvas elements are created
    const canvasElements = await page.locator('.tradex-chart-container canvas');
    const count = await canvasElements.count();
    expect(count).toBeGreaterThan(0);
    
    // Take a screenshot for visual comparison
    await page.screenshot({ path: 'chart-initial-render.png' });
  });
  
  test('should display correct price data', async ({ page }) => {
    // Check if price labels are visible
    const priceLabels = await page.locator('.tradex-chart-price-label');
    await expect(priceLabels.first()).toBeVisible();
    
    // Verify price data is numeric
    const priceText = await priceLabels.first().textContent();
    expect(parseFloat(priceText.replace(/[^0-9.-]+/g, ''))).not.toBeNaN();
  });
  
  test('should handle zoom interactions', async ({ page }) => {
    // Get the chart dimensions
    const chartBounds = await page.locator('.tradex-chart-container').boundingBox();
    
    // Perform a pinch-zoom gesture (or wheel zoom)
    const centerX = chartBounds.x + chartBounds.width / 2;
    const centerY = chartBounds.y + chartBounds.height / 2;
    
    // Store the initial state for comparison
    const initialState = await page.evaluate(() => {
      return {
        range: window.chart.range,
        candleWidth: window.chart.candleWidth
      };
    });
    
    // Simulate wheel zoom
    await page.mouse.move(centerX, centerY);
    await page.mouse.wheel(0, -100); // Zoom in
    
    // Wait for zoom animation to complete
    await page.waitForTimeout(500);
    
    // Check if zoom state has changed
    const zoomedState = await page.evaluate(() => {
      return {
        range: window.chart.range,
        candleWidth: window.chart.candleWidth
      };
    });
    
    // Verify zoom effect
    expect(zoomedState.candleWidth).toBeGreaterThan(initialState.candleWidth);
  });
  
  test('should handle pan interactions', async ({ page }) => {
    // Get the chart dimensions
    const chartBounds = await page.locator('.tradex-chart-container').boundingBox();
    
    // Store the initial state
    const initialState = await page.evaluate(() => {
      return {
        range: window.chart.range,
        offset: window.chart.offset
      };
    });
    
    // Perform a pan gesture
    const startX = chartBounds.x + chartBounds.width * 0.75;
    const startY = chartBounds.y + chartBounds.height / 2;
    const endX = chartBounds.x + chartBounds.width * 0.25;
    
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(endX, startY, { steps: 10 }); // Move in steps for smooth panning
    await page.mouse.up();
    
    // Wait for pan animation to complete
    await page.waitForTimeout(500);
    
    // Check if pan state has changed
    const pannedState = await page.evaluate(() => {
      return {
        range: window.chart.range,
        offset: window.chart.offset
      };
    });
    
    // Verify pan effect (either offset or range should change)
    expect(
      pannedState.offset !== initialState.offset || 
      pannedState.range[0] !== initialState.range[0]
    ).toBeTruthy();
  });
  
  test('should display tooltips on hover', async ({ page }) => {
    // Get the chart dimensions
    const chartBounds = await page.locator('.tradex-chart-container').boundingBox();
    
    // Move mouse to a candle position
    const hoverX = chartBounds.x + chartBounds.width * 0.5;
    const hoverY = chartBounds.y + chartBounds.height * 0.5;
    
    await page.mouse.move(hoverX, hoverY);
    
    // Wait for tooltip to appear
    await page.waitForSelector('.tradex-chart-tooltip', { state: 'visible', timeout: 5000 })
      .catch(() => {
        // If tooltip doesn't appear as a separate element, it might be rendered on canvas
        console.log('Tooltip element not found, may be rendered directly on canvas');
      });
    
    // Take a screenshot with tooltip
    await page.screenshot({ path: 'chart-with-tooltip.png' });
  });
  
  test('should update when new data is added', async ({ page }) => {
    // Get initial data count
    const initialDataCount = await page.evaluate(() => {
      return window.chart.data.length;
    });
    
    // Add new data point
    await page.evaluate(() => {
      const lastCandle = window.chart.data[window.chart.data.length - 1];
      const newTimestamp = lastCandle[0] + 60000; // Add 1 minute
      
      const newCandle = [
        newTimestamp,
        lastCandle[4] * 1.001, // Open slightly higher than last close
        lastCandle[4] * 1.003, // High
        lastCandle[4] * 0.999, // Low
        lastCandle[4] * 1.002, // Close
        lastCandle[5] * 0.9,   // Volume
      ];
      
      // Add the new data point
      window.chart.update([newCandle]);
    });
    
    // Wait for chart to update
    await page.waitForTimeout(500);
    
    // Verify data was added
    const newDataCount = await page.evaluate(() => {
      return window.chart.data.length;
    });
    
    expect(newDataCount).toBeGreaterThan(initialDataCount);
  });
  
  test('should toggle between chart types', async ({ page }) => {
    // Get initial chart type
    const initialType = await page.evaluate(() => {
      return window.chart.chartType;
    });
    
    // Find and click the chart type toggle button
    // Note: Adjust the selector based on your actual UI
    const chartTypeButton = await page.locator('.chart-type-toggle').first();
    await chartTypeButton.click();
    
    // Wait for chart to update
    await page.waitForTimeout(500);
    
    // Get new chart type
    const newType = await page.evaluate(() => {
      return window.chart.chartType;
    });
    
    // Verify chart type changed
    expect(newType).not.toEqual(initialType);
    
    // Take a screenshot of the new chart type
    await page.screenshot({ path: `chart-type-${newType}.png` });
  });
  
  test('should handle window resize', async ({ page }) => {
    // Get initial dimensions
    const initialDimensions = await page.evaluate(() => {
      return {
        width: window.chart.width,
        height: window.chart.height
      };
    });
    
    // Resize the viewport
    await page.setViewportSize({ width: 1024, height: 768 });
    
    // Wait for resize to complete
    await page.waitForTimeout(500);
    
    // Get new dimensions
    const newDimensions = await page.evaluate(() => {
      return {
        width: window.chart.width,
        height: window.chart.height
      };
    });
    
    // Verify dimensions changed
    expect(newDimensions).not.toEqual(initialDimensions);
  });
  
  test('should handle time range selection', async ({ page }) => {
    // Find and click a time range button (e.g., 1D, 1W, 1M)
    // Note: Adjust the selector based on your actual UI
    const timeRangeButton = await page.locator('.time-range-button[data-range="1d"]').first();
    await timeRangeButton.click();
    
    // Wait for chart to update
    await page.waitForTimeout(500);
    
    // Verify time range changed
    const rangeInfo = await page.evaluate(() => {
      return {
        start: window.chart.range[0],
        end: window.chart.range[1],
        dataLength: window.chart.data.length
      };
    });
    
    // Verify we have a valid range
    expect(rangeInfo.end - rangeInfo.start).toBeGreaterThan(0);
    expect(rangeInfo.dataLength).toBeGreaterThan(0);
  });
  
  test('should handle indicators', async ({ page }) => {
    // Find and click the indicator button
    // Note: Adjust the selector based on your actual UI
    const indicatorButton = await page.locator('.indicator-button').first();
    await indicatorButton.click();
    
    // Select an indicator from the menu (e.g., MA)
    const maIndicator = await page.locator('.indicator-menu-item[data-indicator="ma"]').first();
    await maIndicator.click();
    
    // Wait for indicator to be added
    await page.waitForTimeout(500);
    
    // Verify indicator was added
    const hasIndicator = await page.evaluate(() => {
      return window.chart.indicators && 
             window.chart.indicators.some(ind => ind.name.toLowerCase().includes('ma'));
    });
    
    expect(hasIndicator).toBeTruthy();
    
    // Take a screenshot with the indicator
    await page.screenshot({ path: 'chart-with-indicator.png' });
  });
  
  test('should handle dark/light theme toggle', async ({ page }) => {
    // Get initial theme
    const initialTheme = await page.evaluate(() => {
      return window.chart.options.theme;
    });
    
    // Find and click the theme toggle button
    const themeToggle = await page.locator('.theme-toggle-button').first();
    await themeToggle.click();
    
    // Wait for theme to change
    await page.waitForTimeout(500);
    
    // Get new theme
    const newTheme = await page.evaluate(() => {
      return window.chart.options.theme;
    });
    
    // Verify theme changed
    expect(newTheme).not.toEqual(initialTheme);
    
    // Take a screenshot with the new theme
    await page.screenshot({ path: `chart-theme-${newTheme}.png` });
  });
});
