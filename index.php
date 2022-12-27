<?php require("settings.php"); ?>

<html>
<head>
<script type="text/javascript">
var server_number = <?php echo $serverID; ?>;
var test_DB = <?php echo $test_DB; ?>;
var max_items_in_processlist = <?php echo $max_items_in_processlist; ?>;
var alarm_after_how_many_bad_connections = <?php echo $alarm_after_how_many_bad_connections; ?>;
</script>
<script type="text/javascript" src="scripts.js"></script>
</head>
<body>
        <div style="padding:16px;">


            <h1>Chipmunk Server Tester</h1>

            <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="240" height="180" id="simpleBroadcaster" align="middle" style="z-index:10000;">
                <param name="allowScriptAccess" value="always" />

                <param name="movie" value="server_tester.swf?v=1.04" />
                <param name="loop" value="false" />
                <param name="quality" value="high" />
                <param name="bgcolor" value="#000000" />
                <param name="allowFullScreen" value="true" />
                <param name="wmode" value="transparent" />
                <embed style="z-index:10000;" src="server_tester.swf?v=1.02" loop="false" quality="high" bgcolor="#000000" width="240" height="180" name="simpleBroadcaster"  align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" allowFullScreen="true" wmode="transparent"></embed>
            </object>





            
            <a onclick="makesound('sound_good')" style="cursor:pointer;">test sound_good</a> | <a onclick="makesound('sound_bad')" style="cursor:pointer;">test sound_bad</a>


            <div id="problogs"></div>


            <div style="text-align:right;"><a href="http://intercode.ca/">intercode.ca</a></div>

        </div>
    </body>
	</html>
