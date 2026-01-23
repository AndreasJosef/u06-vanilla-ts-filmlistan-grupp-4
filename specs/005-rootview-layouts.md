# 005-rootview-layouts

I need to change the rootview so that I can dynamically ie based on state assemble the app shell container. For example when loading the detail view I do not want the header and footer to load. I will use the concept of layouts to solve this

I feel also with even the model now being added to the root scope it is time for a REFACTOR: Create app/root/ location andfor view and model


## Core

1. Create a viewmodel for rootview that returns the layout based on the current view
2. In the rootview use this layout to switch the assembly of the root container.
