import Products from "./features/product/components/Customer/Products";
import SuggestedProduct from "./features/product/components/Customer/SuggestedProduct";
import Carolie from "./pages/customer/component/Carosel";

// import { ThemeProvider } from "./component/ThemeProvider";

function App() {
  return (
    <>
      <Carolie />
      <SuggestedProduct />
      <Products />
    </>
  );
}
export default App;
