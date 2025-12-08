import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

let externalTrigger: ((msg: string) => void) | null = null;
let externalTriggerSuccess: ((msg: string) => void) | null = null;

export function triggerSnackbar(msg: string) {
  if (externalTrigger) externalTrigger(msg);
}

export function triggerSnakeBarSuccess(msg: string) {
  if (externalTriggerSuccess) externalTriggerSuccess(msg);
}

function GlobalSnackbar() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  externalTrigger = (m: string) => {
    setMsg(m);
    setOpen(true);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={() => setOpen(false)}
    >
      <Alert severity="error" variant="filled">
        {msg}
      </Alert>
    </Snackbar>
  );
}

export function GlobalSnackbarSuccess() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  externalTriggerSuccess = (m: string) => {
    setMsg(m);
    setOpen(true);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={() => setOpen(false)}
    >
      <Alert severity="success" variant="filled">
        {msg}
      </Alert>
    </Snackbar>
  );
}

export default GlobalSnackbar;
