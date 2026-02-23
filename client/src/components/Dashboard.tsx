import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Task {
  id: number;
  status: string;
  completed_at: string | null;
}

function groupByWeek(tasks: Task[]) {
  const weeks: Record<string, number> = {};

  tasks.forEach(task => {
    if (task.status === "DONE" && task.completed_at) {
      const date = new Date(task.completed_at);

      const day = date.getDay(); 
      const diff = day === 0 ? -6 : 1 - day;
      const monday = new Date(date);
      monday.setDate(date.getDate() + diff);
      monday.setHours(0, 0, 0, 0);

      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);

      const mondayStr = monday.toLocaleDateString("es-ES", { day: "2-digit", month: "short" });
      const sundayStr = sunday.toLocaleDateString("es-ES", { day: "2-digit", month: "short" });

      const weekRange = `${mondayStr} - ${sundayStr}`;

      weeks[weekRange] = (weeks[weekRange] || 0) + 1;
    }
  });

  return Object.entries(weeks)
    .sort(([a], [b]) => new Date(a.split(" - ")[0]).getTime() - new Date(b.split(" - ")[0]).getTime())
    .map(([week, completed]) => ({ week, completed }));
}

export function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/tasks/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  }, [token]);

  const data = groupByWeek(tasks);

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Health Monitor: Tareas completadas por semana
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="completed" fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}