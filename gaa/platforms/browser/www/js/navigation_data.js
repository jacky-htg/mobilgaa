// build data untuk urutan navigasi yang kemudia di create di chace memory


// model data navigasi
var navigation_data={
	last_page:{
		home:'index.html',
		notification:null,
		profile:null,
		option:null
	},
	home:{
		project:{
			id:null,
			youAreIs:null,
			pictureId:null,
			panel:{
				folderDesign:{
					id:null,
					attchFileId:null
				},
				timeSchedule:{
					taskId:null,
					subtaskId:null
				},
				pojectUpdate:{
					pictureId:null	
				}
			}
		},
		social:{
			userId:null,
			pictureId:null
		}
	},
	profile:{
		pictureId:null
	}	
}


// function untuk mengambil data navigation dan create/update
function dataNav($data) {

	if($data==undefined){
		return navigation_data;
	}else{
		navigation_data=$data;
	}	
}