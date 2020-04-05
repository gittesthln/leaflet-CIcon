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
let letters =["&#x1f640;","U+1f641",0x1f642,"A","B",-1,-2,-3];
		let points =[], markers = [];
		let fig = L.polygon(points,
												{color:"hsla(0,100%,0%,50%)", weight:3,
												 fillColor:"hsla(0,100%,50%"}).addTo(map);
		map.on("click",function(e){
				setLatLng(e.latlng);
				points.push(e.latlng);
				fig.setLatLngs(points);
				let m = L.marker(e.latlng,
												 {icon:	L.icon.cIcon({"text":letters[markers.length],
																						iconSize:L.point([30,50]),
																							"stroke-width":2,
																							"fill-opacity":1,
																							"fill": "hsl(180,100%,80%)",
																							"type":"pin",
																							"font-color":"black"}),
													draggable:true
												 });
				markers.push(m);
				m.No=markers.length-1;
				m.bindTooltip(`<div>${m.No}</div><div>Lat ${add0(e.latlng.lat)}</div>`
											+`<div>Lon${add0(e.latlng.lng)}</div>`).addTo(map);
				m.on("move",function(e){
//						console.log(e.originalEvent.ctrlKey);
						let N = e.target.No;
						setLatLng(e.latlng);
						points[N] = e.latlng;
						markers[N].bindTooltip(
								`<div>${N}</div><div>Lat ${add0(e.latlng.lat)}</div>`
											+`<div>Lon ${add0(e.latlng.lng)}</div>`)								
						fig.setLatLngs(points);
				});

    });
}
function setLatLng(LatLng) {
    document.getElementById("Lat").value = add0(LatLng.lat);
    document.getElementById("Lng").value = add0(LatLng.lng);
}
function add0(V) {
    var V2 = (`${V}`).split(".");
    V2[1] = (V2[1] + "000000").substr(0,6);
  return V2.join("."); 
}
