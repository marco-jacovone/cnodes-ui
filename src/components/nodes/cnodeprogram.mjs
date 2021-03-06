/**
 * cnodes-ui
 *
 * A GUI for cnodes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020/2021
 */

import { Theme } from "../../index.mjs";
import { MenuItem } from "../../canvas/menu.mjs";
import { CnodeComponent } from "../cnode.mjs";

export class CnodeProgramComponent extends CnodeComponent {
  // Factory function
  static instance = (node, canvas) => new CnodeProgramComponent(node, canvas);

  constructor(node, canvas) {
    super(node, canvas);
  }

  /**
   * This override register a "dblclick" event listener to
   * edit the program
   */
  setup() {
    super.setup();

    // Register a "dblclick" listener to edit the internal program
    this.componentEl.addEventListener("dblclick", (e) => {
      this.canvas.pushProgram(this.node);
    });

    if (!this.node.enter.meta) {
      this.node.enter.meta = {
        pos: {
          x: 0,
          y: 0,
        },
      };
    }
    if (!this.node.exit.meta) {
      this.node.exit.meta = {
        pos: {
          x: 500,
          y: 0,
        },
      };
    }

    return this;
  }

  /**
   * Returns the array of context menu items. This node gets
   * the base node items, and add the action of edit internal program
   */
  getContextMenuItems() {
    let items = super.getContextMenuItems() ?? [];

    items.unshift(
      new MenuItem(
        `<tspan alignment-baseline="middle" style="${Theme.current.MENU_SPECIAL_ITEM_STYLE}">Edit...</tspan>`,
        () => {
          this.canvas.pushProgram(this.node);
        },
        "edit"
      )
    );

    return items.length ? items : null;
  }
}
