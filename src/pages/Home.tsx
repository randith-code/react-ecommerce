import ProductCard from "@/components/custom/ProductCard";
import products from "../assets/products.json";

const Home = () => {
  return (
    <main>
      <div className="w-full h-[60vh] bg-slate-300"></div>
      <div className="w-full flex flex-col items-center">
        <h2 className="uppercase font-semibold text-2xl py-8">All Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-8 justify-items-center items-stretch w-full">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              imgalt={product.image_alt}
              title={product.name}
              price={product.price}
              description={product.description}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
