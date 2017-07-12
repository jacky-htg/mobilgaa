myApp.onPageInit('profile', function (page) {

	var auth=getTokenId(page);
	checkToken(page);
	$.post(server+'/profile/',{auth:auth,data:{}},function(data){
		if(data.signal_err==undefined){

			$$(page.container).find('#profile-name').html(data.name);
			// block load destroy
			$$(page.container).find('.block-load').css('display','none');

		}

	})

});
