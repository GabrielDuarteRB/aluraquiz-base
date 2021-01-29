import React, { useEffect, useState } from 'react';
import QuizBackground from '../src/components/QuizBackground';
import db from '../db.json'
import Widget from '../src/components/Widget';
import QuizContainer from '../src/components/QuizContainer';
import Imagem from '../src/components/Imagem';
import Botao from '../src/components/Button'
import styled from 'styled-components';

function WidgetQuiz({proximaQuestao, enviarQuiz, setResposta, resposta, enviou}) {

    const acertou = resposta === db.questions[proximaQuestao].answer
    return(
        <Widget>
            <Widget.Header>
                <h1>Pergunta {proximaQuestao + 1} de 5</h1>
            </Widget.Header>
            <Imagem src={db.questions[proximaQuestao].image}/>
            <Widget.Content>
                <h1>{db.questions[proximaQuestao].title}</h1>
                <p>{db.questions[proximaQuestao].description}</p>
                <ul>
                    {db.questions[proximaQuestao].alternatives.map((alternativa ,key) => {
                        
                        return(
                            <Widget.Topic
                            as='label'
                            onClick={() => setResposta(key)} 
                            data-selected={resposta === key}
                            data-status={enviou === true ? acertou ? 'SUCCESS' : 'ERROR' : ''} 
                            key={key}
                            >
                            {alternativa}</Widget.Topic>)}
                        )
                    }
                    
                </ul>{
                    enviou === false ?
                    <Botao onClick={() => enviarQuiz()}>Confirmar</Botao>
                    :
                    acertou === true ?
                    <Imagem.Resposta src="https://m.gifmania.pt/Gifs-Animados-Design-Web/Imagens-Animadas-Sinal-De-Visto/Sinal-De-Visto-84435.gif"/>
                    :
                    <Imagem.Resposta src="https://animaniacos.com/images/gifs/misce/simbolos/letras/x.gif"/>
                }
            </Widget.Content>
        </Widget>
    )
}

export default WidgetQuiz