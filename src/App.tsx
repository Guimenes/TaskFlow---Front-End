// src/routes.tsx
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router";
import Loading from "./components/loading/load";
import AuthMiddleware from "./config/auth/authmiddlware";

const AuthPage = lazy(() => import("./pages/auth/auth"));
const ErrorPage = lazy(() => import("./pages/error/error"));
const NotFoundPage = lazy(() => import("./pages/notfound/notfound"));
const SystemIndex = lazy(() => import("./pages/system/index"));
const SystemBoards = lazy(() => import("./pages/system/menu/boards/boards"));
const SystemMembers = lazy(() => import("./pages/system/menu/members/members"));
const SystemBoard = lazy(() => import("./pages/system/board/board"));

const RoutesComponent = () => {
  return (
    <Router>
      <AuthMiddleware>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/error" element={<ErrorPage />} />

            {/* Agrupamento das rotas do sistema */}
            <Route path="/system">
              {/* Rota index para /system */}
              <Route index element={<SystemIndex />} />
              {/* Rotas aninhadas */}
              <Route path="boards" element={<SystemBoards />} />
              <Route path="members" element={<SystemMembers />} />
              <Route path="board/:boardId" element={<SystemBoard />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AuthMiddleware>
    </Router>
  );
};

export default RoutesComponent;
