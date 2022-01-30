import  {Box, Button, Text, TextField, Image} from '@skynexui/components';
import React from 'react';
import {useRouter} from 'next/router';
import appConfig from '../config.json';
import avatar from '../assets/avatar.jpg';

console.log(avatar);

function Title(props){
    const Tag = props.tag || 'h1';
    return(
        <>
            <Tag>{props.children}</Tag>
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
  const [username, setUsername] = React.useState('');
  const router = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[200],
          backgroundImage: 'url(https://cdn.pixabay.com/photo/2019/05/15/18/31/bitcoin-4205661_960_720.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
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
          width: '100%', maxWidth: '700px',
          borderRadius: '5px', padding: '32px', margin: '16px',
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          backgroundColor: appConfig.theme.colors.neutrals[600],
        }}
      >

      {/* Formulário */}

      <Box
        as="form"
        onSubmit={function(infosDoEvento){
          infosDoEvento.preventDefault();
          console.log('Form submetido!');

          router.push('/chat');
        }}
        styleSheet={{
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: { xs: '100%', sm: '50%' }, 
          textAlign: 'center', 
          marginBottom: '32px',
        }}
      >

      <Title tag="h2">Boas vindas de volta investidor!</Title>

      <Text variant="body3" styleSheet={{
        marginBottom: '32px',
        color: appConfig.theme.colors.neutrals[300]}}>
        {appConfig.name}
      </Text>

      <TextField
        value={username}
        placeholder="Insira seu usuário Github aqui..."
        onChange={function(event) {
          console.log('Usuário digitou: ', event.target.value);
          const valor = event.target.value;
          localStorage.setItem('login', valor);
          setUsername(valor);
        }}
        fullWidth
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
        disabled={username.length < 2}
        buttonColors={{
          contrastColor: appConfig.theme.colors.neutrals["100"],
          mainColor: appConfig.theme.colors.primary[500],
          mainColorLight: appConfig.theme.colors.primary[400],
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
        src={username ? `https://github.com/${username}.png` : avatar.src}
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
              {username === '' ? 'Seu Github' : username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}