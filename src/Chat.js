import { useState } from "react";
import { Grid, IconButton, OutlinedInput, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Chat({person, clearPerson}) {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [dialog, setDialog] = useState([]);

    // Substitua "sua-chave-de-api-aqui" pela sua chave de API real
    const apiKey = process.env.REACT_APP_CHATGPT_KEY
    
    const speechText = (text) => {
        if (speechSynthesis.paused && speechSynthesis.speaking) {
            return speechSynthesis.resume()
        }
        if (speechSynthesis.speaking) return
        const utterance = new SpeechSynthesisUtterance()
        utterance.text = text
        utterance.rate = 1
        utterance.lang = "pt-BR";
        // utterance.voice = voices[0];
        // textInput.disabled = true
        speechSynthesis.speak(utterance)
    }

    const callChatGpt = (_text) => {
        setLoading(true);
        // Corpo da solicitação HTTP
        const data = JSON.stringify({
          prompt: `${_text}. Fale como se fosse ${person.nickname} e resuma em apenas 70 palavras`,
          max_tokens: 200,
          n: 1,
          // stop: "."
        });

        // Cabeçalhos HTTP para enviar com a solicitação
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        };
    
        // Envie a solicitação HTTP para a API do OpenAI
        fetch(`https://api.openai.com/v1/engines/${'text-davinci-003'}/completions`, {
          method: "POST",
          headers,
          body: data,
        })
        .then((resp) => resp.json())
        .then((jsonResp) => {
            // Imprima a resposta do ChatGPT
            setDialog((dialog) => [...dialog, {user: 1, text: _text}]);
            setDialog((dialog) => [...dialog, {user: 0, text: jsonResp.choices[0].text}]);
            setText('');
            setLoading(false);
            speechText(jsonResp.choices[0].text)
        })
        .catch((error) => console.error(error));
    };

    const keyPress = (e) => {
        if (e.keyCode === 13) {
            setText(e.target.value);
            callChatGpt(e.target.value);
        }
    };



    return <Grid
        container
        direction="column"
        alignItems="center"
        sx={{
            justifyContent: 'space-between',
            alignItems: 'stretch',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `linear-gradient(to bottom, rgba(40, 44, 53, 0.9), rgba(40, 44, 53, 0.9)), url(require(/${person.img}))`,
            }}
        >
        <Grid item>
            <Grid container alignItems="center" >
                <Grid item xs={4} onClick={() => clearPerson()}>
                    <ArrowBackIcon sx={{color: 'white', ml: 2, mt: 2}}/>
                </Grid>
                <Grid item xs={6}><Typography variant='h4' color={'white'}>{person.nickname}</Typography></Grid>
            </Grid>
        </Grid>
        <Grid item>
            <div>
            {dialog.map((d, i) => <div key={i} style={{color: d?.user ? 'grey' : 'white'}}>{d.text}</div> )}
            </div>
        </Grid>
        <Grid item>
            {loading && <div>Loading...</div>}
        </Grid>
            {/* <img src={`require(${person.img})`} alt="adeda"/> */}
            {/* <img src={require('../../assets/images/madre-teresa.jpg')} alt="adeda"/> */}
            <img src={require('./images/madre-teresa.jpg')} alt="qwe"/>
            {/* <img src={require('/assets/images/madre-teresa.jpg')} alt="adeda"/> */}
            <img src='../assets/images/madre-teresa.jpg' alt="ade"/>
            <img src='./src' alt="ade"/>
            <img src='https://i.stack.imgur.com/y1LiB.png' alt="ade"/>
            <img src={process.env.PUBLIC_URL + '/madre-teresa.jpg'} alt="logo" />

            {/* <img src={require(`images/madre-teresa.jpg`).default} alt='pic' /> */}
        <Grid item>
            <OutlinedInput
            sx={{color: 'white', border: '2px solid white', width: '98%', m: 1}}
            placeholder={'escreva aqui...'}
            onKeyDown={(e) => keyPress(e)}
            type="text"
            value={text}
            onChange={(e) => {
                setText(e.target.value);
                }}
                endAdornment={
                    <IconButton onClick={() => {
                        callChatGpt(text);
                    }}>
                <SendIcon sx={{color: 'white'}}/>
                </IconButton>
            }
            />
        </Grid>

    </Grid>
}
