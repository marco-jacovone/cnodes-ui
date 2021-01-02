# cnodes-ui

## An ultimate UI for cnodes

**cnodes-ui** is a User Interface specifically developed for [cnodes](https://github.com/marco-jacovone/cnodes).
It is inspired by the interface model proposed for the Unreal Engine product, which has been hugely successful in the developer community.

I therefore decided to develop a project completely created in javascript, to make a tool available to the community that they can use within their own projects.

![Screenshot](https://github.com/marco-jacovone/cnodes-ui/blob/main/doc/images/screenshot1.png?raw=true)

I strongly believe in the separation between the graphic interface and the processing engine. This is the reason that prompted me to create two distinct projects.

Taking advantage of this separation, it is possible to imagine the scenario in which the graphic part is integrated within a WEB client, while the server part, which is able to independently execute the processes defined with the client, can be integrated into the backend.

## Getting started

You can turn any HTML element into a cnodes-ui canvas. Lets start with a simple HTML file such as

```html
<html>
  <head>
    <style>
      html,
      body,
      div {
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
    <script type="text/javascript" src="https://unpkg.com/@marco.jacovone/cnodes-ui/dist/main.js"></script>
  </head>

  <body>
    <div id="my-canvas-id"></div>
  </body>
  <script type="text/javascript">
    // Create the canvas on the div element
    let canvas = cnui.canvas("my-canvas-id");

    // To create an empty canvas, lets define a empty program
    let prg = cnui.program();
    canvas.program = prg;
  </script>
</html>
```

Now you can play with links with only two elements: _Enter_ and _Exit_, the main entry point and exit point of the _prg_ program.
Connections let you compose your program with your favorite custom nodes.

![Connection](https://raw.githubusercontent.com/marco-jacovone/cnodes-ui/main/doc/images/connect.gif)

To insert some nodes, for example a _For_ node and a _If_ node, you can type

```js
// Create two nodes: For and If
let prg = cnui.program();
let forNode = cnui.Env.getInstance("For");
let ifNode = cnui.Env.getInstance("If");

prg.addNode(forNode).addNode(ifNode);
canvas.program = prg;
```

Nodes will overlap, to give a position to nodes, you can set a _pos_ structure

```js
let forNode = cnui.Env.getInstance("For");
let ifNode = cnui.Env.getInstance("If");
forNode.meta = {
  pos: {
    x: 400,
    y: 100,
  },
};
ifNode.meta = {
  pos: {
    x: 700,
    y: 100,
  },
};

prg.addNode(forNode).addNode(ifNode);
canvas.program = prg;
```

You can now edit your node graph, and whenever you want, you can export the resulting
program by typing

```js
let exp = cnui.Env.export(prg);
console.log(JSON.stringify(exp));
```

This program (the **exp** variable) can be stored and loaded into a **CNODES** program instance to execute.

```js
let prg = cnui.Env.import(JSON.parse(`{"id":"NID_3","version":1,...`));
prg.process();
```

The **cnodes** engine doesn't require the cnodes-ui library to work, because it doesn't have any
dependency.

## Demo

Try a demo test board at:

[DEMO Test board](https://unpkg.com/@marco.jacovone/cnodes-ui/dist/index.html)

Once you've built the graph, you can press the **Run** button ti test its effect. please check the console
to see the "Console" node output.

## State of the art

The project is actually in a early alpha stage, but is growing rapidly ;-)

---

### Copyright (c) 2020 Marco Jacovone

#### Licensed under MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
