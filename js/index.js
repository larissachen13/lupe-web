$(document).ready(function(){
	var requestURL= "http://lupe-server-stage.herokuapp.com/professionals?category=5526db4ce4b006b9c6a122a8&lat=-34.575050&lon=-58.421454"; 

	$("#search").keyup(function(){
		var searchField = $("#search").val(); 
		var myExp = new RegExp(searchField, "i"); 
		$.getJSON(requestURL, function(data){
			var output= "<ul>";
			$.each(data, function(key,val){
				if (val.name.search(myExp) !=-1){
					output += "<li>"; 
					output+='<a href="professional/'+val._id+'">' +'<h2>' + val.name + "</h2></a>"; 
					output += '<img src="' + val.avatar.thumbnail +'"/>';
					output += '<div class="col-sm-8">';
					output +=" <p> Bio:" + val.bio + "</p> ";
					output += "<p> Email:" + val.email + "</p> ";
					output += '</div>'
					//output += '<img src= "https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e15/11098368_814860845236391_357841428_n.jpg"/>'
					output +="</li>"
				}
			}); 
			output += "</ul>";
			$("#results").html(output); 
		});
	});
});