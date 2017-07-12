myApp.onPageInit('comment', function (page) {


	checkToken(page);
	var auth=getTokenId(page);
	var query=page.query;
	var pictureId;
	var projectId;
	// var projectId=projectVocus(query);

	var data_nav=dataNav();
	data_nav.last_page.home=page.url;
	projectId=data_nav.home.project.id;

	if(query.picId != undefined){
		data_nav.home.project.pritureId=query.picId;
		pictureId=query.picId;
	}else{
		pictureId=data_nav.home.project.pritureId;
	}


	$$(page.container).find('#send-comment').click(function(){


		var content=$$(page.container).find('#content-comment').val();
		if(content!=''){
			$.post(server+'/comment-pic/create',{auth:auth,data:{projectImg:pictureId,content:content}},function(data){
				if(data.signal_err==undefined){
					viewHome.router.refreshPage();
				}
			})
		}


	})




	$.post(server+'/picture/',{auth:auth,data:{projectId:projectId,picId:pictureId}},function(data){


		if(data.signal_err==undefined){

			var data=data.data;
			console.log(data);


			var dom_comment=$$(page.container).find('#looping-comment').html();
			$$(page.container).find('#looping-comment').html('');

			for(var i in data.project_img_comments){
				var rdom=dom_comment;
				rdom=rdom.replace('[#detail-img.comment.userName#role]',data.project_img_comments[i].user.userName);
				rdom=rdom.replace('[#detail-img.comment.time]',(data.project_img_comments[i].updatedAt).split('T')[0]);
				rdom=rdom.replace('[#detail-img.comment]',data.project_img_comments[i].content);
				$$(page.container).find('#looping-comment').prepend(rdom);
			}
		}
	});
	// block load destroy
	$$(page.container).find('.block-load').css('display','none');


});
