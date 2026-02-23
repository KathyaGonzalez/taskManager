import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Grid, MenuItem } from "@mui/material";

interface User {
  id: number;
  username: string;
}

interface TaskFormData {
  title: string;
  description: string;
  responsible: string;
  status: "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";
  expiration_date: string;
  completed_at?: string;
}

function TaskForm() {
  const { control, handleSubmit, reset } = useForm<TaskFormData>({
    defaultValues: {
      title: "",
      description: "",
      responsible: "",
      status: "TODO",
      expiration_date: ""
    },
  });

  const [users, setUsers] = useState<User[]>([]);

  
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users/", {
            headers: {
                "Authorization": `Bearer ${token}`,
            }})
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);


  const onSubmit = (data: TaskFormData) => {
    fetch("http://127.0.0.1:8000/api/tasks/", {
      method: "POST",
      headers: { "Content-Type": "application/json",
                 "Authorization": `Bearer ${token}`
       },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        const resData = await res.json();
        if (!res.ok) {
          const messages = Object.values(resData)
            .flat()
            .join("\n");
          throw new Error(messages || "Error creando tarea");
        }
        return resData;
      })
      .then(() => {
        alert("Tarea creada");
        reset();
      })
      .catch(err => alert(err.message));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Controller
          name="title"
          control={control}
          rules={{ required: "Debe ingresar el título de la tarea" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Título"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          rules={{ required: "Debe ingresar la descripción de la tarea" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Descripción"
              fullWidth
              multiline
              rows={3}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="responsible"
          control={control}
          rules={{ required: "Debe asignar un responsable de la tarea" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              select
              label="Responsable"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            >
              {users.map(user => (
                <MenuItem key={user.id} value={user.id}>
                  {user.username}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <TextField {...field} select label="Estado" fullWidth>
              <MenuItem value="TODO">To Do</MenuItem>
              <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
              <MenuItem value="IN_REVIEW">In Review</MenuItem>
              <MenuItem value="DONE">Done</MenuItem>
            </TextField>
          )}
        />

        <Controller
          name="expiration_date"
          control={control}
          rules={{ required: "Debe ingresar la fecha de vencimiento de la tarea" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Fecha de vencimiento"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Button type="submit" variant="contained" color="primary">
          Crear tarea
        </Button>
      </Grid>
    </form>
  );
}

export { TaskForm };