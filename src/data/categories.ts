import {
  Cpu,
  Gamepad2,
  Wrench,
  Wifi,
  Camera,
} from "lucide-react";

export const categories = [
  {
    name: "Periféricos",
    icon: Cpu,
    subcategories: [
      "Cabos e Adaptadores",
      "Fones de Ouvido",
      "Headset",
      "Teclado e Mouse",
      "Pen Drive",
      "Cartão de Memória",
      "Suportes",
    ],
  },

  {
    name: "Espaço Gamer",
    icon: Gamepad2,
    subcategories: [
      "Acessórios",
      "Controles",
      "Portáteis",
      "Vídeo Game Retrô",
    ],
  },

  {
    name: "Ferramentas",
    icon: Wrench,
    subcategories: [
      "Ferramentas Elétricas",
      "Ferramentas Manuais",
      "Maletas",
      "Medição",
    ],
  },

  {
    name: "Conectividade",
    icon: Wifi,
    subcategories: [
      "Cabos de Rede",
      "Dispositivos de Rede",
    ],
  },

  {
    name: "Câmera de Segurança",
    icon: Camera,
    subcategories: [
      "Câmeras Wi-Fi",
      "Câmeras IP",
      "DVR",
      "HD para CFTV",
      "Fontes",
      "Acessórios",
    ],
  },
];