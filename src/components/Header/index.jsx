import { RiShutDownLine } from "react-icons/ri";
import { Container, Profile, Logout } from "./styles";

export function Header() {
  return (
    <Container>
      <Profile>
        <img
          src="https://github.com/Andre-G-C-Araujo.png"
          alt="Foto do usuário"
        />

        <div>
          <span>Bem-Vindo</span>
          <strong>André Cauê</strong>
        </div>
      </Profile>

      <Logout>
        <RiShutDownLine />
      </Logout>
    </Container>
  );
}
