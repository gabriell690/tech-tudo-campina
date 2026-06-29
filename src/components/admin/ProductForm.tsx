/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import imageCompression from "browser-image-compression";

import AdminSidebar from "../../components/admin/AdminSidebar";
import ImageCropper from "../../components/admin/ImageCropper";

import { useCategories } from "../../hooks/useCategories";

import { supabase } from "../../lib/supabase";

import { getCroppedImg } from "../../utils/cropImage";

interface ProductImage {

  id: string;

  file?: File;

  url: string;

  existing: boolean;

  principal: boolean;

}

export default function ProductForm() {

  const navigate = useNavigate();

  const { id } = useParams();

  const isEditing = Boolean(id);

  const { categories } = useCategories();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");

  const [brand, setBrand] = useState("");

  const [description, setDescription] = useState("");

  const [price, setPrice] = useState("");

  const [oldPrice, setOldPrice] = useState("");

  const [stock, setStock] = useState("");

  const [featured, setFeatured] = useState(false);

  const [active, setActive] = useState(true);

  const [categoryId, setCategoryId] = useState("");

  const [subcategoryId, setSubcategoryId] =
    useState("");

  const [images, setImages] =
    useState<ProductImage[]>([]);

  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

  const [editingIndex, setEditingIndex] =
    useState<number | null>(null);

  const [croppedArea, setCroppedArea] =
    useState<any>(null);

  const selectedCategory = useMemo(() => {

    return categories.find(
      (item) => item.id === categoryId
    );

  }, [categories, categoryId]);

  const subcategories =
    selectedCategory?.subcategories ?? [];

  useEffect(() => {

    loadProduct();

  }, [id]);

  async function loadProduct() {

    if (!id) return;

    const { data, error } =
      await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !data) return;

    setName(data.name);

    setBrand(data.brand);

    setDescription(data.description);

    setPrice(String(data.price));

    setOldPrice(
      data.old_price
        ? String(data.old_price)
        : ""
    );

    setStock(String(data.stock));

    setCategoryId(
      data.category_id ?? ""
    );

    setSubcategoryId(
      data.subcategory_id ?? ""
    );

    setFeatured(data.featured);

    setActive(data.active);

    if (data.images?.length) {

      setImages(

        data.images.map(
          (
            url: string,
            index: number
          ) => ({

            id: crypto.randomUUID(),

            url,

            existing: true,

            principal:
              index === 0,

          })

        )

      );

    }

  }

  const handleFiles = useCallback(

    (
      files: File[]
    ) => {

      const current =
        images.length;

      const remaining =
        5 - current;

      const selected =
        files.slice(
          0,
          remaining
        );

      if (!selected.length)
        return;

      const list =
        selected.map(
          (file, index) => ({

            id: crypto.randomUUID(),

            file,

            url:
              URL.createObjectURL(
                file
              ),

            existing: false,

            principal:
              current === 0 &&
              index === 0,

          })
        );

      const updated = [

        ...images,

        ...list,

      ];

      setImages(updated);

      setEditingIndex(current);

      setSelectedImage(
        list[0].url
      );

    },

    [images]

  );

  async function handleCropSave() {

    if (

      selectedImage === null ||

      editingIndex === null ||

      !croppedArea

    )
      return;

    const blob =
      await getCroppedImg(

        selectedImage,

        croppedArea

      );

    const file =
      new File(

        [blob],

        `produto-${Date.now()}.webp`,

        {

          type:
            "image/webp",

        }

      );

    const compressed =
      await imageCompression(
        file,
        {

          maxSizeMB: 0.4,

          maxWidthOrHeight:
            1600,

          useWebWorker:
            true,

        }

      );

    setImages((old) => {

      const list = [...old];

      list[
        editingIndex
      ] = {

        ...list[
          editingIndex
        ],

        file: compressed,

        existing: false,

        url:
          URL.createObjectURL(
            compressed
          ),

      };

      return list;

    });

    setSelectedImage(null);

    setEditingIndex(null);

  }

  const removeImage = (
    index: number
  ) => {

    const list = [
      ...images,
    ];

    list.splice(
      index,
      1
    );

    if (
      list.length &&
      !list.some(
        (i) =>
          i.principal
      )
    ) {

      list[0].principal =
        true;

    }

    setImages(list);

  };

  const setPrincipal = (
    index: number
  ) => {

    setImages((old) =>
      old.map(
        (
          image,
          i
        ) => ({

          ...image,

          principal:
            i === index,

        })
      )
    );

  };

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    if (!categoryId) {

      alert(
        "Selecione uma categoria."
      );

      return;

    }

    try {

      setLoading(true);

      const imageUrls: string[] = [];

      const orderedImages = [
        ...images,
      ].sort(

        (a, b) =>
          Number(
            b.principal
          ) -
          Number(
            a.principal
          )

      );
            for (const image of orderedImages) {

        if (image.existing) {

          imageUrls.push(image.url);

          continue;

        }

        if (!image.file) continue;

        const fileName =

          `${Date.now()}-${Math.random()}-${image.file.name}`;

        const {

          error: uploadError,

        } =

          await supabase.storage

            .from("products")

            .upload(

              fileName,

              image.file

            );

        if (uploadError) {

          throw uploadError;

        }

        const { data } =

          supabase.storage

            .from("products")

            .getPublicUrl(

              fileName

            );

        imageUrls.push(

          data.publicUrl

        );

      }

      const slug =

        name

          .toLowerCase()

          .trim()

          .replace(

            /[^\w\s-]/g,

            ""

          )

          .replace(

            /\s+/g,

            "-"

          );

      const payload = {

        name,

        slug,

        brand,

        description,

        stock: Number(stock),

        price: Number(price),

        old_price:

          oldPrice !== ""

            ? Number(oldPrice)

            : null,

        category:

          selectedCategory?.name ?? "",

        category_id:

          categoryId,

        subcategory_id:

          subcategoryId || null,

        image_url:

          imageUrls[0] ?? "",

        images:

          imageUrls,

        featured,

        active,

      };

      let error = null;

      if (isEditing) {

        const response =

          await supabase

            .from("products")

            .update(payload)

            .eq(

              "id",

              id

            );

        error =

          response.error;

      } else {

        const response =

          await supabase

            .from("products")

            .insert(payload);

        error =

          response.error;

      }

      if (error) {

        throw error;

      }

      alert(

        isEditing

          ? "Produto atualizado com sucesso!"

          : "Produto cadastrado com sucesso!"

      );

      navigate(

        "/admin/products"

      );

    } catch (error: any) {

      console.error(error);

      alert(

        error.message

      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="flex">

      <AdminSidebar />

      <main

        className="

          flex-1

          min-h-screen

          bg-slate-100

          p-8

        "

      >

        <div className="max-w-6xl">

          <h1

            className="

              text-4xl

              font-bold

              text-slate-800

            "

          >

            {isEditing

              ? "Editar Produto"

              : "Novo Produto"}

          </h1>

          <form

            onSubmit={handleSubmit}

            className="

              mt-8

              rounded-3xl

              bg-white

              p-8

              shadow-sm

            "

          >

            <div

              className="

                grid

                gap-6

                md:grid-cols-2

              "

            >

              <input

                type="text"

                placeholder="Nome do Produto"

                value={name}

                onChange={(e)=>

                  setName(

                    e.target.value

                  )

                }

                className="

                  rounded-2xl

                  border

                  border-slate-300

                  p-3

                  outline-none

                  focus:border-orange-500

                "

                required

              />

              <input

                type="text"

                placeholder="Marca"

                value={brand}

                onChange={(e)=>

                  setBrand(

                    e.target.value

                  )

                }

                className="

                  rounded-2xl

                  border

                  border-slate-300

                  p-3

                  outline-none

                  focus:border-orange-500

                "

                required

              />

              <select

                value={categoryId}

                onChange={(e)=>{

                  setCategoryId(

                    e.target.value

                  );

                  setSubcategoryId("");

                }}

                className="

                  rounded-2xl

                  border

                  border-slate-300

                  p-3

                  outline-none

                  focus:border-orange-500

                "

                required

              >

                <option value="">

                  Selecione uma categoria

                </option>

                {categories.map(

                  (category)=>(

                    <option

                      key={category.id}

                      value={category.id}

                    >

                      {category.name}

                    </option>

                  )

                )}

              </select>
                            <select

                value={subcategoryId}

                onChange={(e)=>

                  setSubcategoryId(

                    e.target.value

                  )

                }

                className="

                  rounded-2xl

                  border

                  border-slate-300

                  p-3

                  outline-none

                  focus:border-orange-500

                "

              >

                <option value="">

                  Selecione uma subcategoria

                </option>

                {subcategories.map(

                  (subcategory)=>(

                    <option

                      key={subcategory.id}

                      value={subcategory.id}

                    >

                      {subcategory.name}

                    </option>

                  )

                )}

              </select>

              <input

                type="number"

                placeholder="Estoque"

                value={stock}

                onChange={(e)=>

                  setStock(

                    e.target.value

                  )

                }

                className="

                  rounded-2xl

                  border

                  border-slate-300

                  p-3

                  outline-none

                  focus:border-orange-500

                "

                required

              />

              <input

                type="number"

                step="0.01"

                placeholder="Preço"

                value={price}

                onChange={(e)=>

                  setPrice(

                    e.target.value

                  )

                }

                className="

                  rounded-2xl

                  border

                  border-slate-300

                  p-3

                  outline-none

                  focus:border-orange-500

                "

                required

              />

              <input

                type="number"

                step="0.01"

                placeholder="Preço Antigo"

                value={oldPrice}

                onChange={(e)=>

                  setOldPrice(

                    e.target.value

                  )

                }

                className="

                  rounded-2xl

                  border

                  border-slate-300

                  p-3

                  outline-none

                  focus:border-orange-500

                "

              />

              <div className="md:col-span-2">

                <label

                  className="

                    mb-2

                    block

                    font-medium

                    text-slate-700

                  "

                >

                  Imagens do Produto

                </label>

                <input

                  type="file"

                  accept="image/*"

                  multiple

                  onChange={(e)=>

                    handleFiles(

                      Array.from(

                        e.target.files || []

                      )

                    )

                  }

                  className="

                    w-full

                    rounded-2xl

                    border

                    border-slate-300

                    p-3

                  "

                />

                <p

                  className="

                    mt-2

                    text-sm

                    text-slate-500

                  "

                >

                  Máximo de 5 imagens.

                </p>

                <div

                  className="

                    mt-6

                    grid

                    grid-cols-2

                    gap-5

                    md:grid-cols-5

                  "

                >

                  {images.map(

                    (

                      image,

                      index

                    )=>(

                      <div

                        key={image.id}

                        className="

                          overflow-hidden

                          rounded-2xl

                          border

                          bg-white

                          shadow-sm

                        "

                      >

                        <img

                          src={image.url}

                          alt=""

                          className="

                            h-44

                            w-full

                            object-cover

                          "

                        />

                        <div className="p-3">

                          {image.principal ? (

                            <span

                              className="

                                mb-3

                                block

                                rounded-lg

                                bg-green-600

                                py-1

                                text-center

                                text-xs

                                font-semibold

                                text-white

                              "

                            >

                              Principal

                            </span>

                          ) : (

                            <button

                              type="button"

                              onClick={()=>

                                setPrincipal(

                                  index

                                )

                              }

                              className="

                                mb-3

                                w-full

                                rounded-lg

                                bg-slate-200

                                py-2

                                text-xs

                                font-semibold

                              "

                            >

                              Tornar Principal

                            </button>

                          )}

                          <button

                            type="button"

                            onClick={()=>{

                              setEditingIndex(

                                index

                              );

                              setSelectedImage(

                                image.url

                              );

                            }}

                            className="

                              mb-2

                              w-full

                              rounded-lg

                              bg-orange-500

                              py-2

                              text-sm

                              font-semibold

                              text-white

                            "

                          >

                            Editar

                          </button>

                          <button

                            type="button"

                            onClick={()=>

                              removeImage(

                                index

                              )

                            }

                            className="

                              w-full

                              rounded-lg

                              bg-red-600

                              py-2

                              text-sm

                              font-semibold

                              text-white

                            "

                          >

                            Excluir

                          </button>

                        </div>

                      </div>

                    )

                  )}

                </div>

              </div>

            </div>

            <textarea
  placeholder="Descrição do produto (opcional)"
  value={description}
  onChange={(e) =>
    setDescription(e.target.value)
  }
  rows={6}
  className="
    mt-6
    w-full
    rounded-2xl
    border
    border-slate-300
    p-4
    outline-none
    focus:border-orange-500
  "
/>
                        <div

              className="

                mt-8

                flex

                flex-wrap

                items-center

                gap-8

              "

            >

              <label

                className="

                  flex

                  items-center

                  gap-3

                  font-medium

                  text-slate-700

                "

              >

                <input

                  type="checkbox"

                  checked={featured}

                  onChange={(e)=>

                    setFeatured(

                      e.target.checked

                    )

                  }

                  className="

                    h-5

                    w-5

                    accent-orange-500

                  "

                />

                Produto em Destaque

              </label>

              <label

                className="

                  flex

                  items-center

                  gap-3

                  font-medium

                  text-slate-700

                "

              >

                <input

                  type="checkbox"

                  checked={active}

                  onChange={(e)=>

                    setActive(

                      e.target.checked

                    )

                  }

                  className="

                    h-5

                    w-5

                    accent-green-600

                  "

                />

                Produto Ativo

              </label>

            </div>

            <div

              className="

                mt-10

                flex

                justify-end

              "

            >

              <button

                type="submit"

                disabled={loading}

                className="

                  rounded-xl

                  bg-orange-500

                  px-10

                  py-3

                  font-semibold

                  text-white

                  transition-all

                  duration-300

                  hover:bg-orange-600

                  hover:shadow-lg

                  disabled:cursor-not-allowed

                  disabled:opacity-60

                "

              >

                {loading

                  ? "Salvando..."

                  : isEditing

                  ? "Atualizar Produto"

                  : "Salvar Produto"}

              </button>

            </div>

          </form>

          {selectedImage && (

            <ImageCropper

              image={selectedImage}

              onCropComplete={setCroppedArea}

              onCancel={() => {

                setSelectedImage(null);

                setEditingIndex(null);

              }}

              onSave={handleCropSave}

            />

          )}

        </div>

      </main>

    </div>

  );

}