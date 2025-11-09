import { Navbar } from "../../components/Navbar";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/getAllProducts";
import { getAllCategories } from "../../api/getAllCategories";
import { ProductCard } from "../../components/ProductCard";
import { useCart } from "../../context/cart-context";
import { getProductsByCategory } from "../../utils/getProductsByCategory";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories,setCategories]=useState([]);
  const [selectedCategory,setSelectedCategory]=useState("All")
  const {cart,wishlist}=useCart()
  // console.log(cart);
  // console.log(wishlist);

  useEffect(() => {
    (async () => {
      //is comming from upi and assign to variable
      const items = await getAllProducts();
      const category=await getAllCategories();
      const updatedCategories=[...category,{id:'1a',name:'All'}]
      setProducts(items);
      setCategories(updatedCategories)
      // console.log("products",products);
    })();
  }, []);

  const onCategoryClick=(category)=>{
   setSelectedCategory(category)
  }
 
  const filterByCategories= getProductsByCategory(products,selectedCategory)

  return (
    <>
      <div>
        <Navbar/>
        <main className="!pt-30">
        <div className="flex gap-4 justify-center !mb-4">
          {
            categories?.length>0&& categories.map(category=><div className="bg-gray-400 font-semibold rounded-full !p-1 hover:cursor-pointer" onClick={()=>onCategoryClick(category.name)} key={category.id}>{category.name}</div>)
          }
        </div>
        <div className="flex flex-wrap gap-8 justify-center">
          {
          filterByCategories?.length > 0 ?
            filterByCategories.map((product) => (
              <ProductCard key={product.id} product={product} />
            )):<h2>No Products found, Please try with another category</h2>
            }
          </div>
        </main>
      </div>
    </>
  );
};
