import { useEffect, useState } from "react";
import AddAnimal from "../../components/Animal/AddAnimal/AddAnimal";
import DeleteAnimal from "../../components/Animal/DeleteAnimal/DeleteAnimal";
import EditAnimal from "../../components/Animal/EditAnimal/EditAnimal";
import UserService from "../../services/Users/UserServices";
import Nav from "../../components/Recicle/Nav/Nav";
import Footer from "../../components/Recicle/Footer/Footer";
import { Box, Tab, Tabs } from "@mui/material";
import styles from "./Animal.module.css";


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && (
        <Box sx={{ p: 3, width: "100%" }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function Animal() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    requestAPI();
  }, []);

  const requestAPI = async () => {
    const response = await UserService.me();

    if (response.status !== 200) {
      localStorage.removeItem("token");
      window.location.href = "/";
    } else {
      const acesso = response.data.acesso;

      if (acesso === "2") {
        // setAdmin(true); // Admin logic removed or needs to be re-implemented if needed
      }
    }
  };

  return (
    <div className={styles.container}>
      <Nav />
      <Box
        className={styles.container}
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          minHeight: "80vh",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          sx={{ borderRight: 1, borderColor: "divider", marginTop: 7, minWidth: "200px" }}
        >
          <Tab label="Adicionar Animal" {...a11yProps(0)} />
          <Tab label="Editar Animal" {...a11yProps(1)} />
          <Tab label="Deletar Animal" {...a11yProps(2)} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <AddAnimal />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <EditAnimal />
        </TabPanel>

        <TabPanel value={value} index={2}>
          <DeleteAnimal />
        </TabPanel>
      </Box>
      <Footer />
    </div>
  );
}

export default Animal;
