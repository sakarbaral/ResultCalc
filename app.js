const express=require('express');
const app=express();
let ejs = require('ejs');
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/',function (req,res) {
  res.render('main');
  });

var Theorynum,Projectnum,Labnum;

app.post("/main",function (req,res) {
   Theorynum=Number(req.body.Theorynum);
   Projectnum=Number(req.body.Projectnum);
   Labnum=Number(req.body.Labnum);
  res.redirect("/input");
  });

app.get('/input',function (req,res) {
  res.render('second', {Theorynum:Theorynum,Projectnum:Projectnum,Labnum:Labnum});
  });

  var thsum=0;
  var lbsum=0;
  var pjsum=0;

  app.post("/input",function (req,res) {
 
    var thmarks=[];
    var pjmarks=[];
    var lbmarks=[];
   
    for(let i=0;i<Theorynum;i++){
    let lala="req.body.Thmarks"+i;
    thmarks.push(eval(lala));
    }
    for(let i=0;i<Projectnum;i++){
      let lala="req.body.Pjmarks"+i;
      pjmarks.push(eval(lala));}
    for(let i=0;i<Labnum;i++){
    let lala="req.body.Lbmarks"+i;
    lbmarks.push(eval(lala));
    }
console.log(thmarks,pjmarks,lbmarks);
    if(thmarks.length!=0)
     thsum = (thmarks.reduce((a, b) => Number(a)+Number(b))); 
     if(lbmarks.length!=0)
     lbsum = (lbmarks.reduce((a, b) => Number(a)+Number(b))); 
     if(pjmarks.length!=0)
     pjsum = (pjmarks.reduce((a, b) => Number(a)+Number(b))); 
res.redirect('/result');
    });


app.get('/result',function (req,res) {
  var gt=0;
  if(pjsum!=0 && lbsum!=0){
  gt=thsum*0.5+(pjsum+lbsum)*0.25;
  
  }
  else if(pjsum!=0 && lbsum==0){
    gt=thsum*0.75+pjsum*0.25;
  }
  else if(lbsum!=0 && pjsum==0){
    gt=lbsum*0.25+thsum*0.75;
  }
  else{
    gt=thsum;
  }
  res.render('output', {lbsum:lbsum,thsum:thsum,pjsum:pjsum,gt:gt});
  });

 

app.listen(process.env.PORT || 3000,function () {
  console.log("Server started on port 3000");
});




 