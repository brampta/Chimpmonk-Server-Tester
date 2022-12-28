


var retest_time = 5000; //the server is tested every retest_time milliseconds (every retest_time/1000 seconds)
var speakspeed = 500; //taling speed (for error codes), the lower the number the faster the talking

var test_url = "xmltest.xml"; //version that tests only web server, not DB
if(test_DB==1)
{test_url = "xmltest.php";} //version that tests both web server and DB!

var volumes = new Array();
volumes['good'] = null;
volumes['bad'] = null;
volumes['other'] = null;
function get_volumes(){

	for (let key in volumes) {
		if (volumes.hasOwnProperty(key)) {
			//console.log(key, volumes[key]);
			let vol_id = 'vol_' + key;
			//console.log('vol_id',vol_id);
			let input = document.getElementById(vol_id);
			let value = input.value;
			volumes[key] = value;
		}
	}
}
get_volumes();

$( ".vol" ).change(function() {
	let prefix_to_remove = 'id_';
	let vol_name = this.id.substr(prefix_to_remove.length+1);
	//console.log('vol_name',vol_name);
	volumes[vol_name] = this.value;
});

function makesound(elsound)
{
	// var myFlashMovie = document.simpleBroadcaster;
	// myFlashMovie.playsound_js(elsound);

	//console.log('elsound',elsound);
	let prefix_to_remove = 'sound_';
	let sound_name = elsound.substr(prefix_to_remove.length);
	let sound_volume = volumes['other'];
	//console.log('sound_name',sound_name);
	let sound_has_volume = volumes.hasOwnProperty(sound_name);
	//console.log('sound_has_volume',sound_has_volume);
	if(sound_has_volume){
		sound_volume = volumes[sound_name];
	}
	//console.log('sound_volume',sound_volume);

	let prefix_to_add = 'sounds/';
	let suffix_to_add = '.mp3';
	let sound_file_name = prefix_to_add + sound_name + suffix_to_add;
	//console.log('playing file',sound_file_name);
	let audio = new Audio(sound_file_name);
	audio.volume = sound_volume;
	audio.play();
}


var t=setTimeout("test()",retest_time);


var safety;
var safety_time = 120000;
function timedout()
{
	makesound('sound_serveur');                
	var gab1=setTimeout("makesound('sound_1');",speakspeed);
	var gab2=setTimeout("makesound('sound_timeout');",speakspeed*2);
	clearTimeout(t);
	t=setTimeout("test()",retest_time);
}


function test()
{
	loadpage();
	clearTimeout(safety);
	safety=setTimeout("timedout()",safety_time);
}





function loadpage()
{
	var ts = Math.round((new Date()).getTime() / 1000);
	var useurl = test_url+"?ts=" + ts + "&rand=" + Math.random();
	//window.open(useurl);
	loadXMLDoc3(useurl);
}

var req3;
function loadXMLDoc3(url) 
{
	if (window.XMLHttpRequest)
	{
		// branch for native XMLHttpRequest object
		req3 = new XMLHttpRequest();
		req3.onreadystatechange = processReqChange3;
		req3.open("GET", url, true);
		req3.send(null);
	}
	else if (window.ActiveXObject)
	{
		// branch for IE/Windows ActiveX version
		req3 = new ActiveXObject("Microsoft.XMLHTTP");
		if (req3)
		{
			req3.onreadystatechange = processReqChange3;
			req3.open("GET", url, true);
			req3.send();
		}
	}
}

var countbadsinarow = 0;
function processReqChange3() 
{
	if (req3.readyState == 4)
	{
		if (req3.status == 200)
		{
			response = req3.responseXML.documentElement;
            var result = response.getElementsByTagName("result")[0].firstChild.data;
            var howmanyinprocesslist = response.getElementsByTagName("howmanyinprocesslist")[0].firstChild.data;
            if(result == "ok")
			{
				//all is good! happy chipmunk!!
				countbadsinarow = 0;
				makesound('sound_good');
				
				if(max_items_in_processlist!=0 && howmanyinprocesslist>max_items_in_processlist)
				{
					//good but accumulation in the DB
					
					var gab1=setTimeout("makesound('sound_serveur');",speakspeed);
					var gab1=setTimeout("makesound('sound_"+server_number+"');",speakspeed*2);
					var gab1=setTimeout("makesound('sound_database');",speakspeed*2.7);
					var gab1=setTimeout("makesound('sound_processlist');",speakspeed*4);
					
					//say the number of items in DB!!
					if(howmanyinprocesslist<10)
					{
						var gab1=setTimeout("makesound('sound_"+howmanyinprocesslist.substr(0,1)+"');",speakspeed*6);
						var gab1=setTimeout("makesound('sound_items');",speakspeed*7);
					}
					else if(howmanyinprocesslist<100)
					{
						var gab1=setTimeout("makesound('sound_"+howmanyinprocesslist.substr(0,1)+"');",speakspeed*6);
						var gab1=setTimeout("makesound('sound_"+howmanyinprocesslist.substr(1,1)+"');",speakspeed*7);
						var gab1=setTimeout("makesound('sound_items');",speakspeed*8);
					}
					else if(howmanyinprocesslist<1000)
					{
						var gab1=setTimeout("makesound('sound_"+howmanyinprocesslist.substr(0,1)+"');",speakspeed*6);
						var gab1=setTimeout("makesound('sound_"+howmanyinprocesslist.substr(1,1)+"');",speakspeed*7);
						var gab1=setTimeout("makesound('sound_"+howmanyinprocesslist.substr(2,1)+"');",speakspeed*8);
						var gab1=setTimeout("makesound('sound_items');",speakspeed*9);
					}
					else
					{
						var gab1=setTimeout("makesound('sound_"+howmanyinprocesslist.substr(0,1)+"');",speakspeed*6);
						var gab1=setTimeout("makesound('sound_"+howmanyinprocesslist.substr(1,1)+"');",speakspeed*7);
						var gab1=setTimeout("makesound('sound_"+howmanyinprocesslist.substr(2,1)+"');",speakspeed*8);
						var gab1=setTimeout("makesound('sound_"+howmanyinprocesslist.substr(3,1)+"');",speakspeed*9);
						var gab1=setTimeout("makesound('sound_items');",speakspeed*10);
					}
					
					

				}
			}
			else if(result == "DB error")
			{
				//web server up but DB down! (or temporarily paralysed by congestion)
				
				countbadsinarow++;
				
				if(countbadsinarow>=alarm_after_how_many_bad_connections)
				{makesound('sound_bad');}
				
				var gab1=setTimeout("makesound('sound_serveur');",speakspeed);
				var gab1=setTimeout("makesound('sound_"+server_number+"');",speakspeed*2);
				var gab1=setTimeout("makesound('sound_database');",speakspeed*2.7);
				var gab1=setTimeout("makesound('sound_down');",speakspeed*4);
			}
		}
		else
		{
			//web server down!!
			
			countbadsinarow++;
		
			var codeinstring = req3.status.toString();   
		
			if(countbadsinarow>=3)
			{makesound('sound_bad');}
	
			document.getElementById("problogs").innerHTML = document.getElementById("problogs").innerHTML + "status:" + req3.status + " ";
		
			var gab1=setTimeout("makesound('sound_serveur');",speakspeed);
			var gab1=setTimeout("makesound('sound_"+server_number+"');",speakspeed*2);
			var gab1=setTimeout("makesound('sound_code');",speakspeed*3);
						 
			var splodedcode = codeinstring.split("");
			var temposs = speakspeed*4;
			var gab333=new Array();
			for(x in splodedcode)
			{                       
				var dostring="makesound('sound_"+ splodedcode[x] +"');";
				gab333[temposs]=setTimeout(dostring,temposs);
				temposs=temposs+speakspeed;
			}
		
		
		}
	
	
	
		
		
		t=setTimeout("test()",retest_time);
	}
}




