import React from 'react'
import createHistory from 'history/createMemoryHistory'

class MultiStep extends React.Component {
  state = {
    step: 0
  }

  componentDidMount() {
    this.history = createHistory({
      initialEntries: ["/"],
    });
    this.location = this.history.location;
    this.unlisten = this.history.listen((location) => {
      this.setState(location.state)
      console.log('HISTORY: ', this.history)
    })
  }

  componentWillUnMount() {
    this.unlisten();
  }

  back = () => {
    const step = this.state.step - 1
    this.history.push(`/${step}`, { step })

    // this.setState((prevState) => (
    //   { step: prevState.step - 1 }
    // ))
  }

  next = () => {
    const step = this.state.step + 1;
    this.history.push(`/${step}`, { step })

    // this.setState((prevState) => (
    //   { step: prevState.step + 1 }
    // ))
  }

  goTo = (step) => {
    // this.history.push(`/${step}`)
    this.setState({ step });
  }

  render() {
    const stepProps = {
      next: this.next,
      back: this.back
    }

    const currentStep = this.props.render(this.state, stepProps)[this.state.step] || null;

    return (
      <div>
        { currentStep }
      </div>
    )
  }
}

// example steps
export const IntakeForm = ({ next }) => (
  <div>
    <form>
      <input type="text" placeholder="on page one, please type something"/>
    </form>
    <button onClick={next}>next</button>
  </div>
)

export const Instructions = ({ next, back }) => (
  <div>
    <h2>two</h2>
    <p>instruction text</p>
    <button onClick={back}>back</button>
    <button onClick={next}>next</button>
  </div>
)

export const ConfirmPage = ({ back, onSubmit }) => (
  <div>
    <div>
      <h3>nested third page</h3>
      <p>description</p>
      <p>are you sure you want to submit?</p>
    </div>
    <button onClick={back}>back</button>
    <button type="submit" onClick={onSubmit}>submit</button>
  </div>
)


export class Example extends React.Component {

  handleSubmit = () => {
    console.log('submitted')
  }

  render () {
    return (
      <div>
        <h1>Welcome to Tutorial</h1>

        <MultiStep render={(state, props) => (
            [
              <IntakeForm next={props.next} />,
              <Instructions next={props.next} back={props.back} />,
              <ConfirmPage back={props.back} onSubmit={this.handleSubmit}/>,
            ]
          )}
        />
      </div>
    )
  }
}
