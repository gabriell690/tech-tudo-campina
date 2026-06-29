/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Cropper from "react-easy-crop";

interface Props {

  image: string;

  onCropComplete: (area: any) => void;

  onCancel: () => void;

  onSave: () => void;

}

export default function ImageCropper({

  image,

  onCropComplete,

  onCancel,

  onSave,

}: Props) {

  const [crop, setCrop] = useState({

    x: 0,

    y: 0,

  });

  const [zoom, setZoom] = useState(1);

  const [rotation, setRotation] = useState(0);

  const [aspect, setAspect] = useState(1);

 return (
  <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-0 lg:p-6">

    <div
      className="
        bg-white
        w-full
        h-full
        lg:h-[92vh]
        lg:w-[95vw]
        lg:max-w-7xl
        rounded-none
        lg:rounded-3xl
        overflow-hidden
        flex
        flex-col
        lg:flex-row
      "
    >

      <div
        className="
          relative
          w-full
          h-[55vh]
          lg:h-auto
          flex-1
          bg-neutral-900
        "
      >

        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={aspect}
          cropShape="rect"
          showGrid
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropComplete={(_, areaPixels) =>
            onCropComplete(areaPixels)
          }
        />

      </div>

      <div
        className="
          w-full
          lg:w-96
          p-5
          overflow-y-auto
          border-t
          lg:border-t-0
          lg:border-l
        "
      >

        </div>

        <div

          className="

            flex

            w-96

            flex-col

            border-l

            p-6

          "

        >

          <h2

            className="

              mb-8

              text-2xl

              font-bold

            "

          >

            Editar imagem

          </h2>

          <label

            className="

              mb-2

              font-semibold

            "

          >

            Zoom

          </label>

          <input

            type="range"

            min={1}

            max={5}

            step={0.1}

            value={zoom}

            onChange={(e)=>

              setZoom(

                Number(e.target.value)

              )

            }

          />

          <span className="mb-8">

            {zoom.toFixed(1)}x

          </span>

          <label

            className="

              mb-2

              font-semibold

            "

          >

            Rotação

          </label>

          <input

            type="range"

            min={0}

            max={360}

            step={1}

            value={rotation}

            onChange={(e)=>

              setRotation(

                Number(e.target.value)

              )

            }

          />

          <span className="mb-8">

            {rotation}°

          </span>

          <label

            className="

              mb-3

              font-semibold

            "

          >

            Proporção

          </label>

          <div

            className="

              mb-10

              grid

              grid-cols-2

              gap-3

            "

          >

            <button

              type="button"

              onClick={()=>

                setAspect(1)

              }

              className="rounded-lg bg-slate-200 py-2"

            >

              1:1

            </button>

            <button

              type="button"

              onClick={()=>

                setAspect(4/5)

              }

              className="rounded-lg bg-slate-200 py-2"

            >

              4:5

            </button>

            <button

              type="button"

              onClick={()=>

                setAspect(16/9)

              }

              className="rounded-lg bg-slate-200 py-2"

            >

              16:9

            </button>

            <button

              type="button"

              onClick={()=>

                setAspect(NaN)

              }

              className="rounded-lg bg-slate-200 py-2"

            >

              Livre

            </button>

          </div>

          <div className="mt-auto flex gap-3">

            <button

              type="button"

              onClick={onCancel}

              className="

                flex-1

                rounded-xl

                bg-slate-300

                py-3

                font-semibold

              "

            >

              Cancelar

            </button>

            <button

              type="button"

              onClick={onSave}

              className="

                flex-1

                rounded-xl

                bg-orange-500

                py-3

                font-semibold

                text-white

              "

            >

              Aplicar

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}