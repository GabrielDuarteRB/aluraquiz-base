import React, { useEffect, useState } from 'react';
import QuizBackground from '../src/components/QuizBackground';
import db from '../db.json'
import Widget from '../src/components/Widget';
import QuizContainer from '../src/components/QuizContainer';
import Imagem from '../src/components/Imagem';
import Button from '../src/components/Button';
 
export default function Resultado({nome, acertou, setScreenState}) {

    const screenStates = {
        LOADING: 'LOADING',
        QUIZ: 'QUIZ',
        RESULT: 'RESULT',
      };

    var acertos = acertou.filter(x => x).length

    const recomecar = () => {
        setScreenState(screenStates.QUIZ)
    }
        
    return (
            <Widget>
                <Widget.Header>
                    <h1>Resultado</h1>
                </Widget.Header>
                <Imagem src={db.external}/>
                <Widget.Content>
                    <h1>Você acertou {acertos}/5, parabéns!</h1>
                    
                    {
                        acertou.map((questao, key) => {
                            if(questao === true){
                                return(
                                    <p data-status="SUCCESS">Questão#{key + 1} você acertou!</p>
                                )
                            }else{
                                return(
                                    <p data-status="ERROR">Questão#{key+1} você errou!</p>
                                )
                            }
                        })
                    
                    }

                    <Button onClick={() => recomecar()}>Recomeçar</Button>
                    
                </Widget.Content>
            </Widget>
    )
}
