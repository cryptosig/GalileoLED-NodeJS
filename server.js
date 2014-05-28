/**
 * Created by Sig on 4/23/14.
 */
var http = require('http');
//var galileo = require("galileo-io");
var url = require('url');
var fs = require('fs');
var pathLib = require("path");
var TimerThread = require('./js/TimerThread');
var timer = new TimerThread();
var responseCache = undefined;
var requestCache = undefined;
//var board = new galileo();
var responseMaxRepeats = 200;
//var JSONStream = require('JSONStream');

var server = http.createServer(request);
var serverAddress = getIp('eth0');
var serverPort = 80;
server.listen(serverPort, '0.0.0.0');
timer.start();
console.log('Web Server running at eth0 ' + serverAddress + ':'+ serverPort + ', wlan0 ' + getIp('wlan0') + ':' + serverPort);


function request( req, response ) {
    var command, path;
    responseCache = response;
    requestCache = req;
    command = "";
    //console.log(req.url);
    path = url.parse(req.url).pathname;
    if (path.indexOf("arduino") === 1) {
        // treat as a REST request for arduino command, e.g. /arduino/analog/0
        command = path.substring(9, path.length);
        console.log(command);
        writeCommand(command);
        responseCheck = 0;
        sendResponse(response, command);
    }
    else if(path.indexOf("yocto") === 1)
    {
        command = path.substring(7, path.length);
        if(command == "current")
        {
            /*should return a json of every led pin
            you need to get the value from the arduino side, which is not so easy
            so we will work around it by using yocto linux and reading the files in
            /sys/class/pwn/pwmchip0/
            */

            //write the values to response
            getCurrentPWMValuesCallback(null,response,{});
        }
        else if(command == "currentTOD")
        {
            timer.writeCurrentTODValue(null,response,{});
        }
        else if(command == "time")
        {
            timer.writeTime(null,response,{});
        }
    }
    else {
        // serve a webpage
        serveHTML(response,path);
    }
}
// if we need to pull JSON from an external source, like for weather conditions
function executeRequest(options, callback) {
    if (typeof callback == "function") {
        //console.log("Callback is function:");
        request(options, function (err, res, body) {
            var json;

            if (err  || !res || res.statusCode != 200) {
                return callback(err || new Error("Request failed"));
            }

            // This try-catch handles cases where server returns 200 but responds with HTML,
            // causing the JSON.parse to throw
            try {
                json = JSON.parse(timer.current);
            } catch(err) {
                if (body.indexOf("<") != -1) {
                    return callback(new Error("server responded with html:\n" + body));
                } else {
                    return callback(new Error("JSON parse error: " + err));
                }
            }

            callback(null, json);
        });
    }
/*    else {//we can grab a JSON stream, for streaming weather or something
        var parser = JSONStream.parse(["data", true]);
        request.get(options).pipe(parser);
        return parser;
    }*/
}
function getJSONPWM()
{
    jsonvalues = {
        whiteL:readSYSPWM(timer.ledPin().whiteL),
        whiteR:readSYSPWM(timer.ledPin().whiteR),
        blue:readSYSPWM(timer.ledPin().blue),
        royalBlue:readSYSPWM(timer.ledPin().royal),
        uv:readSYSPWM(timer.ledPin().uv)
    };
    return jsonvalues;
}
function getCurrentPWMValuesCallback(err,res,body) {
    if (err) {
        res.writeHead(200, {"Content-Type": "text/html",'Access-Control-Allow-Origin' : '*'});
        res.write("Didnt work check api key, api secret, and api permissions");
        res.end();
        return; // don't continue if we err, since we closed the res
    }
    console.log("---------------Current values:--------------");
    jsonvalues = getJSONPWM();
    console.log(jsonvalues);
    res.writeHead(200, {"Content-Type": "text/html",'Access-Control-Allow-Origin' : '*'});
    res.write(JSON.stringify(jsonvalues));
    res.end();
}
/**
 * Gets the channel for the given PIN, the channels are not the same so this will look it up for you
 * @param ledpin the led pin to lookup
 *
 *   Arduino Digital Pin Number	PWM Channel Number
         3	                                3
         5	                                5
         6	                                6
         9	                                1
         10	                                7
         11	                                4
 *
*/
function getPWMChannel(ledpin)
{
    retval = undefined;
    switch (ledpin)
    {
        case 3:
            retval = 3;
            break;
        case 5:
            retval = 5;
            break;
        case 6:
            retval = 6;
            break;
        case 9:
            retval = 1;
            break;
        case 10:
            retval = 7;
            break;
        case 11:
            retval=4;
            break;
        default :
            break;
    }
    return retval;
}
function readSYSPWM(ledpin)
{
    try {
        period = fs.readFileSync('/sys/class/pwm/pwmchip0/pwm'+getPWMChannel(ledpin)+'/period');
        data = fs.readFileSync('/sys/class/pwm/pwmchip0/pwm'+getPWMChannel(ledpin)+'/duty_cycle');
        percent = (data/period);
        console.log("pwm data:"+percent + " DEC: "+Math.round(percent*255));
        return Math.round(percent*255);

    }
    catch(e) {
        console.log("file check on sys pwm: "+ e);
    }
}
function writeCommand(command) {
    // delete any pending responses to make sure we get a fresh one
    try {
        fs.writeFileSync('/home/root/response', "none");
        //console.log("deleted OLD response");
    } catch(e) {
        console.log("writeCommand can't clear response");
    }

    try {
        fs.writeFileSync('/home/root/command', command);
    } catch(e) {
        console.log("writeCommand can't write command");
    }

    //console.log('command: ' + command);
}

function sendResponse(res, command) {
    var responseExists = false;
    var responseCheck = 0;
    var data = "";
    var dataStr;
    var dataParts;
    // when file exists, get its contents and return to http request
    // if it takes too may tries to open file, give up
    while(!responseExists && responseCheck < responseMaxRepeats) {
        try {
            data = fs.readFileSync('/home/root/response');
            dataStr = data + ""; // convert data to a string
            if (data != "none" && dataStr.indexOf("\n") >= 0) {
                responseExists = true;
            } else {
                responseCheck++;
            }
        } catch(e) {
            responseCheck++;
            console.log("file check: " + responseCheck);
        }
    }

    if (responseCheck >= responseMaxRepeats) {
        console.log("sendResponse tried too many times: " + responseCheck);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end("");
    } else {
       // console.log('response: ' + data + " " + responseCheck);

        dataParts = dataStr.split("#");
        //console.log("command: " + dataParts[0] + " " + dataParts[1]);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        if (dataParts[0] == command) {
            // get rid of the \n at the end before sending it back
            dataStr = dataParts[1].substring(0,dataParts[1].indexOf("\n"));
            res.end(dataStr);
        } else {
            res.end("");
            console.log("arduino response '" + dataParts[0] + "' doesn't match command '" + command + "'");
        }

        try {
            fs.writeFileSync('/home/root/response', "none");
        } catch(e) {
            console.log("sendResponse can't clear response");
        }
    }
}
function getArduinoCommand() {
    try {
        data = fs.readFileSync('/home/root/arduinocommand');
        dataStr = data + ""; // convert data to a string
        if (dataStr.indexOf("none") == -1 && dataStr.indexOf("\n") > 0) {
            console.log(dataStr);
            dataStr = dataStr.substring(0,dataStr.indexOf("\n"));

            http.get(dataStr, function(res) {
                //console.log("Got response: " + res.statusCode);
                res.on('data', function(chunk) {
                    //console.log("response: " + chunk);
                    fs.writeFileSync('/home/root/arduinoresponse', chunk);
                });
            }).on('error', function(e) {
                    console.log("http.get got error: " + e.message + " " + dataStr);
                });


            try {
                fs.writeFileSync('/home/root/arduinocommand', "none");
            } catch(e) {
                console.log("getArduinoCommand can't clear command");
            }
        }
    } catch(e) {
        // no file
        console.log("getArduinoCommand: " + e);
    }
}
function serveHTML(response, path) {
    var filename = pathLib.join('/home/root/html', path);
    var contentTypesByExtension = {
        '.html': "text/html",
        '.css':  "text/css",
        '.js':   "text/javascript",
        '.jpg':  "image/jpeg",
        '.png':  "image/png"
    };

    fs.exists(filename, function(exists) {
        if(!exists) {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) filename += '/index.html';

        fs.readFile(filename, "binary", function(err, file) {
            if(err) {
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(err + "\n");
                response.end();
                return;
            }

            var headers = {};
            var contentType = contentTypesByExtension[pathLib.extname(filename)];
            if (contentType) headers["Content-Type"] = contentType;
            response.writeHead(200, headers);
            response.write(file, "binary");
            response.end();
        });
    });
}
function getIp(interface) {
    try {
        var ips = require('os').networkInterfaces()[interface];
        var ip;
        ips.forEach(function(element) {
            if (element.family == "IPv4") {
                ip = element.address;
            }
        })
        return ip;
    } catch (e) {
        return "none";
    }

}