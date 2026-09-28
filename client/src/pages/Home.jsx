import { useEffect, useMemo, useState } from "react";

import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

import api from "../api";
import ProductCard from "../components/ProductCard";

function Home({
  searchTerm,
  setSearchTerm,
}) {
  // =========================================
  // PRODUCT DATA
  // =========================================

  const [products, setProducts] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // =========================================
  // CATEGORY FILTER
  // =========================================

  const [selectedCategory, setSelectedCategory] =
    useState("All");


  // =========================================
  // FETCH PRODUCTS FROM BACKEND
  // =========================================

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response =
          await api.get("/products");

        setProducts(response.data);

      } catch (error) {

        console.error(error);

        setError(
          "Unable to load products."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, []);


  // =========================================
  // FILTER PRODUCTS
  // =========================================
  //
  // This runs whenever:
  // - products change
  // - searchTerm changes
  // - selectedCategory changes
  //

  const filteredProducts = useMemo(() => {

    return products.filter((product) => {

      // Combine searchable product information
      // into one string.
      const searchableText = `
        ${product.name}
        ${product.description}
        ${product.category}
      `.toLowerCase();


      // Check search text
      const matchesSearch =
        searchableText.includes(
          (searchTerm || "")
            .toLowerCase()
            .trim()
        );


      // Check category
      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;


      // Product must satisfy BOTH conditions
      return (
        matchesSearch &&
        matchesCategory
      );

    });

  }, [
    products,
    searchTerm,
    selectedCategory,
  ]);


  // =========================================
  // CATEGORY HANDLER
  // =========================================

  const selectCategory = (category) => {

    setSelectedCategory(category);

    // Scroll to products
    setTimeout(() => {

      document
        .getElementById("products")
        ?.scrollIntoView({
          behavior: "smooth",
        });

    }, 50);

  };


  // =========================================
  // CLEAR FILTERS
  // =========================================

  const clearFilters = () => {

    setSearchTerm("");
    setSelectedCategory("All");

  };


  // =========================================
  // UI
  // =========================================

  return (

    <div className="home">


      {/* =================================
          HERO
      ================================= */}

      <section className="hero-new">

        <div className="hero-content">

          <div className="eyebrow">

            <span></span>

            THE NEW WAY TO SHOP

          </div>


          <h1>

            SHOP

            <br />

            <span>
              WITHOUT
            </span>

            <br />

            LIMITS.

          </h1>


          <p>
            Discover products you'll love,
            carefully selected for modern
            everyday living.
          </p>


          <div className="hero-actions">

            <a
              href="#products"
              className="primary-cta"
            >

              Explore Collection

              <ArrowRight size={18} />

            </a>


            <a
              href="#categories"
              className="secondary-cta"
            >
              View Categories
            </a>

          </div>

        </div>


        {/* HERO VISUAL */}

        <div className="hero-visual">

          <div className="hero-circle"></div>

          <div className="hero-product">
            🛍️
          </div>

          <div className="floating-card">

            <span>
              01
            </span>

            <div>

              <strong>
                Curated
              </strong>

              <small>
                Just for you
              </small>

            </div>

          </div>

        </div>

      </section>



      {/* =================================
          MARQUEE
      ================================= */}

      <div className="marquee">

        <div>

          FREE SHIPPING

          <span>✦</span>

          SECURE CHECKOUT

          <span>✦</span>

          PREMIUM PRODUCTS

          <span>✦</span>

          EASY RETURNS

          <span>✦</span>

          FREE SHIPPING

          <span>✦</span>

          SECURE CHECKOUT

          <span>✦</span>

        </div>

      </div>



      {/* =================================
          CATEGORIES
      ================================= */}

      <section
        id="categories"
        className="categories-section"
      >

        <div className="section-top">

          <div>

            <div className="section-label">
              EXPLORE
            </div>

            <h2>
              Shop by category
            </h2>

          </div>

          <ArrowUpRight />

        </div>


        <div className="category-grid">


          {/* ALL PRODUCTS */}

          <button
            className={`category-card ${
              selectedCategory === "All"
                ? "active-category"
                : ""
            }`}
            onClick={() =>
              selectCategory("All")
            }
          >

            <span>
              00
            </span>

            <div>

              <h3>
                All Products
              </h3>

              <p>
                Explore everything
              </p>

            </div>

            <ArrowUpRight />

          </button>



          {/* ELECTRONICS */}

          <button
            className={`category-card electronics ${
              selectedCategory ===
              "Electronics"
                ? "active-category"
                : ""
            }`}
            onClick={() =>
              selectCategory("Electronics")
            }
          >

            <span>
              01
            </span>

            <div>

              <h3>
                Electronics
              </h3>

              <p>
                Tech for everyday life
              </p>

            </div>

            <ArrowUpRight />

          </button>



          {/* FASHION */}

          <button
            className={`category-card fashion ${
              selectedCategory ===
              "Fashion"
                ? "active-category"
                : ""
            }`}
            onClick={() =>
              selectCategory("Fashion")
            }
          >

            <span>
              02
            </span>

            <div>

              <h3>
                Fashion
              </h3>

              <p>
                Find your style
              </p>

            </div>

            <ArrowUpRight />

          </button>



          {/* LIFESTYLE */}

          <button
            className={`category-card lifestyle ${
              selectedCategory ===
              "Lifestyle"
                ? "active-category"
                : ""
            }`}
            onClick={() =>
              selectCategory("Lifestyle")
            }
          >

            <span>
              03
            </span>

            <div>

              <h3>
                Lifestyle
              </h3>

              <p>
                Upgrade your everyday
              </p>

            </div>

            <ArrowUpRight />

          </button>



          {/* ACCESSORIES */}

          <button
            className={`category-card accessories ${
              selectedCategory ===
              "Accessories"
                ? "active-category"
                : ""
            }`}
            onClick={() =>
              selectCategory("Accessories")
            }
          >

            <span>
              04
            </span>

            <div>

              <h3>
                Accessories
              </h3>

              <p>
                Complete the look
              </p>

            </div>

            <ArrowUpRight />

          </button>


        </div>

      </section>



      {/* =================================
          PRODUCTS
      ================================= */}

      <section
        id="products"
        className="products-section-new"
      >


        <div className="section-top">

          <div>

            <div className="section-label">
              OUR COLLECTION
            </div>

            <h2>
              Featured products
            </h2>

          </div>


          <span className="product-count">

            {filteredProducts.length}

            {" "}

            PRODUCTS

          </span>

        </div>



        {/* LOADING */}

        {loading && (

          <div className="loading">
            Loading collection...
          </div>

        )}



        {/* ERROR */}

        {error && (

          <div className="error">
            {error}
          </div>

        )}



        {/* ACTIVE FILTER */}

        {!loading &&
          (searchTerm ||
            selectedCategory !== "All") && (

            <div className="active-filters">

              <span>
                Showing:
              </span>


              {searchTerm && (

                <button
                  onClick={() =>
                    setSearchTerm("")
                  }
                >
                  Search: "{searchTerm}" ×
                </button>

              )}


              {selectedCategory !==
                "All" && (

                <button
                  onClick={() =>
                    setSelectedCategory("All")
                  }
                >
                  {selectedCategory} ×
                </button>

              )}


              <button
                onClick={clearFilters}
              >
                Clear all
              </button>

            </div>

          )}



        {/* NO PRODUCTS */}

        {!loading &&
          filteredProducts.length === 0 && (

            <div className="empty-products">

              <div>
                🔎
              </div>

              <h3>
                No products found
              </h3>

              <p>
                Try another search or category.
              </p>

              <button
                className="primary-cta"
                onClick={clearFilters}
              >
                Clear Filters
              </button>

            </div>

          )}



        {/* PRODUCT GRID */}

        {!loading &&
          filteredProducts.length > 0 && (

            <div className="product-grid-new">

              {filteredProducts.map(
                (product) => (

                  <ProductCard
                    key={product._id}
                    product={product}
                  />

                )
              )}

            </div>

          )}

      </section>



      {/* =================================
          BRAND STATEMENT
      ================================= */}

      <section className="statement">

        <div className="statement-number">
          2026
        </div>


        <div>

          <div className="section-label">
            WHY SHOPEZ
          </div>

          <h2>

            Less searching.

            <br />

            More discovering.

          </h2>


          <p>

            We believe shopping should feel
            simple, inspiring and personal.
            SHOPEZ brings everything together
            in one beautiful place.

          </p>

        </div>

      </section>


    </div>

  );
}

export default Home;