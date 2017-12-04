class Backend::MarketsController < Backend::BaseController


  def index
    @markets = Market.of_interest.order(price_difference: :desc).where.not(price_difference: [100, 0]).limit(150)
      # Market
      #   .left_joins(:pairs)
      #   .group(:id)
      #   .order('COUNT(pairs.id) DESC')
      #   .limit(50)
  end

  def show
    @market = Market.find(params[:id])
  end


end
