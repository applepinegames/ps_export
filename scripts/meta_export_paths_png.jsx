var main = function() {
  // Exports paths
  $.evalFile((new File($.fileName)).parent + "/export_paths.jsx");
  $.evalFile((new File($.fileName)).parent + "/export_png.jsx");
}

main();