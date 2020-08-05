import React from 'react';
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import './styles.css';
const TeacherList = () => {
    return(
        <div id="page-teacher-list" className = 'container'>
            <PageHeader title = 'Estes são os proffys disponíveis'>
                <form id="search-teachers">
                  
                   <Input label = 'Matéria' name = 'subject' />
                   <Input label = 'Dia da semana' name = 'week_day' />
                   <Input type = 'time' label = 'Hora' name = 'time' />

                </form>
            </PageHeader>

            <main>
                <TeacherItem />
            </main>
        </div>
    )
}

export default TeacherList;