<?php require("settings.php"); ?>

<html>
<head>
<script type="text/javascript">
var server_number = <?php echo $serverID; ?>;
var test_DB = <?php echo $test_DB; ?>;
var max_items_in_processlist = <?php echo $max_items_in_processlist; ?>;
var alarm_after_how_many_bad_connections = <?php echo $alarm_after_how_many_bad_connections; ?>;
</script>


<link rel="stylesheet" href="css.css">
</head>
<body>
        <div class="dashcontainer">


            <h1 class="dashtitle">Chipmunk Server Tester</h1>


            <div class="dashbuttons">
                <a onclick="makesound('sound_good')" style="cursor:pointer;">test sound_good</a>
                | <a onclick="makesound('sound_bad')" style="cursor:pointer;">test sound_bad</a>
            </div>

            <div class="dashbuttons">
                good volume: <input type="number" id="vol_good" class="vol" value="0.3" step=".1" onchange=""><br>
                bad volume: <input type="number" id="vol_bad" class="vol" value="1.0" step=".1"><br>
                other volume: <input type="number" id="vol_other" class="vol" value="0.7" step=".1"><br>
            </div>

            <div class="dashlogs">
                <h4 class="dashtitle dashsubtitle">problem logs</h4>
                <div id="problogs"></div>
            </div>


            <div class="interfooter"><a href="http://intercode.ca/">intercode.ca</a></div>

        </div>


        <!-- jQuery -->
        <link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
        <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
        <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>

        <script type="text/javascript" src="scripts.js"></script>

    </body>
	</html>
