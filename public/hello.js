const element = /*#__PURE__*/React.createElement("div", {
  className: 'container' + ' m-5'
}, /*#__PURE__*/React.createElement("div", {
  title: "Outer div"
}, /*#__PURE__*/React.createElement("h1", null, "Hello World!!!")));
ReactDOM.render(element, document.getElementById('contents')); // const element = React.createElement('div', { title: 'Outer Div' }, React.createElement('h1', null, 'Hello World!')); ReactDOM.render(element, document.getElementById('contents '));