var express = require("express");
var app     = express();
var path    = require("path");
var superagent = require('superagent');
var handlebars = require('handlebars')
var consolidate = require('consolidate');
var consolidate = require('consolidate');
var _ = require('lodash');

var apiEndpoint = process.env.API_ENDPOINT || "https://lupe-server-stage.herokuapp.com";

app.use('*/assets', express.static(__dirname + '/assets'));

handlebars.registerHelper('everyNth', function(context, every, options) {
    var fn = options.fn, inverse = options.inverse;
    var ret = "";
    if(context && context.length > 0) {
      for(var i=0, j=context.length; i<j; i++) {
        var modZero = i % every === 0;
        ret = ret + fn(_.extend({}, context[i], {
          isModZero: modZero,
          isModZeroNotFirst: modZero && i > 0,
          isLast: i === context.length - 1
        }));
      }
    } else {
      ret = inverse(this);
    }
    return ret;
  });

handlebars.registerHelper('checkRecommended', function(review){
  if(review.recommended)
    return 'Recomendado';
  else
    return 'No Recomendado';
}); 

handlebars.registerHelper('checkThumbs', function(review){
  if(review.recommended)
    return 'fa fa-thumbs-up fa-lg';
  else
    return 'fa fa-thumbs-down fa-lg';
}); 

handlebars.registerHelper('sort', function(delivery_areas, options){
  delivery_areas.sort(function(a,b){
    if (a.price>b.price){
      return 1;
    }
    if(a.price< b.price){
      return -1;
    }
    else{
      return 0;
    }
  });
  var currentPrice= delivery_areas[0].price;
  delivery_areas[0].greaterPrice=true;
  for(var i=1; i<delivery_areas.length; i++){
    if(delivery_areas[i].price>currentPrice){
      delivery_areas[i].greaterPrice=true; 
      currentPrice= delivery_areas[i].price; 
      delivery_areas[i-1].lastPrice=true; 
    }
  }
  delivery_areas[delivery_areas.length-1].lastPrice=true;

  return options.fn(delivery_areas); 
});

handlebars.registerHelper('ratingValue', function(context){
    var ratingValue= ((context.amount_of_recommendations)/(context.number_of_reviews))*100;
    return ratingValue + '% Recomendado';
}); 

handlebars.registerHelper('serviceCat', function(context, options){
  var uniqueCat = unique(context); 
  var categories = [];  
  for (var i=0; i<uniqueCat.length; i++){
    var category = {
      image: identifyImage(uniqueCat[i], context),
      name: identifyCat(uniqueCat[i]) 
    };
    categories[i]=category; 
    context.services.uniqueCat=categories;
  }
  return options.fn(context); 
});

function unique(context){
  var uniqueCat= context.services.map(function servicesMap (service) {
    return service.category.parent;
  }).filter(function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
  });
  return uniqueCat; 
}

function identifyCat (catId){
  if (catId=='5526d8a3e4b006b9c6a12285')
    return 'Pelo'; 
  if (catId=='5526d92ae4b006b9c6a1228f')
    return 'Maquillaje';
  if (catId=='5526d943e4b006b9c6a12290')
    return 'Uñas'; 
  else 
    return'';
};

function identifyImage (catId, context){
  for (var i=0; i<context.parentCat.length; i++){
    if (catId==context.parentCat[i]._id){
      return context.parentCat[i].image;
    }
  }
}


  // var current_price= delivery_areas[0].price;
  // var i;
  // var j=0;
  // delivery_areas.modified[0].price= current_price; 
  // delivery_areas.modified[0].area[0]=delivery_areas[0].name;
  // for(i=1; i<delivery_areas.length; i++){
  //   if(delivery_areas[i].price>current.price){
  //     delivery_areas.modified[j+1].price= delivery_areas[i].price;
  //     delivery_areas.modified[j+1].area.push(name);
  //     j++;
  //   }
  //   else{
  //     delivery_areas.modified[j].area.push(name); 
  //   }
  // }
  // return options.fn(this); 


//Configure tempate engine
app.engine('html', consolidate.handlebars);
app.set('view engine', 'html');
app.set('views', __dirname);

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/landing.html'));
});

app.get('/profesionales',function(req,res){
  res.sendFile(path.join(__dirname+'/professionals.html'));
});

app.get('/css/bootstrap.css', function(req,res){
	res.sendFile(path.join(__dirname+'/css/bootstrap.css'))
})

app.get('/css/normalize.css',function(req,res){
  res.sendFile(path.join(__dirname+'/css/normalize.css'));
});

app.get('/css/style.css',function(req,res){
  res.sendFile(path.join(__dirname+'/css/style.css'));
});

app.get('/js/index.js',function(req,res){
  res.sendFile(path.join(__dirname+'/js/index.js'));
});

app.get('/js/jquery.js',function(req,res){
  res.sendFile(path.join(__dirname+'/js/jquery.js'));
});

app.get('/professional/professional.html',function(req,res){
  res.sendFile(path.join(__dirname+'/professional/professional.html'));
});

app.get('/professional/js/bootstrap.js',function(req,res){
  res.sendFile(path.join(__dirname+'/professional/js/bootstrap.js'));
});

app.get('/professional/js/index.js',function(req,res){
  res.sendFile(path.join(__dirname+'/professional/js/index.js'));
});

app.get('/professional/js/jquery.js',function(req,res){
  res.sendFile(path.join(__dirname+'/professional/js/jquery.js'));
});

app.get('/professional/js/lightcase.js',function(req,res){
  res.sendFile(path.join(__dirname+'/professional/js/lightcase.js'));
});

app.get('/professional/css/bootstrap.css',function(req,res){
  res.sendFile(path.join(__dirname+'/professional/css/bootstrap.css'));
});

app.get('/professional/css/font-lightcase.css',function(req,res){
  res.sendFile(path.join(__dirname+'/professional/css/font-lightcase.css'));
});

app.get('/professional/css/lightcase-max-640.css',function(req,res){
  res.sendFile(path.join(__dirname+'/professional/css/lightcase-max-640.css'));
});

app.get('/professional/css/lightcase-min-641.css',function(req,res){
  res.sendFile(path.join(__dirname+'/professional/css/lightcase-min-641.css'));
});

app.get('/professional/css/lightcase.css',function(req,res){
  res.sendFile(path.join(__dirname+'/professional/css/lightcase.css'));
});

app.get('/professional/fonts/lightcase.ttf',function(req,res){
  res.sendFile(path.join(__dirname+'/professional/fonts/lightcase.ttf'));
});

app.get('/professional/fonts/lightcase.woff',function(req,res){
  res.sendFile(path.join(__dirname+'/professional/fonts/lightcase.woff'));
});

app.get('/professional/css/normalize.css',function(req,res){
  res.sendFile(path.join(__dirname+'/professional/css/normalize.css'));
});

app.get('/professional/css/style.css',function(req,res){
  res.sendFile(path.join(__dirname+'/professional/css/style.css'));
});

app.get('/professional/images/header.jpg',function(req,res){
  res.sendFile(path.join(__dirname+'/professional/images/header.jpg'));
});

app.get('/professional/owl-carousel/owl.carousel.css',function(req,res){
  res.sendFile(path.join(__dirname+'/professional/owl-carousel/owl.carousel.css'));
});

app.get('/professional/owl-carousel/owl.theme.css',function(req,res){
  res.sendFile(path.join(__dirname+'/professional/owl-carousel/owl.theme.css'));
});

app.get('/professional/owl-carousel/owl.carousel.js',function(req,res){
  res.sendFile(path.join(__dirname+'/professional/owl-carousel/owl.carousel.js'));
});

app.get('/professional/images/iphone.png',function(req,res){
  res.sendFile(path.join(__dirname+'/professional/images/iphone.png'));
});

app.get('/professional/images/logo-lupe.png',function(req,res){
  res.sendFile(path.join(__dirname+'/professional/images/logo-lupe.png'));
});

app.get('/professional/images/logo-lupe-bw.png',function(req,res){
  res.sendFile(path.join(__dirname+'/professional/images/logo-lupe-bw.png'));
});

app.get('/professional/images/no-avatar.png',function(req,res){
  res.sendFile(path.join(__dirname+'/professional/images/no-avatar.png'));
});

app.get('/profesionales/:location/:services/:profname',function(req,res){
  var profId = req.params.profname.split('-')[2];
  
  if(profId){
    superagentGet (profId, function(professionalData){
      res.render('professional/professional.html', professionalData);
    }); 
  }
  return;
});

app.get('/professionals/:location/:services/:profname',function(req,res){
  var profId = req.params.profname.split('-')[2];
  
  if(profId){
    superagentGet (profId, function(professionalData){
      res.render('professional/professional.html', professionalData);
    }); 
  }
  return;
});



function superagentGet (profID, callback){
    
    superagent.get(apiEndpoint + "/professionals/" + profID)
    .set({  Accept: 'application/json' })
    .end(function(e, lupeResponse){

      var professionalData = lupeResponse.body;
      var i, j;
      var imageId;
      var doneFetchingImages = false;
      var doneFetchingCat = false;

      function doneFetching(){
        if (doneFetchingCat && doneFetchingImages) {
          callback(professionalData);
        }
      }

      var imagesToGet = professionalData.services.map(function servicesMap (service) {
        return service.category.image;
      }).filter(function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
      });

      for(i=0; i<imagesToGet.length; i++){ 
        superagent.get(apiEndpoint + "/images/" + imagesToGet[i])
        .set({  Accept: 'application/json' })
        .end(function(e, lupeResponse){
          imageData = lupeResponse.body;
          imageId= imageData._id;
          var numOfImages = 0;
          for(j=0; j<(professionalData.services.length); j++){
            if(professionalData.services[j].category.imageData){
              numOfImages++;
            }
            if(professionalData.services[j].category.image==imageId){
              professionalData.services[j].category.imageData= imageData;  
              numOfImages++;
            }
          }
          if (numOfImages == professionalData.services.length){
            doneFetchingImages = true;
            doneFetching();
          }
          });
      }

      var parentsToGet= unique(professionalData); 
      professionalData.parentCat=[]; 
      var numOfParents=0;
      for(i=0; i<parentsToGet.length; i++){
        superagent.get(apiEndpoint + "/categories/" + parentsToGet[i])
        .set({  Accept: 'application/json' })
        .end(function(e, lupeResponse){
          parentData = lupeResponse.body;
          professionalData.parentCat.push(parentData);
          numOfParents++;
          if(numOfParents==parentsToGet.length){
            doneFetchingCat=true;
            doneFetching(); 
          }
        });
      } 
    }); 
}

app.use('/professional/font-awesome', express.static(path.join(__dirname, '/professional/font-awesome')));

app.get('/professional/:prof_id',function(req,res){
  superagentGet(req.params.prof_id, function(professionalData){
    res.render('professional/professional.html', professionalData);
  }); 

});

app.listen(process.env.PORT || 3000);

console.log("Running at Port 3000");