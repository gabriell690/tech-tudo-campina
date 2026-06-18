import Container from "../components/ui/Container";
import AccountSidebar from "../components/account/AccountSidebar";
import AccountOverview from "../components/account/AccountOverview";

export default function MinhaConta() {
  return (
    <Container className="py-10">

      <div className="
flex
flex-col
lg:grid
lg:grid-cols-[280px_1fr]
gap-8
">

        <AccountSidebar />

        <AccountOverview />

      </div>

    </Container>
  );
}