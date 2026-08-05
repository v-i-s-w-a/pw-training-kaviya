type Product = {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
};

const products: Product[] = [
  { id: 1, name: "Keyboard", price: 49.99, inStock: true },
  { id: 2, name: "Mouse", price: 24.5, inStock: false },
  { id: 3, name: "Monitor", price: 199.0, inStock: true },
  { id: 4, name: "Headset", price: 79.99, inStock: true },
  { id: 5, name: "Webcam", price: 59.0, inStock: false },
  { id: 6, name: "USB Hub", price: 34.95, inStock: true },
];

const list = products
  .filter(({ inStock }) => inStock)
  .map(({ name, price }) => `${name} — $${price.toFixed(2)}`);

console.log(list);
