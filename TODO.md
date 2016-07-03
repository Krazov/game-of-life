# TODO

## Basics

* Buttons: invert

## Features

* Allow to create square board with one param
* Predefined sets
* Count how long current state is holding on
* Player defined board size
* Board visual size adjusting to board rows and columns number (CSS)
* Save initial seed *but* at any moment, not only in the beginning
  * Prepare the high score table which remembers tickCount *and* seed
* Stats: how many living, how many dead, the biggest change during gameplay
* “Drawing” on board (`mousedown` instead of `click`?)

## Meta programming

* Single array
* Comment code, even for yourself in the future
* Native modules?
* Tail call optimization (probably not possible with setTimeout)
* Research possible use of generators
* Request frame something instead of setTimeout
* Get transition duration and not hardcode it

## Future plans

* Recognising oscilators (storing older than 1 as strings to compare)
* Shadowing fields around the actual table
* Rotating 3D board towards the heaviest corner
* 3D world (cube)