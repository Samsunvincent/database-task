const http = require('http')
const PORT = 3000;
const fs = require('fs')
const url = require('url');

const{MongoClient} = require('mongodb')
const client = new  MongoClient('mongodb://127.0.0.1:27017')

async function connect(){
    try {
        await client.connect();
        console.log("database connection established");
    } catch (error) {
        console.log("error",error)
    }
}
connect();

const server = http.createServer((req,res) =>{
    let db = client.db('product-db');
    let collection = db.collection("product");

    const req_url = req.url;
    console.log('req_url',req_url);

    const parsed_url = url.parse(req_url);
    console.log('parsed_url',parsed_url);

    if(parsed_url.pathname === '/'){
        res.writeHead(200,{'Content-Type' : 'text/html'});
        res.end(fs.readFileSync('../client/product-details.html'))
    }else if(parsed_url.pathname === '/script.js'){
        res.writeHead(200,{'Content-Type' : 'text/javascript'});
        res.end(fs.readFileSync('../client/script.js'));

    }
    else if(parsed_url.pathname === '/product-style.css'){
        res.writeHead(200,{'Content-Type' : "text/css"});
        res.end(fs.readFileSync("../client/product-style.css"));
    }
    else if(parsed_url.pathname === '/submit' && req.method === 'POST'){
        console.log('reached reached')

        let body = '';
        req.on('data',(chunks)=>{
            console.log('chunks',chunks);
            body = body+chunks.toString();
            console.log("body",body)

        });
        req.on('end',()=>{
            let datas = JSON.parse(body);
            console.log("datas",datas)

            let id = datas.id;
            let title = datas.title;
            let price =  datas.price;
            let description = datas.description;
            let category = datas.category;
            let imageurl = datas.imageurl;
            let rate = datas.rate;
            let count = datas.count;

            console.log('id',id);
            console.log('title',title)
            console.log('price',price);
            console.log('description',description);
            console.log('category',category);
            console.log('imageurl',imageurl);
            console.log('rate',rate);
            console.log('count',count);


            //save to database
            collection.insertOne({
                id : datas.id,
                title : datas.title,
                price : datas.price,
                description : datas.description,
                category : datas.category,
                imageurl,
                rate,
                count,
            })
            .then((message)=>{
                console.log('messsage',message);
                res.writeHead(201,{'Content-Type': 'text/plain'})
                res.end("Products added successfully");
            })
            .catch((error)=>{
                console.log("errror",error);
                res.writeHead(400,{'Content-Type' : 'text/plain'})
                res.end(error.message ? error.message : "product creation failed")
            })
        })
    }
})
server.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
    
   

    
})
