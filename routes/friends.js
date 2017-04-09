var ejs = require("ejs");
var mysql = require('./mysql');


function showfriends(req,res)
{
	var sessemail=req.session.username;
	console.log(sessemail);
	// check user already exists
	var getFriends = null;
	//if(req.username === null || req.username === undefined){
		//getUser="select * from profile where emailid='"+req.session.username+"'";
	//}
	//else{
		//getFriends="select * from friends where Email='"+sessemail+"'";
	//}
	//console.log("Query is:"+getFriends);
	var friends = [];
	getFriends="select * from friendlist where Email='"+req.session.username+"'";
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("valid Login " + results.length);
				console.log(results[0].Fname);
				ejs.renderFile('./views/friendlist.ejs', { data: results} , function(err, result) {
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
			else {    
				
				console.log("Invalid Login");
				ejs.renderFile('./views/failLogin.ejs',function(err, result) {
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
		}
	},getFriends);
}

exports.showfriends=showfriends;