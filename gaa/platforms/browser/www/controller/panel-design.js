myApp.onPageInit('panel-design', function (page) {

	panelmenu();
	checkToken(page);
	var auth=getTokenId(page);
	var query=page.query;
	var projectId;

	var data_nav=dataNav();
	data_nav.last_page.home=page.url;
	projectId=data_nav.home.project.id;
	dataNav(data_nav);




	var dom=$($$(page.container).find('#folder-design-looping')).html();
	$('#folder-design-looping').html('');

	console.log(projectId_for_left_panel);
	$.post(server+'/design/',{auth:auth,data:{projectId:projectId}},function(data){
		if(data.signal_err==undefined){
			if(data.length>0){
				for(var i in data){
					var rdom=dom;
					rdom=rdom.replace('[#folder.title]',data[i].title);
					rdom=rdom.replace('[#folderId]',data[i].id);
					rdom=rdom.replace('[#projectId]',projectId);



					
					$$(page.container).find('#folder-design-looping').prepend(rdom);
				}
			}
		}
	})



});