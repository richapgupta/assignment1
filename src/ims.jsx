
function ProductRow(props) {
    const product = props.product;
    return (
        <tr>
            <td>{product.name}</td>
            <td>${product.price}</td>
            <td>{product.category}</td>
            <td><a href={product.image} target='_blank'>View</a></td>
        </tr>
    )
}


function ProductTable(props) {
    const productRows = props.products.map( product => <ProductRow key={product.id} product={product}/>)
    return (
        <table className={'table' + ' table-striped' + ' table-hover'}>
            <thead>
            <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Image</th>
            </tr>
            </thead>
            <tbody>
                {productRows}
            </tbody>
        </table>
    )
}

class ProductAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.productAdd;
        const product = {
            category: form.pcategory.value,
            price:form.pprice.value,
            name:form.pname.value,
            image:form.pimage.value,
        }

        this.props.createProduct(product);

        form.pcategory.value = "";
        form.pprice.value = "";
        form.pname.value = "";
        form.pimage.value = "";
    }
    render() {
    return (
        <form className={'d-flex' + ' justify-content-between'} name="productAdd" onSubmit={this.handleSubmit}>
           <div className={"form-group"}>
            <label>Category</label>
            <select className={"form-control"} name="pcategory">
                <option>T-shirt</option>
                <option>Jeans</option>
                <option>Jacket</option>
                <option>Sweater</option>
                <option>Accessories</option>
            </select>
            </div>
            <div className={"form-group"}>
            <label>Price Per Unit</label>
            <input className={"form-control"} type="text" name="pprice" placeholder="$"/>
            </div>
            <div className={"form-group"}>
            <label>Product Name </label>
            <input className={"form-control"} type="text" name="pname" placeholder="Name"/>
            </div>
            <div className={"form-group"}>
            <label> Image Url</label>
            <input className={"form-control"} type="text" name="pimage" placeholder="Image Url"/>
            </div>
            <div className={"form-group"+ " align-self-end"}>
            <button className={'btn ' + ' btn-primary'}>Add Product</button>
            </div>
        </form>
        )
    }
}

class ProductList extends React.Component {
    constructor() {
        super();
        this.state = {products: []};
        this.createProduct = this.createProduct.bind(this);
    }

    createProduct(product) {
        product.id = this.state.products.length + 1;
        const newProductList = this.state.products.slice();
        newProductList.push(product);
        this.setState({products:newProductList});
        console.log('newProductList', newProductList)
    }

    render() {
        return (
             <div className={'container'}>
                <h1 className={'text-center m-3 mt-5'}> My Company Inventory</h1>
                <p>Showing {this.state.products.length} available products</p>
            <ProductTable products= {this.state.products}/>
            <hr className={'mt-5'}/>
            <ProductAdd createProduct={this.createProduct} />
            <hr/>
            </div>
        )
    }
}

const productList = <ProductList/>;
ReactDOM.render(productList, document.getElementById('inventoryMgmtSys'))