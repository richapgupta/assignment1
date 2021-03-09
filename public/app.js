const initialIssues = [{
  id: 1,
  status: 'Unassigned',
  owner: 'Riva',
  effort: 5,
  created: new Date('2018-08-15'),
  due: undefined,
  title: 'Application Page',
  desc: 'Error in console when clicking Add',
  priority: 'Medium',
  label: 'bg-warning'
}, {
  id: 2,
  status: 'Bob',
  owner: 'Eddie',
  effort: 14,
  created: new Date('2018-08-16'),
  due: new Date('2018-08-30'),
  title: 'Login Page',
  desc: 'Login doesnot work on click of login button',
  priority: 'Critical',
  label: 'bg-danger'
}, {
  id: 3,
  status: 'Unassigned',
  owner: 'Riva',
  effort: 5,
  created: new Date('2018-08-15'),
  due: undefined,
  title: 'Application Page',
  desc: 'Completion date should be optional',
  priority: 'Low',
  label: 'bg-success'
}]; // const sampleIssue =  {}

class IssueFilter extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", null, "this is a placholder for filter issues");
  }

}

function r() {
  return Math.floor(Math.random() * 255);
}

function ButtonState(props) {
  const buttonStatus = props.priority;
  const buttonLabel = props.label ? props.label : 'bg-secondary';
  return /*#__PURE__*/React.createElement("button", {
    className: 'btn ' + 'text-white ' + 'w-100 ' + buttonLabel
  }, /*#__PURE__*/React.createElement("strong", null, buttonStatus));
}

function AssignedTo(props) {
  const status = props.status ? props.status : '';
  const color = 'rgb(' + r() + "," + r() + "," + r() + ')';
  const userStyle = {
    backgroundColor: color
  };

  if (status !== 'Unassigned') {
    return /*#__PURE__*/React.createElement("a", {
      href: "#",
      style: userStyle,
      className: "username"
    }, status.charAt(0));
  } else {
    return /*#__PURE__*/React.createElement("span", {
      className: "font-italic"
    }, status);
  }
}

function IssueRow(props) {
  console.log('Issue row render method');
  const style = props.rowStyle;
  const issue = props.issue;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: style
  }, issue.id), /*#__PURE__*/React.createElement("td", {
    style: style
  }, issue.owner), /*#__PURE__*/React.createElement("td", {
    style: style
  }, /*#__PURE__*/React.createElement("h6", {
    className: 'm-0'
  }, /*#__PURE__*/React.createElement("strong", null, " ", issue.title, "  ")), /*#__PURE__*/React.createElement("p", {
    className: 'issue-desc'
  }, issue.desc)), /*#__PURE__*/React.createElement("td", {
    style: style
  }, /*#__PURE__*/React.createElement(ButtonState, {
    priority: issue.priority,
    label: issue.label
  })), /*#__PURE__*/React.createElement("td", {
    style: style
  }, /*#__PURE__*/React.createElement(AssignedTo, {
    status: issue.status
  })), /*#__PURE__*/React.createElement("td", {
    style: style
  }, issue.effort), /*#__PURE__*/React.createElement("td", {
    style: style
  }, issue.created.toDateString()), /*#__PURE__*/React.createElement("td", {
    style: style
  }, issue.due ? issue.due.toDateString() : issue.created.toDateString()));
}

function IssueTable(props) {
  const rowStyle = {
    borderBottom: "1px solid silver",
    textAlign: "left",
    padding: 10,
    display: "table-cell",
    verticalAlign: "middle"
  };
  const issueRows = props.issues.map(issue => /*#__PURE__*/React.createElement(IssueRow, {
    rowStyle: rowStyle,
    key: issue.id,
    issue: issue
  }));
  return /*#__PURE__*/React.createElement("table", {
    style: {
      borderCollapse: "collapse",
      marginBottom: "20px"
    },
    className: 'table' + ' table-striped' + ' table-hover',
    border: "0",
    width: "100%"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: 'text-center',
    style: rowStyle
  }, "ID"), /*#__PURE__*/React.createElement("th", {
    className: 'text-center',
    style: rowStyle
  }, "Customer"), /*#__PURE__*/React.createElement("th", {
    className: 'text-center',
    style: rowStyle
  }, "Conversation"), /*#__PURE__*/React.createElement("th", {
    className: 'text-center',
    style: rowStyle
  }, "Priority"), /*#__PURE__*/React.createElement("th", {
    className: 'text-center',
    style: rowStyle
  }, "Assigned To"), /*#__PURE__*/React.createElement("th", {
    className: 'text-center',
    style: rowStyle
  }, "Effort"), /*#__PURE__*/React.createElement("th", {
    className: 'text-center',
    style: rowStyle
  }, "Created"), /*#__PURE__*/React.createElement("th", {
    className: 'text-center',
    style: rowStyle
  }, "Updated"))), /*#__PURE__*/React.createElement("tbody", null, issueRows));
}

class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this); // setTimeout(() => {
    //     this.props.createIssue(sampleIssue)
    // }, 2000);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.issueAdd;
    const issue = {
      owner: form.owner.value,
      title: form.title.value,
      desc: form.desc.value,
      priority: form.priority.value,
      status: form.status.value,
      effort: form.effort.value
    };
    this.props.createIssue(issue);
    form.owner.value = "";
    form.title.value = "";
    form.desc.value = "";
    form.priority.value = "";
    form.status.value = "";
    form.effort.value = "";
  }

  render() {
    return /*#__PURE__*/React.createElement("form", {
      className: 'd-flex',
      name: "issueAdd",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control",
      type: "text",
      name: "owner",
      placeholder: "Owner"
    }), /*#__PURE__*/React.createElement("input", {
      className: "form-control",
      type: "text",
      name: "title",
      placeholder: "Title"
    }), /*#__PURE__*/React.createElement("input", {
      className: "form-control",
      type: "text",
      name: "desc",
      placeholder: "Description"
    }), /*#__PURE__*/React.createElement("input", {
      className: "form-control",
      type: "text",
      name: "priority",
      placeholder: "Priority"
    }), /*#__PURE__*/React.createElement("input", {
      className: "form-control",
      type: "text",
      name: "status",
      placeholder: "Assigned To"
    }), /*#__PURE__*/React.createElement("input", {
      className: "form-control",
      type: "text",
      name: "effort",
      placeholder: "Effort"
    }), /*#__PURE__*/React.createElement("button", {
      className: 'btn btn-info pull-right'
    }, "Add Issue"));
  }

}

class IssueList extends React.Component {
  constructor() {
    super();
    this.state = {
      issues: []
    };
    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({
        issues: initialIssues
      });
    }, 500);
  }

  createIssue(issue) {
    issue.id = this.state.issues.length + 1;
    issue.created = new Date();
    const newIssueList = this.state.issues.slice();
    newIssueList.push(issue);
    this.setState({
      issues: newIssueList
    });
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: 'container'
    }, /*#__PURE__*/React.createElement("h1", {
      className: 'text-center m-3 mt-5'
    }, " Issue Tracker"), /*#__PURE__*/React.createElement(IssueTable, {
      issues: this.state.issues
    }), /*#__PURE__*/React.createElement(IssueAdd, {
      createIssue: this.createIssue
    })));
  }

}

const ele = /*#__PURE__*/React.createElement(IssueList, null);
ReactDOM.render(ele, document.getElementById('issueTracker'));