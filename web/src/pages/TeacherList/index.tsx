import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import Input from '../../components/Input';
import './styles.css';
import Select from '../../components/Select'
import api from '../../services/api';

const TeacherList = () => {
    const [dataFilterList, setDataFilterList] = useState({
        subject: '',
        week_day: '',
        time: ''
    })

    const [teachers, setTeachers] = useState([])

    async function searchTeachers(event: FormEvent){
        event.preventDefault();
        const {time,week_day,subject} = dataFilterList
        const response = await api.get('/classes', {
            params: {
                subject,
                week_day,
                time
            }
        })
        setTeachers(response.data)
    
    }

    return(
        <div id="page-teacher-list" className = 'container'>
            <PageHeader title = 'Estes são os proffys disponíveis'>
                <form onSubmit = {searchTeachers} id="search-teachers">
                   <Select 
                   label = 'Matéria' 
                   name = 'subject' 
                   value = {dataFilterList.subject}
                   onChange = {(event => setDataFilterList({...dataFilterList, subject: event.target.value}))}
                   options = {[
                        {value: 'Artes', label: 'Artes'},
                        {value: 'Biologia', label: 'Biologia'},
                        {value: 'Ciências', label: 'Ciências'},
                        {value: 'Matemática', label: 'Matemática'},
                        {value: 'Filosofia', label: 'Filosofia'},
                        {value: 'Sociologia', label: 'Sociologia'},
                        {value: 'Português', label: 'Português'},
                   ]}/>

                    <Select 
                    label = 'Dia da semana' 
                    name = 'week_day' 
                    value = {dataFilterList.week_day}
                    onChange = {event => setDataFilterList({...dataFilterList, week_day: event.target.value})}
                    options = {[
                        {value: '0', label: 'Domingo'},
                        {value: '1', label: 'Segunda-feira'},
                        {value: '2', label: 'Terça-feira'},
                        {value: '3', label: 'Quarta-feira'},
                        {value: '4', label: 'Quinta-feira'},
                        {value: '5', label: 'Sexta-feira'},
                        {value: '6', label: 'Sábado'},
                   ]}/>

                   <Input 
                   type = 'time' 
                   label = 'Hora' 
                   value = {dataFilterList.time}
                   onChange = {event => setDataFilterList({...dataFilterList,  time: event.target.value})}
                   name = 'time' />


                    <button type = 'submit'>Buscar</button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key = {teacher.id} teacher = {teacher} />
                })}
            </main>
        </div>
    )
}

export default TeacherList;