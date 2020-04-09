# leaflet-CIcon
L.Icon.CIcon is simple and customizable marker icon using SVG image. We give a 3types of CIcon, pin, flag, and balloon. The first two types are made icon shape by SVG image.  the last one is intended to use Emoji character as icon's shape. All of them show a specified character or numbers over the icon shape.

## Requirements
- Leaflet 0.7+(earlier versions may work, but the sample program uses tooltip which is not supported 0.7.x)
- Browser support for SVG and ECMA2015(may be)

## Demo

See the follwing URL.

[Example] (http://www.hilano.org/leaflet-CIcon/test-CIcon.html)

This page enables to check what the parameters work.
When clicked on the map, a marker is set and clickable at the position and displays its position and icon image appears in the right to the map. The polygon is also displayed and change its shape by dragging the markers. Object notation of the icon's options appears in the bottom of the page. You may copy it and paste it your application to use your application.


## Usage
- Include the source file
````xml
<script type="text/javascript" src="CIcon.js"></script>
````
- Use a marker with a CIcon(this sample displays all parameters)
````js
 L.marker(L.point([35.681,139.767]),
     {icon:	L.icon.cIcon({
         "type": "pin",
         "iconSize": L.point([26,36]),
         "fill": "hsl(0,100%,50%)",
         "fill-opacity": 1,
         "stroke": "hsl(0,0%,0%)",
         "stroke-width": "1",
         "stroke-opacity": 1,
         "text": "U+1f604",
         "font-color": "hsl(0,0%,0%)",
         "font-size": 12,
         "font-ypos": 1.8, 
         "iconAnchor": "middle-bottom"
       })
     });
````

## Properties
### L.Icon.CIcon

Unspecified Icon optios are set to default values. You may not use this object usually.

|Option|Type|Default|Description|
|:------:|:----:|:-------:|-----------|
|className|String|"character-icon"|Class prefix to use for icon elements|
|type|String|"pin"|Specify icon's shape|"pin","flag",and "balloon" are defined|

We define 3 subclass, pin, flag, and balloon.

#### options for L.icon.cIcon.pin

Icon's image consists of an arc and tangent lines from anchor point.
The radius of the arc is determined by the icon's width and stroke-width.
The shape is drawed by cubic Bezier curve. 

|Option|Type|Default|Description|
|:------:|:----:|:-------:|-----------|
|iconSize|L.point|L.point([26,36])|size of icon|
|fill|String|"hsl(0,100%,50%)" (red)|fill color of icon's inner. Color description defined in SVG can be used(rgb(dd,dd,dd), color name,...|
|fill-opacity|Number|1| Opacity of icon's inner|
|stroke|String|"hsl(0,0%,0%)" (black)| Color of icon's boundary|
|stroke-width|Number|1|Width of icon's boundary|
|stroke-opacity|Number| 1|Opacity of icon's boundary|
|text|String or Number|"U+1f606"(grinning face with smiling eyes)|A character put on icon's image. Unicode code point(number) can be specified. Negative number is converted its absolute value.|
|font-color|String|"hsl(0,0%,0%)"|color of text|
|font-size|Number|12| Size of text. Unit is px(does not add "px"!)|,
|font-ypos|Number|1.8|Vertical position factor of text. Unit is the radius of the arc|
|iconAnchor|String or L.point|"middle-bottom"| Icon's anchor point. (left\|middle\|right)-(top\|middle\|bottom) combination is available in string|


#### options for L.icon.cIcon.flag

Icon image is rectangular flag.

|Option|Type|Default|Description|
|:------:|:----:|:-------:|-----------|
|iconSize|L.point|L.point([26,36])|size of icon|
|fill|String|"hsl(0,100%,50%)" (red)|fill color of icon's inner. Color description defined in SVG can be used(rgb(dd,dd,dd), color name,...|
|fill-opacity|Number|1| Opacity of icon's inner|
|stroke|String|"hsl(0,0%,0%)" (black)| Color of icon's boundary|
|stroke-width|Number|1|Width of icon's boundary|
|stroke-opacity|Number| 1|Opacity of icon's boundary|
|text|String or Number|"U+1f606"(grinning face with smiling eyes)|A character put on icon's image. Unicode code point(number) can be specified. Negative number is converted its absolute value.|
|font-color|String|"hsl(0,0%,0%)"|color of text|
|font-size|Number|12| Size of text. Unit is px(does not add "px"!)|,
|ratio|Number|0.6|Height ratio of flag. Unit is the height of icon.|
|font-ypos|Number|0.45|Vertical position factor of text. Unit is the height of the arc|
|iconAnchor|String or L.point|"middle-bottom"| Icon's anchor point. (left\|middle\|right)-(top\|middle\|bottom) combination is available in string|

#### ## options for L.icon.cIcon.balloon

A character is used for Icon image. Large shpape of Emoji is recommended.

|Option|Type|Default|Description|
|:------:|:----:|:-------:|-----------|
|iconSize|L.point|L.point([28,42])|size of icon|
|b-text|String or Number|'U+1F388'(balloon)|A character usedmicon's image. Unicode code point(number) can be specified. Size is automatically determinde by icon's width.|
|text|String or Number|""|A character put on icon's image. Unicode code point(number) can be specified. Negative number is converted its absolute value.|
|font-size|Number|12| Size of text. Unit is px(does not add "px"!)|,
|font-xpos|Number|0.4|horizontal position ratio to show text. Unit is the width of icon.|
|font-ypos|Number|0.75|vertical position ratio to show text. Unit is the height of icon.| 
|iconAnchor|String or L.point|"right-bottom"| Icon's anchor point. (left\|middle\|right)-(top\|middle\|bottom) combination is available in string|

## Methods
