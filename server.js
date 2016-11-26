var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var app = express();
app.use(morgan('combined'));

//Configuration file for DB
var config = {
	user:"mathewthecoder",
	database:"mathewthecoder",
	port:"5432",
	host:"db.imad.hasura-app.io",
	password:"db-mathewthecoder-28550"
	//password:process.env.DB_PASSWORD
};
function createArticleTemplate(data){

var template =`
<!DOCTYPE html>
<html>
<head>
	<title>Blog</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
	<meta charset="utf-8">
	<meta name="author" content="Mathew Joseph">
	
	<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Open+Sans" />
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
	<link rel="stylesheet" href="https://code.getmdl.io/1.2.1/material.indigo-pink.min.css">
	<link href="http://fonts.googleapis.com/css?family=Dancing+Script:700|EB+Garamond" rel="stylesheet" type="text/css" />
	<link rel='stylesheet prefetch' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css'>
	<link rel="stylesheet" type="text/css" href="/ui/style.css">
</head>
<body>
	<div id="body_wrap">
		<header class="page-header">
	        <div class="page-header__title">
	            <h1>Articles</h1>
	            <a href="/">← back to main page</a>
	        </div>
	    </header>    
	</div>
	<!--DemoCard-->
	<center>
`;

//Generate article list
	for(var i=0;i<data.rows.length;i++){
		var temp = data.rows[i];
		var title = temp.title;
		var heading = temp.heading;
		var tagline = temp.tagline;
		var date = temp.date;
		
		template+=`
		<br/>
	<div class="demo-card-wide mdl-card mdl-shadow--2dp">
  <div class="mdl-card__title">
    <h2 class="mdl-card__title-text">${title}</h2>
  </div>
  <div class="mdl-card__supporting-text">
   ${tagline}
  </div>
  <div class="mdl-card__actions mdl-card--border">
    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="/articles/${title}">
      Learn More
    </a>
  </div>
  </div>
</div>
		`;
	}

template+=`</center>
<!--Author Details-->
<div id="author" class="author-wrap">
	<section class="author">
        <div class="author__pic"></div>
        <div class="author__desc">
            <p>Hi, I'm <strong>Mathew Joseph</strong>. I'm a <strong>Frontend Web Developer</strong> based in Kerala. </p>
            <div class="author__links">
                <a class="author__link" href="https://www.facebook.com/mathew.joseph.1806253"><i class="fa fa-facebook-official"></i> mathew</a>
                <a class="author__link" href="https://in.linkedin.com/in/mathew-joseph"><i class="fa fa-linkedin"></i> linkedin<span class="link__extra">.com/mathew</span></a>
                <a class="author__link" href="http://codepen.io/MathewJoseph"><i class="fa fa-codepen"></i> codepen<span class="link__extra">.com/mathew</span></a>
                <a class="author__link" href="http://www.github.com/MathewTheCoder"><i class="fa fa-github"></i> github<span class="link__extra">.com/mathew</span></a>
                <a class="author__link" onclick="revealEmail()"><i class="fa fa-phone"></i> contact<span class="link__extra"> me</span></a>
            </div>
        </div>
    </section>
</div>


<!--Scripts loaded last to reduce lag in web page rendering-->

<script defer src="https://code.getmdl.io/1.2.1/material.min.js"></script>
<script type="text/javascript" src="/ui/main.js"></script>

</body>
</html>
`;	
	return template;

}
function createTemplate(data){
var title = data.title;
var heading = data.heading;
var tagline = data.tagline;
var date = data.date;
var content = data.content;

var blogTemplate = `
<!DOCTYPE html>
<html>
<head>
	<title>${title}</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
	<meta charset="utf-8">
	<meta name="author" content="Mathew Joseph">
	<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Open+Sans" />
	<link href="http://fonts.googleapis.com/css?family=Dancing+Script:700|EB+Garamond" rel="stylesheet" type="text/css" />
	<link rel='stylesheet prefetch' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css'>
	<link rel="stylesheet" type="text/css" href="/ui/style.css">
</head>
<body>
	<div id="body_wrap">
		<header class="page-header">
	        <div class="page-header__title">
	            <h1>${heading}</h1>
	            <p>${tagline}. By <a href="#author">Mathew Joseph</a></p>
	            <a href="/">← back to main page</a>
	        </div>
	        
    	</header>    
	</div>
	<div class="page-article">
		${content}
	</div>
</div>
<!--Author Details-->
<div id="author" class="author-wrap">
	<section class="author">
        <div class="author__pic"></div>
        <div class="author__desc">
            <p>Hi, I'm <strong>Mathew Joseph</strong>. I'm a <strong>Frontend Web Developer</strong> based in Kerala. </p>
            <div class="author__links">
                <a class="author__link" href="https://www.facebook.com/mathew.joseph.1806253"><i class="fa fa-facebook-official"></i> mathew</a>
                <a class="author__link" href="https://in.linkedin.com/in/mathew-joseph"><i class="fa fa-linkedin"></i> linkedin<span class="link__extra">.com/mathew</span></a>
                <a class="author__link" href="http://codepen.io/MathewJoseph"><i class="fa fa-codepen"></i> codepen<span class="link__extra">.com/mathew</span></a>
                <a class="author__link" href="http://www.github.com/MathewTheCoder"><i class="fa fa-github"></i> github<span class="link__extra">.com/mathew</span></a>
                <a class="author__link"onclick="revealEmail()"><i class="fa fa-phone"></i> contact<span class="link__extra"> me</span></a>
            </div>
        </div>
    </section>
</div>

<!--Scripts loaded last to reduce lag in web page rendering-->
<script type="text/javascript" src="/ui/main.js"></script>
</body>
</html>
`;
return blogTemplate;
}



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'home.html'));
});

// create the pool somewhere globally so its lifetime
// lasts for as long as your app is running
var pool = new Pool(config);
//Test db connection
app.get('/test-db', function (req, res) {
  //Make a request
  pool.query('SELECT * FROM test', function(err, result){
  	if(err){
  		res.status(500).send(err.toString());
  	}
  	else{
  		res.send(JSON.stringify(result));
  	}
  });
  //Return response
});




app.get('/articles', function (req, res){
//Query
  pool.query("SELECT * FROM art ORDER BY id DESC", function(err, result){
  	if(err){
  		res.status(500).send(err.toString());
  	}
  	else{
  		if(result.rows.length === 0){
  			res.status(404).send("Articles Not Found");
  		}
  		else{
  			var articleData = result;
  			res.send(createArticleTemplate(articleData));
  		}
  	}
  });
  
  	
});
//Generate view for each article
app.get('/articles/:articleName', function (req, res) {
  var articleName = req.params.articleName;
  
  //Query
  pool.query("SELECT * FROM art WHERE title='"+articleName+"'", function(err, result){
  	if(err){
  		res.status(500).send(err.toString());
  	}
  	else{
  		if(result.rows.length === 0){
  			res.status(404).send("Article Not Found");
  		}
  		else{
  			var articleData = result.rows[0];
  			res.send(createTemplate(articleData));
  		}
  	}
  });
  
  
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/header.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'header.jpg'));
});
app.get('/ui/mathewport.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'mathewport.jpg'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
