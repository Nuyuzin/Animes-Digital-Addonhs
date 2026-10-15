// Servidor local para testar o mesmo handler usado nas Vercel Functions.
const http=require('node:http');const handler=require('./api/[...path].js');
const server=http.createServer((req,res)=>handler(req,res));
server.listen(process.env.PORT||7000,'0.0.0.0',()=>console.log(`Addon local: http://localhost:${process.env.PORT||7000}/manifest.json`));
