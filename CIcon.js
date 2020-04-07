//Leaflet-CIcon
//Icon class with a character
//Teluhiko Hilano
//teluhiko@hilano.org

//This code uses ECMA5 feature, especially template literal,
// let keyword is used for the declaration of variables.

// icon shape is made by SVG as well as leaflet svg-icon liblary.
//functions(methods) names are borrowed leaflet icon
L.Icon.CIcon = L.Icon.extend({
    initialize:function(options){
        const myOptions = {//defaults for CIcon
						"common": {
                "className":    "character-icon",
            },
            "pin":{
						    "iconSize"      :L.point([26,36]),
                "fill"          : "hsl(0,100%,50%)",
                "fill-opacity"  : 1,
                "stroke"        : "hsl(0,0%,0%)",
                "stroke-width"  : 1,
                "stroke-opacity": 1,
                "text"          : "U+1f606",
                "font-color"    : "hsl(0,0%,0%)",
                "font-size"     : 12,
								"font-ypos"     : 1.8,
								"createImage"   : this.createPin,
								//only reference to the function here.
								//Hence, we need to bind "this" to this function 
                "iconAnchor"    : "middle-bottom"
            },
            "flag":{
						    "iconSize"      : L.point([26,36]),
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
								"createImage"   : this.createFlag,
                "iconAnchor"    : "left-bottom"
            },
						"balloon":{
						    "iconSize"      : L.point([28,42]),
								"b-text"        : '&#x1F388;',
								"text"          : "",
                "font-size"     : 12,
								"font-xpos"     : 0.4,
								"font-ypos"     : 0.75,
								"createImage"   : this.createBalloon,
								"iconAnchor"    : "right-bottom"
						}
        };
				//set given option values
        this.options = L.Util.setOptions(this, this.options.commom);
        this.options = L.Util.setOptions(this, options);
				if(!this.options.type) this.options.type = "pin";
        //set default values not given by options
				let typeD = myOptions[this.options.type];
        Object.keys(typeD).forEach((key)=>{
            if(!this.options[key]) this.options[key] = typeD[key];
        });
        this.options.text = this._toHTMLEntity(this.options.text);
        //set the default value of anchor point of the icon(middle bottom)
        // if not given
        if(typeof this.options.iconAnchor === "string") {
						let pos = this.options.iconAnchor.split("-");//console.log(pos);
						let mgn = this.options["stroke-width"]?
								(this.options["stroke-width"]-0 + 1):0;
						let x = (pos[0] === "middle") ?this.options.iconSize.x/2:
                (pos[0] === "left")? (mgn+1):(this.options.iconSize.x-mgn);
						let y = (pos[1] === "middle") ?this.options.iconSize.y/2:
                (pos[1] === "top") ? (mgn+1):(this.options.iconSize.y-mgn);
            this.options.iconAnchor = L.point(x,y);
        }
				//Refer to above comment at "createImage" property of "pin"
				this.options.createImage.bind(this);
    },
    createIcon: function (oldIcon) {
        return this._createIcon2('icon', oldIcon);
    },
    _createIcon2: function (name, oldIcon) {
        let img = this.options.createImage.call(this);
        this._setIconStyles(img, name);

        return img;
    },
    createPin: function(){
        let h   = this.options.iconSize.y - 0;
        let w   = this.options.iconSize.x - 0;
        let wt  = this.options['stroke-width'] - 0;
        let mgn = wt + 2;
        let mW  = w - 2*mgn, mH = h - 2*mgn;

        let r = mW/2, mX = w/2;
        let startP = `M ${mX} ${mH + mgn} `;//start point (middle bottom)
        let sin = r/(mH - r), cos = Math.sqrt(1 - sin*sin);
        //the right point of tangent line and the circle
        let rCBP1X = mX + r*cos, rCBP1Y = mX + r*sin;
        let rCBP1  = ` ${rCBP1X} ${rCBP1Y} `;
        let QBPX   = mX + mH*sin/cos, QBPY   = mgn;
        let s = 0.54, t = 1 - s;
        // make svg path by cubic bezier curves and lines
        let rCBP2X =rCBP1X*t + QBPX*s;
        let rCBP2Y = rCBP1Y*t + QBPY*s;
        let rCBP2  = `C ${rCBP2X} ${rCBP2Y} `;
        let rCBP3  = `${mX*t + QBPX*s} ${mgn} `;
        let rCBP4  = `${mX} ${mgn} `;
        let lCBP2  = `S ${(mX - r*cos)*t + (mX - mH*sin/cos)*s} ${rCBP2Y} `;
        let d = startP + rCBP1 + rCBP2 + rCBP3 + rCBP4 +
                lCBP2 + (mX - r*cos) + " " + rCBP1Y ;
				return this._makeSrc(
						this._createSVG(w,h) + this._createPath(d) +
						this._createText(mX,r*this.options['font-ypos'],
														 this.options.text,this.options['font-size'])
				);
    },
		createFlag: function(){
        let h   = this.options.iconSize.y - 0;
        let w   = this.options.iconSize.x - 0;
        let wt  = this.options['stroke-width'] - 0;
        let ratio  = this.options['ratio'] - 0;
        let mgn = wt + 2;
        let mW  = w - 2*mgn, mH = h - 2*mgn;

        let mX = w/2;
        let d = `M${mgn} ${mH+mgn} l0 ${-mH} l${mW} 0 l0 ${mH*ratio} l${-mW} 0`; 
				return this._makeSrc(
						this._createSVG(w,h) + this._createPath(d) +
						this._createText(mX,h, this.options.text, this.options['font-size']));
		},
		createBalloon:function(){
        let h   = this.options.iconSize.y - 0;
        let w   = this.options.iconSize.x - 0;
        let wt  = this.options['stroke-width'] - 0;
        let xPos = w * this.options['font-xpos'];
        let yPos = h * this.options['font-ypos'];
				let fontSize = this.options['font-size'];
        let mgn = wt + 2;
        let mW  = w - 2*mgn, mH = h - 2*mgn;

        let mX = w/2;
				return this._makeSrc(
						this._createSVG(w,h)+
						this._createText(mX,h,this._toHTMLEntity(this.options['b-text']), w)+
						this._createText(xPos,yPos,this.options.text, fontSize));
		},
		//image source is embedded in src attribute of img element
		//(the data type is "data" and image is BASE 64 encoded)
		//Unicode Emoji page
		//(https://unicode.org/emoji/charts/full-emoji-list.html)
		//uses this method to show emoji's variations of vendors.
		_makeSrc: function(svg){
//				console.log(svg);
        let el = document.createElement('img');
        el.src =
						`data:image/svg+xml;charset=UTF-8;base64,${btoa(svg +'</svg>')}`;
        return el;
		},				
		_createSVG: function(w,h){
				return '<?xml version="1.0" encoding="UTF-8" ?>'+
      `<svg xmlns="http://www.w3.org/2000/svg" height="${h}px" width="${w}px">`;
		},
		_createPath : function(d){
				return '<path ' +
            ["fill","stroke","stroke-width","fill-opacity","stroke-opacity"].
            map((x)=>{return `${x}="${this.options[x]}"`}).join(" ") +
						` d="${d}z"/>`;
		},
		_createText : function(mX , h, ch, fontSize) {
				return `<text x="${mX}" y="${h}" ` +
            'text-anchor="middle" dominant-baseline="alphabetic" '+
            `font-size="${fontSize}px" ` +
            `fill="${this.options['font-color']}" >${ch}</text>`;
		},
    //change the UTF code point of the first character 
    //or number to HTML entity(Hex value)
		_toHTMLEntity :function(t) {
        if(typeof t === "number") {
						// a negative value means to show the absolute value
            t = (t<0)?(-t).toString():`&#x${t.toString(16)};`;
        } else {//console.log(t);
            switch(t.substr(0,2)){
						case "":
								break;
						case "&#"://already to be changed in HTML entity. Does not change.
								break;
						case "U+"://change unicode to HTML entity
						case "u+":
                t = `&#x${t.substr(2)};`;
								break;
						default://change the first character to HTML entity. 
                t = `&#x${t.codePointAt(0).toString(16)};`;
								break;
            }
				}
				return t;
		}				
});

L.icon.cIcon = function(options){ return new L.Icon.CIcon(options);};
