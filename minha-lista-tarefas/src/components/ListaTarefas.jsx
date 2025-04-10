import {useEffect, useState} from 'react';
import './ListaTarefas.css';

//função para usar os estados na lista
function ListaTarefas(){

    // Carrega as tarerfas salvas ao iniciar 
    const tarefasSalvas = localStorage.getItem('tarefas');

    const[tarefas, setTarefas] = useState(tarefasSalvas ? JSON.parse(tarefasSalvas) : []);
    const[novaTarefa, setNovaTarefa] = useState('');
    const[ordenacao, setOrdenacao] = useState('data');
    
    //salva sempre que as tarefas mudam
    useEffect(() => {
        localStorage.setItem('tarefas',JSON.stringify(tarefas));
    }, [tarefas]);

    const adicionarTarefa = () => {
        if (novaTarefa.trim() !== ''){
            const nova = {
                id: Date.now(),//indentificador 
                texto: novaTarefa.trim(),
                concluida: false,
                dataCriacao: new Date().toString()
            };
            setTarefas([...tarefas,nova]);
            setNovaTarefa("");
        }
    };

    const removerTarefa = (id) => {
        setTarefas(tarefas.filter((tarefa)=> tarefa.id !== id));
    };

    //usado para utilizar o estado dentro da conclusão/checkbox
    const alternarConclusao = (id) => {
        const novaTarefas = tarefas.map((tarefa)=>
         tarefa.id === id ? {...tarefa, concluida: !tarefa.concluida} : tarefa 
        );
        setTarefas(novaTarefas);
    };

    const ordenarTarefas = (lista) => {
        const tarefasOrdenadas = [...lista];
        if(ordenacao === 'alfabetica') {
            tarefasOrdenadas.sort((a,b) => a.texto.localeCompare(b.texto));
        }else if(ordenacao === 'data'){
            tarefasOrdenadas.sort((a,b)=> new Date(a.dataCriacao) - new Date(b.dataCriacao));
        }
        return tarefasOrdenadas;
    }

    //return: vai criar o conteiner com a estrutura do to-do-list
    return (
        <div className='div1'>
            <h1 className='h1'>To-Do-List</h1>
            <h2 className='h2'>Suas tarefas</h2>
            <input
             type='text'
             value={novaTarefa}
             onChange={(e) => setNovaTarefa(e.target.value)}
             placeholder='Digite uma nova tarefa'
             className='input1'
             />
            <button className='add' onClick={adicionarTarefa}>Adicionar</button>
           
            <div className='ordenacao-container'>
                <label htmlFor='ordenacao'>Ordenar por: </label>
                <select
                    id='ordenacao'
                    className='select-ordenacao'
                    value={ordenacao}
                    onChange={(e) => setOrdenacao(e.target.value)}
                >
                    <option value='data'>Data de adição</option>
                    <option value='alfabetica'>Ordem alfabética</option>
                </select>
            </div>

            <ul>
                {ordenarTarefas(tarefas).map((tarefa) => (
                    <li key={tarefa.id} className={tarefa.concluida ? 'concluida' : ''}>
                        <span
                            className='texto-tarefa'
                            style={{
                                textDecoration: tarefa.concluida ? 'line-through' : 'none',
                                color: tarefa.concluida ? 'gray' : 'black',
                            }}>
                            {tarefa.texto}
                        </span>
                        <input 
                        className='checkbox'
                        type="checkbox"
                        checked={tarefa.concluida} 
                        onChange={() => alternarConclusao(tarefa.id)} />

                        <button className='remov' onClick={() => removerTarefa(tarefa.id)}>x</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaTarefas;
