class InterestingMarketsFinder

  def call
    # markets = Market.left_joins(:pairs).group(:id).order('COUNT(pairs.id) DESC').limit(300)
    #markets = Market.where(base_currency: "ETH")
    #                .or(Market.where(quote_currency: "ETH"))
    #                .left_joins(:pairs)
    #                .group(:id)
    #                .order('COUNT(pairs.id) DESC')
    #                .limit(300)

    markets = Market.left_joins(:pairs)
                    .group(:id)
                    .order('COUNT(pairs.id) DESC')
                    .limit(300)
    markets.each do |market|
      return if market.pairs.count < 2
      market.is_watched = true
      market.save!
      market.pairs.each do |pair|
        pair.is_watched = true
        pair.save!
      end
    end
  end

end
