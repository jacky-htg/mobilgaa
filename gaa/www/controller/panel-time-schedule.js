myApp.onPageInit('panel-time-schedule', function (page) {

	panelmenu();
	checkToken(page);
	var auth=getTokenId(page);
	var query=page.query;

	var data_nav=dataNav();
	data_nav.last_page.home=page.url;
	var projectId=data_nav.home.project.id;
	dataNav(data_nav);

	var ex_data;
	var jobDone=0
	var width_list=$($$(page.container).find('#list-month')).width();
	console.log(width_list);
	$$(page.container).find('.schedul .month').css('width',((width_list/12)-2)+'px');

	$.post(server+"/time-schedule/",{auth:auth,data:{projectId:projectId}},function(data){
		if(data.signal_err==undefined){

			ex_data=data;
			var yearslock=parseInt( new Date().getFullYear());

				function buildSchedule(data){
			        $($$(page.container).find('.view-task-block')).html('');
			        var presenting=0;
					// console.log(data);
					if(data.length>0){
						$($$(page.container).find('#total')).html('Total : '+data.length);

						for(var i in data){
							var presenting=0;
							// var width_list=$($$(page.container).find('#list-month')).width();
							// console.log(width_list);
							// $$(page.container).find('.schedul .month').css('width',((width_list/12))+'px');
							var spanPerMonth=$($$(page.container).find('.schedul .month')).width();
							var spanDay=spanPerMonth/32;
							var spanYear=$($$(page.container).find('.list-month')).width();

							var date,date2,day,moth,year,day2,moth2,year2,padding,width;



							if(data[i].project_sub_tasks.length>0){
								var data_sub=data[i].project_sub_tasks
								var onepersent=100/data_sub.length;
								for(var ii in data_sub){
									if(data_sub[ii].status==true){
										presenting=presenting+ onepersent;
										console.log(onepersent +' '+ presenting);
									}
								}

								if(presenting>=100){
									jobDone=jobDone+1;;
								}
							}
							else{
								presenting=100;
								jobDone=jobDone+1;
							}


							date=data[i].startDate+'';
							date=date.split('T')[0];
							date=date.split('-');

							date2=data[i].endDate+'';
							console.log(date2 + ' end');
							date2=date2.split('T')[0];
							date2=date2.split('-');


							if(parseInt(date[0])==yearslock){
								day=parseInt(date[2])*spanDay;
								padding=(parseInt(date[1])-1)*(spanPerMonth+2)+day;
								if(parseInt(date2[0])==yearslock){
									day2=parseInt(date2[2])*spanDay;
									width=(((parseInt(date2[1])-1)*spanPerMonth)+day2)-padding;

								}
								else{
									width=spanYear-padding;
								}
							}
							else{

								padding=0;
								if(parseInt(date2[0])==yearslock){
									day2=parseInt(date2[2])*spanDay;
									width=(((parseInt(date2[1])-1)*spanPerMonth)-padding)+day2;
								}
								else{
									width=spanYear-padding;
								}

							}

							 var domtaskviewblock='<a href="pages/home/task-detail.html?taskId='+data[i].id+'" class="col-100  task-block" style="margin-top:5px; padding-bottom:10px; border-bottom:1px solid #222;">'+
			                      ' <div style="margin-left:'+padding+'px;width:'+((spanPerMonth*12)-padding)+'px;">'+
			                          '<span class="presentation-task">'+presenting+'%</span>'+
			                         ' <span class="title-task">'+(data[i].title+' '+'')+'</span>'+
			                       ' </div>'+

			                    '<div  class="bg bg-primary" style="margin-left:'+padding+'px; width:'+width+'px; height:20px; ">'+
			                       ' <div  class="bar-block-task" style="width: 100%; height:100%; background:#f1f1f1;">'+
			                        ' 	<div class="progrest-task" style=" width:'+presenting+'%; height:100%; background:black;"></div>'+
			                        '</div>'+
			                   ' </div>'+
			                  '</a>';

			                  $($$(page.container).find('.view-task-block')).append(domtaskviewblock);
						}

					}
					$($$(page.container).find('#years_value')).html(yearslock);
					$($$(page.container).find('#on_pro')).html('On Progrest : '+(data.length-jobDone));
					$($$(page.container).find('#done')).html('Finished : '+jobDone);
					jobDone=0;




				}



				$($$(page.container).find('#button-year-next')).click(function(){
					yearslock=yearslock+1;
					buildSchedule(ex_data);


				});

				$($$(page.container).find('#button-year-back')).click(function(){
					yearslock=yearslock-1;
					buildSchedule(ex_data);


				});


				buildSchedule(data);
			// block load destroy
			$$(page.container).find('.block-load').css('display','none');


		}
	})

});
