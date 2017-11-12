class Backend::MarketsController < Backend::BaseController


  def index
    # Ordering by number of pairs
    @markets = Market
      .left_joins(:pairs)
      .group(:id)
      .order('COUNT(pairs.id) DESC')
      #.limit(10)
  end

  def show
    @market = Market.find(params[:id])
  end


end
