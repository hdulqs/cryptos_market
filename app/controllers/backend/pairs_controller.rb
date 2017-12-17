class Backend::PairsController < Backend::BaseController


  def index
    @market = Market.find(params[:market_id])
    @pairs = @market.pairs
  end

  def show
    @pair = Pair.find(params[:id])
  end

  def unwatch
    pair = Pair.find(params[:id])
    pair.update_column(:is_watched, false)
    redirect_to backend_market_reports_path(params[:market_id])
  end


end
