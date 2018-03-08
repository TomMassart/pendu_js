<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Le pendu</title>
</head>
<body>
<div>
    <h1>Trouve le mot en moins de <span id="max-trials">0</span> coups !</h1>
</div>
<div>
    <p>Le mot à deviner compte <span id="letters-count">0</span>
        lettres&nbsp;: <span id="replacement-string">*</span></p>
</div>
<div>
    <img id="image-file"
         src="images/pendu0.gif"
         alt="">
</div>
<div>
    <p>Voici les lettres que tu as déjà essayées&nbsp;: <span id="tried-letters">-</span></p>
</div>
<div id="winning">
    <p class="bg-success lead">Bravo&nbsp;! Tu as trouvé le mot
        «&nbsp;<b class="word"></b>&nbsp;». <a href="index.php">Recommence&nbsp;!</a>
    </p>
</div>
<div id="losing">
    <p class="bg-danger lead">OOOps&nbsp;! Tu sembles bien mort&nbsp;! Le mot à trouver était
        «&nbsp;<b class="word"></b>&nbsp;». <a href="index.php">Recommence&nbsp;!</a>
    </p>
</div> 
<div id="playing">
    <form action="index.php"
          method="post">
        <fieldset>
            <legend>Il te reste <span id="remaining-trials">0</span> essais pour sauver ta peau
            </legend>
            <div>
                <label for="select-letter">Choisis ta lettre</label>
                <select name="select-letter"
                        id="select-letter">
                        <?php ?>
                </select>
                <input type="submit"
                       value="essayer cette lettre">
            </div>
        </fieldset>
    </form>
</div>
<script src="script/jquery-3.3.1.min.js"></script>
<script src="script/main.js"></script>
</body>
</html>