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
    <div className="space-y-5">

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
            h-[320px]
            md:h-[500px]
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
          flex
          gap-4
          overflow-x-auto
        "
      >
        {images.map((image, index) => (

          <button
            key={index}
            onClick={() =>
              setSelectedImage(image)
            }
            className={`
              shrink-0
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
  );
}