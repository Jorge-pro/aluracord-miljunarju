import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import { useRouter } from 'next/router';
import  appConfig  from '../config.json';
import React, { useState } from 'react';


function Titulo({tag, children}) {
  
  const Tag = tag || 'h1';
  return (
    <>
      <Tag>{children}</Tag>
      <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals["050"]};
                font-size: 24px;
                font-weight: 600;
            }
      `}</style>
    </>
  );
}

//componente React
//    function HomePage() {
//    //JSX
//      return (
//        <div>
//          <GlobalStyle />
//          <Titulo tag="h2">Boas vindas de volta!</Titulo>
//          <h2>Discord - Altura Matrix</h2>
//        
//        </div>
//      )
//    }
//
//    export default HomePage

export default function HomePage() {
  //const username = 'Jorge-pro';
  const [username, setUsername] = useState('');
  const router = useRouter();
  const userURL = `https://api.github.com/users/${username}`
  const [ userBio, setUserBio ] = useState('');
  const [ userCompany, setUserCompany ] = useState('');

  function handleChange(event) {
    setUsername(event.target.value)

    if (event.target.value.length > 2) {
      fetch(userURL)
        .then(response => response.json())
        .then(data => {
          setUserBio(data.bio)
          setUserCompany(data.company)
        })
    }
  }

  const imageError = 'https://cdn.pixabay.com/photo/2021/05/09/13/10/finance-6240949_960_720.png';

  
  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[200],
          backgroundImage: 'url(https://cdn.pixabay.com/photo/2019/05/15/18/31/bitcoin-4205661_960_720.jpg)',
          backgroundRepeat: 'no-repeat', 
          backgroundSize: 'cover', 
          backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', 
            maxWidth: '700px',
            borderRadius: '5px', 
            padding: '32px', 
            margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[600],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            styleSheet={{
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, 
              textAlign: 'center', 
              marginBottom: '32px',
            }}
            onSubmit={event => {
              event.preventDefault()
              router.push('/chat')
            }}
          >
            <Titulo tag="h2">
              Bem-vindo de volta Investidor!
            </Titulo>

            <Text 
              variant="body3" 
              styleSheet={{ 
                marginBottom: '32px', 
                color: appConfig.theme.colors.primary[300] 
              }}
            >

              {appConfig.name}
            
            </Text>


            {/*<input
              type="text"
              value={username}
              onChange={function (event) {
                console.log ('Usuario Digitou', event.target.value);
                // Onde ta o valor da variavel
                const valor = event.target.value;
                //Troca o valor da variavel
                setUsername(valor);
              }}
            />*/}

            <TextField
              fullWidth
              placeholder="Insira seu usuário github aqui..."
              value={username}
              onChange={handleChange}
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />

            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals[100],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[500],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={
                username.length > 2
                  ? `https://github.com/${username}.png`
                  : imageError
              }
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}