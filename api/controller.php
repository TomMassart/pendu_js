<?php

$wordsArray = file(SOURCE_NAME, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES );
$wordIndex = rand(0, count($wordsArray) - 1);
echo $wordsArray[$wordIndex];