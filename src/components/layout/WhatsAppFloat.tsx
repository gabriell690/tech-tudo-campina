import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloat() {

  const phone = "5583988333856";

  const message =
    "Olá! Gostaria de mais informações sobre os produtos.";

  return (

    <a
      href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="
        fixed
        bottom-24
        md:bottom-6
        right-5
        z-9999
        flex
        h-16
        w-16
        items-center
        justify-center
        rounded-full
        bg-[#25D366]
        text-white
        shadow-2xl
        transition-all
        duration-300
        hover:scale-110
        active:scale-95
      "
    >
      <FaWhatsapp size={34} />
    </a>

  );

}