import { createContext, useContext, useState, ReactNode } from 'react';

type CartItem = {
  _id: string;
  name: string;
  price: number;         // Giá sau khuyến mãi
  quantity: number;
  originalPrice?: number;
  image: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  calculateTotal: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    const newItem: CartItem = {
      ...item,
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 1,
      originalPrice: item.originalPrice ? Number(item.originalPrice) : undefined,
    };

    setCartItems((prevItems) => {
      const existing = prevItems.find((i) => i._id === newItem._id);
      if (existing) {
        return prevItems.map((i) =>
          i._id === newItem._id ? { ...i, quantity: i.quantity + newItem.quantity } : i
        );
      }
      return [...prevItems, newItem];
    });
  };

  const increaseQuantity = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item._id === id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
        )
        // Nếu muốn xóa item khi quantity = 0, có thể filter ở đây:
        // .filter(item => item.quantity > 0)
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };
  console.log(cartItems);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
