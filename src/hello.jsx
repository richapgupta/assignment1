const element = (
    <div className={'container' + ' m-5'}>
        <div title="Outer div">
            <h1>Hello World!!!</h1>
        </div>
    </div>
    );
    ReactDOM.render(element, document.getElementById('contents'))
    // const element = React.createElement('div', { title: 'Outer Div' }, React.createElement('h1', null, 'Hello World!')); ReactDOM.render(element, document.getElementById('contents '));
