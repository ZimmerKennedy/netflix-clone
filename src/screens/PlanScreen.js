import React, { useEffect, useState } from "react";
import "./PlanScreen.css";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";

const PlanScreen = () => {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = collection(db, "products");
      const activeProductsQuery = query(
        productsRef,
        where("active", "==", true)
      );
      const querySnapshot = await getDocs(activeProductsQuery);

      const products = {};
      querySnapshot.forEach(async (productDoc) => {
        products[productDoc.id] = productDoc.data();
        const priceSnap = await getDocs(collection(productDoc.ref, "prices"));
        priceSnap.docs.forEach((price) => {
          products[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
      });
      setProducts(products);
    };

    fetchProducts();
  }, []);

  const loadCheckout = async (priceId) => {
    const checkoutSessionsRef = collection(
      db,
      "customers",
      user.uid,
      "checkout_sessions"
    );

    const docRef = await addDoc(checkoutSessionsRef, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

    onSnapshot(docRef, async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`An error occurred: ${error.message}`);
      }
      if (sessionId) {
        console.log('sessionId:', sessionId);
        const stripe = await loadStripe(
          "pk_live_51Ma2KaLcPQfq72GvwFpUXoCUir7mgNuiUewOu0xDjjyGfxsXEfs35iSlyySZPnBcdRtOqXwbR6bSh76rLS9FGI5R00p6d9MFux"
        );
        stripe.redirectToCheckout({ sessionId });
      }
      console.log(`products`, sessionId);
    });
  };

  return (
    <div className="planScreen">
      {Object.entries(products).map(([productId, productData]) => {
        return (
          <div className="planScreen__plan">
            <div className="planScreen__info">
              <h5> {productData.name} </h5>
              <h6> {productData.description} </h6>
            </div>
            <button onClick={() => loadCheckout(productData.prices.priceId)}>
              Subscribe
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PlanScreen;
