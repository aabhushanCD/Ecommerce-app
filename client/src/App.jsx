import Products from "./features/product/Customer/Products";
import SuggestedProduct from "./features/product/Customer/components/SuggestedProduct";
import Carousel from "./pages/customer/component/Carosel";

// import { ThemeProvider } from "./component/ThemeProvider";

function App() {
  return (
    <>
      <Carousel />
      <SuggestedProduct />
      <Products />
    </>
  );
}
export default App;
