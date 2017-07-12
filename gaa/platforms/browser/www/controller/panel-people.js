myApp.onPageInit('panel-people', function (page) {

	panelmenu();
	checkToken(page);
	var auth=getTokenId(page);
	var query=page.query;
	var projectId=projectVocus(query);
	console.log('projectVocus = '+projectId_for_left_panel);
	var dom_people=$$(page.container).find('#people-on-project-looping').html();
	$$(page.container).find('#people-on-project-looping').html('');

	$.post(server+'/people',{auth:auth,data:{projectId:projectId}},function(data){
		if(data.signal_err==undefined){

			for(var i in data){
				var rdom=dom_people;
				rdom=rdom.replace('[#userName]',data[i].user.userName);

				$$(page.container).find('#people-on-project-looping').append(rdom);

			}
		}
	})


});