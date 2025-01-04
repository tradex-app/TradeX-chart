/* eslint-disable @next/next/no-img-element */
const Icons = () => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row gap-1">
        <a href="https://www.npmjs.com/package/tradex-chart" title="Version">
          <img src="https://badgen.net/npm/v/tradex-chart" alt="Version" />
        </a>
        <a href="https://bundlephobia.com/result?p=tradex-chart" title="Size">
          <img
            src="https://badgen.net/bundlephobia/minzip/tradex-chart"
            alt="Size"
          />
        </a>
      </div>
      <div className="flex flex-row gap-1">
        <a
          href="https://github.com/tradex-app/TradeX-chart/blob/master/LICENSE"
          title="License"
        >
          <img
            src="https://badgen.net/github/license/tradex-app/tradex-chart"
            alt="License"
          />
        </a>
        <a href="https://github.com/tradex-app/TradeX-chart" title="GitHub">
          <img
            src="https://badgen.net/badge/icon/github?icon=github&label"
            alt="GitHub"
          />
        </a>
        <a href="https://www.npmjs.com/package/tradex-chart" title="NPM">
          <img
            src="https://badgen.net/badge/icon/npm?icon=npm&label"
            alt="NPM"
          />
        </a>
        <a
          href="https://discord.gg/6XS9tDrcdq"
          title="Discord"
        >
          <img
            src="https://badgen.net/badge/icon/discord?icon=discord&label"
            alt="discord"
          />
        </a>
      </div>
    </div>
  );
};

export default Icons;
