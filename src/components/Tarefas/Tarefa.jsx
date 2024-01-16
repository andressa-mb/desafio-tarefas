import React, { useEffect, useRef, useState } from "react";
import Modal from 'react-modal';
import { MdEdit } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { MdOutlineAdd } from "react-icons/md";
import "./index.scss";

function Tarefa() {
  const [novaTarefa, setNovaTarefa] = useState(""); //armazenar o texto da nova tarefa
  const [tarefaArray, setTarefaArray] = useState([]); //armazenar a lista de tarefas
  const [statusArray, setStatusArray] = useState([]);
  const [modalEditIsOpen, setModalEditIsOpen] = React.useState(false);
  const [tarefaEditIndex, setTarefaEditIndex] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [tarefaDeleteIndex, setTarefaDeleteIndex] = useState(null);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const [tarefaDeleteInfo, setTarefaDeleteInfo] = useState({});
  const inputTarefaRef = useRef(null);

  const customStyles = {
    content: {
      width: '30%',
      height: '30%',
      margin: 'auto',
    },
  };

  useEffect(() => {
    if(inputTarefaRef.current) { // Verifica se a referência existe e, se existir, coloca o foco no input
      inputTarefaRef.current.focus();
    }
  }, [tarefaArray]); // Executa sempre que a lista de tarefas for atualizada

  const inputChange = (event) => {
    setNovaTarefa(event.target.value);
  };

  const handleKeyDown = (event) => {
    if(event.key === 'Enter') {
      inputAddText();
    }
  }

  const inputAddText = () => {
    if (novaTarefa.trim() !== "") {
      setTarefaArray((prevTarefaArray) => [...prevTarefaArray, novaTarefa]); //adicionando o novo valor no array
      setStatusArray((prevStatusArray) => [...prevStatusArray, false]); //cria uma cópia do estado anterior e marca como falso pois não está concluído
      setNovaTarefa(""); //Limpa o input após adicionar ao vetor
    }
  }

  //Função para alternar o status de conclusão de uma tarefa
  const handleToggleStatus = (index) => {
    setStatusArray((prevStatusArray) => {
      const newStatusArray = [...prevStatusArray];
      newStatusArray[index] = !newStatusArray[index]
      return newStatusArray;
    });
  };

  function openModalEdit(index) {
    //armazena o índice da tarefa sendo editada
    setTarefaEditIndex(index);
    //armazena o texto atual da tarefa sendo editada
    setEditedText(tarefaArray[index]);
    //abre o modal
    setModalEditIsOpen(true);
  }

  function afterOpenModal() {
    console.log("Modal aberto");
  }

  function closeModalEdit () {
    setTarefaEditIndex(null);
    setModalEditIsOpen(false);
  } 

  const confirmarEdicao = () => {
    setTarefaArray((prevTarefaArray) => {
      const newArray = [...prevTarefaArray];
      newArray[tarefaEditIndex] = editedText;
      return newArray;
    });
    closeModalEdit();
  }

  function openModalDelete(index) {
    setTarefaDeleteIndex(index);
    setTarefaDeleteInfo({
      index, 
      texto: tarefaArray[index],
    });
    setModalDeleteIsOpen(true);
  }

  const confirmarExclusao = () => {
    setTarefaArray((prevTarefaArray) => {
      const newArray = [...prevTarefaArray];
      newArray.splice(tarefaDeleteIndex, 1); //Remove o item do array
      return newArray;
    });
    closeModalDelete();
  }

  function closeModalDelete () {
    setTarefaDeleteIndex(null);
    setTarefaDeleteInfo({});
    setModalDeleteIsOpen(false);
  } 

  return (
    <div className="tarefa">
      <h1>Otimize seu tempo e se organize com o nosso planejador diário</h1>
      <div className="borda">
        <div className="tabela-tarefa">
          <div className="coluna-tarefa">
            <ul className="barra">
              <li>Tarefas</li>
              <li>Status</li>
              <li>Opções</li>
            </ul>
          
            <hr></hr>
            <br></br>
            <ul className="barra-tarefa">
              {tarefaArray.map((tarefa, index) => (
                <li key={index}><span className="spanTarefa">{tarefa}</span>
                  <span className="spanOpcoes">
                    <input
                    type="checkbox"
                    checked={statusArray[index]}
                    onChange={() => handleToggleStatus(index)}
                    className="opcoes" />

                    <MdEdit
                    color="white"
                    onClick={() => openModalEdit(index)} className="opcoes icon" />
                    <Modal 
                    isOpen={modalEditIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModalEdit}
                    style={customStyles}
                    contentLabel="Modal Editar"
                    >
                    <div className="editModal">
                      <h2>Deseja editar este item?</h2>
                      <input 
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="inputText"
                      /><br></br>
                      <button className="btnNao" onClick={closeModalEdit}>Não</button>
                      <button className="btnSim" onClick={confirmarEdicao}>Sim</button>
                    </div>
                    </Modal>

                    <FaTrashCan 
                    color="white"
                    onClick={() => openModalDelete(index)} className="opcoes icon"/>
                    <Modal 
                    isOpen={modalDeleteIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModalDelete}
                    style={customStyles}
                    contentLabel="Modal Excluir"
                    >
                    <div className="deleteModal">
                      <h2>Deseja excluir este item?</h2>
                      <p>{tarefaDeleteInfo.texto}</p>
                      <button className="btnNao" onClick={closeModalDelete}>Não</button>
                      <button className="btnSim" onClick={confirmarExclusao}>Sim</button>
                    </div>
                  </Modal>
                  </span>
                </li>
              ))}
            </ul>
          </div>
         
          
        </div>
        <div className="text">
          <input
            type="text"
            value={novaTarefa}
            onChange={inputChange}
            placeholder="Nova tarefa..."
            className="inputTarefa"
            autoFocus //foco automático
            ref={inputTarefaRef}
            onKeyDown={handleKeyDown}
          />
          <MdOutlineAdd color="white" onClick={inputAddText} className="icon"/>
        </div>
      </div>
    </div>
  );
}

export default Tarefa;
