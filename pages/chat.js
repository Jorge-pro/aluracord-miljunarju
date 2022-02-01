import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
//import { useRouter } from 'next/router';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../components/ButtonSendSticker';
import avatar from '../assets/avatar.jpg';
import dynamic from "next/dynamic";

// Create a single supabase client for interacting with your database
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM0Nzk1MywiZXhwIjoxOTU4OTIzOTUzfQ.JgRtvALKya3CxTsL70gGWCO5Bd5VRtXydWZVbxQ7b38';
const SUPABASE_URL = 'https://bsjcdemwdcdgwftcyaeo.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const Header = dynamic(() => import("../components/Header"), {
  ssr: false,
});

function escutaMensagensEmTempoReal (addMensagem) {
   return supabaseClient
      .from('mensagens')
      .on('INSERT', ( respostaAutomatica ) => {
        addMensagem(respostaAutomatica.new);         
        })
      .subscribe();
}

export default function ChatPage() {
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', {ascending: false})
            .then(({ data }) => {
                setListaDeMensagens(data);
            });

            escutaMensagensEmTempoReal((novaMensagem) => {
              setListaDeMensagens((valorAtualDaLista) => {
                return [novaMensagem, ...valorAtualDaLista]
              });
            });
    }, []);
   
    function handleNovaMensagem(novaMensagem) {
        if(novaMensagem === ""){
            return;
        }
        const mensagem = {
            de: localStorage.getItem('login'),
            texto: novaMensagem,
        };

        supabaseClient
            .from( 'mensagens' )
            .insert([ mensagem ])
            .then(({ data }) => {
              console.log('Criando mensagem', data);
            });
       
        setMensagem('');
    }

    async function deletarMensagem(mensagemId) {
        await supabaseClient
        .from('mensagens')
        .delete()
        .match({ id: mensagemId });

        const {data} = await supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', {ascending: false})
            setListaDeMensagens([
                ...data,
            ]);
    }

    function getAvatar() {
        const login = typeof window !== 'undefined' ? localStorage.getItem('login') : null;
        return login ? `https://github.com/${login}.png` : avatar.src;
    }

    return (
                        <Box
                            styleSheet={{
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                backgroundColor: appConfig.theme.colors.primary[500],
                                backgroundImage: `url(https://cdn.pixabay.com/photo/2019/05/15/18/31/bitcoin-4205661_960_720.jpg)`,
                                backgroundRepeat: 'no-repeat', 
                                backgroundSize: 'cover', 
                                backgroundBlendMode: 'multiply',
                                color: appConfig.theme.colors.neutrals['000']
                            }}
                        >
                        <Box
                            styleSheet={{
                                display: 'flex',
                                flexDirection: 'column',
                                flex: 1,
                                boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                                borderRadius: '15px',
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                                height: '100%',
                                maxWidth: '900px',
                                maxHeight: '95vh',
                                padding: '32px',
                            }}
                        >
                        <Header avatar={getAvatar()} />
                        <Box
                            styleSheet={{
                                position: 'relative',
                                display: 'flex',
                                flex: 1,
                                height: '80%',
                                backgroundColor: appConfig.theme.colors.neutrals[600],
                                flexDirection: 'column',
                                borderRadius: '15px',
                                padding: '16px',
                            }}
                        >
                        <MessageList mensagens={listaDeMensagens} onMessageDelete={deletarMensagem} />
                        <Box
                            as="form"
                            styleSheet={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '15px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginBottom:'-8px',
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />

                                      {/*Callback - USANDO O COMPONENTE salva esse sticker no banco*/}

                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                            handleNovaMensagem('sticker: ' + sticker);
                            }}
                        />
                        <Button
                            label='Enviar'
                            onClick={() => {
                                handleNovaMensagem(mensagem);                            
                            }}
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[700],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                              }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function MessageList(props) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '15px',
                            padding: '6px',
                            marginBottom: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}>

                        <Box>
                            <Box
                                styleSheet={{
                                    marginBottom: '8px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>

                                <Image
                                    styleSheet={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        marginRight: '8px',
                                    }}
                                    src={`https://github.com/${mensagem.de}.png`}
                                />
                                <Text 
                                    tag="strong" 
                                    styleSheet={{color: appConfig.theme.colors.primary[901]}}>
                                    {mensagem.de}
                                </Text>
                                <Text
                                    styleSheet={{
                                        fontSize: '10px',
                                        marginLeft: '8px',
                                        color: appConfig.theme.colors.neutrals[300],
                                    }}
                                    tag="span"
                                >
                                    {(new Date().toLocaleDateString())}
                                </Text>
                            </Box>

                                {/* Modo Declarativo */}

                            {mensagem.texto.startsWith('sticker:') 
                            ? (<Image 
                                styleSheet={{
                                    maxWidth: '250px',
                                    borderRadius: '10%'
                                }}
                                
                                src={mensagem.texto.replace('sticker:', ' ')}/>)
                            : (mensagem.texto)}
                          
                        </Box>
                        <Button 
                            label='x'
                            styleSheet={{
                                marginRight: '14px',
                                borderRadius: '50%',
                                padding: '0',
                                padding: 0,
                                width: '15px',
                                height: '20px'
                            }}
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[600],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[700],
                            }}
                            onClick={() => {
                                props.onMessageDelete(mensagem.id);
                            }}
                        />
                    </Text>
                );
            })}
        </Box>
    )
}