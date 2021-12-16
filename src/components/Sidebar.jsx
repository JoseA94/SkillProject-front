import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "context/authContext";
import PrivateComponent from "./PrivateComponent";
import PrivateSidebar from "./PrivateSidebar";

const SidebarLinks = () => {
  return (
    <ul className="mt-12 ">
      <SidebarRoute to="" title="Inicio" icon="fas fa-home" />
      <PrivateSidebar stateList={["AUTORIZADO"]}>
        
        <PrivateComponent roleList={["LIDER", "ESTUDIANTE"]}>
          <SidebarRoute to="/perfil" title="Perfil" icon="fas fa-user-circle" />
        </PrivateComponent>
        <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
          <SidebarRoute to="/usuarios" title="Usuarios" icon="fas fa-user" />
        </PrivateComponent>
        <SidebarRoute
          to="/proyectos"
          title="Proyectos"
          icon="fas fa-smile-wink"
        />
        <PrivateComponent roleList={["LIDER"]}>
          <SidebarRoute
            to="/inscripciones"
            title="Aprobacion Inscripciones"
            icon="fas fa-user"
          />
        </PrivateComponent>
        </PrivateSidebar>

      <Logout />
    </ul>
  );
};

const Logout = () => {
  const { setToken } = useAuth();
  const deleteToken = () => {
    console.log("eliminar token");
    setToken(null);
  };
  return (
    <li onClick={() => deleteToken()}>
      <NavLink to="/auth/login" className="sidebar-route text-pink-400">
        <div className="flex items-center">
          <i className="fas fa-sign-out-alt" />
          <span className="text-sm  ml-2">Cerrar Sesión</span>
        </div>
      </NavLink>
    </li>
  );
};

const Logo = () => {
  return (
    <div className="py-3 w-full flex flex-col items-center justify-center">
      <img src="logo.png" alt="Logo" className="h-16" />
      <span className="my-2 text-xl font-bold text-center text-white">Skill Project</span>
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex flex-col md:flex-row flex-no-wrap md:h-full ">
      {/* Sidebar starts */}

      <div className="sidebar hidden md:flex  ">
        <div className="px-8 h-full bg-dark-custom bg-gd-custom">
          <Logo />
          <SidebarLinks />
        </div>
      </div>
      <div className="flex md:hidden w-full justify-between bg-dark-custom bg-gd-custom p-2 text-white">
        <i
          className={`fas fa-${open ? "times" : "bars"}`}
          onClick={() => setOpen(!open)}
        />
        <i className="fas fa-home" />
      </div>
      {open && <ResponsiveSidebar />}
      {/* Sidebar ends */}
    </div>
  );
};

const ResponsiveSidebar = () => {
  return (
    <div>
      <div
        className="sidebar bg-dark-custom bg-gd-custom h-full z-40 absolute md:h-full sm:hidden transition duration-150 ease-in-out"
        id="mobile-nav"
      >
        <div className="px-8">
          <Logo />
          <SidebarLinks />
        </div>
      </div>
    </div>
  );
};

const SidebarRoute = ({ to, title, icon }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? "sidebar-route text-white bg-selected"
            : "sidebar-route text-white hover:text-white hover:bg-gray-700"
        }
      >
        <div className="flex items-center">
          <i className={icon} />
          <span className="text-sm  ml-2">{title}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default Sidebar;
