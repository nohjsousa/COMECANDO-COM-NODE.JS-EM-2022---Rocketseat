/*const { request, response } = require("express");*/
const express = require("express");

const { randomUUID } = require("crypto");
//const { request } = require("http");
//const { response } = require("express");

//importação para criar um arquivo
const fs = require("fs");

const app = express();
app.use(express.json());

let products = [];

//Ler informação do PRODUCTS
fs.readFile("products.json", "utf-8", (err, data) => {
    if (err) {
        console.log(err);    
    } else {
        products = JSON.parse(data);
    }
  });

/**
 * POST => Inserir um dado
 * GET => Buscar um dado ou mais dados
 * PUT => Alterar um dado
 * DELETE => Remover um dado
 */

/**
 * Body => Sempre que eu quiser enviar dados para minha aplicação
 * Params => /products/23324234324234234234
 * Query => /products?id=123123234345324234234&value=123234354345345
 */
app.post("/products", (request, response) => {
    //Nome e preço => name e price
    const { name, price } = request.body;

    const product = {
        name, 
        price,
        id: randomUUID(),
    }

    products.push(product);   
    
//função do arquivo
        
productFile();

    return response.json(product);
});

/*app.get("/primeira-rota", (request, response) => {
    return response.json({
        message: "Acessou a primeira rota com nodemon",
    });
});*/

app.get("/products", (request, response) => {
    return response.json(products)
});

app.get("/products/:id", (request, response) => {
    const { id } = request.params;
    const product = products.find((product) => product.id === id);
    return response.json(product);
});

//alterar produto cadastrado
app.put("/products/:id", (request, response) => {
    const { id } = request.params;
    const { name, price } = request.body;

    const productIndex = products.findIndex((product) => product.id === id);
    products[productIndex] = {
        ...products[productIndex],
        name,
        price,
    };

    productFile();

    return response.json({ message: "Produto alterado com sucesso" });
});

app.delete("/products/:id", (request, response) => {
    const { id } = request.params;

    const productIndex = products.findIndex((product) => product.id === id);
    products.splice(productIndex, 1);

    productFile();

    return response.json({ message: "Produto removido com sucesso!"});

});


//funcão para criar um arquivo PRODICTS.json
function productFile(){
    fs.writeFile("products.json", JSON.stringify(products), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log ("produto inserido");
        }
    });
}

app.listen(4002, () => console.log("servidor está rodando na porta 4002"));