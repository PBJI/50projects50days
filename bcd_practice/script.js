//class: outer-con   row-wise    btn   
//id: choice1    choice2     choice3     reset    ran_num    show_time  swtich


function getRandomInt(maxi) {
  return Math.floor(Math.random() * maxi);
}

var binary_to_bcd = {
	'0000': '0',
	'0001': '1',
	'0010': '2',
	'0011': '3',
	'0100': '4',
	'0101': '5',
	'0110': '6',
	'0111': '7',
	'1000': '8',
	'1001': '9',
	'1010': 'A',
	'1011': 'B',
	'1100': 'C',
	'1101': 'D',
	'1110': 'E',
	'1111': 'F'
}

var bcd_to_binary = {
	'0':'0000' ,
	'1':'0001' ,
	'2':'0010' ,
	'3':'0011' ,
	'4':'0100' ,
	'5':'0101' ,
	'6':'0110' ,
	'7':'0111' ,
	'8':'1000' ,
	'9':'1001' ,
	'A':'1010' ,
	'B':'1011' ,
	'C':'1100' ,
	'D':'1101' ,
	'E':'1110' ,
	'F':'1111'
}

var hex = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];

var encode = true;

var options = ['choice1', 'choice2', 'choice3'];

var startTime;
var endTime;

var prevTime=1;
var curTime=0;

function startGame(){}

document.getElementById("reset").addEventListener('click', startGame());

function startGame() {
	if(encode) {
		var i=0
		while(document.getElementsByClassName('row-wise')[i]) {
			document.getElementsByClassName('row-wise')[i].style.animation = "";
			document.getElementById('ran_num').style.animation = "";
			document.getElementsByTagName('body')[0].style.animation = "";
			i++;
		}
		var len = hex.length;
		var ranGen0 = hex[getRandomInt(len)];
		document.getElementById("ran_num").innerHTML = bcd_to_binary[ranGen0];
		var ranGen1 = hex[getRandomInt(len)];
		var ranGen2 = hex[getRandomInt(len)];
		var ranGen3 = hex[getRandomInt(3)];
		if(ranGen3==0) {
			document.getElementById('choice1').innerText = ranGen0;
			document.getElementById('choice2').innerText = ranGen1;
			document.getElementById('choice3').innerText = ranGen2;
			document.getElementById('choice1').addEventListener('click', function(){checkAns(ranGen0, ranGen0)});
			document.getElementById('choice2').addEventListener('click', function(){checkAns(ranGen1, ranGen0)});
			document.getElementById('choice3').addEventListener('click', function(){checkAns(ranGen2, ranGen0)});
		}
		else if(ranGen3==1){
			document.getElementById('choice2').innerText = ranGen0;
			document.getElementById('choice1').innerText = ranGen1;
			document.getElementById('choice3').innerText = ranGen2;
			document.getElementById('choice2').addEventListener('click', function(){checkAns(ranGen0, ranGen0)});
			document.getElementById('choice1').addEventListener('click', function(){checkAns(ranGen1, ranGen0)});
			document.getElementById('choice3').addEventListener('click', function(){checkAns(ranGen2, ranGen0)});
		}
		else {
			document.getElementById('choice2').innerText = ranGen0;
			document.getElementById('choice3').innerText = ranGen1;
			document.getElementById('choice1').innerText = ranGen2;
			document.getElementById('choice2').addEventListener('click', function(){checkAns(ranGen0, ranGen0)});
			document.getElementById('choice3').addEventListener('click', function(){checkAns(ranGen1, ranGen0)});
			document.getElementById('choice1').addEventListener('click', function(){checkAns(ranGen2, ranGen0)});
		}
		startTime = performance.now();
	}
	else {
	}
}

function checkAns(text, ans){
	var old_element = document.getElementById("choice1");
	var new_element = old_element.cloneNode(true);
	old_element.parentNode.replaceChild(new_element, old_element);
	old_element = document.getElementById("choice2");
	new_element = old_element.cloneNode(true);
	old_element.parentNode.replaceChild(new_element, old_element);
	old_element = document.getElementById("choice3");
	new_element = old_element.cloneNode(true);
	old_element.parentNode.replaceChild(new_element, old_element);
	if(text == ans) {
		endTime = performance.now();
		prevTime = curTime;
		curTime = ((endTime - startTime) + prevTime) / 2;
		var i=0;
		while(document.getElementsByClassName('row-wise')[i]) {
			document.getElementsByClassName('row-wise')[i].style.animation = "right 1s";
			document.getElementById('ran_num').style.animation = "right 1s";
			document.getElementsByTagName('body')[0].style.animation = "right 1s";
			i++;
		}
	}
	else {
		hex.push(text);
		hex.push(ans);
		endTime = performance.now();
		prevTime = curTime;
		curTime = ((endTime - startTime) + prevTime) / 2;
		var i=0;
		while(document.getElementsByClassName('row-wise')[i]) {
			document.getElementsByClassName('row-wise')[i].style.animation = "wrong 1s";
			document.getElementById('ran_num').style.animation = "wrong 1s";
			document.getElementsByTagName('body')[0].style.animation = "wrong 1s";
			i++;
		}
		curTime = curTime*1.50;
	}
	document.getElementById("show_time").innerText =  ((curTime / 1000).toFixed(2)).toString()+"s";
	setTimeout(startGame, 2000);
}