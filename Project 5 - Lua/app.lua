local lapis = require "lapis"
local app_helpers = require("lapis.application")
local Model = require("lapis.db.model").Model
local preload = require("lapis.db.model").preload
local validate = require("lapis.validate")
local capture_errors = app_helpers.capture_errors

local app = lapis.Application()

app:get('/', function(self)
  information = {}
  information[1] = "Mala dokumentacja zwiazana z dostepnymi metodami:"
  information[2] = "============================================================="
  information[3] = "/products/all => Metoda GET wyswietla wszystkie produkty"
  information[4] = "/products/:product_id => Metoda GET wyswietla informacje o produkcie z konkretnym ID"
  information[5] = "/categories => Metoda GET wyswietla wszystkie dostepne kategorie"
  information[6] = "/categories/:category => Metoda GET wyswietla wszystkie dostepne produkty w podanej kategorii"
  information[7] = "/products/delete => Metoda DELETE usuwa produkt o konrektnym ID przeslanym parametrem"
  information[8] = "/products/add => Metoda POST dodaje nowy produkt do bazy. Jako parametr nalezy przeslac obiekt o polach: name, price, year, category_name"

  return table.concat(information,"<br>")
  
end)

app:get("/products/:product_id", function(self)
  local productID = self.params.product_id
  local Products = Model:extend("products")
  local product = Products:find(productID)

  if product then
    return { json = product, status = 200 }
  else
    return { json = { code = "404", message = "Brak produktu o tym id" }, status = 404 }
  end
end)

app:post("/products/add", capture_errors({
  on_error = function(self)
    return { json = { code = "400", message = "Nieprawidlowy obiekt produktu. Popraw!" }, status = 400 }
  end, 
  function(self)
    validate.assert_valid(self.params, {
      { "name", exists = true},
      { "price", exists = true},
      { "year", exists = true},
      { "category_name", exists = true }
    })

    local Categories = Model:extend("categories")
    local category = Categories:find({name = self.params.category_name})

    if category then
      local Products = Model:extend("products")
      local product = Products:create({
        name = self.params.name,
        price = self.params.price,
        year = self.params.year,
        category_id = category.id
      })

      return {
        json = product,
        status = 201
      }
    end

    return { json = { code = "400", message = "Cos poszlo nie tak. Sprawdz dane!" }, status = 400 }
  end
}))

app:delete("/products/delete", function(self)
  local product_id = self.params.product_id
  local Products = Model:extend("products")

  local product = Products:find(product_id)

  if (product) 
  then
    product:delete()
    return {
      json = "Pomyslnie usunieto produkt",
      status = 200
    }
  end

  return { json = { code = "400", message = "Cos poszlo nie tak. Sprawdz dane!" }, status = 400 }
  
end)


app:get("/products/all", function(self)
  local Products = Model:extend("products")
  local products = Products:select("INNER JOIN categories WHERE categories.id = products.category_id", 
    { fields = "products.id, products.name, products.price, products.year, categories.name as category" }
  )

  return { json = products, status = 200 }
end)


app:get("/categories", function(self)
  local model = Model:extend("categories")
  local categories = model:select()

  return { json = categories, status = 200 }
end)


app:get("/categories/:category", function(self)
  local categoryName = self.params.category
  local Products = Model:extend("products")
  local products = Products:select("INNER JOIN categories WHERE categories.id = products.category_id AND categories.name = ?", categoryName,
    { fields = "products.id, products.name, products.price, products.year, categories.name as category" }
  )

  return { json = products, status = 200 }

end)
return app