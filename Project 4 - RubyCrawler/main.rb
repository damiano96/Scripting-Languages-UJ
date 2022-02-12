#file: main.rb
require './crawler'
require './product'

puts("Co chcesz znalezc w serwisie amazon?: ")
search = gets
search.gsub!(" ", "+")
additional_info = true

crawler = Crawler.new(search, additional_info)
items = crawler.get_main_items

items.each do |item|
  puts item.to_string
end
