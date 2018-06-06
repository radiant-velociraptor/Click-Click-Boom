Click Click BOOM is a simple tool used in tandem with Netscaler and Varnish to force NS to stop sending traffic to nodes that have been issued the killSig. To use this application, it is required that someone set up NS to respond to a maint-stat URL. If the value at the URL is anything but OK, do not send traffic. Otherwise, send traffic.

##To use:

1. Set up Varnish with a kill, revive, and maint-stat url. The maint-stat url should return values of your choice denoting "OK for traffic" and "Not OK for traffic". When a user issues a kill command, set maint-stat to "Not OK for traffic". "OK for traffic" by default and revive. How to do this is the beyond the scope of this README, but I suggest using the var VMOD to make things easier.

2. Set up Netscaler to send traffic when maint-stat returns an OK, and not send traffic when maint-stat does not return an OK. Instructions on how to set up NS is way beyond the scope of this README. Contact your net or sysadmin.

3. Set up DNS, or add to hosts, URLs corresponding to www.k${digit}.com.

4. Set up CORs in Varnish. You shouldn't need CORs in any of your backends unless you want to send your kill, revive, or maint-stat requests to a backend.

##Other Stuff

CCB's basic functionality is in place but there are a few lingering issues that will be addressed in the future:

1. CCB should poll the maint-stat URL every so often to monitor for changes.

2. CCB needs to be cleaned up to not refer to a maintenance header anymore. (In a previous iteration, CCB used a maintenance header to determine state values.)

3. CCB should be (possibly) be updated for Flux.

4. Components should be moved out into their own files so I stop accidentally modifying the wrong ones. And also it looks cleaner with components in separate files.

5. Add a dire warning when more than three servers are set to kill and maybe even disable to ability to kill more
servers at that point.
