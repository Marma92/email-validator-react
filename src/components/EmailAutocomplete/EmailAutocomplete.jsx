import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { filterSuggestions, applyProvider } from "../../lib/filters";

require('./autocomplete.css')

class EmailAutocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""
    };
  }



  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = filterSuggestions(suggestions, userInput)

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  // on click on a suggestion, the given provider should be used in the input's email address
  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: applyProvider(this.state.userInput, e.currentTarget.innerText)
    });
    // it would be a nice bonus, if the input kept the focus on suggestion click
    this.y.focus()
  };

  render() {
    const {
      onChange,
      onClick,
      state: {
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <div class="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;
              return (
                <span>@<span className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </span></span>
              );
            })}
          </div>
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No more suggestions</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <input
          type="text"
          onChange={onChange}
          value={userInput}
          ref={ x => this.y = x }
        />
        {suggestionsListComponent}
      </Fragment>
    );
  }
}

export default EmailAutocomplete;
