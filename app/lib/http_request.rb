require 'rest-client'
# Considerations :
# from : https://jvns.ca/blog/2016/03/04/whats-up-with-ruby-http-libraries/
#

class HttpRequest

  def initialize host, auth_header
    @host = host
    @auth_header = auth_header
  end

  def get path
    return RestClient.get(
      "#{@host + path}",
      {
        authorization: @auth_header,
        content_type: :json,
        accept: :json
      }
    )
  end

  def post path, payload
    return RestClient.post(
      "#{@host + path}",
      payload.to_json,
      {
        authorization: @auth_header,
        content_type: :json,
        accept: :json
      }
    )
  end

  def put path, payload
    return RestClient.put(
      "#{@host + path}",
      payload.to_json,
      {
        authorization: @auth_header,
        content_type: :json,
        accept: :json
      }
    )
  end

  def patch path, payload
    return RestClient.patch(
      "#{@host + path}",
      payload.to_json,
      {
        authorization: @auth_header,
        content_type: :json,
        accept: :json
      }
    )
  end

end
