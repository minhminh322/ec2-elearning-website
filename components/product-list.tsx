import { Product } from "@prisma/client";
import { ProductCard } from "./product-card";

type ProductWithProgress = Product & {
  courses: { id: string }[];
  progress: number | null;
};

interface ProductListProps {
  products: ProductWithProgress[];
}

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.name}
            imageId={product.imageId!}
            price={product.price!}
            progress={product.progress}
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No products found
        </div>
      )}
    </div>
  );
};
