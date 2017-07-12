myApp.onPageInit('all-project', function (page) {

	var auth=getTokenId(page);
	checkToken(page);
	var dom;
	if(dom==undefined){
	dom=$($$(page.container).find('#my-project-looping')).html();
	}
	$($$(page.container).find('#my-project-looping')).html('');


	$.post(server+'/all-project/my',{auth:auth},function(data){
		if(data.signal_err==undefined){
			if(data.length>0){
				for(var i in data){
					var rdom=dom;
					console.log(rdom);
					rdom=rdom.replace('[#project.title]',data[i].title);
					rdom=rdom.replace('[#project.description]',data[i].description);
					rdom=rdom.replace('[#projectId]',data[i].id);
					$($$(page.container).find('#my-project-looping')).prepend(rdom)
				}
			}
		}
	});

	var id_last_all_pro=0;

	function loadProjectAll(){

		$.post(server+'/all-project/ex',{auth:auth,data:{lastId:id_last_all_pro}},function(data){
			if(data.signal_err==undefined){
				if(data.length>0){

					for(var i in data){
						var rdom =dom;
						rdom=rdom.replace('[#project.title]',data[i].title);
						rdom=rdom.replace('[#project.description]',data[i].description);
						rdom=rdom.replace('[#projectId]',data[i].id);

						id_last_all_pro=data[i].id;

						$($$(page.container).find('#my-project-looping-ex')).prepend(rdom)
					}
				}

			}
			// block load destroy
			$$(page.container).find('.block-load').css('display','none');


		});
	}

	loadProjectAll();
	var lastScrollTop = 0;



// 	$($$(page.container).find('.page-content')).scroll(function(){
// 		console.log(3)
//     if ($($$(page.container).find('.page-content')).scrollTop() + $$(page.container).find('.page-content').height()  >= $(window).height()) {
//        alert('At Bottom');
//     }
// });




});
