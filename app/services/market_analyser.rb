class MarketAnalyser

  def generate_report(market)
    tickers = market.pairs.map{|l| l.last_ticker }.compact # Most recent ticker for pairs
    #binding.pry
    min_last = tickers.sort_by{|l| l[:last]}.first
    max_last = tickers.sort_by{|l| l[:last]}.last
    raise "cannot generate report for Market #{market.id}" unless min_last && max_last
    report = build_report(min_last, max_last)
    persist_report(report, market)
    report
  end

  def reports
    markets = Market
      .left_joins(:pairs)
      .group(:id)
      .order('COUNT(pairs.id) DESC')
      .limit(10)
    markets.each do |market|
      market_id = market.id
      ReportCreatorJob.perform_later(market_id)
    end
  end

  def test_dev
    #binding.pry
    markets_of_interest = Market.of_interest
    pairs_of_interest = markets_of_interest.map(&:pairs)
  end

  def generate_report_for(market_name)
    market = Market.find_by(name: market_name)
    tickers = market.get_tickers
    min_last = tickers.sort_by!{|l| l[:last]}.first
    max_last = tickers.sort_by!{|l| l[:last]}.last
    report = build_report(min_last, max_last)
    #persist_market_report(report)
    report
  end

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
    Report.create!(
      market_id: report[:market_id],
      spread: report[:spread],
      pairs: report[:pairs_involved]
    )
  end

  def persist_report report, market
    Report.create!(
      market_id: market.id,
      spread: report[:spread],
      pairs: report[:pairs_involved]
    )
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

  def build_report min, max
    market_name = min.pair.market.name
    market_id = min.pair.market.id
    {
      market: market_name,
      market_id: market_id,
      spread: percentage_difference(min.last, max.last),
      pairs_involved: [
        { exchange: min.pair.exchange.name, last: min.last, ask: min.ask, bid: min.bid, timestamp: min.timestamp },
        { exchange: max.pair.exchange.name, last: max.last, ask: max.ask, bid: max.bid, timestamp: max.timestamp }
      ]
    }
  end

  def percentage_difference val_a, val_b
    val_a = val_a.to_f
    val_b = val_b.to_f
    ( (val_b - val_a) / (val_a + val_b) ) * 100
  end


end
