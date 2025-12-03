import Nav from "@/components/Recicle/Nav/Nav";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import styles from "./User.module.css";
import { Footer } from "antd/es/layout/layout";
import Info from "@/components/User/Info/Info";

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
      style={{ width: "100%" }}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
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

function User() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
          sx={{
            borderRight: 1,
            borderColor: "divider",
            marginTop: 7,
            minWidth: "200px",
          }}
        >
          <Tab label="Informações" {...a11yProps(0)} />
          <Tab label="Editar perfil" {...a11yProps(1)} />
          <Tab label="Deletar conta" {...a11yProps(2)} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Info />
        </TabPanel>

        <TabPanel value={value} index={1}></TabPanel>

        <TabPanel value={value} index={2}></TabPanel>
      </Box>
      <Footer />
    </div>
  );
}

export default User;
