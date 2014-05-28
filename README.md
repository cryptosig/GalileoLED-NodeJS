Galileo LED NodeJS Server
============================

by CryptoSig
Donation Bitcoin Address: 1dgKcYDw1AjqUTt3paCDeZ3DDYuZzXnEQ

Version 0.1
Dependencies:
-----------------------------------
MicroSD - You will need to have a MicroSD card installed with the Yocto Linux distribution on it. 
Without the MicroSD card the board will not be able to store any changes and the 
version of Linux that comes onboard is severly hobbled. I found my cards at Kinkos, Staples, 
or OfficeDepot, I would use an 8GB.

NodeJS - You need to load NodeJS onto your Yocto Linux distribution

Galileo Arduino IDE - this is a special version written to support the Galileo board. You will need it to load sketches to the board.
once a sketch has been loaded you should not have to have to have a connection to the board, unless you need to upgrade the sketch.

Usage
-----------------------------------
Server.js should start automatically after installation has been completed, if not run the following command

node /home/root/server.js &

Installation
-----------------------------------
Plug in Galileo AC power, always plug the AC power in first or you will ruin your board, a design flaw for sure, be sure you don't fall victim.
Plug in USB to socket nearest the Ethernet adapter, a small led on the board will light once the board is ready
Open arduino IDE v 1.53, the one designed by Intel *LINK*
Click on serial port, and set the active serial port
Upload the NETLabGalileo.ino sketch, you may need to make changes to your file

Connect to the Fixed IP address listed in the sketch via SSH, mine is set to 192.168.2.2/28; you may prefer 192.168.1.x or 192.168.0.x, 
depending on your private network. I would not recommend making any part of the software open to the public internet at this time.

Enter the username, root. A password is not needed, hence why you don't want to publicly route the IP at this time.

Load the NodeJS files on the device, I store mine in:
/home/root
I use SFTP to move the files, use a program like WinSCP, Jetbrains, CuteFTP, etc. I use the following connection settings:
SFTP host: 192.168.2.2
Port: 22 <- we dont use FTP ports, we use SSH
Root Path: /home/root
User Name: root
password: "" <- nothing, blank, empty string
Web server root URL: http://192.168.2.2

Warning
-----------------------------------
This is alpha software, it works for me, it sometimes breaks and requires me to reupload the sketch, 
I have not determined if this is a Galileo thing or my software. My gut tells me the loss of the sketch 
is a Galileo bug. I happens maybe once a month now. The biggest problem is the leds will just stay in
the last known position, which maybe a problem for you. Most times I can SSH into the linux portion and 
kill and restart the node server

Additionally there is little to no protection from hackers so be aware you will need to harden, thats why i run it on a small firewalled subnet



