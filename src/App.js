import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    values: {},
    fetching: false,
    output: null
  };

  get CLUBHOUSE_API_TOKEN() {
    return process.env.REACT_APP_CLUBHOUSE_API_TOKEN;
  }

  handleSubmit = event => {
    event.preventDefault();

    const pattern = /^Merge pull request #\d+ from Tattoodo\/ch(\d+)\//g;
    const text = this.state.values.text;
    const uniq = (v, i, a) => a.indexOf(v) === i;
    const stories = text.split(`\n`)
      .map(line => pattern.exec(line))
      .filter(result => !!result)
      .map(result => result[1])
      .filter(uniq);

    if (stories.length === 0) {
      return this.setState({ output: null, fetching: false });
    }

    this.setState({ fetching: true });
    const url = storyId => `https://api.clubhouse.io/api/v2/stories/${storyId}?token=${this.CLUBHOUSE_API_TOKEN}`
    const payload = stories.map(story => fetch(url(story)).then(response => response.json()));

    Promise.all(payload).then(stories => {
      console.log(stories);
      const output = stories.map(story => `[ch${story.id}] ${story.name}`).join(`\n`);
      this.setState({ output, fetching: false });
    })
  };

  handleChange = event => {
    event.preventDefault();
    const field = event.target;
    this.setState({
      values: {
        ...this.state.values,
        [field.name]: field.value
      }
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Generate Release Note from pull-request</h1>
        </header>

        <p className="App-intro">
          Paste in a copy of the GitHub release pull-request page text.
          <br />
          <small>(<code>⌘+A ⌘+C</code> on the pull-request page)</small>
        </p>

        {this.state.fetching && <p className="App-fetching">Fetching…</p>}
        {this.state.output && <pre><code>{'```\n'}{this.state.output}{'\n```'}</code></pre>}

        <form onSubmit={this.handleSubmit}>
          <textarea name="text" onChange={this.handleChange}></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
