import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";

type ProductCarouselProps = {
  children: React.ReactNode;
};

export default function ProductCarousel({
  children,
}: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">
      <button
        onClick={scrollPrev}
        className="
          hidden
          lg:flex
          absolute
          left-0
          top-1/2
          -translate-y-1/2
          -translate-x-5
          z-10
          w-11
          h-11
          rounded-full
          bg-white
          shadow-lg
          border
          border-slate-200
          items-center
          justify-center
          hover:bg-yellow-400
          transition
        "
      >
        <ChevronLeft size={22} />
      </button>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {children}
        </div>
      </div>

      <button
        onClick={scrollNext}
        className="
          hidden
          lg:flex
          absolute
          right-0
          top-1/2
          -translate-y-1/2
          translate-x-5
          z-10
          w-11
          h-11
          rounded-full
          bg-white
          shadow-lg
          border
          border-slate-200
          items-center
          justify-center
          hover:bg-yellow-400
          transition
        "
      >
        <ChevronRight size={22} />
      </button>
    </div>
  );
}