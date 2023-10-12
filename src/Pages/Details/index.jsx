import { Container, Links, Content } from "./styles";

import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Section } from "../../components/Section";
import { ButtonText } from "../../components/ButtonText";
import { Tag } from "../../components/Tag";

export function Details() {
  return (
    <Container>
      <Header />

      <main>
        <Content>
          <ButtonText title="Excluir a nota" />

          <h1>Introdução ao React</h1>

          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus
            quae quis in non! Ullam ipsum id possimus magni natus debitis quas
            maxime voluptatibus corrupti in qui exercitationem, officia, sint
            fugit.
          </p>

          <Section title="Links úteis">
            <Links>
              <li>
                <a href="#">https://www.rockeatseat.com.br/</a>
              </li>
              <li>
                <a href="#">https://www.rockeatseat.com.br/</a>
              </li>
            </Links>
          </Section>

          <Section title="Marcadores">
            <Tag title="express" />
            <Tag title="node" />
          </Section>

          <Button title="Voltar" />
        </Content>
      </main>
    </Container>
  );
}

//COMO ASSIM REVER ESSA PARTE LOADING = TRUE
