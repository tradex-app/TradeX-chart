'use client';
import { CHART_OPTIONS } from '@/components/tradeX/utils';
import { useState } from 'react';
import { Info } from './Info';
import { Button } from '@/components/ui/button';
import Icons from './Icons';
import getConfig from '@/components/tradeX/utils/config';
import { ToolbarConfig } from '@/components/tradeX/utils/types';
import dynamic from 'next/dynamic';
import { ChartProvider } from '@/components/tradeX/provider/ChartProvider';

const TradingChart = dynamic(() => import('@/components/tradeX/Wrapper'), {
  ssr: false
});

export default function Home() {
  const [showChart, setShowChart] = useState(true);

  const toolBarConfig: ToolbarConfig = {
    intervals: ['1m', '5m', '15m', '30m', '1h', '12h', '1d'],
    timeframe: true,
    indicators: true,
    typeSelector: true,
    states: true,
    fullscreenButton: true,
    themeSwitcher: true
  };

  const config = getConfig({});

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 pt-4">
      <div className="z-10 mb-6 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:bg-none">
          <p className="text-xl font-bold pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0">
            TradeX chart on NextJS
          </p>
          <div className="flex flex-grow items-center justify-center gap-2">
            <Button
              variant={showChart ? 'secondary' : 'outline'}
              onClick={() => setShowChart(true)}
            >
              Chart
            </Button>
            <Button
              variant={showChart ? 'outline' : 'secondary'}
              onClick={() => setShowChart(false)}
            >
              Info
            </Button>
          </div>
          <Icons />
        </div>
      </div>
      <div className="px-10 relative flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        {showChart && (
          <ChartProvider>
            <TradingChart
              {...config}
              toolbar={toolBarConfig}
              defaults={{
                chartType: CHART_OPTIONS[0],
                showTradeData: true
              }}
              timeFrame="1m"
              // override config props here
            />
          </ChartProvider>
        )}
        {!showChart && <Info />}
      </div>
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          href="https://tradex-app.github.io/TradeX-chart/reference/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Find in-depth information about TradeX features and API.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Deploy{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
