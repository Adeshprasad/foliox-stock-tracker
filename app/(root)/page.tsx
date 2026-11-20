import TradingViewWidget from "@/components/TradingViewWidget";
import {
    HEATMAP_WIDGET_CONFIG,
    MARKET_OVERVIEW_WIDGET_CONFIG,
    TOP_STORIES_WIDGET_CONFIG,
} from "@/lib/constants";

const Home = () => {
    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

    return (
        <div className="flex flex-col min-h-screen home-wrapper">
            {/* Market Overview — Full Width */}
            <section className="w-full home-section">
                <TradingViewWidget
                    title="Market Overview"
                    scriptUrl={`${scriptUrl}market-overview.js`}
                    config={MARKET_OVERVIEW_WIDGET_CONFIG}
                    attribution={{ href: 'https://www.tradingview.com/markets/', label: 'World markets' }}
                    className="custom-chart"
                    height={800}
                />
            </section>

            {/* Stock Heatmap — Full Width */}
            <section className="w-full home-section">
                <TradingViewWidget
                    title="Stock Heatmap"
                    scriptUrl={`${scriptUrl}stock-heatmap.js`}
                    config={HEATMAP_WIDGET_CONFIG}
                    attribution={{ href: 'https://www.tradingview.com/heatmap/stock/', label: 'Stock Heatmap' }}
                    height={800}
                />
            </section>

            {/* Top Stories — Full Width */}
            <section className="w-full home-section">
                <TradingViewWidget
                    title="Top Stories"
                    scriptUrl={`${scriptUrl}timeline.js`}
                    config={TOP_STORIES_WIDGET_CONFIG}
                    attribution={{ href: 'https://www.tradingview.com/news/', label: 'Top stories' }}
                    height={800}
                />
            </section>
        </div>
    )
}

export default Home;
