const http = require("http");


http
    .createServer((request, response) => {
            response.writeHead(200, { 'Content-Type': "application/Json" });

            if (request.url ==="/produto"){
                response.end(
                    JSON.stringify({
                        message:"Rota de produto",
                    })
                );
            }

            if (request.url ==="/usuarios"){
                response.end(
                    JSON.stringify({
                        message:"Rota de usuário",
                    })
                );
            }

            response.end(
                JSON.stringify({
                    message:"qualquer outra rota",
                })
            );
        })
           
    .listen(4001, () => console.log("servidor está rodando na porta 4001"));
