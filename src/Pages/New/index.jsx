import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { api } from "../../services/api";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Button } from "../../components/Button";

import { ButtonText } from "../../components/ButtonText";

import { Container, Form } from "./style";

export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]); // guarda os links
  const [newLink, setNewLink] = useState(""); // guarda um link

  const [tags, setTags] = useState([]);
  const [newTag, setNewTags] = useState("");

  const navigate = useNavigate();

  function handleAddLink() {
    setLinks((prevState) => [...prevState, newLink]); //Espalha tudo o que tinha antes, e adiciona um novo (newLink)
    setNewLink("");
    return;
  }

  function handleRemoveLink(deleted) {
    setLinks((prevState) => prevState.filter((link) => link !== deleted));
  }

  function handleAddTag() {
    setTags((prevState) => [...prevState, newTag]);
    setNewTags("");
  }

  function handleDeleteTag(deleted) {
    setTags((prevState) => prevState.filter((tag) => tag !== deleted));
  }

  async function handleNewNote() {
    if (!title) {
      return alert("Você precisa colocar um titulo.");
    }
    if (newTag) {
      return alert("Você preencheu a Tag, mas nao-o adiciou, deseja excluir?");
    }
    if (newLink) {
      return alert("Você preencheu o Link, mas nao-o adiciou, deseja excluir?");
    }
    await api.post("/notes", { title, description, tags, links });

    alert("Nota cadastrada com sucesso!");
    navigate(-1);
  }
  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText title="Voltar" onClick={() => navigate(-1)} />
          </header>

          <Input
            placeholder="Título"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Observações"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Section title="Links utéis">
            {links.map((link, index) => (
              <NoteItem
                key={toString(index)}
                value={link}
                onClick={() => handleRemoveLink(link)}
              />
            ))}
            <NoteItem
              isnew
              placeholder="Novo Link"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              {tags.map((tag, index) => (
                <NoteItem
                  key={toString(index)}
                  value={tag}
                  onClick={() => {
                    handleDeleteTag(tag);
                  }}
                />
              ))}
              <NoteItem
                onChange={(e) => setNewTags(e.target.value)}
                isnew
                placeholder="Nova Tag"
                onClick={handleAddTag}
                value={newTag}
              />
            </div>
          </Section>

          <Button title="Salvar" onClick={handleNewNote} />
        </Form>
      </main>
    </Container>
  );
}
