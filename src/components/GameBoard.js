import React, { Component } from 'react'
import Cell from './Cell'
import axios from 'axios'

class GameBoard extends Component {
  state = {
    board: [],
    difficulty: 0,
    id: 0,
    mines: 0,
    state: ''
  }

  // Makes a new game on render and component did mount
  makeApiCallNewGame = async minesweeperData => {
    const resp = await axios.post(`http://minesweeper-api.herokuapp.com/games`)
    this.setState({
      board: resp.data.board,
      id: resp.data.id,
      mines: resp.data.mines,
      state: resp.data.state
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
  leftClickCell = async (x, y) => {
    const resp = await axios.post(
      `http://minesweeper-api.herokuapp.com/games/${this.state.id}/check`,
      {
        row: x,
        col: y
      }
    )
    this.setState({
      board: resp.data.board,
      state: resp.data.state
    })
    console.log(resp)
  }

  // Used for click even to flag each box
  rightClickCell = async (x, y) => {
    const resp = await axios.post(
      `http://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`,
      {
        row: x,
        col: y
      }
    )
    this.setState({
      board: resp.data.board,
      mines: resp.data.mines,
      state: resp.data.state
    })
    console.log(resp)
  }

  componentDidMount() {
    console.log('mounting')
    this.makeApiCallNewGame()
  }

  reset = () => {
    console.log('mounting')
    this.makeApiCallNewGame()
  }

  // mediumDifficulty = async () => {
  //   const resp = await axios.post(
  //   )
  //     this.setState({
  //       difficulty: 1,
  //       difficulty: resp.data.difficulty
  // }
  //   )

  render() {
    return (
      <>
        <main>
          <h1>Minesweeper!</h1>
          <section className="play-area">
            <h2>Mines: {this.state.mines}</h2>
            <h2>Status: {this.state.state}</h2>
            <button className="reset-button" onClick={this.reset}>
              Reset
            </button>
            <button
              className="difficulty-medium"
              onClick={this.mediumDifficulty}
            >
              Medium
            </button>
          </section>
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
                          leftHandleClick={() => this.leftClickCell(i, j)}
                          rightHandleClick={() => this.rightClickCell(i, j)}
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
