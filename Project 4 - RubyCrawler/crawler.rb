#file: crawler.rb
require 'nokogiri'
require 'open-uri'

class Crawler
  AMAZON_URL = 'https://amazon.pl/s?k='

  def initialize(phrase, additional_info)
    @phrase = phrase
    @additional_info = additional_info
  end

  def get_main_items
    items_array = []
    page_with_items = Nokogiri::HTML5.parse(URI(AMAZON_URL + @phrase).open('User-Agent' => 'ruby-agent-first'))
    page_with_items.css('.s-widget-container').each do |item|
      item_title = item.css('div.s-title-instructions-style span.a-size-base-plus').text
      item_price = item.css('a.a-size-base span.a-price:first-child span.a-offscreen').text
      item_link = item.css('div.s-title-instructions-style a.a-link-normal').map { |link| 'https://amazon.pl' + link['href'] }[0]

      unless item_title.empty? && item_price.empty? && item_link.nil?
        product = Product.new(item_title, item_price, item_link)
        if @additional_info
          item_info = get_additional_info(item_link)
          product.add_product_info(item_info)
        end
        items_array.push(product)
      end
    end
    items_array
  end

  def get_additional_info(item_link)
    item_info = []
    sub_page = Nokogiri::HTML5.parse(URI(item_link).open('User-Agent' => 'ruby-agent'))
    sub_page.search('div#feature-bullets li:not(.aok-hidden)').each do |info|
      main_info = info.search('span.a-list-item')
      unless main_info.empty?
        item_info.push(main_info.text)
      end
    end
    item_info
  end
end
