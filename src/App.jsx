import './App.css';

import React, { Component } from 'react';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      todo: '',
      id: 1,
    };
  }

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem('list'));
    this.setState({
      list: data,
    });
  }

  componentDidUpdate() {
    localStorage.setItem('list', JSON.stringify(this.state.list));
  }

  handleInput = (e) => {
    const todo = e.target.value;
    this.setState({ todo: todo });
  };

  addToDo = () => {
    const item = this.state.todo;
    const obj = { text: item, id: this.state.id, timestamp: Date.now() };
    this.setState({
      list: [...this.state.list, obj],
      todo: '',
      id: this.state.id + 1,
    });
  };

  handleDelete = (index) => {
    const items = [...this.state.list];
    items.splice(index, 1);
    this.setState({
      list: items,
    });
  };

  handleUpdate = (index) => {
    const list = [...this.state.list];
    const todo = this.state.todo;
    const obj = { text: todo, id: this.state.id, timestamp: Date.now() };
    list.splice(index, 1, obj);

    this.setState({
      list: list,
    });
  };

  render() {
    const toDo_List = this.state.list.map((element, index) => (
      <li key={index}>
        {element.text}
        <button type="button" onClick={this.handleDelete}>
          Delete
        </button>
        <button type="button" onClick={() => this.handleUpdate(index)}>
          Update
        </button>
        Count: {element.text.length}
      </li>
    ));

    return (
      <div>
        <input
          type="text"
          value={this.state.todo}
          onChange={this.handleInput}
        />
        <button type="button" onClick={this.addToDo}>
          Save
        </button>

        <div>
          <h1>Todo</h1>
          <ul>{toDo_List}</ul>
        </div>
      </div>
    );
  }
}

export default App;
