class JsonWebToken

  class << self

    def encode(payload, exp = 6.months.from_now)
      payload[:exp] = exp.to_i
      JWT.encode(payload, Rails.application.secrets.secret_key_base, 'HS256')
    end

    def decode(token)
      body = JWT.decode(token, Rails.application.secrets.secret_key_base, true, { :algorithm => 'HS256' })[0]
      HashWithIndifferentAccess.new(body)
    rescue
      nil
    end

  end

end
