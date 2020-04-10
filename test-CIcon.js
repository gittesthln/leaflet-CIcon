let map;
window.onload = function(){
    map = L.map('map',{dragging:true});
		let center = [35.681,139.767];
    map.setView(center, 16);
    L.control.scale({maxWidth:200,position:'bottomright',imperial:false}).addTo(map);
    //open street map tile
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

    const myOptions = {//defaults for CIcon
        "pin":{
						"iconSize"      :[26,36],
            "fill"          : "hsl(0,100%,50%)",
            "fill-opacity"  : 1,
            "stroke"        : "hsl(0,0%,0%)",
            "stroke-width"  : 1,
            "stroke-opacity": 1,
            "text"          : "U+1f604",
            "font-color"    : "hsl(0,0%,0%)",
            "font-size"     : 16,
						"font-ypos"     : 1.5,
            "iconAnchor"    : ["middle","bottom"]
        },
        "flag":{
						"iconSize"      : [26,36],
            "fill"          : "hsl(0,100%,50%)",
            "fill-opacity"  : 1,
            "stroke"        : "hsl(0,0%,0%)",
            "stroke-width"  : 1,
            "stroke-opacity": 1,
            "text"          : "U+1f604",
            "font-color"    : "hsl(0,0%,0%)",
            "font-size"     : 12,
            "ratio"         : 0.6,
						"font-ypos"     : 0.45,
            "iconAnchor"    : ["left","bottom"]
        },
				"balloon":{
						"iconSize": [30,30],
						"b-text": "&#x1F388;",
						"text": "1",
						"font-size": 12,
						"font-xpos": 0.4,
						"font-ypos": 0.5,
						"iconAnchor": [26,30]
				}
    };
		let params = document.getElementById("params");
		let type   = document.getElementById("type");
		let img    = document.getElementById("img");
		let checked = true;
		let tbls = {};
		Object.keys(myOptions).forEach((t)=>{
				let div = createElement("div",{},type);
				let input = createElement("input",
																	{"name": "type","type":"radio", "value":t},
																	div);
				div.appendChild(document.createTextNode(t));
				let tbl = createElement("table",{"id": `p-${t}`}, params);
				tbls[`p-${t}`] = tbl;
				Object.keys(myOptions[t]).forEach((prop)=>{
						let tr = createElement("tr",{},tbl);
						let td = createElement("td",{},tr);
						td.appendChild(document.createTextNode(prop));
						td = createElement("td",{},tr);
						let input = createElement("input",
																			{"type": "text",
																			 "size":12,
																			 "value":`${myOptions[t][prop]}`},td);
				});
				if(checked) {
						input.checked = true;
						checked = false;
				} else {
						tbl.style.display = "none";
				}
		});
		type.addEventListener("change",(E)=>{
				let id = 'p-'+document.querySelector('#type input:checked').value;
				Object.keys(tbls).forEach((T)=>{//console.log(tbls[T])
						tbls[T].style.display = (id === T)?"block":"none";
				});
		});
		let markerNo = 0;
		let points =[];
		let fig = L.polygon(points,
												{color:"hsla(0,100%,0%,50%)", weight:3,
												 fillColor:"hsla(0,100%,50%"}).addTo(map);
		map.on("click",function(e){
				setLatLng(e.latlng);
				points.push(e.latlng);
				fig.setLatLngs(points);
				markerNo +=1;
				let iconOpt = {};
				let type = document.querySelector('input[type=radio]:checked').value;
				let trs = document.getElementById(`p-${type}`).
						getElementsByTagName("tr");
				Array.prototype.forEach.call(trs,(tr)=>{
						let name = tr.firstChild.firstChild.nodeValue;
						let val  = tr.children[1].firstChild.value;
						let vals;
						switch(name) {
						case "iconSize"      : //pin, flag, balloon
								//L.point
								vals = val.match(/(\d+),(\d+)/);
								val = vals?L.point(vals[1]-0,vals[2]-0):
										L.point(JSON.parse(myOption[type].iconSize));
								break;
						case "fill"          : //pin, flag
						case "stroke"        : //pin, flag
						case "font-color"    : //pin, flag
								//color name, #xxxxxx, hsl(hue,saturation,luminence)
								break;
						case "fill-opacity"  : //pin, flag
						case "stroke-opacity": //pin, flag
								// number between 0 and 1
								val = checkVal(val,0,1,1);
								break;
						case "stroke-width"  : //pin, flag
								// non-negative number
								break;
						case "text"          : //pin, flag, balloon
						case "b-text"        : //         , balloon
								// a character, HTML entity, number, Unicode code position(U+xxx)
								break;
						case "font-size"     : //pin, flag, balloon
								// non negative number
								val = checkVal(val,5,30,12);
								break;
						case "font-ypos"     : //pin, flag, balloon
								val = checkVal(val, 0, 20,1);
								break;
						case "iconAnchor"    : //pin, flag, balloon
								vals = val.match(/([+-]?\d+),([+-]?\d+)/);
								if(vals) {
										val = L.point(vals[1]-0,vals[2]-0);
								} else {
										vals = val.match(/(left|middle|right),(top|middle|bottom)/);
										val = val?val.replace(',','-'):
												L.point(JSON.parse(myOption[type].iconAnchor));
								}
								break;
						case "ratio"         : //   , flag
								val = checkVal(val, 0, 1, 0.5);
								break;
						case "font-xpos"     : //         , balloon
								val = checkVal(val, 0, 20,1);
								break;
						}
						iconOpt[name] = val;
				});
				document.getElementById("result").value = JSON.stringify(iconOpt, null,2);
				let m = L.marker(e.latlng,
												 {icon:	L.icon.cIcon[type](iconOpt),
													draggable:true
												 }).addTo(map);
				m.No = markerNo;
				m.bindTooltip(
						`<table><tr><td>${m.No}</td></tr><tr>` +
						`<td>Lat</td><td>${add0(e.latlng.lat)}</td></tr>` +
						`<td>Lon</td><td>${add0(e.latlng.lng)}</td></tr>`
				);
				m.on("move",function(e){
//						console.log(e.originalEvent.ctrlKey);
						let N = e.target.No;
						setLatLng(e.latlng);
						points[N-1] = e.latlng;
						m.bindTooltip(
								`<table><tr><td>${m.No}</td></tr><tr>` +
								`<td>Lat</td><td>${add0(e.latlng.lat)}</td></tr>` +
								`<td>Lon</td><td>${add0(e.latlng.lng)}</td></tr>`
						);
						fig.setLatLngs(points);
				});
				img.src = document.querySelectorAll("img.leaflet-marker-icon")[m.No-1].src;
    });
}
function setLatLng(LatLng) {
    document.getElementById("Lat").firstChild.nodeValue = add0(LatLng.lat);
    document.getElementById("Lng").firstChild.nodeValue = add0(LatLng.lng);
}
function add0(V) {
    let V2 = (`${V}`).split(".");
    V2[1] = (V2[1] + "000000").substr(0,6);
  return V2.join("."); 
}
function checkVal(val, min, max, defVal){
		let retVal;
		if(typeof val === "string") {
				if(val.match(/[+1]?(\d+\.?\d*)|(\d*\.?\d+)/)) {
						retVal = val-0;
						if(retVal <min || retVal> max) retVal = defVal;
				}
		} else {
				if(typeof val !== "number" || val <min || val> max) retVal = defVal;
		}
		return retVal;
}
function createElement(elm, attrib, p){
		let Elm = document.createElement(elm);
		setAttributes(Elm, attrib);
		if(p) p.appendChild(Elm);
		return Elm;
}
function setAttributes(elm, attrib){
		Object.keys(attrib).forEach((A)=>{ elm.setAttribute(A,attrib[A]);});
}
																			 
