import { Box } from "@mui/material";
import { Header } from "../../components/Header";

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
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
      <Header
        title="Dashboard"
        links={links}
      />
    </Box>
  );
}