var domain='http://energipro.id:3000/';
var server= domain+'mobile';



var projectId_for_left_panel=0;


function pullRefresh(page,view){
var ptrContent = $$(page.container).find('.pull-to-refresh-content');
 
ptrContent.on('ptr:refresh', function (e) {
	view.router.refreshPage();

});
}


function projectVocus(query){
	if((query.projectId==undefined)||(query.projectId=='[#projectId]')){
		projectId=projectId_for_left_panel;
	}
	else{
		projectId=query.projectId;
		projectId_for_left_panel=query.projectId;
	}

	return projectId;
}



function validateInput(class_dom,page){

	var return_var;
	var data=$$(page.container).find('.'+class_dom);

	for(var i in data){
			if(i<data.length){
				console.log($$(data[i]).val());
				if($(data[i]).val()!=''){
					var type=$(data[i]).attr('type');
				
					if(type=='email'){
			  			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
						return_var= re.test($$(data[i]).val());
					
						if(!re.test($(data[i]).val())){
							$(data[i]).notify('mail not valid','info');
							return_var=false
							
						}
						
					}
					else if(type=='password'){
						if($(data[i]).val().length<8){
							$(data[i]).notify('min 8 character','info');
							return_var=false
									

						}
					}

					else if(type=='username'){
						if($(data[i]).val().length<8){
							$(data[i]).notify('min 8','info');
							return_var=false;
										
						}
					}	

				}else{
					$(data[i]).notify('fill first','info');
					return_var=false;
						
				}


			}
	}
	
		if(return_var!=false){
			return true;
		}
		else{
			return false
		}


}



function buildMonay(data){
	var index=0;
	var result='';
	var data=data.toString();
	for(var i=(data.length-1);-1<i;i--){
		index=index+1;
		if(index>3){
			index=1;
		result=data[i]+"."+result;
		}else{
		result=data[i]+result;
		}

	}
	return result;
}



// function library

function createTokenId(data){

	data['notiv_social']='';
	data['notiv_project']='';
	console.log(data);

	var data_auth=JSON.stringify(data);
    function ch(){
	    try {
	        localStorage.gaa_auth_mobile;
	        return true;
	    } catch(e) {
	        return false;
	    }
	}

	if(ch()===true){
		localStorage.setItem('gaa_auth_mobile',data_auth);
	}
	else{
		
		localStorage.setItem('gaa_auth_mobile',data_auth);
	}


}



function getTokenId(page_data){

	function ch(){
	    if(localStorage.gaa_auth_mobile!=undefined){
	    	return true;
	    }else{
	    	return false;
	    }
	      
	}
	// console.log(page_data);
	if(ch()===true){
		var idL,tokenL,auth=localStorage.gaa_auth_mobile;
		auth=JSON.parse(auth);
		// console.log(auth);
		if((auth.token==null)&&(auth.id==null)){
			idL=null;
			tokenL=null;
		}else{
			idL=auth.id;
			tokenL=auth.token;
		}
		// console.log({id:idL,token:tokenL});
		return {id:idL,token:tokenL};
	}else{
		if('login'!=page_data.name){
			window.location='auth.html';
		}
	}
	
}


function getTokenIdAll(){

	
	function ch(){
	    if(localStorage.gaa_auth_mobile!=undefined){
	    	return true;
	    }else{
	    	return false;
	    }
	      
	}
	if(ch()===true){
		var idL,tokenL,auth=localStorage.gaa_auth_mobile;
		auth=JSON.parse(auth);
		// console.log(auth);
	
		return auth;
	}else{
		if(((domain+'/login')!=location.href)&&((domain+'/login/')!=domain+'/login/')){
						window.location= domain+'/login/';
		}
		return null;
	}
	
}

function panelmenu(){
       $$('.open-left-panel').on('click', function (e) {
         // 'left' position to open Left panel

         myApp.openPanel('left');
     });

  
}

function panelLink(link){
 viewHome.router.loadPage(link);
 myApp.closePanel('left');
}



function checkToken(page){
	var auth=getTokenId(page);
	$.post(server+'/token/',{auth:auth},function(data){

		if(data.signal_err!=undefined){
		
			if(page.name=='login'){

			}else if(page.name=='register'){

			}else{
				console.log('sini ni');
				window.location= 'auth.html';
			}
		}
		else{
			
		}

	})


}