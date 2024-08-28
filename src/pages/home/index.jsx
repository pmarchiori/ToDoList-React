import { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import styles from "./styles.module.css";

export default function Home() {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");

  //{ titulo: "", categoria: "", data: "", descricao: "" }
  const [tarefas, setTarefas] = useState([]);

  function salvarTarefa(event) {
    event.preventDefault();

    if (!titulo || !categoria || !data || !descricao) {
      alert("Por favor, preencha todos os campos antes de salvar a tarefa.");
      return;
    }

    const copy = [...tarefas];

    copy.push({
      titulo: titulo,
      categoria: categoria,
      data: data,
      descricao: descricao,
    });

    setTarefas(copy);

    localStorage.setItem("@tarefas", JSON.stringify(copy));

    setTitulo("");
    setCategoria("");
    setData("");
    setDescricao("");
  }

  function apagarTarefa(indexTask) {
    const arrayFiltrado = tarefas.filter(
      (tarefas, index) => indexTask !== index
    );

    setTarefas(arrayFiltrado);
  }

  function recuperarTarefas() {
    const tarefasString = localStorage.getItem("@tarefas");

    if (tarefasString) {
      const tarefasJSON = JSON.parse(tarefasString);

      setTarefas(tarefasJSON);
    }
  }

  // useEffect(() => {
  //   recuperarTarefas();
  // }, []);

  return (
    <div className={styles.container}>
      <div className={styles.container_form}>
        <form className={styles.form} onSubmit={(event) => salvarTarefa(event)}>
          <h2>Nova tarefa</h2>

          <input
            value={titulo}
            onChange={(event) => setTitulo(event.target.value)}
            placeholder="Título"
          />

          <select
            defaultValue={categoria}
            value={categoria}
            onChange={(event) => setCategoria(event.target.value)}
          >
            <option>Categoria</option>
            <option>Categoria 1</option>
            <option>Categoria 2</option>
            <option>Categoria 3</option>
          </select>

          <input
            type="date"
            value={data}
            onChange={(event) => setData(event.target.value)}
            placeholder="Data"
          />

          <input
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}
            placeholder="Descrição"
          />

          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className={styles.container_list}>
        <div className={styles.container_title}>
          <h3>Minhas tarefas</h3>
          <p>Total: {tarefas.length} tarefas</p>
        </div>
        {/* {JSON.stringify(tarefas)}; */}
        {tarefas.length > 0 ? (
          <>
            {tarefas.map((tarefa, index) => (
              <div className={styles.card} style={{ marginBottom: 10 }}>
                <div>
                  <p className={styles.task_title}>{tarefa.titulo}</p>
                  <p className={styles.task_category}>{tarefa.categoria}</p>
                  <p>{tarefa.descricao}</p>
                </div>

                <div>
                  <p className={styles.task_date}>{tarefa.data}</p>
                  <AiFillDelete
                    className={styles.delete_button}
                    color="red"
                    size={40}
                    onClick={() => apagarTarefa(index)}
                  />
                </div>
              </div>
            ))}
          </>
        ) : (
          <p>Nenhum item para ser exibido</p>
        )}
      </div>
    </div>
  );
}
