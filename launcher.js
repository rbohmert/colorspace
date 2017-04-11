var script = document.createElement('script');
script.src = "https://rawgit.com/jbatea/Road_to_victory/master/autoscript.js";
script.onload = function () {
    var images = [
        {
            title: "malyari",                          // Sert a rien
            x: 440,                                   // Coordonnées X du départ de l'image (coin supérieur gauche)
            y: 785,                                  // Coordonnées Y du départ de l'image (coin supérieur gauche)
            image: "http://img4.hostingpics.net/pics/1530540022809332.png" // Pour changer l'image du script il faut remplacer cette adresse par l'adresse d'un png qui respecte un certain format
        }
    ];
 
    AutoPXLS(images);
};
document.head.appendChild(script);
