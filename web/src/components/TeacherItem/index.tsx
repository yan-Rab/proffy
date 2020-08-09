import React from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import './styles.css';
import api from '../../services/api';

export interface Teacher{
    id: number,
    name: string,
    avatar: string,
    bio: string,
    cost: number,
    subject: string,
    whatsapp: string
}
interface PropsTeachers{
    teacher: Teacher
}

const TeacherItem: React.FC<PropsTeachers> = ({teacher}) => {
    function createNewConnetion(){
        api.post('/connections', {user_id: teacher.id})
    }
   
    return(
        <article className = 'teacher-item'>
                    <header>
                        <img src={teacher.avatar} alt={teacher.name}/>
                        <div>
                            <strong>{teacher.name}</strong>     
                            <span>{teacher.subject}</span>
                        </div>
                    </header>

                    <p>
                        {teacher.bio}
                    </p>

                    <footer>
                        <p>
                            Preço/hora
                            <strong>{teacher.cost.toLocaleString("pt-br", {style: 'currency', currency: 'BRL'})}</strong>
                        </p>

                        <a 
                         onClick = {createNewConnetion} href = {`https://wa.me/${teacher.whatsapp}`} >
                            <img src={whatsappIcon} alt="Whatsapp"/>
                            Entrar em contato
                        </a>
                    </footer>
                </article>
    )
}

export default TeacherItem