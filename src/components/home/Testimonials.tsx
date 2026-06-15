import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import { Star } from "lucide-react";

const testimonials = [
{
name: "Carlos Henrique",
city: "Campina Grande - PB",
text: "Comprei meu notebook gamer e chegou antes do prazo. Atendimento excelente e produto original.",
},
{
name: "Amanda Souza",
city: "João Pessoa - PB",
text: "Ótimos preços e suporte muito rápido pelo WhatsApp. Recomendo bastante.",
},
{
name: "João Victor",
city: "Patos - PB",
text: "Meu smartphone chegou perfeitamente embalado. Experiência de compra muito tranquila.",
},
];

export default function Testimonials() {
return ( <section className="py-24 bg-slate-50"> <Container> <SectionTitle
       title="O que nossos clientes dizem"
       subtitle="A satisfação dos nossos clientes é o que nos motiva a evoluir todos os dias."
     />

```
    <div className="grid lg:grid-cols-3 gap-8">
      {testimonials.map((testimonial) => (
        <div
          key={testimonial.name}
          className="
            bg-white
            rounded-3xl
            border
            border-slate-200
            p-8
            hover:shadow-xl
            transition-all
            duration-300
          "
        >
          <div className="flex gap-1 text-yellow-500 mb-5">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={18}
                fill="currentColor"
              />
            ))}
          </div>

          <p className="text-slate-600 leading-relaxed">
            "{testimonial.text}"
          </p>

          <div className="mt-6">
            <h4 className="font-semibold text-slate-900">
              {testimonial.name}
            </h4>

            <p className="text-sm text-slate-500">
              {testimonial.city}
            </p>
          </div>
        </div>
      ))}
    </div>
  </Container>
</section>
);
}
