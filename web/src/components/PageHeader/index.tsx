import React from 'react';
import {Link} from 'react-router-dom'
import backIcon from '../../assets/images/icons/back.svg'
import logoImg from '../../assets/images/logo.svg';
import './styles.css'

interface Props{
    title: string,
    description?: string,
}

const PageHeader: React.FC<Props> = ({title,children, description}) => (
    <header className = 'page-header'>
        <div className="top-bar-container">
            <Link to = '/'>
                <img src={backIcon} alt="Voltar"/>
            </Link>
            <img src={logoImg} alt="Logo"/>
        </div>

        <div className="header-content">
        <strong>{title}</strong>
        
        {description && <p>{description}</p>}

        {children}
        </div>

        
    </header>
)

export default PageHeader