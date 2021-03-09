const fs = require("fs");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

let aboutMessage = "Issue Tracker API v1.0";
const products = [];

const resolvers = {
    Query: {
        productList,
        about,
    },
    Mutation: {
        addProduct,
        setAboutMessage,
    },
};

function productList() {
    return products;
}

function about() {
    return aboutMessage;
}

function addProduct(_, { product }) {
    product.id = products.length + 1;
    products.push(product);
    return product;
}

function setAboutMessage(_, { message }) {
    return (aboutMessage = message);
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync("./server/schema.graphql", "utf-8"),
    resolvers,
});

const app = express();

app.use(express.static("public"));

server.applyMiddleware({ app, path: "/graphql" });

app.listen(3000, function() {
    console.log("App started on port 3000");
});