# Game of life: Krazov implementation

_(This article is **still** a stub.)_

## What and why

The following repo is my own implementation of **Conway's Game of Life**. I did it because I could and because I wanted. Also, it’s a good excercise for me so why not.

## Game

### What

>**The Game of Life**, also known simply as **Life**, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.[1]
>
>The "game" is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves, or, for advanced "players", by creating patterns with particular properties.

### How

>The universe of the Game of Life is an infinite two-dimensional orthogonal grid of square _cells_, each of which is in one of two possible states, _alive_ or _dead_, or "populated" or "unpopulated" (the difference may seem minor, except when viewing it as an early model of human/urban behavior simulation or how one views a blank space on a grid). Every cell interacts with its eight _neighbours_, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:
>
>1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
>2. Any live cell with two or three live neighbours lives on to the next generation.
>3. Any live cell with more than three live neighbours dies, as if by over-population.
>4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
>
>The initial pattern constitutes the _seed_ of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed—births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a _tick_ (in other words, each generation is a pure function of the preceding one). The rules continue to be applied repeatedly to create further generations.

(Source: [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).)

## Starting a game

1. [Download the game](https://github.com/Krazov/game-of-life/archive/master.zip).
2. Open `game/index.html` in browser.

If you’re pro, you can run server in `game` folder. I even created favicon for that occassion.

## Playing

1. Select which fields should be alive.
2. Press `Start`.

That’s it. As currently there is no stop button, you will have to refresh page to stop it.

## Additional libs

Currently I’m using [RequireJS](https://github.com/requirejs/requirejs) to organize project. The rest is pure vanilla (_fap, fap, fap…).

## License

The MIT License (MIT)

Copyright (c) 2016 Jon Krazov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

(Chosen with a little help from [Choose a license](http://choosealicense.com).)