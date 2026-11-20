'use client';

import React, { memo } from 'react';
import useTradingViewWidget from "@/hooks/useTradingViewWidget";
import {cn} from "@/lib/utils";

interface TradingViewWidgetProps {
    title?: string;
    scriptUrl: string;
    config: Record<string, unknown>;
    attribution?: { href: string; label: string };
    height?: number;
    className?: string;
}

const TradingViewWidget = ({ title, scriptUrl, config, attribution, height = 600, className }: TradingViewWidgetProps) => {
    const { containerRef, hasError, retry } = useTradingViewWidget(scriptUrl, config, height);

    return (
        <div className="w-full">
            {title && <h3 className="font-semibold text-2xl text-gray-100 mb-5">{title}</h3>}
            <div className={cn('tradingview-widget-container', className)} ref={containerRef} />
            {hasError && (
                <div role="alert" className="p-4 text-center text-gray-400">
                    <p>Unable to load the TradingView widget.</p>
                    <button type="button" onClick={retry} className="mt-2 text-blue-400 underline cursor-pointer">
                        Retry
                    </button>
                </div>
            )}
            {attribution && (
                <div className="tradingview-widget-copyright">
                    <a href={attribution.href} rel="noopener noreferrer nofollow" target="_blank">
                        <span className="blue-text">{attribution.label}</span>
                    </a>
                    <span className="trademark"> by TradingView</span>
                </div>
            )}
        </div>
    );
}

export default memo(TradingViewWidget);
