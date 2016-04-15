##### `scripts/export_paths.jsx`
Takes all paths in the current Photshop document and exports them. Before using, you'll need to:

1. Customize the point translation code, so that the points get translated into your coordinate system.
2. Customize the export format into your data interchange format (we use [Google Protocol Buffers](https://developers.google.com/protocol-buffers/)).

##### `scripts/export_png.jsx`
Takes the current Photoshop document and exports it as a png.  Before using you'll need to install [pngquant](https://pngquant.org/) and potentially update the install path in the script.

##### `scripts/meta_export_paths_png.jsx`
Runs both `scripts/export_png.jsx` and `scripts/export_paths.jsx`

## Generic install instructions
To add any of these scripts to Photoshop's `File > Scripts` menu, drop the scripts into `<Photoshop application folder>/Presets/Scripts` and restart Photoshop.

To call this script using a keyboard shortcut. 
 1. Open the Action window
 2. Create a new action
 3. While recording the action, run the script from the `File` menu
 4. Stop the action
 5. Double click on the action to bring up the Action Options
 6. Set a function key for the keyboard shortcut
