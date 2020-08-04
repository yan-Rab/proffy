import React from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import './styles.css';
const TeacherItem = () => {
    return(
        <article className = 'teacher-item'>
                    <header>
                        <img src="https://avatars0.githubusercontent.com/u/63311216?s=460&u=b9e2a0b8ba1222dd51da8a1d10aa2657bd6f3600&v=4" alt="Yan Rabelo"/>
                        <div>
                            <strong>Yan Rabelo</strong>
                            <span>Química</span>
                        </div>
                    </header>

                    <p>
                        Lorem ipsum adipiscing cursus malesuada gravida elementum litora viverra proin metus vel platea, curabitur justo condimentum id 
                        <br/>
                        <br/>

                        Vitae dictumst gravida risus facilisis nullam in lobortis, lacinia ornare dui odio sollicitudin ligula porttitor, dictum felis
                    </p>

                    <footer>
                        <p>
                            Preço/hora
                            <strong>R$ 50,00</strong>
                        </p>

                        <button type = 'button'>
                            <img src={whatsappIcon} alt="Whatsapp"/>
                            Entrar em contato
                        </button>
                    </footer>
                </article>
    )
}

export default TeacherItem