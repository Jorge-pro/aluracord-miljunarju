import  {Box, Button, Text, TextField, Image} from '@skynexui/components';
import React from 'react';
import {useRouter} from 'next/router';
import appConfig from '../config.json';
import avatar from '../assets/avatar.jpg';
import { useEffect } from 'react';

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

export default function HomePage() {
  //const username = 'Jorge-pro';
  const [githubAccount, setGithubAccount] = React.useState('Jorge-pro')
  const [username, setUsername] = React.useState('');
  const router = useRouter();

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
        .then((res) => {
            if (!res.ok) {
                throw Error('Não conseguiu fazer a requisição')
            }
            return res.json()
        })
        .then(async (resultado) => {
            await setGithubAccount(resultado)
            sessionStorage.setItem('userName' , resultado.name)
            sessionStorage.setItem('userIcon' , resultado.login)
        })
        .catch(err => {
            console.log(err.message)
        })
}, [username])

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

          //router.push('/chat?username=' + username);

          router.push(`/chat?username=${username}`);
          
          //window.location.href = '/chat';
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
            <ul
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                                >
                                    <li><Text variant="body4" styleSheet={{ color: appConfig.theme.colors.neutrals[300] }}> {githubAccount.name} </Text></li>
                                    <li><Text variant="body4" styleSheet={{ color: appConfig.theme.colors.neutrals[300] }}> {githubAccount.location} </Text></li>
                                    <li><a variant="body4" style={{ border: 'solid 1px grey', padding: '0px 5px', borderRadius: '10px', textDecoration: 'none', color: appConfig.theme.colors.neutrals[300], fontSize: '10px', cursor: 'pointer' }} href={ githubAccount.html_url }> Go to Git</a></li>
                                </ul>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}