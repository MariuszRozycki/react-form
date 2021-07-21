import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    username: '',
    email: '',
    pass: '',
    agreement: false,
    confirmation: false,

    errors: {
      username: false,
      email: false,
      pass: false,
      agreement: false,
    }
  }

  messages = {
    username_incorrect: 'Name must be longer than 6 letters and can not include space!',
    email_incorrect: '@ is not used!',
    pass_incorrect: 'Password must be 8 signs long!',
    agreement_incorrect: 'Agreement is not given!'
  }

  handleChange = e => {
    const name = e.target.name;
    const type = e.target.type;
    const value = e.target.value;
    const checked = e.target.checked;

    if (type === "text" || type === "password" || type === "email") {
      this.setState({
        [name]: value
      })
    } else if (type === "checkbox") {
      this.setState({
        [name]: checked
      })
    }


  }

  handleSubmit = e => {
    e.preventDefault();

    const validation = this.formValidation();

    console.log(validation.correct);

    if (validation.correct) {
      this.setState({
        username: '',
        email: '',
        pass: '',
        agreement: false,
        confirmation: 'Form has been sent.'
      })
    } else {
      this.setState({
        errors: {
          username: !validation.username,
          email: !validation.email,
          pass: !validation.password,
          agreement: !validation.agreement,
        }
      })

      console.log('Form sent');
    }
  }

  formValidation = () => {
    let username = false;
    let email = false;
    let pass = false;
    let agreement = false;
    let correct = false;

    if (this.state.username.length > 7 && this.state.username.indexOf(' ') === -1) {
      username = true;
    }
    if (this.state.email.indexOf('@') !== -1) {
      email = true;
    }
    if (this.state.pass.length > 7) {
      pass = true;
    }
    if (this.state.agreement) {
      agreement = true;
    }
    if (username && email && pass && agreement) {
      correct = true;
    }
    return ({
      username,
      email,
      pass,
      agreement,
      correct
    })
  }

  componentDidUpdate() {
    if (this.state.confirmation !== '') {
      setTimeout(() => this.setState({
        confirmation: ''
      }), 3000)
    }
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit} noValidate>
          <label htmlFor="user">Your name:
            <input
              type="text"
              id="user"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            {this.state.errors.username && <span>{this.messages.username_incorrect}</span>}
          </label>


          <label htmlFor="email">Your e-mail:
            <input
              type="email"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange} />
            {this.state.errors.email && <span>{this.messages.email_incorrect}</span>}
          </label>


          <label htmlFor="password">Your password:
            <input
              type="password"
              id="password"
              name="pass"
              value={this.state.pass}
              onChange={this.handleChange} />
            {this.state.errors.pass && <span>{this.messages.pass_incorrect}</span>}
          </label>


          <label htmlFor="agreement">
            <input
              type="checkbox"
              id="agreement"
              name="agreement"
              checked={this.state.agreement}
              onChange={this.handleChange}
            />
            I agree with all conditions.
            {this.state.errors.agreement && <span>{this.messages.agreement_incorrect}</span>}
          </label>
          <button>Sign in</button>
        </form>
        {this.state.confirmation}
      </div>
    );
  }
}

export default App;
