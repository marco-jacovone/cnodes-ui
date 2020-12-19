/**
 * cnodes-ui
 *
 * A GUI for cnodes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import { Theme } from "./theme";
import { OutputSocket } from "@marco.jacovone/cnodes/core/socket";
import { Position } from "../canvas/position";
import { IOConnection } from "../connections/io_connection";
import { CnodesSocketComponent } from "./cnodessocket";

/**
 * This class implement a socket to draw a Input element
 * in the cnodes world
 */
export class InputSocketComponent extends CnodesSocketComponent {
  /** A reference to the imput element */
  #inputElement = null;

  constructor(socket) {
    super(socket);
    super.setup();
  }

  /**
   * Lets create the element
   */
  createElement() {
    let symbolElem = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    symbolElem.setAttribute("cx", 0);
    symbolElem.setAttribute("cy", 0);
    symbolElem.setAttribute("r", Theme.current.NODE_IO_POINT_RADIUS);
    symbolElem.setAttribute("stroke-width", Theme.current.NODE_IO_STROKE_WIDTH);
    symbolElem.setAttribute("stroke", Theme.current.NODE_IO_STROKE_COLOR);
    symbolElem.setAttribute("fill", Theme.current.NODE_IO_FILL_COLOR);

    let labelElem = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    labelElem.style = `
      font: ${Theme.current.NODE_IO_NAME_FONT}; 
      color: ${Theme.current.NODE_IO_NAME_COLOR}; 
      text-align: left;
      width: ${Theme.current.NODE_WIDTH / 2 - 15}px;
      height: 30px;
      line-height: 30px;
      user-select: none;
    `;

    labelElem.innerHTML = `${this.socket.name}`;

    labelElem.setAttribute("x", 0);
    labelElem.setAttribute("y", 0);
    labelElem.setAttribute("transform", `translate(${15}, ${-15})`);
    labelElem.setAttribute("width", Theme.current.NODE_WIDTH / 2 - 15);
    labelElem.setAttribute("height", 30);

    let textInputElem = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    textInputElem.style = `
      font: ${Theme.current.NODE_IO_NAME_FONT}; 
      color: ${Theme.current.NODE_IO_NAME_COLOR}; 
      text-align: left;
      line-height: 30px;
      user-select: none;
    `;

    textInputElem.setAttribute("x", 0);
    textInputElem.setAttribute("y", 0);
    textInputElem.setAttribute("transform", `translate(${Theme.current.NODE_WIDTH / 2}, ${-15})`);
    textInputElem.setAttribute("width", Theme.current.NODE_WIDTH / 2 - 15);
    textInputElem.setAttribute("height", 30);

    this.#inputElement = document.createElement("input");
    this.#inputElement.style = `
      font: ${Theme.current.NODE_IO_NAME_FONT}; 
      color: ${Theme.current.NODE_IO_NAME_COLOR}; 
      width: ${Theme.current.NODE_WIDTH / 2 - 25}px; // 5px less than foreignObject
      height: ${20}px;
      border: 0;
      padding: 2px;
      margin: 2px;
    `;

    this.#inputElement.addEventListener("keyup", (e) => {
      this.socket.value = e.target.value;
    });

    this.#inputElement.setAttribute("value", this.socket.value);
    this.#inputElement.setAttribute("type", "text");

    textInputElem.appendChild(this.#inputElement);

    let inputElem = document.createElementNS("http://www.w3.org/2000/svg", "g");
    inputElem.setAttribute("x", 0);
    inputElem.setAttribute("y", 0);
    inputElem.appendChild(symbolElem);
    inputElem.appendChild(labelElem);
    inputElem.appendChild(textInputElem);

    return inputElem;
  }

  /**
   * The user is moving the pointer around, with a connection pending
   * @param {*} x The x coordinate in SVG space
   * @param {*} y The y coordinate in SVG space
   * @param {*} invalid true if the pointer is overing a unacceptable socket
   */
  connectionMoving(x, y, invalid) {
    let sourcePoint = new Position(this.absPos.x, this.absPos.y);
    let targetPoint = new Position(
      this.currentPeerSocketComponent ? this.currentPeerSocketComponent.absPos.x : x,
      this.currentPeerSocketComponent ? this.currentPeerSocketComponent.absPos.y : y
    );

    let cpXDistance = Math.max(0.8 * Math.abs(sourcePoint.x - targetPoint.x), 100);
    let cp1 = sourcePoint.add(new Position(-cpXDistance, -0.1 * (sourcePoint.y - targetPoint.y)));
    let cp2 = targetPoint.add(new Position(cpXDistance, 0.1 * (sourcePoint.y - targetPoint.y)));

    this.tempConnectionEl.setAttribute(
      "d",
      `
      M ${this.absPos.x} ${this.absPos.y}
      C ${cp1.x} ${cp1.y} ${cp2.x} ${cp2.y} ${targetPoint.x} ${targetPoint.y}
    `
    );

    this.tempConnectionEl.setAttribute("stroke-width", Theme.current.CONNECTION_IO_WIDTH);
    this.tempConnectionEl.setAttribute(
      "stroke",
      invalid
        ? Theme.current.CONNECTION_IO_INVALID_COLOR
        : this.currentPeerSocketComponent
        ? Theme.current.CONNECTION_IO_VALID_COLOR
        : Theme.current.CONNECTION_IO_COLOR
    );
    this.tempConnectionEl.setAttribute("fill", "transparent");
  }

  /**
   * The user has completed a valid connection
   * @param {*} socketComp Peer socket to connect
   */
  connectionDone(socketComp) {
    super.connectionDone(socketComp);

    // This creates the connection and connects sockets
    new IOConnection(socketComp, this, this.canvas);
  }

  /**
   * Query if this socket could accept a connection with
   * a peer socket passed as parmeter
   * @param {*} socketComp Peer socket to connect
   */
  canAcceptPeerSocket(socketComp) {
    return socketComp.socket instanceof OutputSocket;
  }

  /**
   * This socket supports single connection, so if the user
   * connects another socket to it, we have to delete previous connections
   */
  get hasSingleConnection() {
    return true;
  }

  /**
   * This method is called from connection when the connection status
   * of the socket chenged
   */
  updateStatus() {
    // Show/Hide the imput component
    this.#inputElement.style["display"] = this.isConnected ? "block" : "none";
  }
}