# Task Manager

Sistema de gestión de tareas con vista Kanban. Proyecto fullstack construido con Angular, ASP.NET Core, Entity Framework Core y SQL Server.

## Stack tecnológico

**Backend**
- ASP.NET Core Web API (.NET 10)
- Entity Framework Core
- SQL Server
- Arquitectura por capas (Controllers, DTOs, Models, Data)

**Frontend**
- Angular 21 (Standalone Components)
- Tailwind CSS
- Reactive Forms
- HttpClient + Observables

## Funcionalidades

- Vista Kanban con tres columnas: Pendiente, En proceso, Completado
- Crear, editar y eliminar tareas
- Cambiar estado de tareas entre columnas
- Asignar responsable y fecha límite
- Componentes reutilizables con @Input y @Output

## Estructura del proyecto

```
Task-Manager/
├── TaskManager.Api/          # Backend ASP.NET Core
│   ├── Controllers/          # Endpoints REST
│   ├── DTOs/                 # Data Transfer Objects
│   ├── Models/               # Entidades y enums
│   ├── Data/                 # DbContext
│   └── Program.cs            # Configuración y servicios
└── TaskManager.web/          # Frontend Angular
    └── src/app/
        └── tasks/
            ├── task-list/    # Componente principal (kanban)
            ├── task-card/    # Componente reutilizable de tarjeta
            ├── task.service.ts
            └── task.model.ts
```

## Endpoints API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/taskitems | Obtener todas las tareas |
| GET | /api/taskitems/{id} | Obtener tarea por id |
| POST | /api/taskitems | Crear tarea |
| PUT | /api/taskitems/{id} | Actualizar tarea |
| PATCH | /api/taskitems/{id}/status | Cambiar estado |
| DELETE | /api/taskitems/{id} | Eliminar tarea |

## Configuración local

### Backend

1. Clona el repositorio
2. Configura la cadena de conexión en `appsettings.json`:
```json
"ConnectionStrings": {
  "Default": "Server=localhost\\SQLEXPRESS;Database=TaskManagerDb;Trusted_Connection=True;TrustServerCertificate=True"
}
```
3. Aplica las migraciones:
```
dotnet ef database update
```
4. Ejecuta el proyecto:
```
dotnet run
```

### Frontend

1. Entra a la carpeta del frontend:
```
cd TaskManager.web
```
2. Instala dependencias:
```
npm install
```
3. Ejecuta el servidor:
```
ng serve
```
4. Abre `http://localhost:4200`

## Autor

Camilo Hernández — Desarrollador Full Stack
