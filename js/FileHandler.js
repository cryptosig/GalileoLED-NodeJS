/**
 * Created by Sig on 4/27/2014.
 */

var TODController = require('./TODController');
//var cont = new controller.TODController();
var query = require('jQuery');
var fs = require('fs');
var pathLib = require("path");
var time = require('time')(Date);
var whiteIntensity = 0;
var intensityCounter = 0;
var intensityInterval = 0.03703;


function get8BitValue(index)
{
    var retval = 255 * (intensityInterval * index);
    if(retval>255)
        retval = 255;
    return retval;
}
function getWhiteIntensity(index)
{
   return whiteIntensity = Math.round(get8BitValue(index));
}
function getBlueIntensity(index)
{
    if(index == 0)
        return 0;
    else if((index *20) > 255)
        return 255
    else
    {
        return index * 20;
    }
}
function dateFormat (date, fstr, utc) {
    utc = utc ? 'getUTC' : 'get';
    return fstr.replace (/%[YmdHMS]/g, function (m) {
        switch (m) {
            case '%Y': return date[utc + 'FullYear'] (); // no leading zeros required
            case '%m': m = 1 + date[utc + 'Month'] (); break;
            case '%d': m = date[utc + 'Date'] (); break;
            case '%H': m = date[utc + 'Hours'] (); break;
            case '%M': m = date[utc + 'Minutes'] (); break;
            case '%S': m = date[utc + 'Seconds'] (); break;
            default: return m.slice (1); // unknown code, remove %
        }
        // add leading zero if required
        return ('0' + m).slice (-2);
    });
}
function print()
{
    for(var counter= 1,j=0;j<24;j++)
    {
        for(var k=0;k<6;k++)
        {
            if(j<=9)
                console.log("{time:\"0"+j+":"+k+"0\",intensities:[{white:"+getWhiteIntensity(intensityCounter)+
                    ",blue:"+getBlueIntensity(intensityCounter)+",royalBlue:"+getBlueIntensity(intensityCounter)+
                    ",uv:"+getBlueIntensity(intensityCounter)+"}],index:"+counter+++"},");
            else
                console.log("{time:\""+j+":"+k+"0\",intensities:[{white:"+getWhiteIntensity(intensityCounter)+
                    ",blue:"+getBlueIntensity(intensityCounter)+",royalBlue:"+getBlueIntensity(intensityCounter)+
                    ",uv:"+getBlueIntensity(intensityCounter)+"}],index:"+counter+++"},");
            if(counter >= 52 && counter < 80)
                intensityCounter++;
            if(counter >= 80 && counter <= 106)
                intensityCounter--;
            if(counter> 106)
                intensityCounter = 0;
        }
    }
}
print();

