import { useEffect, useState } from "react";
import Nav from "../../components/Recicle/Nav/Nav";
import Footer from "../../components/Recicle/Footer/Footer";
import EditShelter from "../../components/Shelter/Edit/EditShelter";
import DeleteShelter from "../../components/Shelter/Delete/DeleteShelter";
import { Validator } from "../../services/Users/Validate";
import UserService from "../../services/Users/UserServices";
import { Box, Tab, Tabs } from "@mui/material";
import StepperShelter from "@/components/Shelter/Add/Stepper/StepperShelter";

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
        <Box
          sx={{
            p: 3,
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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

function Shelter() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    Validator();

    const handleAdmin = async () => {
      const response = await UserService.me();
      const acesso = response.data.acesso;

      console.log(response.data);

      if (acesso === "2") {
        setAdmin(true);
      }
    };

    handleAdmin();
  }, []);

  return (
    <>
      <Nav />
      <Box
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
            borderColor: "black",
            marginTop: 7,
            width: "200px",
            height: "100%",
          }}
        >
          <Tab label="Adicionar Abrigo" {...a11yProps(0)} />

          {admin && [
            <Tab key="edit" label="Editar Abrigo" {...a11yProps(1)} />,
            <Tab key="delete" label="Deletar Abrigo" {...a11yProps(2)} />,
          ]}
        </Tabs>

        <TabPanel value={value} index={0}>
          <StepperShelter s={0} />
        </TabPanel>

        {admin == true && (
          <>
            <TabPanel value={value} index={1}>
              <EditShelter />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <DeleteShelter />
            </TabPanel>
          </>
        )}
      </Box>

      <Footer />
    </>
  );
}

export default Shelter;
