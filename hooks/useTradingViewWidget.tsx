'use client';
import { useEffect, useRef, useState } from "react";

const useTradingViewWidget = (scriptUrl: string, config: Record<string, unknown>, height = 600) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [hasError, setHasError] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Reattach listeners to an in-flight script when Strict Mode replays the effect.
        let script = container.querySelector<HTMLScriptElement>('script');
        if (!container.dataset.loaded) {
            container.innerHTML = `<div class="tradingview-widget-container__widget" style="width: 100%; height: ${height}px;"></div>`;
            script = document.createElement("script");
            script.src = scriptUrl;
            script.async = true;
            script.innerHTML = JSON.stringify(config);
        }

        const handleError = () => {
            container.innerHTML = '';
            delete container.dataset.loaded;
            setHasError(true);
        };
        const handleLoad = () => setHasError(false);
        script?.addEventListener('error', handleError);
        script?.addEventListener('load', handleLoad);

        if (!container.dataset.loaded && script) {
            container.appendChild(script);
            container.dataset.loaded = 'true';
        }

        return () => {
            script?.removeEventListener('error', handleError);
            script?.removeEventListener('load', handleLoad);
            // Preserve pending scripts during Strict Mode's temporary ref detachment.
            // eslint-disable-next-line react-hooks/exhaustive-deps
            if (containerRef.current) {
                container.innerHTML = '';
                delete container.dataset.loaded;
            }
        }
    }, [scriptUrl, config, height, retryCount])

    const retry = () => {
        setHasError(false);
        setRetryCount(count => count + 1);
    };

    return { containerRef, hasError, retry };
}
export default useTradingViewWidget
