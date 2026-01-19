# 003-refactor-store

Currently the store knows too much. We import all the `actions` there. This will make the store very large and brittle becuase it depends on all those features. 

Instead I will move these actions in the features as controllers. Will be called actions.ts

the store will basically just export get and set. also I will move the AppState type definition into a types file and start from there. If I need a new state I begin by adding it there. 


