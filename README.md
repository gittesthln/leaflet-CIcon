# leaflet-CIcon
L.Icon.CIcon is simple and customizable marker icon using SVG image. We give a 3types of CIcon, pin, flag, and balloon. The first two types are made icon shape by SVG image.  the last one is intended to use Emoji character as icon's shape. All of them show a specified character or numbers over the icon shape.

## Requirements
- Leaflet 0.7+(earlier versions may work, but the sample program uses tooltip which is not supported 0.7.x)
- Browser support for SVG and ECMA2015(may be)

## Demo

The follwing

[Example]http:(//www.hilano.org/leaflet-CIcon/test-CIcon.html)

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

*Unspecified Icon optios are set to default values

|Option|Type|Default|Description|
|------|----|-------|-----------|
|className|String|"character-icon"|Class prefix to use for icon elements|
|type|String|"pin"|Specify icon's shape|"pin","flag",and "balloon" are defined|

Other options for CIcon depends on "type".

#### options for type "pin"

|Option|Type|Default|Description|
|------|----|-------|-----------|

#### options for type "flag"

|Option|Type|Default|Description|
|------|----|-------|-----------|

#### options for type "balloon"

|Option|Type|Default|Description|
|------|----|-------|-----------|


