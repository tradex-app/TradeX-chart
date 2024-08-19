vite build && 
cp ./dist/tradex-chart.es.js ./docs && 
cp ./dist/tradex-chart.es.js ./demo && 
cp ./dist/tradex-chart.es.js ./src/docs/public &&
cp ./types/tradex-chart.d.ts ./dist &&
cd ./src/docs/ && 
npm run build
