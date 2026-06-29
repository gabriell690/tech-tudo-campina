import { useState } from "react";

import type { Product } from "../../types/product";

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({
  product,
}: ProductGalleryProps) {

  const images =
    product.images?.length
      ? product.images
      : [
          product.image_url ||
          product.image,
        ];

  const [selectedImage, setSelectedImage] =
    useState(images[0]);

  return (
   <div className="space-y-5 w-full overflow-hidden">

      {/* Imagem principal */}
      <div
        className="
          bg-white
          rounded-3xl
          border
          border-slate-200
          p-8
          overflow-hidden
        "
      >
        <img
          src={selectedImage}
          alt={product.name}
          className="
            w-full
            h-80
            md:h-125
            object-contain
            transition-transform
            duration-500
            hover:scale-105
          "
        />
      </div>

      {/* Miniaturas */}
      <div
  className="
    w-full
    max-w-full
    overflow-x-auto
    overflow-y-hidden
    pb-2
  "
>
  <div
    className="
      flex
      gap-4
      w-max
    "
  >
        {images.map((image, index) => (

          <button
            key={index}
            onClick={() =>
              setSelectedImage(image)
            }
            className={`
              flex-none
              w-20
              h-20
              rounded-2xl
              border
              overflow-hidden
              bg-white
              transition
              ${
                selectedImage === image
                  ? "border-blue-600"
                  : "border-slate-200"
              }
            `}
          >

            <img
              src={image}
              alt=""
              className="
                w-full
                h-full
                object-contain
                p-2
              "
            />

          </button>

              ))}
      </div>
    </div>

    </div>
  );
}