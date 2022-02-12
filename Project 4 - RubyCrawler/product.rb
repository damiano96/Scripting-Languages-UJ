#file: product.rb
class Product
  def initialize(title, price, link)
    @product_title = title
    @product_price = price
    @product_link = link
  end

  def add_product_info(info)
    @product_info = info
  end

  def to_string
    puts "Tytuł: #{@product_title}"
    puts "Cena: #{@product_price}"
    unless @product_info.nil?
      puts "Dodatkowe informacje: #{@product_info.join('|')}"
    end
    puts "Link: #{@product_link}"
  end
end
