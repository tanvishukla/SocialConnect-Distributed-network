
/*
 * GET home page.
 */

var ejs=require("ejs");
function get(req, res){
  
	ejs.renderFile('./views/facebooklogin.ejs', function(err, result) {
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
	
  
};

exports.get=get;