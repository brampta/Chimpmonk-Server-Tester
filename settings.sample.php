<?php
//server ID
$serverID=1; //if you have many servers change this number to give each server a different number (from 0 to 9)


//database connection:
$test_DB=1; //0 database is not tested, 1 database is tested. make sure you set this to 1 if you want the tester to test the database too!
$db_host='localhost';
$db_username='babaus';
$db_password='23S53fd/2c3r4';
$max_items_in_processlist=40; //if you use the version that tests the DB, you will be warned (but the alarm wont ring) if there is more than max_items_in_processlist queries in your database, set to 0 to disable this
$alarm_after_how_many_bad_connections=20; //how many times must the test fail before the alarm starts




?>
