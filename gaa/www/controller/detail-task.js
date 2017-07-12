myApp.onPageInit('detail-task', function (page) {

	console.log(page);
	pullRefresh(page,viewHome)
	panelmenu();
	checkToken(page);
	var auth=getTokenId(page);
	var query=page.query;
	var data_nav=dataNav();
	data_nav.home.project.panel.timeSchedule.taskId=query.taskId;
	data_nav.last_page.home=page.url;
	dataNav(data_nav);

	var dom=$($$(page.container).find('#looping-subtask')).html();
	$($$(page.container).find('#looping-subtask')).html('');

	$.post(server+'/task/detail',{auth:auth,data:{projectId:data_nav.home.project.id,taskId:query.taskId}},function(data){

		var data=data.project_tasks[0].project_sub_tasks;

		for(var i in data){
			var rdom=dom;
			rdom=rdom.replace('[#title-subtask]',data[i].title);
			rdom=rdom.replace('[#description]',data[i].description);
			rdom=rdom.replace('[#date]','');

			if(data[i].status){
				rdom=rdom.replace('[#width]','100%');

			}else{
				rdom=rdom.replace('[#width]','0%');

			}


			$$(page.container).find('#looping-subtask').append(rdom);


		}
		// block load destroy
		$$(page.container).find('.block-load').css('display','none');

	});



});
