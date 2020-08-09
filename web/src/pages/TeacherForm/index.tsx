import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input'
import warningIcon from '../../assets/images/icons/warning.svg'
import TextArea from '../../components/TextArea'
import Select from '../../components/Select'
import {useHistory} from 'react-router-dom'
import './styles.css';
import api from '../../services/api';
const TeacherForm = () => {
   const navigation = useHistory();
   const [formDataProffy, setFormDataProffyProffy] = useState({
       name: '',
       avatar: '',
       whatsapp: '',
       bio: ''
   })

   const [formDataClass, setFormDataClass] = useState({
       subject: '',
       cost: ''
   })

  const [scheduleItems, setScheduleItems] = useState([
    {week_day: 0, from: '', to: ''}
  ])

    function addNewScheduleItem(){
        setScheduleItems([...scheduleItems, {week_day: 0, from: '', to: ''}])
    }

    function setScheduleItemValue(position: number, field: string, value: string){
        const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if(index === position){
                return {...scheduleItem, [field]: value}
            }

            return scheduleItem
        })

        setScheduleItems(updateScheduleItems)
    }

    function handleCreateClass(event: FormEvent){
        event.preventDefault()
        const {name,avatar,whatsapp,bio} = formDataProffy
        const {cost,subject} = formDataClass
        console.log(formDataClass)
        console.log(formDataProffy)
        console.log(scheduleItems)
        api.post('/classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso!')
            navigation.push('/')
        }).catch(() => {
            alert('Erro no cadastro!')
        })
        
    }

    return(
        <div id="page-teacher-form" className = 'container'>
            <PageHeader title = 'Que incrível que você quer dar aulas'
                description = "O primeiro passo é preencher esse formulário de inscrição"
            />

            <main>
                <form onSubmit = {handleCreateClass}>
                <fieldset>
                    <legend>Seus dados</legend>
                    
                    <Input 
                        label = 'Nome completo' 
                        value = {formDataProffy.name} 
                        name = 'name' 
                        type = 'text'
                        onChange = {(event) => setFormDataProffyProffy({...formDataProffy, name: event.target.value})}
                    />

                    <Input 
                        label = 'Avatar' 
                        name = 'avatar' 
                        value = {formDataProffy.avatar} 
                        type = 'text' 
                        onChange = {(event) => setFormDataProffyProffy({...formDataProffy, avatar: event.target.value})}
                    />
                    
                    <Input 
                        label = 'Whatsapp' 
                        name = 'whatsapp' 
                        value = {formDataProffy.whatsapp} 
                        type = 'text' 
                        onChange = {(event) => setFormDataProffyProffy({...formDataProffy, whatsapp: event.target.value})}
                    />
                    
                    <TextArea 
                        name = 'bio' 
                        label = 'Biografia' 
                        value = {formDataProffy.bio} 
                        onChange = {(event) => setFormDataProffyProffy({...formDataProffy, bio: event.target.value})}
                    />
                </fieldset>

                <fieldset>
                    <legend>Sobre a aula</legend>
                    
                    <Select 
                        label = 'Matéria' 
                        name = 'subject' 
                        value = {formDataClass.subject}
                        onChange = {(event) => setFormDataClass({...formDataClass, subject: event.target.value})}
                        options = {[
                        {value: 'Artes', label: 'Artes'},
                        {value: 'Biologia', label: 'Biologia'},
                        {value: 'Ciências', label: 'Ciências'},
                        {value: 'Matemática', label: 'Matemática'},
                        {value: 'Filosofia', label: 'Filosofia'},
                        {value: 'Sociologia', label: 'Sociologia'},
                        {value: 'Português', label: 'Português'},
                      
                    ]}/>
                    <Input 
                        label = 'Custo da sua hora por aula'
                        name = 'cost' 
                        type = 'text' 
                        value = {formDataClass.cost}
                        onChange = {(event) => {setFormDataClass({...formDataClass, cost: event.target.value })}}
                    />
     
                
                </fieldset>

                <fieldset>
                    <legend>
                        Horários disponíveis
                        <button type = 'button' onClick = {addNewScheduleItem}>
                            + Novo horário
                        </button>
                    </legend>

                   {scheduleItems.map((scheduleItem, position) => (
                        <div key = {scheduleItem.week_day} className="schedule-item">
                        <Select 
                        label = 'Dia da semana' 
                        name = 'week_day' 
                        onChange = { event => setScheduleItemValue(position, 'week_day', event.target.value)}
                        value = {scheduleItem.week_day}
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
                            label = 'Das' 
                            value = {scheduleItem.from}
                            name = 'from' 
                            type = 'time' 
                            onChange = {event => setScheduleItemValue(position, 'from', event.target.value)}/>
                        
                        <Input 
                            label = 'Até' 
                            name = 'to' 
                            value = {scheduleItem.to}
                            type = 'time' 
                            onChange = {event => setScheduleItemValue(position, 'to', event.target.value)}
                        />

                    </div>

                   ))}
                   
                </fieldset>

                <footer>
                    <p>
                        <img src={warningIcon} alt="Aviso importante"/>
                        Importante! <br/>
                        Preencha todos os dados
                    </p>

                    <button type = 'submit'>
                        Salvar cadastro
                    </button>
                   
                </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;