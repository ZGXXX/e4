window.onload=function(){

	waterfall('main','box');
	var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
	
	window.onscroll=function(){
		if(checkscrollside()){
			var oParent=document.getElementById('main');
			//将数据块渲染到页面尾部
			for(var i=0;i<dataInt.data.length;i++){
				var oBox=document.createElement('div');
				oBox.className='box';
				oParent.appendChild(oBox);
				var oPic=document.createElement('div');
				oPic.className='pic';
				oBox.appendChild(oPic);
				var oImg=document.createElement('img');
				oImg.src='./images/'+dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main','box');
		};
	}
}

function waterfall(parent,box){
	//将main下的所有class为box的元素取出来
	var oParent =document.getElementById(parent);
	var oBoxs=getByClass(oParent,box);
	//计算整个页面显示的列数（页面宽/box宽）
	var oBoxW=oBoxs[0].offsetWidth;
	var cols=Math.floor(document.documentElement.clientWidth/oBoxW);
	//设置main宽度
	oParent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto';
	var hArr=[];  //存放每一列元素的高度
	for(var i=0;i<oBoxs.length;i++){
		var boxH=oBoxs[i].offsetHeight;

		if(i<cols){
			// hArr.push(oBoxs[i].offsetHeight);
			hArr[i]=boxH; 
		}else{
			var minH=Math.min.apply(null,hArr);
		    var index=getMinhIndex(hArr,minH);
		    oBoxs[i].style.position='absolute';
		    oBoxs[i].style.top=minH+'px';
		    oBoxs[i].style.left=index*oBoxW+'px';
		    hArr[index]+=oBoxs[i].offsetHeight;
		}
	}

}	

//根据class获取元素
function getByClass(parent,clsName){
	var boxArr=[];//用来存储获取到的所有class为box的元素
		oElements=parent.getElementsByTagName('*')
	for(var i=0;i<oElements.length;i++){
		if(oElements[i].className==clsName){
			boxArr.push(oElements[i]);
		}
	}	
	return boxArr;
}

function getMinhIndex(arr,val){
	for(var i in arr){
		if(arr[i]== val){
			return i;
		}
	}
}
//检测是否具备滚动加载数据块的条件
function checkscrollside(){
	var oParent =document.getElementById('main');
	var oBoxs=getByClass(oParent,'box');
	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor((oBoxs[oBoxs.length-1]).offsetHeight/2);
	var scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
	var height =document.body.clientHeight ||document.documentElement.clientHeight;
	return (lastBoxH<scrollTop+height)?true:false;
	console.log(lastBoxH);
	console.log(scrollTop+height);
}