//
// Takes the current Photoshop document and exports it as a png. If pngquant
// is installed, it'll optimize the png too (see: https://pngquant.org)
//

var PNG_QUANT_PATH = "/usr/local/bin/pngquant";

var main = function() {
  // Make sure the document is saved first, otherwise we won't know where to save our png
  if (!app.activeDocument.saved) {
    alert("Error: Document needs to be saved.");
    return;
  }

  // Get output path and save
  var outputPNGPath = app.activeDocument.path + "/" + app.activeDocument.name.split(".")[0] + ".png";
  savePNG(outputPNGPath);

  // Optimize png if pngquant is installed
  if (File(PNG_QUANT_PATH).exists) {
    app.system(PNG_QUANT_PATH  + " --force --output " + outputPNGPath + " " + outputPNGPath);
  }
}

var savePNG = function(path) {
  // Direct output from Photoshop's ScriptingListenerJS
  var idsave = charIDToTypeID( "save" );
    var desc1425 = new ActionDescriptor();
    var idAs = charIDToTypeID( "As  " );
        var desc1426 = new ActionDescriptor();
        var idPGIT = charIDToTypeID( "PGIT" );
        var idPGIT = charIDToTypeID( "PGIT" );
        var idPGIN = charIDToTypeID( "PGIN" );
        desc1426.putEnumerated( idPGIT, idPGIT, idPGIN );
        var idPNGf = charIDToTypeID( "PNGf" );
        var idPNGf = charIDToTypeID( "PNGf" );
        var idPGAd = charIDToTypeID( "PGAd" );
        desc1426.putEnumerated( idPNGf, idPNGf, idPGAd );
    var idPNGF = charIDToTypeID( "PNGF" );
    desc1425.putObject( idAs, idPNGF, desc1426 );
    var idIn = charIDToTypeID( "In  " );
    desc1425.putPath( idIn, new File( path ) );
    var idCpy = charIDToTypeID( "Cpy " );
    desc1425.putBoolean( idCpy, true );
    var idLwCs = charIDToTypeID( "LwCs" );
    desc1425.putBoolean( idLwCs, true );
  executeAction( idsave, desc1425, DialogModes.NO );
}

main();
