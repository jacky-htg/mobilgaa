myApp.onPageInit('detail-img', function (page) {
	pullRefresh(page,viewHome)
	panelmenu();
	checkToken(page);
	var auth=getTokenId(page);
	var query=page.query;
	var projectId;
	var pictureId;
	// console.log('projectVocus = '+projectId_for_left_panel);
	
	// update data nav
	var data_nav=dataNav();
	data_nav.last_page.home=page.url;
	projectId=data_nav.home.project.id;

	console.log(page.url);
	if(query.pic!=undefined){
		data_nav.home.project.pictureId=query.pic;
		pictureId=query.pic;
	}else{
		pictureId=data_nav.home.project.pictureId;
	}
	dataNav(data_nav);
	data_nav=dataNav();

	
	

	var auth=getTokenId();
	var count_like=0;
	var count_comment;

	var dom_comment=$$(page.container).find('#looping-comment').html();
	$$(page.container).find('#looping-comment').html('');

	$.post(server+'/picture/',{auth:auth,data:{projectId:projectId,picId:pictureId}},function(data){
		

		if(data.signal_err==undefined){
			var meLike=data.meLike;
			var data=data.data;
			var link_next=$($$(page.container).find('.link-next')).attr('href');
			$($$(page.container).find('.link-next')).attr('href',link_next+'picId='+data.id+'&');

			
			$($$(page.container).find('#img')).attr('src',domain+data.urlImg);
			var like=data.project_img_likes;
			count_like=like.length;
			var role_in_project='';
			$$(page.container).find('#creator_pic').html(data.user.userName+role_in_project);
			$$(page.container).find('#caption').html(data.description);
			

			$$(page.container).find('#count_like').html('<i class="material-icons icon">favorite</i> '+count_like);
			var comment=data.project_img_comments;
			count_comment=comment.length;
			$$(page.container).find('#count_comment').html(count_comment);

			if(meLike!=null){
				$$(page.container).find('#buttonLike').html('<i class="material-icons icon icon-boder" style="color:red;   -webkit-text-fill-color:red;">favorite</i>')
			}else{
				$$(page.container).find('#buttonLike').html('<i class="material-icons icon icon-boder">favorite</i>');
				
			}



		}
	})



	// like function

	$$(page.container).find('#buttonLike').click(function(){
		console.log('like');
		$.post(server+'/picture/like',{auth:auth,data:{projectId:projectId,picId:pictureId}},function(data){
			console.log(data);
			viewHome.router.refreshPage();
		})

	})
		
	


});
