//
// Takes all paths in the current Photshop document and exports them. You probably want to customize:
//   1. The writeToFile() function to export in your interchange format (xml, protobuf, etc.)
//   2. The getPointInTranslatedCoordinateSystem() function to convert Photoshop's coordinate system to your own
//

var main = function() {
  // Get all of the paths from the document
  var paths = getPathsFromDocument(app.activeDocument);
  if (!paths.length) {
    alert("Error: Unable to find any points to export");
    return;
  }

  // Open the file
  var fileName = app.activeDocument.name.split(".")[0] + "_path.message";
  var file = File(app.activeDocument.path + "/" + fileName);
  file.open("w");
  file.encoding = "UTF-8";
  file.lineFeed = "Unix";

  // Write paths to file one at a time
  for (var i = 0; i < paths.length; i++) {
    writeToFile(file, paths[i]);
  }

  // Cleanup file
  file.close();
}

var getPathsFromDocument = function(document) {
  var paths = [];
  for (var i = 0; i < document.pathItems.length; i++) {
    var pathItem = document.pathItems[i];

    // Each path item is composed of subpaths, treat each of those as a complete path
    for (var j = 0; j < pathItem.subPathItems.length; j++) {
      var points = [];
      var pathPoints = pathItem.subPathItems[j].pathPoints;

      // Translate the points from PS format to our own
      for (var k = 0; k < pathPoints.length; k++) {
        points.push(getPointInTranslatedCoordinateSystem(pathPoints[k]));
      }

      // By convention, we only export clockwise polygons
      if (!isClockwise(points)) {
        points.reverse();
      }

      // Only add if there are actually points
      if (points.length) {
        paths.push(points);
      } 
    }
  }
  return paths;
}

var getPointInTranslatedCoordinateSystem = function(pathPoint) {
  // Photoshop's coordinate system increases down and to the right
  var point = {};
  var height = parseInt(app.activeDocument.height);
  point.x = Math.round(pathPoint.anchor[0]);
  point.y = Math.round((height - pathPoint.anchor[1]));
  return point;
}

var isClockwise = function(points) {
  var sum = 0;
  for (var i = 0; i < points.length - 1; i++) {
    var p1 = points[i];
    var p2 = points[i + 1];
    sum += (p2.x - p1.x) * (p2.y + p1.y);
  }
  var p1 = points[points.length - 1];
  var p2 = points[0];
  sum += (p2.x - p1.x) * (p2.y + p1.y);
  return sum > 0;
}

var writeToFile = function(file, points) {
  // Write to file in protobuf format, change this code to suit your own export format 
  file.writeln("polygons {");
  var seenPoints = {};
  for (var j = 0; j < points.length; j++) {
    var point = points[j];
    if ([point.x, point.y] in seenPoints) {
      // Ignore duplicate points
      continue;
    }
    file.writeln("  points {");
    file.writeln("    x: " + point.x);
    file.writeln("    y: " + point.y);
    file.writeln("  }");
    seenPoints[[point.x, point.y]] = true;
  }
  file.writeln("}");
}

// Convert to expected units and call main
var originalTypeUnits = app.preferences.typeUnits;
var originalRulerUnits = app.preferences.rulerUnits;
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;
try {
  main();
} catch (e) {
  alert(e);
}
app.preferences.typeUnits = originalTypeUnits;
app.preferences.rulerUnits = originalRulerUnits;
