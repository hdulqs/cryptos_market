class InterestingMarketsFinder

  def call
    markets = Market.left_joins(:pairs).group(:id).order('COUNT(pairs.id) DESC').limit(50)
    markets.each do |market|
      market.is_watched = true
      market.save!
      market.pairs.each do |pair|
        pair.is_watched = true
        pair.save!
      end
    end
  end

end
