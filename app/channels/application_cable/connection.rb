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

    # identified_by :current_admin
    # def connect
    #   self.current_admin = find_verified_admin
    #   logger.add_tags 'ActionCable', current_admin.name
    # end
    # protected
    # def find_verified_admin
    #   verified_admin = Admin.find_by(id: cookies.signed['user.id'])
    #   if verified_admin && cookies.signed['user.expires_at'] > Time.now
    #     verified_admin
    #   else
    #     reject_unauthorized_connection
    #   end
    # end

  end
end
