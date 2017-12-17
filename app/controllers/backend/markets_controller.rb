class Backend::MarketsController < Backend::BaseController


  def index
    @markets = Market.of_interest.order(spread: :desc).where.not(price_difference: [100, 0]).limit(150)
      # Market
      #   .left_joins(:pairs)
      #   .group(:id)
      #   .order('COUNT(pairs.id) DESC')
      #   .limit(50)
  end

  def show
    @market = Market.find(params[:id])
  end

  def unwatch
    market = Market.find(params[:id])
    market.update_column(:is_watched, false)
    redirect_to backend_markets_path
  end


end
