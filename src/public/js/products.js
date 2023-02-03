const socket = io()
const source = "../views/laouts/realTimeProducts";
const template = Handlebars.compile(source);
socket.on("products",(products) => {
    const html = template(products);
    document.body.innerHTML =html;
});