const initialIssues = [
    {
    id: 1, status: 'Unassigned', owner: 'Riva', effort: 5,
    created: new Date('2018-08-15'), due: undefined,
    title: 'Application Page',
    desc: 'Error in console when clicking Add',
    priority:'Medium',
    label: 'bg-warning'
    },
    {
    id: 2, status: 'Bob', owner: 'Eddie', effort: 14,
    created: new Date('2018-08-16'), due: new Date('2018-08-30'),
    title: 'Login Page',
    desc: 'Login doesnot work on click of login button',
    priority:'Critical',
    label: 'bg-danger'
    },
    {
        id: 3, status: 'Unassigned', owner: 'Riva', effort: 5,
        created: new Date('2018-08-15'), due: undefined,
        title: 'Application Page',
        desc: 'Completion date should be optional',
        priority:'Low',
        label: 'bg-success'
        }

   ];

// const sampleIssue =  {}
class IssueFilter extends React.Component {
    render() {
        return (
            <div>this is a placholder for filter issues</div>
        );
    }
}
function r() { return Math.floor(Math.random() * 255) }


function ButtonState(props) {
    const buttonStatus = props.priority;
    const buttonLabel = props.label ? props.label : 'bg-secondary';
    return (
        <button className={'btn '+ 'text-white '+ 'w-100 ' + buttonLabel}>
        <strong>
            {buttonStatus}
        </strong>
    </button>
    )
}

function AssignedTo(props) {
    const status = props.status ? props.status : '';
    const color = 'rgb(' + r() + "," + r() + "," + r() + ')';
    const userStyle = {backgroundColor: color};
    if(status !== 'Unassigned') {
        return (
          <a href="#" style={userStyle} className={"username"}>{status.charAt(0)}</a>
        )
    } else {
       return (
        <span className={"font-italic"}>{status}</span>
       )
    }
}

function IssueRow(props) {

        console.log('Issue row render method')
        const style = props.rowStyle;
        const issue = props.issue;
        return (
        <tr>
            <td style={style}>{issue.id}</td>
            <td style={style}>{issue.owner}</td>
            <td style={style}>
                <h6 className={'m-0'}><strong> {issue.title}  </strong></h6>
                <p className={'issue-desc'}>{issue.desc}</p>
            </td>
            <td style={style}>
                <ButtonState priority={issue.priority} label={issue.label}/>
            </td>
            <td style={style}>
                <AssignedTo status={issue.status} />
            </td>
            <td style={style}>{issue.effort}</td>
            <td style={style}>{issue.created.toDateString()}</td>
            <td style={style}>{issue.due ? issue.due.toDateString() : issue.created.toDateString()}</td>
        </tr>
        );
    }


function IssueTable(props) {

        const rowStyle = {borderBottom:"1px solid silver",textAlign:"left",padding: 10,display:"table-cell", verticalAlign:"middle"};
        const issueRows = props.issues.map(issue => <IssueRow  rowStyle={rowStyle} key={issue.id} issue={issue}/>);

        return (
            <table style={{borderCollapse: "collapse", marginBottom: "20px"}} className={'table' + ' table-striped' + ' table-hover'} border='0' width='100%'>
               <thead>
               <tr>
                <th className={'text-center'} style={rowStyle}>ID</th>
                <th className={'text-center'} style={rowStyle}>Customer</th>
                <th className={'text-center'} style={rowStyle}>Conversation</th>
                <th className={'text-center'} style={rowStyle}>Priority</th>
                <th className={'text-center'} style={rowStyle}>Assigned To</th>
                <th className={'text-center'} style={rowStyle}>Effort</th>
                <th className={'text-center'} style={rowStyle}>Created</th>
                <th className={'text-center'} style={rowStyle}>Updated</th>
               </tr>
               </thead>
               <tbody>
                   {issueRows}
                </tbody>
           </table>
        );
    }


class IssueAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        // setTimeout(() => {
        //     this.props.createIssue(sampleIssue)
        // }, 2000);
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.issueAdd;
        const issue = {
            owner : form.owner.value,
            title : form.title.value,
            desc: form.desc.value,
            priority : form.priority.value,
            status : form.status.value,
            effort : form.effort.value,
        }
        this.props.createIssue(issue);
        form.owner.value = "";
        form.title.value = "";
        form.desc.value = "";
        form.priority.value = "";
        form.status.value = "";
        form.effort.value = "";
    }

    render() {
        return (
            <form className={'d-flex'} name="issueAdd" onSubmit={this.handleSubmit}>
                <input className={"form-control"} type="text" name="owner" placeholder="Owner" />
                <input className={"form-control"} type="text" name="title" placeholder="Title" />
                <input className={"form-control"} type="text" name="desc" placeholder="Description" />
                <input className={"form-control"} type="text" name="priority" placeholder="Priority" />
                <input className={"form-control"} type="text" name="status" placeholder="Assigned To" />
                <input className={"form-control"} type="text" name="effort" placeholder="Effort" />
                <button className={'btn btn-info pull-right'}>Add Issue</button>
            </form>
        );
    }
}

class IssueList extends React.Component {
    constructor() {
        super();
        this.state = {issues: []};
        this.createIssue = this.createIssue.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }

    loadData() {
        setTimeout(() => {
            this.setState({issues: initialIssues});
        }, 500);
    }

    createIssue(issue) {
        issue.id = this.state.issues.length + 1;
        issue.created = new Date();
        const newIssueList = this.state.issues.slice();
        newIssueList.push(issue);
        this.setState({issues:newIssueList});
    }
    render() {
        return (
            <React.Fragment>
                <div className={'container'}>
                <h1 className={'text-center m-3 mt-5'}> Issue Tracker</h1>
                {/* <IssueFilter/>
                <hr/> */}
                <IssueTable issues={this.state.issues}/>
                <IssueAdd createIssue={this.createIssue}/>
                </div>
            </React.Fragment>
        );
    }
}

const ele = <IssueList/>;

ReactDOM.render(ele,document.getElementById('issueTracker'));