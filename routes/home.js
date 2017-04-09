var ejs=require("ejs");
var mysql= require('./mysql');
var session= require('client-sessions');

function afterSignIn(req,res)
{
	var username=req.param("username");
	var password=req.param("password");
	var json_responses;
	var getUser="select * from login where email='"+username+"' and password='"+password+"'";
	console.log("Query is :"+getUser);
	
	
	mysql.fetchData(function(err,results){
		
		if(err){
			throw err;
			
		}
		else{
			
			if(results.length>0){
				
				console.log("valid login");
				
				req.session.username = username;
				console.log(req.session.username);
				
				json_responses ={"statusCode" : 200};
				res.send(json_responses);
				
				
				//res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			/*	ejs.renderFile('./views/wall.ejs', function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    },{getusername:req.session.getusername});*/
				
				
			}
			else{
				
				console.log("Invalid Login");
				json_responses ={"statusCode" :401};
				res.send(json_responses);
				//res.redirect('/');
						
			}

		}
		
	
	},getUser);
		
}


function afterSignUp(req,res){
	
	var getfirstname=req.param("firstname");
	var getlastname=req.param("lastname");
	var getemail=req.param("email");
	var getremail=req.param("remail");
	var getpassword=req.param("password");
	var count=3;
	var Message;
	var getUser="select * from login where Email='"+getemail+"'";
	
mysql.fetchData(function(err,results){
		
		if(err){
			throw err;
		}
		else{
			
				if(results.length>0){  
				
				Message="User already exists !";	
				console.log("User already exists");
				
				ejs.renderFile('./views/facebooklogin.ejs',{Message:Message},function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
				
				
				}
				else{
				console.log("New User");
				var setUser="insert into login values('"+count+"','"+getfirstname+"','"+getlastname+"','"+getemail+"','"+getpassword+"')";
				
				mysql.fetchData(function(err,results){
					
					if(err)
						throw err;
					else
				{
						Message="User added Successfully ! Login to begin."
						ejs.renderFile('./views/facebooklogin.ejs',{Message:Message}, function(err, result) {
					        // render on success
					        if (!err) {
					            res.end(result);
					        }
					        // render or error
					        else {
					            res.end('An error occurred');
					            console.log(err);
					        }
					    });
								
						
				}
						
						
					
				},setUser);
					
				
			}

		}
		
	
	},getUser);	
	
}



function redirectToHomepage(req,res)
{
	//Checks before redirecting whether the session is valid
	if(req.session.username)
	{
		
		var getusername=req.session.username;
		var fname="select * from login where Email='"+getusername+"'";
		
		
		mysql.fetchData(function(err,results){
			
			if(err){
				throw err;
				
			}
			else{
				
				if(results.length>0){
					
				//var resu=JSON.parse(results);	
				req.session.results = results[0].Fname+" "+results[0].Lname;	
				console.log("After finding Fname");	
				console.log(req.session.results);	
				res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
				res.render("wall",{username:req.session.username,results: req.session.results});
				//res.render("myprofile",{username:req.session.username,results: req.session.results});
				//res.render("profile1",{username:req.session.username,results: req.session.results});
				}
				
			}
						
			
		},fname);
		
		//console.log("In redirect to homepage function",+req.session.username);
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		/*res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("wall",{username:req.session.username});*/
	}
	else
	{
		res.redirect('/');
	}
}


	//if(document.getElementById("signin").clicked==true){
	/*if(getusername=="tanvishukla234@gmail.com" && getpassword=="admin"){
		
		console.log("valid Login");
		ejs.renderFile('./views/successLogin.ejs', function(err, result) {
	        // render on success
	        if (!err) {
	            res.end(result);
	        }
	        // render or error
	        else {
	            res.end('An error occurred');
	            console.log(err);
	        }
	    });
	}
	
	else{
		
		console.log("Invalid Login");
		ejs.renderFile('./views/failLogin.ejs', function(err, result) {
	        // render on success
	        if (!err) {
	            res.end(result);
	        }
	        // render or error
	        else {
	            res.end('An error occurred');
	            console.log(err);
	        }
	    });
		
	}*/


exports.logout = function(req,res)
{
	req.session.destroy();
	res.redirect('/');
};

	
exports.afterSignIn=afterSignIn;
exports.afterSignUp=afterSignUp;
exports.redirectToHomepage=redirectToHomepage;