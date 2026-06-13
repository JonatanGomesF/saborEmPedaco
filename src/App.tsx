import { useState } from "react";
import Home from "./pages/Home";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import CheckoutDialog from "./components/CheckoutDialog";
import { useCart } from "./context/CartContext";

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  return (
    <>
      <Navbar onOpenCart={() => setCartOpen(true)} />

      {/* ❌ removido onOpenCart daqui */}
      <Home />

      {cartOpen && (
        <div className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-xl z-50 flex flex-col">
          
          <Cart
            items={cartItems}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            removeItem={removeFromCart}
            onClose={() => setCartOpen(false)}
          />

          <button
            onClick={() => {
              setCartOpen(false);
              setCheckoutOpen(true);
            }}
            className="w-full bg-green-600 text-white p-3"
          >
            Finalizar pedido
          </button>
        </div>
      )}

      <CheckoutDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
      />
    </>
  );
}

export default App;