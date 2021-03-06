import React, { useState } from 'react'

import { View, TextInput, Keyboard, Alert } from 'react-native'
import { api } from '../../services/api';
import { COLORS } from '../../theme';
import { Button } from '../Button';

import { styles } from './styles'

export function SendMessageForm(){
  const [message, setMessage] = useState('')
  const [sendingMessage, setSendingMessage] = useState(false)

  async function handleMessageSubmit() {
    const messageFormatted = message.trim()
    
    if(messageFormatted.length > 0) {
      setSendingMessage(true)

      await api.post('/messages', { message: messageFormatted})
      setMessage('')
      Keyboard.dismiss()

      setSendingMessage(false)
      Alert.alert('Mensagem enviada com sucesso!')
    }
  }
  
  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento?"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        onChangeText={setMessage}
        value={message}
        maxLength={140}
        editable={!sendingMessage}
      />

      <Button
        title="ENVIAR MENSAGEM"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        isLoading={sendingMessage} 
        onPress={handleMessageSubmit}
      />
    </View>
  );
}