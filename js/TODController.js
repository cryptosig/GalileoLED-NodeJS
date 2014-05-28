/**
 * Created by Sig on 4/26/14.
 */

function TODController()
{
/*    if(!(this instanceof TODController))
    {
        return new TODController();
    }*/
    var self = this;
    self.props = {
       timematrix:
       [
           {time:"00:00",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:1},
           {time:"00:10",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:2},
           {time:"00:20",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:3},
           {time:"00:30",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:4},
           {time:"00:40",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:5},
           {time:"00:50",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:6},
           {time:"01:00",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:7},
           {time:"01:10",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:8},
           {time:"01:20",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:9},
           {time:"01:30",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:10},
           {time:"01:40",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:11},
           {time:"01:50",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:12},
           {time:"02:00",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:13},
           {time:"02:10",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:14},
           {time:"02:20",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:15},
           {time:"02:30",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:16},
           {time:"02:40",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:17},
           {time:"02:50",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:18},
           {time:"03:00",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:19},
           {time:"03:10",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:20},
           {time:"03:20",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:21},
           {time:"03:30",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:22},
           {time:"03:40",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:23},
           {time:"03:50",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:24},
           {time:"04:00",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:25},
           {time:"04:10",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:26},
           {time:"04:20",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:27},
           {time:"04:30",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:28},
           {time:"04:40",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:29},
           {time:"04:50",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:30},
           {time:"05:00",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:31},
           {time:"05:10",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:32},
           {time:"05:20",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:33},
           {time:"05:30",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:34},
           {time:"05:40",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:35},
           {time:"05:50",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:36},
           {time:"06:00",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:37},
           {time:"06:10",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:38},
           {time:"06:20",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:39},
           {time:"06:30",intensities:[{white:0,blue:20,royalBlue:20,uv:20}],index:40},
           {time:"06:40",intensities:[{white:0,blue:40,royalBlue:40,uv:40}],index:41},
           {time:"06:50",intensities:[{white:0,blue:60,royalBlue:60,uv:60}],index:42},
           {time:"07:00",intensities:[{white:0,blue:80,royalBlue:80,uv:80}],index:43},
           {time:"07:10",intensities:[{white:0,blue:100,royalBlue:100,uv:100}],index:44},
           {time:"07:20",intensities:[{white:0,blue:120,royalBlue:120,uv:120}],index:45},
           {time:"07:30",intensities:[{white:0,blue:140,royalBlue:140,uv:140}],index:46},
           {time:"07:40",intensities:[{white:0,blue:160,royalBlue:160,uv:160}],index:47},
           {time:"07:50",intensities:[{white:0,blue:180,royalBlue:180,uv:180}],index:48},
           {time:"08:00",intensities:[{white:9,blue:200,royalBlue:200,uv:200}],index:49},
           {time:"08:10",intensities:[{white:19,blue:220,royalBlue:220,uv:220}],index:50},
           {time:"08:20",intensities:[{white:28,blue:240,royalBlue:240,uv:240}],index:51},
           {time:"08:30",intensities:[{white:38,blue:255,royalBlue:255,uv:255}],index:52},
           {time:"08:40",intensities:[{white:47,blue:255,royalBlue:255,uv:255}],index:53},
           {time:"08:50",intensities:[{white:57,blue:255,royalBlue:255,uv:255}],index:54},
           {time:"09:00",intensities:[{white:66,blue:255,royalBlue:255,uv:255}],index:55},
           {time:"09:10",intensities:[{white:76,blue:255,royalBlue:255,uv:255}],index:56},
           {time:"09:20",intensities:[{white:85,blue:255,royalBlue:255,uv:255}],index:57},
           {time:"09:30",intensities:[{white:94,blue:255,royalBlue:255,uv:255}],index:58},
           {time:"09:40",intensities:[{white:104,blue:255,royalBlue:255,uv:255}],index:59},
           {time:"09:50",intensities:[{white:113,blue:255,royalBlue:255,uv:255}],index:60},
           {time:"10:00",intensities:[{white:123,blue:255,royalBlue:255,uv:255}],index:61},
           {time:"10:10",intensities:[{white:132,blue:255,royalBlue:255,uv:255}],index:62},
           {time:"10:20",intensities:[{white:142,blue:255,royalBlue:255,uv:255}],index:63},
           {time:"10:30",intensities:[{white:151,blue:255,royalBlue:255,uv:255}],index:64},
           {time:"10:40",intensities:[{white:161,blue:255,royalBlue:255,uv:255}],index:65},
           {time:"10:50",intensities:[{white:170,blue:255,royalBlue:255,uv:255}],index:66},
           {time:"11:00",intensities:[{white:179,blue:255,royalBlue:255,uv:255}],index:67},
           {time:"11:10",intensities:[{white:189,blue:255,royalBlue:255,uv:255}],index:68},
           {time:"11:20",intensities:[{white:198,blue:255,royalBlue:255,uv:255}],index:69},
           {time:"11:30",intensities:[{white:208,blue:255,royalBlue:255,uv:255}],index:70},
           {time:"11:40",intensities:[{white:217,blue:255,royalBlue:255,uv:255}],index:71},
           {time:"11:50",intensities:[{white:227,blue:255,royalBlue:255,uv:255}],index:72},
           {time:"12:00",intensities:[{white:236,blue:255,royalBlue:255,uv:255}],index:73},
           {time:"12:10",intensities:[{white:246,blue:255,royalBlue:255,uv:255}],index:74},
           {time:"12:20",intensities:[{white:255,blue:255,royalBlue:255,uv:255}],index:75},
           {time:"12:30",intensities:[{white:255,blue:255,royalBlue:255,uv:255}],index:76},
           {time:"12:40",intensities:[{white:255,blue:255,royalBlue:255,uv:255}],index:77},
           {time:"12:50",intensities:[{white:255,blue:255,royalBlue:255,uv:255}],index:78},
           {time:"13:00",intensities:[{white:255,blue:255,royalBlue:255,uv:255}],index:79},
           {time:"13:10",intensities:[{white:255,blue:255,royalBlue:255,uv:255}],index:80},
           {time:"13:20",intensities:[{white:255,blue:255,royalBlue:255,uv:255}],index:81},
           {time:"13:30",intensities:[{white:255,blue:255,royalBlue:255,uv:255}],index:82},
           {time:"13:40",intensities:[{white:255,blue:255,royalBlue:255,uv:255}],index:83},
           {time:"13:50",intensities:[{white:246,blue:255,royalBlue:255,uv:255}],index:84},
           {time:"14:00",intensities:[{white:236,blue:255,royalBlue:255,uv:255}],index:85},
           {time:"14:10",intensities:[{white:227,blue:255,royalBlue:255,uv:255}],index:86},
           {time:"14:20",intensities:[{white:217,blue:255,royalBlue:255,uv:255}],index:87},
           {time:"14:30",intensities:[{white:208,blue:255,royalBlue:255,uv:255}],index:88},
           {time:"14:40",intensities:[{white:198,blue:255,royalBlue:255,uv:255}],index:89},
           {time:"14:50",intensities:[{white:189,blue:255,royalBlue:255,uv:255}],index:90},
           {time:"15:00",intensities:[{white:179,blue:255,royalBlue:255,uv:255}],index:91},
           {time:"15:10",intensities:[{white:170,blue:255,royalBlue:255,uv:255}],index:92},
           {time:"15:20",intensities:[{white:161,blue:255,royalBlue:255,uv:255}],index:93},
           {time:"15:30",intensities:[{white:151,blue:255,royalBlue:255,uv:255}],index:94},
           {time:"15:40",intensities:[{white:142,blue:255,royalBlue:255,uv:255}],index:95},
           {time:"15:50",intensities:[{white:132,blue:255,royalBlue:255,uv:255}],index:96},
           {time:"16:00",intensities:[{white:123,blue:255,royalBlue:255,uv:255}],index:97},
           {time:"16:10",intensities:[{white:113,blue:255,royalBlue:255,uv:255}],index:98},
           {time:"16:20",intensities:[{white:104,blue:255,royalBlue:255,uv:255}],index:99},
           {time:"16:30",intensities:[{white:94,blue:255,royalBlue:255,uv:255}],index:100},
           {time:"16:40",intensities:[{white:85,blue:255,royalBlue:255,uv:255}],index:101},
           {time:"16:50",intensities:[{white:76,blue:255,royalBlue:255,uv:255}],index:102},
           {time:"17:00",intensities:[{white:66,blue:255,royalBlue:255,uv:255}],index:103},
           {time:"17:10",intensities:[{white:57,blue:255,royalBlue:255,uv:255}],index:104},
           {time:"17:20",intensities:[{white:47,blue:255,royalBlue:255,uv:255}],index:105},
           {time:"17:30",intensities:[{white:38,blue:255,royalBlue:255,uv:255}],index:106},
           {time:"17:40",intensities:[{white:28,blue:240,royalBlue:255,uv:240}],index:107},
           {time:"17:50",intensities:[{white:19,blue:220,royalBlue:255,uv:220}],index:108},
           {time:"18:00",intensities:[{white:9,blue:220,royalBlue:255,uv:200}],index:109},
           {time:"18:10",intensities:[{white:0,blue:180,royalBlue:255,uv:180}],index:110},
           {time:"18:20",intensities:[{white:0,blue:160,royalBlue:255,uv:160}],index:111},
           {time:"18:30",intensities:[{white:0,blue:140,royalBlue:255,uv:140}],index:112},
           {time:"18:40",intensities:[{white:0,blue:120,royalBlue:255,uv:120}],index:113},
           {time:"18:50",intensities:[{white:0,blue:100,royalBlue:255,uv:100}],index:114},
           {time:"19:00",intensities:[{white:0,blue:80,royalBlue:180,uv:100}],index:115},
           {time:"19:10",intensities:[{white:0,blue:60,royalBlue:160,uv:100}],index:116},
           {time:"19:20",intensities:[{white:0,blue:40,royalBlue:140,uv:100}],index:117},
           {time:"19:30",intensities:[{white:0,blue:20,royalBlue:80,uv:80}],index:118},
           {time:"19:40",intensities:[{white:0,blue:5,royalBlue:60,uv:60}],index:119},
           {time:"19:50",intensities:[{white:0,blue:5,royalBlue:40,uv:40}],index:120},
           {time:"20:00",intensities:[{white:0,blue:0,royalBlue:20,uv:20}],index:121},
           {time:"20:10",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:122},
           {time:"20:20",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:123},
           {time:"20:30",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:124},
           {time:"20:40",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:125},
           {time:"20:50",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:126},
           {time:"21:00",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:127},
           {time:"21:10",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:128},
           {time:"21:20",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:129},
           {time:"21:30",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:130},
           {time:"21:40",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:131},
           {time:"21:50",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:132},
           {time:"22:00",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:133},
           {time:"22:10",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:134},
           {time:"22:20",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:135},
           {time:"22:30",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:136},
           {time:"22:40",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:137},
           {time:"22:50",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:138},
           {time:"23:00",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:139},
           {time:"23:10",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:140},
           {time:"23:20",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:141},
           {time:"23:30",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:142},
           {time:"23:40",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:143},
           {time:"23:50",intensities:[{white:0,blue:0,royalBlue:0,uv:0}],index:144}
       ]
    };
    function indexOf(time)
    {
        var retval = -1;
        var date = new Date(time);
        var hour = date.getHours();
        var minute = date.getMinutes();
        var remainder = minute % 10;
        minute = minute - remainder;
        for(var i=0;i<count();i++)
        {
            if(hour < 10)
            {
                if(minute < 10)
                {
                    if(self.props.timematrix[i].time == ("0"+hour+":0"+minute))
                    {
                        retval = i;
                        return retval;
                    }
                }
                else {
                    if (self.props.timematrix[i].time == ("0" + hour + ":" + minute)) {
                        retval = i;
                        return retval;
                    }
                }
            }
            else
            {
                if(minute < 10)
                {
                    if(self.props.timematrix[i].time == (hour+":0"+minute))
                    {
                        retval = i;
                        return retval;
                    }
                }
                else {
                    if (self.props.timematrix[i].time == (hour + ":" + minute)) {
                        retval = i;
                        return retval;
                    }
                }
            }
        }
        console.log("error parsing time t:"+hour+" "+minute);
        return retval;
    };
    function count()
    {
        return self.props.timematrix.length;
    };
    function getIntensity (time){
        var timeIndex = indexOf(time);
        console.log("timeIndex="+timeIndex);
        var timeObject = this.props.timematrix[timeIndex];
        return timeObject.intensities[0];
    };

    self.IndexOf = indexOf;
    self.GetIntensity = getIntensity;
/*    // bind the prototype functions to this TODController instance
    Object.keys(TODController.prototype).forEach(function(k) {
        this[k] = this[k].bind(this);
    }, this);    */
}
module.exports = TODController;
//module.exports.TODController = TODController;
