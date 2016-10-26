// Establish a Socket.io connection
const socket = io()
// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const app = feathers()
  .configure(feathers.socketio(socket))
  .configure(feathers.hooks())
  // Use localStorage to store our login token
  .configure(feathers.authentication({
    storage: window.localStorage
  }))

const ComposeQuestion = React.createClass({
  getInitialState() {
    return { text: '', qID: 0, isQuestion: false }
  },

  updateText(ev) {
    this.setState({ text: ev.target.value })
  },

  submit(ev) {
    app.service('submissions').create(this.state)
      .then(() => this.setState({ text: '' }))
    ev.preventDefault()
  },

  render() {
    return (
      <form className="form-input" onSubmit={this.submit}>
        <input className="text-input" type="text" name="text"
          value={this.state.text} onChange={this.updateText} placeholder="Say something!" />
        <button className="button-input" type="submit">Send</button>
      </form>
    )
  }
})

const QuestionList = React.createClass({
  renderSubmission(submission) {

    return (
      <div className="col-md-6">
        <div className="question-wrapper">
          <h3 className="question-content">
            {submission.text}
          </h3>
          <p className="question-submitter">
            {submission.user}
          </p>
        </div>
      </div>
    )
  },

  render() {
    return (
      <main className="chat flex flex-column flex-1 clear">
        {this.props.submissions.map(this.renderSubmission)}
      </main>
    )
  }
})

const ForumApp = React.createClass({
  getInitialState() {
    return {
      users: [],
      submissions: []
    }
  },

  componentDidMount() {
    const submissionService = app.service('submissions');

    // Find the last 10 submissions
    submissionService.find({
      query: {
        $sort: { createdAt: -1 },
        $limit: 100
      }
    }).then(page => this.setState({ submissions: page.data }));
    // Listen to newly created submissions
    submissionService.on('created', submission => this.setState({
      submissions: this.state.submissions.concat(submission)
    }))
  },

  render() {
    return (
      <div className="app-container">
        <div className="header-container col-md-12 container">
          <div className="jumbotron header">
            <h1>Mongoose Callboard</h1>
            <p>Add to the webpage! Powered by feathers.js, Mongodb, Mongoose & React.js</p>
            <ComposeQuestion />
          </div>
        </div>
        <QuestionList users={this.state.users} submissions={this.state.submissions} />
      </div>
    )
  }
})

const App = () => {
  return (
    <div id="app" className="col-md-12">
      <ForumApp />
    </div>
  )
}

app.authenticate().then(() => {
  ReactDOM.render(<App />, document.body)
}).catch(error => {
  if(error.code === 401) {
    window.location.href = '/login.html'
  }

  console.error(error)
})
