class Cleaner

  class << self

    def kraken
      Exchange.find_by(name: 'kraken').pairs.each{|l| l.destroy if l.name.include?('.d')}
    end

  end

end
