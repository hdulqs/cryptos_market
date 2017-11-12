module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_admin

    def connect
      self.current_admin = find_verified_user
    end

    private
    def find_verified_user
      #binding.pry
      if current_admin = env['warden'].user
        current_admin
      else
        reject_unauthorized_connection
      end
    end
  end
end
