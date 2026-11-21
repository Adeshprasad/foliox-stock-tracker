'use client';
import { useEffect, useRef, useState, useMemo } from "react";

const useTradingViewWidget = (scriptUrl: string, config: Record<string, unknown>, height = 600) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [hasError, setHasError] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    // Stabilize config as a JSON string to avoid unnecessary re-renders from new object references
    const configString = useMemo(() => JSON.stringify(config), [config]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        setHasError(false);

        // Reattach listeners to an in-flight script when Strict Mode replays the effect.
        let script = container.querySelector<HTMLScriptElement>('script');
        if (!container.dataset.loaded) {
            container.innerHTML = `<div class="tradingview-widget-container__widget" style="width: 100%; height: ${height}px;"></div>`;
            script = document.createElement("script");
            script.src = scriptUrl;
            script.async = true;
            script.innerHTML = configString;
        }

        let errorTimeout: number | undefined;

        const handleError = () => {
            // Defer error reporting: TradingView scripts can fire error events for
            // subresources (CORS, iframes) even when the widget renders successfully.
            // Wait 3 seconds and check if the container has actual widget content.
            errorTimeout = window.setTimeout(() => {
                if (container) {
                    const widgetContent = container.querySelector('.tradingview-widget-copyright, iframe, .tradingview-widget-container__widget');
                    const hasRealContent = container.innerText?.length > 10 ||
                                           container.querySelector('iframe') ||
                                           container.querySelector('[class*="tradingview"]');
                    if (!hasRealContent && !container.dataset.loaded) {
                        container.innerHTML = '';
                        delete container.dataset.loaded;
                        setHasError(true);
                    }
                }
            }, 3000);
        };
        const handleLoad = () => {
            // Script loaded successfully — clear any pending error timeout
            if (errorTimeout) {
                clearTimeout(errorTimeout);
                errorTimeout = undefined;
            }
            setHasError(false);
        };

        script?.addEventListener('error', handleError);
        script?.addEventListener('load', handleLoad);

        if (!container.dataset.loaded && script) {
            container.appendChild(script);
            container.dataset.loaded = 'true';
        }

        return () => {
            if (errorTimeout) clearTimeout(errorTimeout);
            script?.removeEventListener('error', handleError);
            script?.removeEventListener('load', handleLoad);
        };
    }, [scriptUrl, configString, height, retryCount]);

    const retry = () => {
        setHasError(false);
        setRetryCount(count => count + 1);
    };

    return { containerRef, hasError, retry };
}
export default useTradingViewWidget;
