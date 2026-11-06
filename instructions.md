Setup the content structure
to make new content
'hugo new content/<sectionname>/<filename>.md
Set the menu in hugo.toml
Make sure draft = false for menu items!


CSS
main.css takes precedence over Tailwind classes. If you want to set margins using Tailwind, make sure they are not already set in main.css!

Images
Drop images into a gallery folder (e.g. content/gallery/painting/). They are resized automatically.
Files named like FrancescaWatsonArt_TheManInBlue_2018_web.jpg get the caption "The Man In Blue, 2018".
To set a caption for any other image, add this to that gallery's _index.md front matter:

[[resources]]
  src = "pamuseet.jpg"
  title = "Pamuseet, 2023"

Gallery order in the menu is set by `weight` in each gallery's _index.md (lower comes first).
