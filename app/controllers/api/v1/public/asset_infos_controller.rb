class Api::V1::Public::AssetInfosController < Api::V1::BaseController

  def index
    @asset_infos = AssetInfo.all.order(:rank).page(params[:page]).per(50)
    render 'api/v1/public/asset_infos/index.json'
  end

  def show
    #@market = Market.find_by(name: params[:id])
    #render 'api/v1/public/markets/show.json'
  end

end
