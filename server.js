// "home page","/","" 
// "product"=> product page
// "/api"=> display data.json to browser
// Error 404

var http=require("http");
var fs=require("fs");
var url=require("url");
var myFile=fs.readFileSync("data.json")
myFile = JSON.parse(myFile);
var card=fs.readFileSync("card.html");
card+= "";
var template=fs.readFileSync("product.html");
var overviewTemplate=fs.readFileSync("overview.html")+"";

template=template + ""
function replace(template,product){
    template=template.replace(/{Image}/g,product["image"]);
    template=template.replace(/{Name}/g,product["productName"]);
    template=template.replace(/{COUNTRY}/g,product["from"]);
    template=template.replace(/{Nutrients}/g,product["nutrients"]);
    template=template.replace(/{Quantity}/g,product["quantity"]);
    template=template.replace(/{Price}/g,product["price"]);
    template=template.replace(/{Description}/g,product["description"]);
    template=template.replace(/{id}/g,product["id"]);
    if(!product["organic"]){
        template=template.replace(/{not-organic}/g, "not-organic")
    }
    // template=template.replace(/{Organic}/g,product["organic"])
    return template;
}
var server = http.createServer(function(req,res){
    // console.log((url.parse(req.url),true));
     var pUrl = (url.parse(req.url,true));
    res.writeHead(200,{
        "Content-type": "text/html"
    });
    if(req.url=="/home"||req.url=="/"||req.url==""){
        var c="";
       // console.log(myFile);
        for(var i=0;i<myFile.length;++i){
        c=c+replace(card,myFile[i])
        }
        overviewTemplate=overviewTemplate.replace(/{cardsarea}/g,c);
        res.write(overviewTemplate);
        res.end();
    }else if(pUrl["pathname"]=="/product"){
        var id = pUrl.query.id;
        var productPage=replace(template,myFile[id]);
        res.write(productPage);
        res.end();
    }else if(req.url=="/api"){
        res.write(myFile);
        res.end();
    }else{
        res.write("Error 404");
        res.end();
    };
})
var port= process.env.PORT||3000
server.listen(port,function(){
    console.log("Server has started on port 3000")
});
