const productTableHeadings = ['Product Name', 'Price', 'Category', 'Image'];
const NO_DATA_AVAILABLE = 'No Data Available';

function MsgRow(props) {
    const msg = props.msg;
    return (
        <tr className="text-center"><td colSpan="4">{msg}</td></tr>
    )
}

function ErrorMsgAlert(props) {
    const msgs = props.errorMsg;
    return (
        <React.Fragment>
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>
               <ul>
                { msgs.map((msg)=> {  return <li>{msg.extensions.code} - {msg.message} </li> })
                }
                </ul>
            </strong>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
        </React.Fragment>
    )
}

function ProductRow(props) {
    const product = props.product;
    return (
        <tr>
            <td>{product.name}</td>
            <td>${product.price}</td>
            <td>{product.category}</td>
            <td><a href={product.image} target='_blank'>View</a></td>
        </tr>
    );
}


function ProductTable(props) {
    const {headings, products} = props;
    const productRows = products.map( product => <ProductRow key={product.id} product={product}/>)
    return (
<React.Fragment>
            <table className={'table' + ' table-striped' + ' table-hover'}>
            <thead>
            <tr>
                {
                    headings.map((heading, index)=> {
                    return <th key={index}>{heading}</th>
                    })
                }
            </tr>
            </thead>
            <tbody>
                { products.length > 0 ? productRows : (<MsgRow msg={'No Data'} />)}
            </tbody>
        </table>
</React.Fragment>
    )
}

class ProductAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const { name, price, category, image}  = document.forms.productAdd;
        const product = {
            category: category.value,
            price:price.value,
            name:name.value,
            image:image.value,
        }

        this.props.createProduct(product);

        category.value = "";
        price.value = "";
        name.value = "";
        image.value = "";
    }
    render() {
    return (
        <form className={'d-flex' + ' justify-content-between'} name="productAdd" onSubmit={this.handleSubmit}>
           <div className={"form-group"}>
            <label>Category</label>
            <select className={"form-control"} name="category">
                <option value="Shirts">Shirts</option>
                <option value="Jeans">Jeans</option>
                <option value="Jackets">Jacket</option>
                <option value="Sweaters">Sweater</option>
                <option value="Accessories">Accessories</option>
            </select>
            </div>
            <div className={"form-group"}>
            <label>Price Per Unit</label>
            <input className={"form-control"} type="text" name="price" placeholder="$"/>
            </div>
            <div className={"form-group"}>
            <label>Product Name </label>
            <input className={"form-control"} type="text" name="name" placeholder="Name"/>
            </div>
            <div className={"form-group"}>
            <label> Image Url</label>
            <input className={"form-control"} type="text" name="image" placeholder="Image Url"/>
            </div>
            <div className={"form-group"+ " align-self-end"}>
            <button className={'btn ' + ' btn-primary'}>Add Product</button>
            </div>
        </form>
        )
    }
}

async function graphQLFetch(query, variables = {}, setErrorState = () => {}) {
    try {
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables })
        });
        const result = await response.json();

        if(result.errors) {
            setErrorState(result.errors);
            return result.errors;
        }
        console.log('Here also - ', result);
        return result.data;
    } catch(e) {
        console.log('inside.catch.error',e);

    }
}

class ProductList extends React.Component {
    constructor() {
        super();
        this.state = {products: [], errors:[]};
        this.createProduct = this.createProduct.bind(this);
        this.setErrorState = this.setErrorState.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    setErrorState(errorMsg) {
        this.setState({errors:errorMsg});
    }

    async loadData() {
        const query = `
        query {
            productList {
                id
                name
                category
                price
                image
            }
        }`;

        const data = await graphQLFetch(query, this.setErrorState);
        if(data) {
            this.setState({products: data.productList})
        }
    }

   async createProduct(product) {
       const query = `
       mutation addProduct($product: ProductInputs!) {
           addProduct(product: $product) {
               id
           }
       }`;

       const data = await graphQLFetch(query, {product}, this.setErrorState);
       console.log('Data after graphqlfetch - ', data);
       if(data) {
           this.loadData();
       }
        // product.id = this.state.products.length + 1;
        // const newProductList = this.state.products.slice();
        // newProductList.push(product);
        // this.setState({products:newProductList});
        // console.log('newProductList', newProductList)
    }

    render() {
        return (
             <div className={'container'}>
                <h1 className={'text-center m-3 mt-5'}> My Company Inventory</h1>
                { this.state.errors?.length ? <ErrorMsgAlert errorMsg={this.state.errors} /> : ''}
                <p>Showing {this.state.products.length} available products</p>
                <ProductTable headings={productTableHeadings} products= {this.state.products} errors={this.state.errors}/>
                <hr className={'mt-5'}/>
                <ProductAdd createProduct={this.createProduct} />
                <hr/>
            </div>
        )
    }
}

const productList = <ProductList/>;
ReactDOM.render(productList, document.getElementById('inventoryMgmtSys'))