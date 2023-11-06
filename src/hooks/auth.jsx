import { createContext, useContext, useState, useEffect } from "react";

import { api } from "../services/api";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState({});

  async function signIn({ email, password }) {
    try {
      const response = await api.post("/session", { email, password });
      const { user, token } = response.data;
      localStorage.setItem("@dailynotes:user", JSON.stringify(user));
      localStorage.setItem("@dailynotes:token", token);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setData({ user, token });

      // console.log(user, token);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possivel efetuar a autenticação");
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@dailynotes:user");
    localStorage.removeItem("@dailynotes:token");

    setData({});
  }

  async function updateProfile({ user, avatarFile }) {
    try {
      if (avatarFile) {
        const fileUploadForm = new FormData();
        fileUploadForm.append("avatar", avatarFile);

        const response = await api.patch("/users/avatar", fileUploadForm);
        user.avatar = response.data.avatar;
      }
      await api.put("/users", user);
      localStorage.setItem("@dailynotes:user", JSON.stringify(user));

      setData({ user, token: data.token });
      alert("perfil atualizado");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possivel atualizar o profile");
      }
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("@dailynotes:token");
    const user = localStorage.getItem("@dailynotes:user");

    if (token && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setData({
        token,
        user: JSON.parse(user),
      });
    }

    //executa apos o render do component
  }, []); /*estado - qnd estado muda, dispara o useEffect, se vazio vai ser carregado uma vez apos a render*/

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, updateProfile, user: data.user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
