const id = "reference/01_getting_started.md";
						const collection = "docs";
						const slug = "reference/01_getting_started";
						const body = "\n## Get TradeX Chart\n\nTradeX Chart supports multiple download methods, you can get it through package management tools such as ``npm``, ``yarn``, or ``CDN``.\n\n### npm\n```bash\nnpm install tradex-chart --save\n```\n### yarn\n```bash\nyarn add tradex-chart\n```\n\n### CDN\nYou can use `jsDelivr`, `unpkg` or others.\n```html\n<!-- jsdelivr -->\n<script src=\"https://cdn.jsdelivr.net/npm/tradex-chart/dist/tradex-chart.umd.min.js\"></script>\n\n<!-- unpkg -->\n<script src=\" https://cdn.jsdelivr.net/npm/tradex-chart@0.128.1/dist/tradex-chart.umd.min.js \"></script>\n```\n\n## Step 1.  Creating the Chart\n\nTradeX Chart is a custom HTML element. It must be created and inserted into the DOM.\n\n```javascript\nimport { Chart } from 'tradex-chart'\n\n// Create an empty chart and insert it into the DOM\nlet chart = document.createElement(\"tradex-chart\")\nlet mount = document.getElementByID(\"#mount\")\n    mount.appendChild(chart)\n```\n\n## Step 2.  Configure and Start the Chart\n\nAfter the chart has mounted on the DOM, start it with a configuration object.\n\n```javascript\nchart.start(config)\n```\n\nWithout a configuration, the chart won't do anything useful, so you need define a few things. The [Configuration](../02_configuration) documentation will explain what options are available.\n";
						const data = {title:"Getting Started",description:"How to set up and use TradeX Chart",editUrl:true,head:[],template:"doc"};
						const _internal = {
							type: 'content',
							filePath: "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/src/content/docs/reference/01_getting_started.md",
							rawData: "\ntitle: Getting Started\ndescription: How to set up and use TradeX Chart",
						};

export { _internal, body, collection, data, id, slug };
