class Backend::ReportsController < Backend::BaseController


  def index
    @market = Market.find(params[:market_id])
    @reports = @market.reports.order(id: :desc)
  end

  def show
    @report = Report.find(params[:id])
  end


end
