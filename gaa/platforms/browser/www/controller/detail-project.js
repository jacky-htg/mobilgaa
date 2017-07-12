myApp.onPageInit('detail-project', function (page) {

	panelmenu();
	checkToken(page);
	var auth=getTokenId(page);
	var query=page.query;
	var projectId;

	// update_navigasi_data
	var data_nav=dataNav();
	data_nav.last_page.home=page.url;
	projectId_for_left_panel=projectId;

	// check query projectId
	if(query.projectId==undefined){
		projectId=data_nav.home.project.id;
	}else{
		data_nav.home.project.id=query.projectId;
		projectId=data_nav.home.project.id;
	}
	dataNav(data_nav);

 	projectId_for_left_panel=projectId;


	if(query.projectId!=undefined){
		projectId_for_left_panel=query.projectId
		projectId=projectId_for_left_panel;
	}
	else if(projectId_for_left_panel!=0){
		projectId=projectId_for_left_panel;
	}
	else{
		projectId=0;
		projectId_for_left_panel=0;
	}




	var dom_pic=$$(page.container).find('#detail-project-pic-row-1').html();
	$$(page.container).find('#detail-project-pic-row-1').html('');

	$.post(server+'/project/',{auth:auth,data:{projectId:projectId,picId:query.pic}},function(data){
			if(data.signal_err==undefined){

				console.log(data);
				var role=data.role;
				if(role!=null){
					viewPanelLeft.router.loadPage('left-menu/related.html');


				}else{
					viewPanelLeft.router.loadPage('left-menu/notrelated.html');
					$$(page.container).find('.navbar-inner .left').html('<a href="pages/home/all-project.html" class="link icon-only"><i class="material-icons">chevron_left</i></a>');
				}

				var data=data.data;
				$$(page.container).find('#title-project').html(data.title);
				$$(page.container).find('#description-project').html(data.description);
				$$(page.container).find('#address-project').html(data.address);


				// block load distroy
				$$(page.container).find('.block-load').css('display','none');

				if(data.project_imgs.length>0){
					var pic=data.project_imgs;
					var index_pic=1;
					for(var i in pic){
						var rdom=dom_pic;
						rdom=rdom.replace('[#url.pic]',domain+pic[i].urlImg);
						rdom=rdom.replace('[#pictureId]',pic[i].id);

						$$(page.container).find('#detail-project-pic-row-'+index_pic).prepend(rdom);
						if(index_pic>=3){
							index_pic=1;
						}else{
							index_pic=index_pic+1;
						}
					}
				}



			}


	});





});
