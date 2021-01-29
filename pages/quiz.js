import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import db from '../db.json'
import {useRouter} from 'next/router'


import Botao from '../src/components/Button';
import Imagem from '../src/components/Imagem';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Widget from '../src/components/Widget';
import Resultado from './resultado';
import WidgetQuiz from './widgetQuiz'

const screenStates = {
    LOADING: 'LOADING',
    QUIZ: 'QUIZ',
    RESULT: 'RESULT',
  };

  function LoadingWidget() {
    return (
      <Widget>
        <Widget.Header>
          Carregando...
        </Widget.Header>
        <Imagem src="https://www.guiadoexcel.com.br/wp-content/uploads/sites/866/2011/05/loading.gif"/>
      </Widget>
    );
  }
export default function QuizPage() {
    const [screenState, setScreenState] = useState(screenStates.LOADING)
    const [resposta, setResposta] = useState(null)
    const [enviou, setEnviou] = useState(false)
    const [placar, setPlacar] = useState([])
    const [pergunta, setPergunta] = useState(0)
    const totalQuestoes = db.questions.length
    const [nome, setNome] = useState()
    const router = useRouter();

    useEffect(() => {
        pegarNome()
        setTimeout(() => {
            setScreenState(screenStates.QUIZ)
        }, 2000)
    }, [])
    
    const pegarNome = () => {
        var url = window.location.href
        var res = url.split('?')[1]
        var name = res.split('=')[1]
        setNome(name)
    }

    const enviarQuiz = () => {
        const proximaQuestao = pergunta + 1

        
        if(resposta === db.questions[pergunta].answer){
            setPlacar([...placar, true])
        }else if(resposta !== null){
            setPlacar([...placar, false])
        }

        

        if(proximaQuestao < totalQuestoes){
            if(resposta === null){
                console.log('Marque algo')
            }else{
                setTimeout(() =>{
                    setResposta(null)
                    setEnviou(false)
                    setPergunta(proximaQuestao)
                }, 2000)
                setEnviou(true)
            }
        }else{
            setEnviou(true)
            setTimeout(() => {
                setScreenState(screenStates.RESULT)
                setPergunta(0)
                setResposta(null)
                setEnviou(false)
            },2000)
        }

    }

    return(
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>

                {screenState === 'LOADING' && <LoadingWidget/>}
                
                {screenState === 'QUIZ' && <WidgetQuiz
                 proximaQuestao={pergunta}
                 enviarQuiz={() => enviarQuiz()} 
                 setResposta={setResposta}
                 resposta={resposta}
                 enviou={enviou}
                 />}
                 
                {screenState === 'RESULT' && <Resultado 
                nome={nome} 
                acertou={placar}
                setScreenState={setScreenState} 
                />}
                
            </QuizContainer>
        </QuizBackground>
    )
}