/**
 * Created by Sig on 4/27/2014.
 */

var TODController = require('./TODController');
var querystring = require('querystring');
//var requestify = require('requestify');
var http = require('http');

function TimerThread()
{
    var self = this;
    var ledpin = {whiteR:9,whiteL:5,blue:10,royal:6,uv:11};
    var controller = new TODController();
    var current = undefined;
    var adjustedDate = new Date();
    var TODOverride=false; //set to true to stop the updates

    function sendRESTIO(ledpin,ledvalue)
    {
        var url = '/arduino/analog/';
        url+=ledpin+'/'+ledvalue+'/';
        var post_data = querystring.stringify(ledvalue);
        var post_options = {
            host:'192.168.2.2',
            port:'80',
            path:url,
            method: 'POST'
        };
        var post_req = http.request(post_options,function(res){
            res.setEncoding('utf8');
            res.on('data',function (chunk){
                //console.log('Response: '+chunk);
            });
        });
        // post the data
        post_req.write(post_data);
        post_req.end();
    }
    function sendCurrentValues()
    {
        sendRESTIO(ledpin.whiteL,current.white);
        sendRESTIO(ledpin.whiteR,current.white);
        sendRESTIO(ledpin.blue,current.blue);
        sendRESTIO(ledpin.royal,current.royalBlue);
        sendRESTIO(ledpin.uv,current.uv);
    }
    function timerCallback()
    {
        adjustedDate = new Date();
        //adjustedDate.setTimeZone("Fiji Standard Time");
        console.log("time="+adjustedDate);
        if(controller == undefined)
            controller = new TODController();
        current = controller.GetIntensity(adjustedDate);
        console.log(current.white+" "+current.blue+" "+current.royalBlue+" "+current.uv);
        if(!TODOverride)
            sendCurrentValues();
    }
    function threadMethod()
    {
        timerCallback();
        setTimeout(threadMethod,60000)
    }
    function getCurrentCallback(err,res,body) {
        if (err) {
            res.writeHead(200, {"Content-Type": "text/html",'Access-Control-Allow-Origin' : '*'});
            res.write("Didnt work check api key, api secret, and api permissions");
            res.end();
            return; // don't continue if we err, since we closed the res
        }
        console.log("---------------Current Info:--------------");
        console.log(current);
        res.writeHead(200, {"Content-Type": "text/html",'Access-Control-Allow-Origin' : '*'});
        res.write(JSON.stringify(current));
        res.end();
    }
    function getWriteTimeCallback(err,res,body) {
        if (err) {
            res.writeHead(200, {"Content-Type": "text/html",'Access-Control-Allow-Origin' : '*'});
            res.write("Didnt work check api key, api secret, and api permissions");
            res.end();
            return; // don't continue if we err, since we closed the res
        }
        console.log("---------------Current Time:--------------");
        console.log(adjustedDate);
        res.writeHead(200, {"Content-Type": "text/html",'Access-Control-Allow-Origin' : '*'});
        res.write(JSON.stringify(adjustedDate));
        res.end();
    }
    self.start = threadMethod;
    self.callback = timerCallback;
    self.writeCurrentTODValue = getCurrentCallback;
    self.writeTime = getWriteTimeCallback;
    self.ledPin = function(){return ledpin;}
}
module.exports = TimerThread;