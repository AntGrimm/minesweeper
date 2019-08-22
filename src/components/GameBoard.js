import React, { Component } from 'react'
import Cell from './Cell'
import axios from 'axios'

class GameBoard extends Component {
  state = {
    board: [],
    difficulty: 0,
    id: 0
  }

  // Makes a new game on render and component did mount
  makeApiCallNewGame = async minesweeperData => {
    const resp = await axios.post(`http://minesweeper-api.herokuapp.com/games`)
    this.setState({
      board: resp.data.board,
      id: resp.data.id
    })
    console.log(resp)
  }

  // Gets the ID to recall an existing game
  makeApiCallGetGame = async minesweeperData => {
    const resp = await axios.get(
      `http://minesweeper-api.herokuapp.com/games/${this.state.id}`
    )
    this.setState({
      board: resp.data.board
    })
    console.log(resp)
  }

  // Used for click event to check each box for a mine
  makeApiCallCheckGame = async minesweeperData => {
    const resp = await axios.post(
      `http://minesweeper-api.herokuapp.com/games/${this.state.id}/check`
    )
    this.setState({
      board: resp.data.board
    })
    console.log(resp)
  }

  // Used for click even to flag each box
  makeApiCallFlagGame = async minesweeperData => {
    const resp = await axios.post(
      `http://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`
    )
    this.setState({
      board: resp.data.board
    })
    console.log(resp)
  }

  componentDidMount() {
    console.log('mounting')
    this.makeApiCallNewGame()
  }

  cellLeftClicked = (x, y) => {
    console.log('clicked', x, y)
    this.makeApiCallCheckGame()
  }

  cellRightClicked = (x, y) => {
    console.log('right clicked', x, y)
    this.makeApiCallFlagGame()
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
                        <Cell
                          key={j}
                          display={this.state.board[i][j]}
                          leftHandleClick={() => this.cellLeftClicked(i, j)}
                          rightHandleClick={() => this.cellRightClicked(i, j)}
                        />
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
