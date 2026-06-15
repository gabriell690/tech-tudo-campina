import Container from "../ui/Container";

const stats = [
{
value: "+500",
label: "Clientes Atendidos",
},
{
value: "+1.000",
label: "Pedidos Entregues",
},
{
value: "98%",
label: "Satisfação",
},
{
value: "Toda PB",
label: "Entrega Regional",
},
];

export default function TrustSection() {
return ( <section className="py-24 bg-white"> <Container> <div
       className="
         rounded-[40px]
         overflow-hidden
         bg-gradient-to-br
         from-slate-950
         via-blue-950
         to-slate-900
         p-10
         lg:p-16
         relative
       "
     >
{/* Glow */} <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full" />

```
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full" />

      <div className="relative z-10">
        <div className="text-center">
          <span
            className="
              inline-flex
              px-4
              py-2
              rounded-full
              bg-blue-500/10
              border
              border-blue-500/20
              text-blue-300
              text-sm
              mb-6
            "
          >
            🚀 Crescendo junto com nossos clientes
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Tecnologia com confiança
          </h2>

          <p className="text-slate-300 mt-4 max-w-2xl mx-auto">
            Trabalhamos diariamente para entregar os melhores
            produtos, atendimento especializado e uma experiência
            de compra segura para nossos clientes.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {stats.map((item) => (
            <div
              key={item.label}
              className="
                bg-white/5
                border
                border-white/10
                rounded-3xl
                p-8
                text-center
                backdrop-blur-sm
              "
            >
              <h3 className="text-4xl font-bold text-white">
                {item.value}
              </h3>

              <p className="text-slate-400 mt-3">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Container>
</section>
);
}
