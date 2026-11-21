'use client';

import TradingViewWidget from '@/components/TradingViewWidget';
import { TECHNICAL_ANALYSIS_WIDGET_CONFIG } from '@/lib/constants';

interface TechnicalAnalysisWidgetProps {
    symbol: string;
    height?: number;
}

const TechnicalAnalysisWidget = ({ symbol, height = 400 }: TechnicalAnalysisWidgetProps) => {
    const scriptUrl = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';

    return (
        <div className="w-full">
            <h3 className="font-semibold text-2xl text-gray-100 mb-5">
                Technical Analysis — {symbol.toUpperCase()}
            </h3>
            <TradingViewWidget
                scriptUrl={scriptUrl}
                config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
                height={height}
            />
        </div>
    );
};

export default TechnicalAnalysisWidget;
