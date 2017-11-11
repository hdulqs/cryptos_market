class MarketAnalyser

  def get_spreads_for_interesting_markets
    interesting_markets.map do |im|
      get_tickers_spread(im)
    end.sort_by!{|l| l[:spread]}
  end

  def interesting_markets
    Market.all.map{|l| l if l.pairs.count > 2}.compact
  end

  def get_tickers_spread(market)
    tickers = get_tickers_for(market)
    min_last = tickers.sort_by!{|l| l[:last]}.first
    max_last = tickers.sort_by!{|l| l[:last]}.last
    report = generate_report(min_last, max_last)
    persist_market_report(report)
    report
  end

  def persist_market_report report
    market_report = Report.new(
      market_id: report[:market_id],
      spread: report[:spread],
      pairs: report[:pairs_involved]
    )
    market_report.save!
  end

  def get_tickers_for(market)
    tickers = market.pairs.map{|m| m.get_ticker}
    tickers.map do |ticker|
      {
        market: market.name,
        market_id: market.id,
        exchange: ticker.pair.exchange.name,
        ask: ticker.ask.to_f,
        bid: ticker.bid.to_f,
        last: ticker.last.to_f,
        timestamp: ticker.timestamp.to_f
      }
    end
  end

  def generate_report min, max
    market_name = min[:market]
    market_id = min[:market_id]
    {
      market: market_name,
      market_id: market_id,
      spread: percentage_difference(min[:last], max[:last]),
      pairs_involved: [
        { exchange: min[:exchange], last: min[:last], ask: min[:ask], bid: min[:bid], timestamp: min[:timestamp] },
        { exchange: max[:exchange], last: max[:last], ask: max[:ask], bid: max[:bid], timestamp: max[:timestamp] }
      ]
    }

  end

  def percentage_difference val_a, val_b
    val_a = val_a.to_f
    val_b = val_b.to_f
    ( (val_b - val_a) / (val_a + val_b) ) * 100
  end


end
