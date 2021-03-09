function ProductRow(props) {
  const product = props.product;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, product.name), /*#__PURE__*/React.createElement("td", null, "$", product.price), /*#__PURE__*/React.createElement("td", null, product.category), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("a", {
    href: product.image,
    target: "_blank"
  }, "View")));
}

function ProductTable(props) {
  const productRows = props.products.map(product => /*#__PURE__*/React.createElement(ProductRow, {
    key: product.id,
    product: product
  }));
  return /*#__PURE__*/React.createElement("table", {
    className: 'table' + ' table-striped' + ' table-hover'
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Product Name"), /*#__PURE__*/React.createElement("th", null, "Price"), /*#__PURE__*/React.createElement("th", null, "Category"), /*#__PURE__*/React.createElement("th", null, "Image"))), /*#__PURE__*/React.createElement("tbody", null, productRows));
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
      price: form.pprice.value,
      name: form.pname.value,
      image: form.pimage.value
    };
    this.props.createProduct(product);
    form.pcategory.value = "";
    form.pprice.value = "";
    form.pname.value = "";
    form.pimage.value = "";
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
      name: "pcategory"
    }, /*#__PURE__*/React.createElement("option", null, "T-shirt"), /*#__PURE__*/React.createElement("option", null, "Jeans"), /*#__PURE__*/React.createElement("option", null, "Jacket"), /*#__PURE__*/React.createElement("option", null, "Sweater"), /*#__PURE__*/React.createElement("option", null, "Accessories"))), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Price Per Unit"), /*#__PURE__*/React.createElement("input", {
      className: "form-control",
      type: "text",
      name: "pprice",
      placeholder: "$"
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Product Name "), /*#__PURE__*/React.createElement("input", {
      className: "form-control",
      type: "text",
      name: "pname",
      placeholder: "Name"
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, " Image Url"), /*#__PURE__*/React.createElement("input", {
      className: "form-control",
      type: "text",
      name: "pimage",
      placeholder: "Image Url"
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group" + " align-self-end"
    }, /*#__PURE__*/React.createElement("button", {
      className: 'btn ' + ' btn-primary'
    }, "Add Product")));
  }

}

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
    this.createProduct = this.createProduct.bind(this);
  }

  createProduct(product) {
    product.id = this.state.products.length + 1;
    const newProductList = this.state.products.slice();
    newProductList.push(product);
    this.setState({
      products: newProductList
    });
    console.log('newProductList', newProductList);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: 'container'
    }, /*#__PURE__*/React.createElement("h1", {
      className: 'text-center m-3 mt-5'
    }, " My Company Inventory"), /*#__PURE__*/React.createElement("p", null, "Showing ", this.state.products.length, " available products"), /*#__PURE__*/React.createElement(ProductTable, {
      products: this.state.products
    }), /*#__PURE__*/React.createElement("hr", {
      className: 'mt-5'
    }), /*#__PURE__*/React.createElement(ProductAdd, {
      createProduct: this.createProduct
    }), /*#__PURE__*/React.createElement("hr", null));
  }

}

const productList = /*#__PURE__*/React.createElement(ProductList, null);
ReactDOM.render(productList, document.getElementById('inventoryMgmtSys'));