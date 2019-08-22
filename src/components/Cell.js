import React, { Component } from 'react'

class Cell extends Component {
  render() {
    return (
      <td
        onClick={this.props.leftHandleClick}
        onContextMenu={this.props.rightHandleClick}
      >
        {this.props.display}
      </td>
    )
  }
}

export default Cell
