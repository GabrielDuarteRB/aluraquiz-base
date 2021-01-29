import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head'
import {useRouter} from 'next/router'

import db from '../db.json'
import Widget from '../src/components/Widget'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import Input from '../src/components/Input'
import Button from '../src/components/Button';

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;


export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('')
  
  function pegarNome(infosDoEvento)  {
    setName(infosDoEvento.target.value);
  }

  function gerenciarURL(infosDoEvento) {
    infosDoEvento.preventDefault();
    router.push(`/quiz?name=${name}`)
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>AluraQuiz - modelo Base</title>
      </Head>
      
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>Soccer Quiz</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={gerenciarURL}>
              <p>Teste seus conhecimentos de futebol</p>
              <Input
              placeholder="Diz ai seu nome :)"
              onChange={pegarNome} 
              value={name}/>
              <Button type="submit" disabled={name.length === 0}>Jogar</Button>
            </form>
          </Widget.Content>
        </Widget>

        <Footer/>
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/GabrielDuarteRB"/>
    </QuizBackground>
    
  ) 
}
