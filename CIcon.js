//Leaflet-CIcon
//Icon class with a character
//Teluhiko Hilano
//teluhiko@hilano.org

//This code uses ECMA5 feature, especially template literal,
// let keyword is used for the declaration of variables.

// icon shape is made by SVG as well as leaflet svg-icon liblary.
// Functions initialize and createIcon are neccesary because of
// inheritance of leaflet icon

L.Icon.CIcon = L.Icon.extend({
    initialize:function(){
        //set given option values
        this.options = L.Util.setOptions(this, {"className": "character-icon"});
    },
    createIcon: function (oldIcon) {
        return this._createIcon2('icon', oldIcon);
    },
    _createIcon2: function (name, oldIcon) {
        let img = this.options.createImage.call(this);
        this._setIconStyles(img, name);
        return img;
    },
    //image source is embedded in src attribute of img element
    //(the data type is "data" and image is BASE 64 encoded)
    //Unicode Emoji page
    //(https://unicode.org/emoji/charts/full-emoji-list.html)
    //uses this method to show emoji's variations of vendors.
    _makeSrc: function(svg){
        svg = svg +'</svg>';
        //if you want to check svg code, comment out the next line 
        //and open the debuggin tools(F12 or cntl+shift+I in windows).
        //You find it in console tab.
        //        console.log(svg); 
        let el = document.createElement('img');
        el.src =
            `data:image/svg+xml;charset=UTF-8;base64,${btoa(svg)}`;
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
            ` d="${d}"/>`;
    },
    _createText : function(x , y, c, size) {
        let text = this._toHTMLEntity(c);
        return `<text x="${x}" y="${y}" ` +
            'text-anchor="middle" dominant-baseline="alphabetic" '+
            `font-size="${size}px" ` +
            `fill="${this.options['font-color']}" >${text}</text>`;
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
    },
    _toAnchor: function(anchor) {
        let newAnchor = anchor;
        if(typeof anchor === "string") {
            let pos = anchor.split("-");//console.log(pos);
            let mgn = this.options["stroke-width"]?
                (this.options["stroke-width"]-0 + 1):0;
            let x = (pos[0] === "middle") ?this.options.iconSize.x/2:
                (pos[0] === "left")? (mgn+1):(this.options.iconSize.x-mgn);
            let y = (pos[1] === "middle") ?this.options.iconSize.y/2:
                (pos[1] === "top") ? (mgn+1):(this.options.iconSize.y-mgn);
            newAnchor = L.point(x,y);
        }
        return newAnchor;
    },
});

L.icon.cIcon = function(){ return new L.Icon.CIcon();};
L.Icon.CIcon.pin = L.Icon.CIcon.extend({
    initialize: function(options){
        //set dafault parameters
        this.options = L.Util.setOptions(this,{
                "iconSize"      :L.point([26,36]),
                "fill"          : "hsl(0,100%,50%)",
                "fill-opacity"  : 1,
                "stroke"        : "hsl(0,0%,0%)",
                "stroke-width"  : 1,
                "stroke-opacity": 1,
                "text"          : "U+1f604",
                "font-color"    : "hsl(0,0%,0%)",
                "font-size"     : 16,
                "font-ypos"     : 1.5,
                "createImage"   : this.createPin,
                "iconAnchor"    : "middle-bottom"
        });
        //change parameters to given value(s).
        this.options = L.Util.setOptions(this, options);
        //only reference to the function here.
        //Hence, we must bind "this" to this function 
        this.options.createImage.bind(this);
        this.options.iconAnchor = this._toAnchor(this.options.iconAnchor);
    },
    createPin: function(){
        let H   = this.options.iconSize.y - 0;
        let W   = this.options.iconSize.x - 0;
        let wt  = this.options['stroke-width'] - 0;
        let mgn = wt + 1;
        let w  = W - 2*mgn, h = H - 2*mgn;

        let r = w/2, x = W/2;
        let startP = `M ${x} ${h + mgn} `;//start point (middle bottom)
        let sin = r/(h - r), cos = Math.sqrt(1 - sin*sin);
        //the right point of tangent line and the circle
				let PR = `${x + r*cos} ${x + r*sin} `;
				let PL = `${x - r*cos} ${x + r*sin} `;
				let d = startP + PR + `A ${r} ${r} 0 1 0 `+ PL +'z';
        let svg =  this._createSVG(W,H) + this._createPath(d) +
            this._createText(x,r*this.options['font-ypos'] + mgn,
                             this.options.text,this.options['font-size']);
//				console.log(svg);
        return this._makeSrc(svg);
    }
});

L.icon.cIcon.pin = function(options){return new L.Icon.CIcon.pin(options);};
                                     
L.Icon.CIcon.flag = L.Icon.CIcon.extend({
    initialize: function(options){
        //set dafault parameters
        this.options = L.Util.setOptions(this,{
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
        }),
        //change parameters to given value(s).
        this.options = L.Util.setOptions(this, options);
        //only reference to the function here.
        //Hence, we need to bind "this" to this function 
        this.options.createImage.bind(this);
        this.options.iconAnchor = this._toAnchor(this.options.iconAnchor);
    },
    createFlag: function(){
        let H   = this.options.iconSize.y - 0;
        let W   = this.options.iconSize.x - 0;
        let wt  = this.options['stroke-width'] - 0;
        let ratio  = this.options['ratio'] - 0;
        let mgn = wt + 1;
        let w  = W - 2*mgn, h = H - 2*mgn;

        let x = W/2;
        let d = `M${mgn} ${h+mgn} l0 ${-h} l${w} 0 l0 ${h*ratio} l${-w} 0z`; 
        return this._makeSrc(
            this._createSVG(W,H) + this._createPath(d) +
            this._createText(x,h*this.options['font-ypos'] + mgn,
                             this.options.text, this.options['font-size']));
    }
});
                                         
L.icon.cIcon.flag = function(options){return new L.Icon.CIcon.flag(options);}

L.Icon.CIcon.balloon = L.Icon.CIcon.extend({
    initialize: function(options){
        //set dafault parameters
        this.options = L.Util.setOptions(this,{
            "iconSize": [30,30],
            "b-text": "&#x1F388;",
            "text": "1",
            "font-size": 12,
            "font-xpos": 0.4,
            "font-ypos": 0.5,
            "createImage"   : this.createBalloon,
            "iconAnchor": [26,30]
        });
        //change parameters to given value(s).
        this.options = L.Util.setOptions(this, options);
        //only reference to the function here.
        //Hence, we need to bind "this" to this function 
        this.options.createImage.bind(this);
        this.options.iconAnchor = this._toAnchor(this.options.iconAnchor);
    },
    createBalloon:function(){
        let H   = this.options.iconSize.y - 0;
        let W   = this.options.iconSize.x - 0;
        let xPos = W * this.options['font-xpos'];
        let yPos = H * this.options['font-ypos'];
        let fontSize = this.options['font-size'];
        let mgn = 2;
        let w  = W - 2*mgn, h = H - 2*mgn;

        let x = W/2;
        return this._makeSrc(
            this._createSVG(W,H)+
            this._createText(x,h,this._toHTMLEntity(this.options['b-text']), w)+
            this._createText(xPos,yPos,this.options.text, fontSize));
    }
});

L.icon.cIcon.balloon = function(options){return new L.Icon.CIcon.balloon(options);}
