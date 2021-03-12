const productTableHeadings = ['Product Name', 'Price', 'Category', 'Image'];
const NO_DATA_AVAILABLE = 'No Data Available';

function MsgRow(props) {
  const msg = props.msg;
  return /*#__PURE__*/React.createElement("tr", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("td", {
    colSpan: "4"
  }, msg));
}

function ErrorMsgAlert(props) {
  const msgs = props.errorMsg;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "alert alert-danger alert-dismissible fade show",
    role: "alert"
  }, /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement("ul", null, msgs.map(msg => {
    return /*#__PURE__*/React.createElement("li", null, msg.extensions.code, " - ", msg.message, " ");
  }))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "close",
    "data-dismiss": "alert",
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\xD7"))));
}

function ProductRow(props) {
  const product = props.product;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, product.name), /*#__PURE__*/React.createElement("td", null, "$", product.price), /*#__PURE__*/React.createElement("td", null, product.category), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("a", {
    href: product.image,
    target: "_blank"
  }, "View")));
}

function ProductTable(props) {
  const {
    headings,
    products
  } = props;
  const productRows = products.map(product => /*#__PURE__*/React.createElement(ProductRow, {
    key: product.id,
    product: product
  }));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("table", {
    className: 'table' + ' table-striped' + ' table-hover'
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, headings.map((heading, index) => {
    return /*#__PURE__*/React.createElement("th", {
      key: index
    }, heading);
  }))), /*#__PURE__*/React.createElement("tbody", null, products.length > 0 ? productRows : /*#__PURE__*/React.createElement(MsgRow, {
    msg: 'No Data'
  }))));
}

class ProductAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      name,
      price,
      category,
      image
    } = document.forms.productAdd;
    const product = {
      category: category.value,
      price: price.value,
      name: name.value,
      image: image.value
    };
    this.props.createProduct(product);
    category.value = "";
    price.value = "";
    name.value = "";
    image.value = "";
  }

  render() {
    return /*#__PURE__*/React.createElement("form", {
      className: 'd-flex' + ' justify-content-between',
      name: "productAdd",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Category"), /*#__PURE__*/React.createElement("select", {
      className: "form-control",
      name: "category"
    }, /*#__PURE__*/React.createElement("option", {
      value: "Shirts"
    }, "Shirts"), /*#__PURE__*/React.createElement("option", {
      value: "Jeans"
    }, "Jeans"), /*#__PURE__*/React.createElement("option", {
      value: "Jackets"
    }, "Jacket"), /*#__PURE__*/React.createElement("option", {
      value: "Sweaters"
    }, "Sweater"), /*#__PURE__*/React.createElement("option", {
      value: "Accessories"
    }, "Accessories"))), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Price Per Unit"), /*#__PURE__*/React.createElement("input", {
      className: "form-control",
      type: "text",
      name: "price",
      placeholder: "$"
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Product Name "), /*#__PURE__*/React.createElement("input", {
      className: "form-control",
      type: "text",
      name: "name",
      placeholder: "Name"
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, " Image Url"), /*#__PURE__*/React.createElement("input", {
      className: "form-control",
      type: "text",
      name: "image",
      placeholder: "Image Url"
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group" + " align-self-end"
    }, /*#__PURE__*/React.createElement("button", {
      className: 'btn ' + ' btn-primary'
    }, "Add Product")));
  }

}

async function graphQLFetch(query, variables = {}, setErrorState = () => {}) {
  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables
      })
    });
    const result = await response.json();

    if (result.errors) {
      setErrorState(result.errors);
      return result.errors;
    }

    console.log('Here also - ', result);
    return result.data;
  } catch (e) {
    console.log('inside.catch.error', e);
  }
}

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      errors: []
    };
    this.createProduct = this.createProduct.bind(this);
    this.setErrorState = this.setErrorState.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  setErrorState(errorMsg) {
    this.setState({
      errors: errorMsg
    });
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

    if (data) {
      this.setState({
        products: data.productList
      });
    }
  }

  async createProduct(product) {
    const query = `
       mutation addProduct($product: ProductInputs!) {
           addProduct(product: $product) {
               id
           }
       }`;
    const data = await graphQLFetch(query, {
      product
    }, this.setErrorState);
    console.log('Data after graphqlfetch - ', data);

    if (data) {
      this.loadData();
    } // product.id = this.state.products.length + 1;
    // const newProductList = this.state.products.slice();
    // newProductList.push(product);
    // this.setState({products:newProductList});
    // console.log('newProductList', newProductList)

  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: 'container'
    }, /*#__PURE__*/React.createElement("h1", {
      className: 'text-center m-3 mt-5'
    }, " My Company Inventory"), this.state.errors?.length ? /*#__PURE__*/React.createElement(ErrorMsgAlert, {
      errorMsg: this.state.errors
    }) : '', /*#__PURE__*/React.createElement("p", null, "Showing ", this.state.products.length, " available products"), /*#__PURE__*/React.createElement(ProductTable, {
      headings: productTableHeadings,
      products: this.state.products,
      errors: this.state.errors
    }), /*#__PURE__*/React.createElement("hr", {
      className: 'mt-5'
    }), /*#__PURE__*/React.createElement(ProductAdd, {
      createProduct: this.createProduct
    }), /*#__PURE__*/React.createElement("hr", null));
  }

}

const productList = /*#__PURE__*/React.createElement(ProductList, null);
ReactDOM.render(productList, document.getElementById('inventoryMgmtSys'));