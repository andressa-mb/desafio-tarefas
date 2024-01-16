import './index.scss'
import { MdEdit } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import Header from '../Header/Header'

function Main() {
    return(
        <div className='main'>
            <Header />
            <h1>Otimize seu tempo e se organize com o nosso Planejador Diário</h1>
            
            
            <table>
                <tr className='table__header'>
                    <th>Tarefa</th>
                    <th>Status</th>
                    <th>Opções</th>
                </tr>
                <tr>
                    <td>Limpar a casa</td>
                    <td><input type='checkbox'></input></td>
                    <td className='table__icon'><MdEdit/></td>
                    <td className='table__icon'><FaTrashCan /></td>
                </tr>
                <tr>
                    <td>Responder e-mails</td>
                    <td><input type='checkbox'></input></td>
                    <td className='table__icon'><MdEdit/></td>
                    <td className='table__icon'><FaTrashCan /></td>
                </tr>
                <tr>
                    <td>Nova Tarefa...</td>
                </tr>
            </table>
            
        </div>
    )
}

export default Main;