import React, { Component } from 'react'

class Cell extends Component {
  render() {
    return (
      <td
        onClick={this.props.leftHandleClick}
        onContextMenu={e => {
          this.props.rightHandleClick()
          e.preventDefault()
        }}
      >
        {this.props.display}
      </td>
    )
  }
}

export default Cell
