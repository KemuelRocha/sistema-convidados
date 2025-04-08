import { PageIntro } from "../../components/PageIntro/PageIntro.component"

export default function Dashboard() {
  const links = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Dashboard",
      href: "/dashboard",
    }
  ];

  return (
    <>
      <PageIntro
        title="Dashboard"
        links={links}
        description="This is the dashboard page. You can find various statistics and information here."
      />
    </>
  );
}