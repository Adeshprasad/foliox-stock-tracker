import TradingViewWidget from "@/components/TradingViewWidget";
import {
    HEATMAP_WIDGET_CONFIG,
    MARKET_OVERVIEW_WIDGET_CONFIG,
    SCREENER_WIDGET_CONFIG,
    TOP_STORIES_WIDGET_CONFIG,
} from "@/lib/constants";

const Home = () => {
    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

    return (
        <div className="flex flex-col min-h-screen home-wrapper">
            {/* Row 1: Market Overview (30%) + Stock Heatmap (70%) */}
            <section className="w-full flex gap-4 home-section">
                <div className="w-[30%]">
                    <TradingViewWidget
                        title="Market Overview"
                        scriptUrl={`${scriptUrl}market-overview.js`}
                        config={MARKET_OVERVIEW_WIDGET_CONFIG}
                        attribution={{ href: 'https://www.tradingview.com/markets/', label: 'World markets' }}
                        className="custom-chart"
                        height={800}
                    />
                </div>
                <div className="w-[70%]">
                    <TradingViewWidget
                        title="Stock Heatmap"
                        scriptUrl={`${scriptUrl}stock-heatmap.js`}
                        config={HEATMAP_WIDGET_CONFIG}
                        attribution={{ href: 'https://www.tradingview.com/heatmap/stock/', label: 'Stock Heatmap' }}
                        height={800}
                    />
                </div>
            </section>

            <section className="w-full flex gap-4 home-section">
                <div className="w-[30%]">
                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}timeline.js`}
                        config={TOP_STORIES_WIDGET_CONFIG}
                        attribution={{ href: 'https://www.tradingview.com/news/', label: 'Top stories' }}
                        height={800}
                    />
                </div>
                <div className="w-[70%] ">
                    <TradingViewWidget
                        scriptUrl="https://widgets.tradingview-widget.com/w/en/tv-screener.js"
                        config={SCREENER_WIDGET_CONFIG}
                        isModule={true}
                        height={620}
                    />
                </div>
            </section>
        </div>
    )
}

export default Home;
