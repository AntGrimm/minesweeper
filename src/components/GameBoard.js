import React, { Component } from 'react'
import Axios from 'axios'

class GameBoard extends Component {
  state = {
    board: []
  }

  componentDidMount() {
    Axios({
      method: 'post',
      url: 'http://minesweeper-api.herokuapp.com/games'
    }).then(res => {
      console.log(res)
      this.setState({
        board: res.data.board
      })
    })
  }

  cellClicked = (x, y) => {
    console.log('clicked', x, y)
  }

  render() {
    return (
      <>
        <main>
          <h1>Minesweeper!</h1>
          <table>
            <tbody>
              {this.state.board.map((col, i) => {
                return (
                  <tr key={i}>
                    {col.map((row, j) => {
                      return (
                        <td key={j} onClick={() => this.cellClicked(i, j)}>
                          {}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </main>
      </>
    )
  }
}

export default GameBoard
