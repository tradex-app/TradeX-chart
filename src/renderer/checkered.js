// checkered.js

/**
 * draw checkerboard pattern
 * @param {canvas} ctx 
 * @param {number} squareSize 
 * @param {number} rows 
 * @param {number} cols 
 * @param {string} odd 
 * @param {string} even 
 */
export function renderCheckerBoard(ctx, squareSize, rows, cols, odd, even) {

  for (let j = 0; j < rows; j++)
      for (let i = 0; i < cols; i++) {
          if ((i % 2 == 0 && j % 2 == 0) || (i % 2 != 0 && j % 2 != 0)) 
              ctx.fillStyle = odd
          else ctx.fillStyle = even
          ctx.fillRect(i * squareSize, j * squareSize, squareSize, squareSize)
      }
}
