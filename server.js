var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var app = express();
app.use(morgan('combined'));
var articles = {
	'article-one' : {
	title: 'Article-1|Mathew',
	heading: 'Article-1',
	date: '10 Sep,2016',
	content: `
		<p>
			It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
		</p>
	`
	},
	'article-two' : {
	title: 'Article-2|Mathew',
	heading: 'Article-2',
	date: '12 Sep,2016',
	content: `
		<p>
			It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
		</p>
		<p>
			It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
		</p>
	`
	}
};
//Configuration file for DB
var config = {
	user:"mathewthecoder",
	database:"mathewthecoder",
	port:"5432",
	host:"db.imad.hasura-app.io",
	password:"db-mathewthecoder-28550"
	//password:process.env.DB_PASSWORD
};

function createTemplate(data){
var title = data.title;
var heading = data.heading;
var date = data.date;
var content = data.content;
var template = `
<!DOCTYPE html>
<html>
<head>
	<title>${title}</title>
	<link rel="stylesheet" type="text/css" href="style.css" />
	<meta name="viewport" content="width=device-width, intial-scale=1" />
</head>
<body>
<div class='container'>
	<div>
		<h2>${heading}</h2>
	</div>
	<div>
		${date.toDateString()}
	</div>
	<div>
		${content}
	</div>
</div>
</body>
</html>
`;
return template;
}


var counter = 0;
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'home.html'));
});

app.get('/blog', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'blog.html'));
});

// create the pool somewhere globally so its lifetime
// lasts for as long as your app is running
var pool = new Pool(config);

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


var names = [];
app.get('/search-name', function(req, res){
	var name = req.query.name;
	names.push(name);
	//JSON
	res.send(JSON.stringify(names));
});
app.get('/counter', function (req, res){
	counter = counter + 1;
	res.send(counter.toString());
});
app.get('/articles/:articleName', function (req, res) {
  //articleName = article-one;
  var articleName = req.params.articleName;
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


/*
app.get('/search-name/:name', function(req, res){
	var name = req.params.name;
	names.push(name);
	//JSON
	res.send(JSON.stringify(names));
});
*/

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/Arrow-Up.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Arrow-Up.png'));
});
app.get('/ui/header.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'header.jpg'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
