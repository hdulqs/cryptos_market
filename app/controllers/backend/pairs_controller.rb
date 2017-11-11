class Backend::PairsController < Backend::BaseController


  def index
    market = Market.find(params[:market_id])
    @pairs = market.pairs
  end

  def show
    @pair = Pair.find(params[:id])
  end


end
