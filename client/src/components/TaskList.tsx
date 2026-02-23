import { Card, CardContent, Typography, Grid, Chip, Button } from "@mui/material";
import { useEffect, useState } from "react";

interface Task {
    id: number;
    title: string;
    description: string;
    responsible: string;
    responsible_name: string;
    status: "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";
    expiration_date: string;
    completed_at: string | null;
    updated_at: string;
    created_at: string;
}

function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);

    const token = localStorage.getItem("access_token");

    const fetchTasks = () => {
        fetch("http://127.0.0.1:8000/api/tasks/", {
            headers: {
                "Authorization": `Bearer ${token}`,
            }})
            .then(res => res.json())
            .then(data => setTasks(data));
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const statusColor = (status: Task["status"]) => {
        switch (status) {
            case "TODO": return "default";
            case "IN_PROGRESS": return "primary";
            case "IN_REVIEW": return "warning";
            case "DONE": return "success";
        }
    }

    const handleDelete = (taskId: number) => {
        if (!confirm("¿Seguro que quieres eliminar esta tarea?")) return;

        fetch(`http://127.0.0.1:8000/api/tasks/${taskId}/`, {
            method: "DELETE",
        })
            .then(res => {
                if (!res.ok) throw new Error("Error al eliminar la tarea");
                fetchTasks();
            })
            .catch(err => alert(err.message));
    };

    const handleCompletedTask = async (taskId: number) => {
        if (!confirm("¿Desea confirmar que la tarea ha sido completada?")) return;

        const res = await fetch(
            `http://127.0.0.1:8000/api/tasks/${taskId}/`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: "DONE",
                    completed_at: new Date().toISOString(),
                }),
            }
        );

        if (!res.ok) {
            throw new Error("Error al completar tarea");
        }

        fetchTasks();
    };


    return (
        <Grid container spacing={2} sx={{ p: 2 }}>
            {tasks.map((task, index) => (
                <Card elevation={3} sx={{ borderRadius: 2, height: "100%" }} key={index}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            {task.title}
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                            Descripción: {task.description}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                            Responsable: {task.responsible_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Fecha de vencimiento: {task.expiration_date}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            Fecha en que fue completada:
                            {task.completed_at ?
                                new Date(task.updated_at).toLocaleString("es-ES", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                }) : "Pendiente"
                            }
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Fecha y hora de creación: {new Date(task.created_at).toLocaleString("es-ES", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Fecha y hora de actualización: {new Date(task.updated_at).toLocaleString("es-ES", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </Typography>

                        <Chip
                            label={task.status.replace("_", " ")}
                            color={statusColor(task.status)
                            }
                            size="small"
                            sx={{ mt: 1 }}
                        />
                        <Grid>
                            <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                sx={{ mt: 1 }}
                                onClick={() => handleDelete(task.id)}
                            >
                                Eliminar
                            </Button>
                        </Grid>
                        <Grid>
                            <Button
                                variant="outlined"
                                color="success"
                                size="small"
                                sx={{ mt: 1 }}
                                onClick={() => handleCompletedTask(task.id)}
                            >
                                Marcar como completada
                            </Button>
                        </Grid>
                    </CardContent>
                </Card>
            ))}
        </Grid>
    );
}

export { TaskList };