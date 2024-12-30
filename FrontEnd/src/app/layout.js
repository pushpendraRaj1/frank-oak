'use client'
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { store } from "./../redux/store";
import { Provider } from "react-redux";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ overflowX: 'hidden' }}>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
