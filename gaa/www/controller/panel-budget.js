myApp.onPageInit('panel-budget', function (page) {

	panelmenu();

	var query=page.query;
	checkToken(page);
	var auth=getTokenId(page);

	var dom_sub=$(page.container).find('#subtask-looping-').html();
	$(page.container).find('#subtask-looping-').html('');

	var dom=$(page.container).find('#looping-budget').html();
	$(page.container).find('#looping-budget').html('');


	var totalbudget=0;
	var data_nav=dataNav();
	data_nav.last_page.home=page.url;
	var projectId=data_nav.home.project.id;
	dataNav(data_nav);


	var auth=getTokenId();
	$.post(server+'/budget/',{auth:auth,data:{projectId:projectId}},function(data){
		if(data.signal_err==undefined){
			if(data.length>0){
				for(var i in data){
					var rdom=dom;
					var total=0;
					rdom=rdom.replace('[#task.title]',data[i].title);
					rdom=rdom.replace('subtask-looping-','subtask-looping-'+data[i].id);
					rdom=rdom.replace('[#task.id]',data[i].id);

					$(page.container).find('#looping-budget').append(rdom);
					var data2=data[i].project_sub_tasks;
					if(data2.length>0){
						for(var ii in data2){
							var rdom2=dom_sub;
							total=total+data2[ii].budget;
							rdom2=rdom2.replace('[#subtask.title]',data2[ii].title);

							rdom2=rdom2.replace('[#subtask.budget]','Rp. '+buildMonay(data2[ii].budget));

							$(page.container).find('#subtask-looping-'+data[i].id).append(rdom2);


						}
					}
					$(page.container).find('#total-'+data[i].id).html('Rp. '+buildMonay(total));
					totalbudget=totalbudget+total;



				}


				$(page.container).find('#total-all').html('Rp. '+ buildMonay(totalbudget));
			}
			// block load destroy
			$$(page.container).find('.block-load').css('display','none');
		}
	})



});
