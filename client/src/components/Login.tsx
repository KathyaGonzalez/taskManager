import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler, ControllerRenderProps } from "react-hook-form";
import {
    Container,
    Box,
    TextField,
    Button,
    Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
    email: string;
    password: string;
}

interface LoginProps {
    setToken: (token: string) => void;
}

const Login = ({ setToken }: LoginProps) => {
    const navigate = useNavigate();

    const { handleSubmit, control, formState: { errors } } = useForm<LoginFormData>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error login:", errorData);
                return;
            }

            const responseData = await response.json();
            localStorage.setItem("access_token", responseData.access);
            localStorage.setItem("refresh", responseData.refresh);

            setToken(responseData.access)

            navigate("/tasks");

        } catch (error) {
            console.error("Error al hacer login:", error);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Iniciar Sesión
                </Typography>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: "El correo es obligatorio",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Correo inválido",
                            },
                        }}
                        render={({ field }: { field: ControllerRenderProps<LoginFormData, "email"> }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Correo electrónico"
                                margin="normal"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: "La contraseña es obligatoria" }}
                        render={({ field }: { field: ControllerRenderProps<LoginFormData, "password"> }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Contraseña"
                                type="password"
                                margin="normal"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        )}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2, mb: 2 }}
                    >
                        Ingresar
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export { Login };