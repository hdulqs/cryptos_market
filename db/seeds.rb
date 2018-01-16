
#Dir[File.join(Rails.root, 'db', 'seeds', 'exchanges', 'cryptopia.rb')].sort.each { |seed| load seed }
Dir[File.join(Rails.root, 'db', 'seeds', 'exchanges', '*.rb')].sort.each { |seed| load seed }

Admin.create!(email: 'ducrouxolivier@gmail.com', password: 'ducrouxolivier@gmail.com', password_confirmation: 'ducrouxolivier@gmail.com')

InterestingMarketsFinder.new.call
