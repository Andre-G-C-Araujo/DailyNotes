import { useState } from "react";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

import { api } from "../../services/api";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { Container, Form, Background } from "./styles";
import { Link } from "react-router-dom";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    if (!name || !email || !password) {
      return alert("Todos com campos devem ser preenchidos");
    }

    api
      .post("/users", { name, email, password })
      .then(() => alert("Usuario cadastrado"))
      .catch(() => alert("Este usúario ja se encontra cadastrado"));
  };

  return (
    <Container>
      <Background />
      <Form>
        <h1>Daily Notes</h1>
        <p>Aplicação para salvar e gerenciar seus links utéis.</p>

        <h2>Crie sua conta</h2>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Digite sua senha"
          type="password"
          icon={FiLock}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button title="Cadastrar" onClick={handleSignUp}></Button>

        <Link to="/">Voltar para o login</Link>
      </Form>
    </Container>
  );
}
