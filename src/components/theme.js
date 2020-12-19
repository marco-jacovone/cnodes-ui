/**
 * cnodes-ui
 *
 * A GUI for cnodes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

/**
 * This class contains all values needed to draw all elements
 * of design for cnodes-ui. The user can customize the graphic
 * aspect of element by defining a theme.
 * For exemple to modify the node with you can define your own
 * property inside a custom theme:
 *
 * class MyTheme extends cnui.Theme {
 *   get NODE_WIDTH() {
 *     return 400;
 *   }
 * }
 *
 * Now activate the theme by setting:
 *
 * cnui.Theme.current = new MyTheme();
 *
 */
export class Theme {
  constructor() {}

  // Node container

  get NODE_WIDTH() {
    return 200;
  }

  get NODE_BORDER_RADIUS() {
    return 15;
  }
  get NODE_FILL_COLOR() {
    return "#FAD7A0";
  }
  get NODE_FUNCTIONAL_FILL_COLOR() {
    return "#C5F0FF";
  }
  get NODE_STROKE_COLOR() {
    return "#FAD7A0";
  }
  get NODE_FUNCTIONAL_STROKE_COLOR() {
    return "#C5F0FF";
  }
  get NODE_STROKE_WIDTH() {
    return 3;
  }

  get NODE_TITLE_COLOR() {
    return "brown";
  }
  get NODE_FUNCTIONAL_TITLE_COLOR() {
    return "069DD1";
  }
  get NODE_TITLE_FONT() {
    return "bold 18px verdana";
  }

  get NODE_SYMBOL_STROKE_WIDTH() {
    return 3;
  }
  get NODE_SYMBOL_STROKE_COLOR() {
    return "#FEF9E7";
  }
  get NODE_SYMBOL_FILL_COLOR() {
    return "#FEF9E7";
  }

  // Sockets

  get NODE_PREV_NEXT_STROKE_WIDTH() {
    return 2;
  }
  get NODE_PREV_NEXT_STROKE_COLOR() {
    return "#31A200";
  }
  get NODE_PREV_NEXT_FILL_COLOR() {
    return "#31A200";
  }
  get NODE_PREV_NEXT_NAME_FONT() {
    return "bold 11px verdana";
  }
  get NODE_PREV_NEXT_NAME_COLOR() {
    return "bold 11px black";
  }
  get NODE_PREV_NEXT_POINT_RADIUS() {
    return 8;
  }

  get NODE_IO_STROKE_WIDTH() {
    return 2;
  }
  get NODE_IO_STROKE_COLOR() {
    return "#008EBF";
  }
  get NODE_IO_FILL_COLOR() {
    return "#008EBF";
  }
  get NODE_IO_NAME_FONT() {
    return "bold 11px verdana";
  }
  get NODE_IO_NAME_COLOR() {
    return "bold 11px black";
  }
  get NODE_IO_POINT_RADIUS() {
    return 10;
  }

  // IO Connections

  get CONNECTION_IO_WIDTH() {
    return 4;
  }
  get CONNECTION_IO_INVALID_COLOR() {
    return "red";
  }
  get CONNECTION_IO_VALID_COLOR() {
    return "lightblue";
  }
  get CONNECTION_IO_COLOR() {
    return "#008EBF";
  }
  get CONNECTION_PREV_NEXT_WIDTH() {
    return 4;
  }
  get CONNECTION_PREV_NEXT_INVALID_COLOR() {
    return "red";
  }
  get CONNECTION_PREV_NEXT_VALID_COLOR() {
    return "lightgreen";
  }
  get CONNECTION_PREV_NEXT_COLOR() {
    return "#069DD1";
  }
  get CONNECTION_PREV_NEXT_COLOR() {
    return "#31A200";
  }

  static current = new Theme();
}