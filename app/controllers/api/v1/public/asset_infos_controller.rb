class Api::V1::Public::AssetInfosController < Api::V1::BaseController

  def index
    if params[:asset_search].present?
      @asset_infos = AssetInfo.where("name ~* ?", params[:asset_search])
                  .or(AssetInfo.where("symbol ~* ?", params[:asset_search]))
    else
      @asset_infos = AssetInfo.all.order(:rank).page(params[:page]).per(15)
    end
    render 'api/v1/public/asset_infos/index.json'
  end

  def all
    @asset_infos = AssetInfo.all.order(:rank)
    render 'api/v1/public/asset_infos/index.json'
  end

  def show
    #@market = Market.find_by(name: params[:id])
    #render 'api/v1/public/markets/show.json'
  end

end
