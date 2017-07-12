myApp.onPageInit('panel-project-update', function (page) {

	var dom=$$(page.container).find('#detail-project-pic-row-1').html();
	$$(page.container).find('#detail-project-pic-row-1').html('');

	panelmenu();
	checkToken(page);
	var auth=getTokenId(page);
	var query=page.query;

	var data_nav=dataNav();
	data_nav.last_page.home=page.url;
	var projectId=data_nav.home.project.id;
	dataNav(data_nav);




	$.post(server+'/project-update',{auth:auth,data:{projectId:projectId}},function(data){

		if(data.signal_err==undefined){
			var data=(data.project_imgs);
			if(data.length>0){
				var index=0;
				for(var i in data){
					index=index+1;
					if(index>3){
						index=1;
					}
					var rdom=dom;
					rdom=rdom.replace('[#url.pic]',domain+data[i].urlImg);
					$$(page.container).find('#detail-project-pic-row-'+index).prepend(rdom);

				}
			}
			// block load destroy
			$$(page.container).find('.block-load').css('display','none');

		}
	})

	panelmenu();

});
