myApp.onPageInit('detail-design-folder', function (page) {
	checkToken(page);
	var auth=getTokenId(page);
	var query=page.query;
	var projectId=projectVocus(query);
	console.log('projectVocus = '+projectId_for_left_panel);
	

});