import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";


interface NavBarProps {
  onLogout: () => void;
}


export function NavBar({ onLogout }: NavBarProps) {
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Gestor de tareas
        </Typography>

        <Box>
          <Button color="inherit" component={RouterLink} to="/tasks">
            Tareas
          </Button>
          <Button color="inherit" component={RouterLink} to="/dashboard">
            Dashboard
          </Button>
          <Button color="inherit" component={RouterLink} to="/create">
            Crear Tarea
          </Button>
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}