var ejs = require("ejs");
var mysql = require('./mysql');


function profile(req,res)
{
	var sessemail=req.session.username;
	var sessname=req.session.results;
	console.log(sessemail);
	// check user already exists
	var getUser = null;
	//if(req.username === null || req.username === undefined){
		//getUser="select * from profile where emailid='"+req.session.username+"'";
	//}
	//else{
		getUser="select * from profile where Email='"+sessemail+"'";
	//}
	console.log("Query is:"+getUser);
	var friends = [];
	var getFriends="select * from friendsList where primaryEmailid='"+req.session.username+"'";
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("valid Login " + results.length);
				console.log(results[0].overview);
				ejs.renderFile('./views/profile1.ejs', {data: results, friends:friends, username:sessname } , function(err, result) {
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
	},getUser);
}


function editProfile(req,res)
{
	// check user already exists
	var getUser="select * from profile where Email='"+req.session.username+"'";
	console.log("Query is:"+getUser);
	var friends = [];
	var sessname=req.session.results;
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("valid Login " + results.length);
				console.log(results[0].overview);
				ejs.renderFile('./views/editProfile.ejs', {data: results, friends:friends, username:sessname } , function(err, result) {
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
	},getUser);
}


function saveProfile(req,res)
{
	// check user already exists
	var sessname=req.session.results;
	var overview = req.param("overview");
	var workInfo = req.param("workInfo");
	var education = req.param("education");
	var contactNo = req.param("contactNo");
	var lifeEvents = req.param("lifeEvents");
	var saveSuccess = false;
	console.log('This is save ' + workInfo);
	
	var insertUser = "update profile set Overview='" + overview + "', CWork='" + workInfo + "' , Education='" + education + "' , Contact='" + contactNo + "', LifeEvents='" + lifeEvents + "' where Email='" + req.session.username +"'" ;
	var getUser="select * from profile where emailid='"+req.session.username+"'"; 
	console.log("Query is:"+getUser);
	var friends = [];
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results !== undefined){
				console.log("Saved " + results.overview);
				
				mysql.fetchData(function(err,results1){
					if(err){
						throw err;
					}
					else 
					{
						if(results1.length > 0){
							console.log("valid Login " + results1.length);
							console.log(results1[0].overview);
							ejs.renderFile('./views/profile.ejs', { data: results1, friends:friends, username:sessname } , function(err, result) {
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
							ejs.renderFile('./views/Groups.ejs', {username:sessname}, function(err, result) {
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
				},getUser);
			}
			else {    
				
				console.log("Invalid Login");
				ejs.renderFile('./views/Groups.ejs',function(err, result) {
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
	},insertUser);
	
}

function showfriends(req,res)
{
	var sessemail=req.session.username;
	var sessname=req.session.results;
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
				ejs.renderFile('./views/friendlist.ejs', { data: results,username:sessname} , function(err, result) {
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




function showGroups(req,res)
{
	var sessemail=req.session.username;
	var sessname=req.session.results;
	console.log(sessemail);
	// check user already exists
	var getGroups = null;
	//if(req.username === null || req.username === undefined){
		//getUser="select * from profile where emailid='"+req.session.username+"'";
	//}
	//else{
		//getFriends="select * from friends where Email='"+sessemail+"'";
	//}
	//console.log("Query is:"+getFriends);
	
	getGroups="select * from mygroups where Email='"+req.session.username+"'";
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("valid Login " + results.length);
				console.log(results[0].Fname);
				ejs.renderFile('./views/Groups.ejs', { data: results, username:sessname} , function(err, result) {
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
	},getGroups);
}


function goTocreateGroup(req,res){
	
	var sessemail=req.session.username;
	var sessname=req.session.results;
	ejs.renderFile('./views/createGroup.ejs',{username:sessname}, function(err, result) {
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

function createGroup(req,res)
{
	var sessemail=req.session.username;
	var sessname=req.session.results;
	var GroupName = req.param("GroupName");
	var GroupDescription = req.param("GroupDescription");
	var GroupType = req.param("GroupType");
	
	console.log(sessemail);
	// check user already exists
	var createGroup = null;
	//if(req.username === null || req.username === undefined){
		//getUser="select * from profile where emailid='"+req.session.username+"'";
	//}
	//else{
		//getFriends="select * from friends where Email='"+sessemail+"'";
	//}
	//console.log("Query is:"+getFriends);
	var getCount="select * from groups";
	var message;
	
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				
				var count=results.length+1;
				createGroup="insert into groups values('"+count+"','"+GroupName+"','"+GroupDescription+"','"+GroupType+"')";
				mysql.fetchData(function(err,results){
					if(err){
						throw err;
					}
					else 
					{
						if(results.length > 0){
							console.log("valid Login " + results.length);
							console.log(results[0].Fname);
							
						}
						else {    
							
							console.log("Invalid Login");
							
						}
					}
				},createGroup);

				
				/////////////for my group
				
				var createmyGroup="insert into mygroups values('"+count+"','"+req.session.username+"','Admin','"+GroupName+"')";
				mysql.fetchData(function(err,results){
					if(err){
						throw err;
					}
					else 
					{
						if(results.length > 0){
							Message="Group created successfully";
							console.log("valid Login " + results.length);
							console.log(results[0].Fname);
							ejs.renderFile('./views/createGroup.ejs', { data: results, username:sessname, Message:Message} , function(err, result) {
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
							Message="Group created successfully";
							ejs.renderFile('./views/createGroup.ejs', { data: results, username:sessname, Message:Message} , function(err, result) {
							//ejs.renderFile('./views/failLogin.ejs',function(err, result) {
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
				},createmyGroup);				
				
				
			}
			else {    
				
				console.log("Invalid Login");
				
			}
		}
	},getCount);

	
	



}//function


function deleteGroup(req,res){
	var GroupName= req.param("GroupName");
	var sessname=req.session.results;
	
	var query="delete from mygroups where Gname='"+GroupName+"' and Email='"+req.session.username+"'";
	//var Message="Group deleted successfully";
	mysql.fetchData(function(err,results){
		
		if(err)
			throw err;
		else
	{
			Message="Group Deleted Successfully."
			ejs.renderFile('./views/Groups.ejs',{Message:Message,username:sessname}, function(err, result) {
		        // render on success
		        if (!err) {
		            res.end(result);
		        }
		        // render or error
		        else {
		        	
		        	Message="Group Deleted Successfully."
		    			ejs.renderFile('./views/Groups.ejs',{Message:Message,username:sessname}, function(err, result) {
		    		    
		        	res.end('An error occurred');
		            console.log(err);
		    			});
		        }
			
			});		
			
	}	
		
	},query);
	
	
	
	
	
	
	
}




function redirectToHomepage(req,res)
{
	//Checks before redirecting whether the session is valid
	if(req.session.username)
	{
		var sessname=req.session.results;
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


function showInterests(req,res)
{
	var sessemail=req.session.username;
	var sessname=req.session.results;
	console.log(sessemail);
	// check user already exists
	var getGroups = null;
	//if(req.username === null || req.username === undefined){
		//getUser="select * from profile where emailid='"+req.session.username+"'";
	//}
	//else{
		//getFriends="select * from friends where Email='"+sessemail+"'";
	//}
	//console.log("Query is:"+getFriends);
	
	getGroups="select * from interests where Email='"+req.session.username+"'";
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("valid Login " + results.length);
				console.log(results[0].Fname);
				ejs.renderFile('./views/interests.ejs', { data: results, username:sessname} , function(err, result) {
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
	},getGroups);
}



exports.showInterests=showInterests;
exports.redirectToHomepage=redirectToHomepage;
exports.deleteGroup=deleteGroup;
exports.createGroup=createGroup;
exports.showGroups=showGroups;
exports.showfriends=showfriends;
exports.profile=profile;
exports.editProfile=editProfile;
exports.saveProfile=saveProfile;
exports.goTocreateGroup=goTocreateGroup;